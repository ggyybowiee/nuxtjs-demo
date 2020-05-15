export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/custom',
    '@/plugins/i18n'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    vendor: ['vue-i18n'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: { // customize nuxt.js router (vue-router).
    middleware: 'i18n' // middleware all pages of the application
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api/pay': {
      target: 'http://192.168.10.145:8089',
      changeOrigin: true,
      pathRewrite: {
        '^/api/pay': '/api/pay'
      }
    },
    '/api/portalCore': {
      target: 'http://192.168.10.202:8088',
      changeOrigin: true,
      pathRewrite: {
        '^/api/portalCore': '/api/portalCore'
      }
    },
  }
}

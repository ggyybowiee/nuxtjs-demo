<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        bobo
      </h1>
      <img :src="channelPng" alt="">
      <h2 class="subtitle">
        My hunky-dory Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">
          GitHub
        </a>
        <nuxt-link :to="$i18n.path('user')">User</nuxt-link>
        <!-- <span @click="toUser">User</span> -->
        <nuxt-link :to="$i18n.path('user/one')">User One</nuxt-link>
      </div>

      {{$t('测试')}}

      <el-button @click="showMsg">点击打开msg弹窗</el-button>
      <vue-msg ref="msg"></vue-msg>
      <vue-button type="warn">警告按钮</vue-button>
      <vue-button type="error">错误按钮</vue-button>
      <vue-button>默认按钮</vue-button>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import channelPng from '@/assets/channel.png';

  export default {
    components: {
      Logo
    },
    data() {
      return {
        channelPng
      }
    },
    methods: {
      toUser() {
        this.$router.push(this.$i18n.path("user"))

        /** 不携带参数：
        this.$router.push(this.$i18n.path("")) ||
          this.$router.push(this.$i18n.path("home")) ||
          this.$router.push(this.$i18n.path("home/about"))

        携带参数：
        this.$router.push({
            path: this.$i18n.path(""),
            query: {
              p1: 'xxxx'
            }
          }) ||
          this.$router.push({
            path: this.$i18n.path("home"),
            query: {
              p1: 'xxxx'
            }
          }) ||
          this.$router.push({
            path: this.$i18n.path("home/about"),
            query: {
              p1: 'xxxx'
            }
          })
        **/
      },
      showMsg() {
        this.$nextTick(() => {
          this.$refs.msg.msgPlugin('我是弹窗信息', 5000);
        });
      },
    },
  }

</script>

<style lang="less" scoped>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

</style>

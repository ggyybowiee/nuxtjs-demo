<template>
  <div class="container">
    <div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <input type="checkbox" :checked="item.done" @change="toggle(item)">
          <span :class="{ done: item.done }">{{ item.text }}</span>
          <el-button type="text" @click="removeTodo(item)">remove</el-button>
        </li>
        <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
      </ul>

      <div class="myy">111</div>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  export default {
    computed: {
      list() {
        return this.$store.state.list
      }
    },
    mounted() {
      let browserObj = this.getBrowserInfo();
      this.passBrowserInfo(browserObj);

      this.getIPInfoAndEmail();
    },
    methods: {
      // 获取地址信息
      getIPInfoAndEmail() {
        let data = {
          appId: '',
          userId: '',
          appVersion: 0,
          appLanguage: ''
        };

        this.$axios.post("/api/portalCore/package/getIPInfoAndEmail", data).then(res => {
          console.log(res.data);
        }).catch(() => {
          console.log('error');
        });
      },
      //向后台传递浏览器信息
      passBrowserInfo(browserObj) {
        let param = {
          domainName: document.domain,
          browserName: browserObj.name,
          browserVersion: browserObj.version
        };

        this.$axios.post("/api/pay/report", param).then(res => {
          console.log("成功");
        }).catch(() => {
          console.log("失败");
        });
      },
      //切割版本号浏览器名称字符串
      splitString(str) {
        let arr = [null, null];
        let browserInfo = {
          name: "null",
          version: "null",
          language: (
              navigator.language || navigator.browserLanguage
            ).toLowerCase() ?
            (navigator.language || navigator.browserLanguage).toLowerCase() : "null"
        };
        arr = str.toString().split("/");
        browserInfo.name = arr[0];
        browserInfo.version = arr[1];
        return browserInfo;
      },
      //不同浏览器获取对navitator.userAgent的不同处理
      getBrowserInfo() {
        let agent = navigator.userAgent.toLowerCase();
        let sUserAgent = navigator.userAgent;
        let regStr_ff = /firefox\/[\d.]+/gi;
        let regStr_chrome = /chrome\/[\d.]+/gi;
        let regStr_saf = /safari\/[\d.]+/gi;
        let regStr_opera = /opr\/[\d.]+/gi;
        //firefox
        if (agent.indexOf("firefox") > 0) {
          return this.splitString(agent.match(regStr_ff));
        }
        //Chrome（因为oprera中打印出来的agent中也有chrome，所有多一个判断加以区分chrome和opera）
        if (agent.indexOf("chrome") > 0) {
          //Opera
          if (agent.indexOf("opr") > 0) {
            return this.splitString(agent.match(regStr_opera)); //opera
          } else {
            return this.splitString(agent.match(regStr_chrome)); //chrome
          }
        }
        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
          return this.splitString(agent.match(regStr_saf));
        } //Opera 
        if (agent.indexOf("opr") > 0) {
          return this.splitString(agent.match(regStr_opera));
        }
        //IE (ActiveXObject是IE特有的)
        if (window.ActiveXObject != "undefined") {
          return this.splitString("IE/" + this.IEVersion());
        }
      },
      removeTodo(item) {
        this.$store.commit('remove', item);
      },
      addTodo(e) {
        this.$store.commit('add', e.target.value)
        e.target.value = ''
      },
      ...mapMutations({
        toggle: 'toggle'
      })
    }
  }

</script>

<style lang="less" scoped>
  .container {
    .myy {
      color: red;
    }
  }

  .done {
    text-decoration: line-through;
  }

</style>

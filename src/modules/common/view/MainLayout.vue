<template>
  <div id="index-container">
    <div class="header">
      <Header :isCollapse="ShowHide" @changeCollapse="toggleShow" :username="userInfo.fullName || '未登录'"></Header>
    </div>
    <div class="body">
      <div :class="ShowHide?'close-nav':'nav'" class="nav-box">
        <Nav :isCollapse="ShowHide" :lips="lips"></Nav>
      </div>
      <div class="container" flex="dir:top">
        <tabs flex-box="0" />
        <div flex-box="1" class="router-view">
          <transition name="fade-transform" mode="out-in">
            <!-- <keep-alive :exclude="/^.*-noCache$/"> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
          </transition>
        </div>
      </div>
    </div>
    <!--<loading v-if="loading"></loading>-->
  </div>
</template>

<script>
import Nav from './Nav.vue'
import Header from './Header.vue'
import Tabs from './Tabs.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { Nav, Header, Tabs },
  data () {
    return {
      ShowHide: false,
      lips: true,
      logining: false,
      userInfo: {}
    }
  },
  async created () {
    this.getUserMenu()
  },
  computed: {
    ...mapState({
      // userInfo: state => state.default.userInfo
    })
  },
  watch: {
    $route (val) {
      if (val.path !== '' && val.path !== '/') {
        this.$utils.toTab(val.fullPath, val)
      }
    }
  },
  methods: {
    ...mapActions(['fetchAuth', 'deftheme', 'getUserMenu']),
    toggleShow ($event) {
      this.ShowHide = !this.ShowHide
      // this.lips=!this.lips;
      this.lips = !this.ShowHide
    },
    toRouter (url) {
      this.$router.push(url)
    }
  },
  mounted () {
    // this.deftheme();
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/vars.scss";
#index-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /*background:rgba(255,209,73,1);*/
  min-width: 1200px;
}

.body {
  -moz-box-flex: 1;
  box-flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: -moz-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  .nav-box {
    background-color: $nav_bg_color;
    flex-shrink: 0;
  }
}

.body > .nav {
  /* position: absolute;  */
  /* left: 0;  */
  /* transition: width 0.28s; */

  width: 180px;
  transition: width 0.28s;
  /* top: 0; bottom: 0; */
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  /* .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  } */
}

/* .body>.nav>.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.body>.close-nav>.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
} */

.body > .close-nav {
  transition: width 0.28s;
  width: 37px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.close-nav .ShowHide.YShowHide {
  left: 17px;
  transition: left 0.28s;
  color: #fff;
}

.nav .ShowHide.YShowHide {
  left: 179px;
  transition: left 0.28s;
  color: #fff;
}

.body > .nav::-webkit-scrollbar {
  display: none;
}
.body > .container {
  /* position: absolute;  */
  /* left: 199px; top: 0; right: 0; bottom: 0; */
  /*overflow: auto;*/
  //  background: #f0f2f5;
  min-width: 1000px;
  /* z-index: 200; */
  flex: 1;

  .router-view {
    overflow: auto;
    padding: 10px;
  }
}
.body > .container > h3 {
  background: #ffffff;
  height: 50px;
  padding-left: 16px;
  padding-top: 12px;
}
.body > .container > h3 .top {
  float: left;
  min-width: 124px;
  height: 28px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
  .pre-item {
    color: #b0b0b0;
    cursor: pointer;
  }
  .division {
    color: #b0b0b0;
  }
}
/*.body>.container::-webkit-scrollbar{*/
/*display: none;*/
/*}*/
.BShowHide {
  cursor: pointer;
  text-align: center;
  width: 20px;
  height: 43px;
  background: rgba(44, 64, 140, 1);
  color: #ffffff;
  line-height: 43px;
  position: absolute;
  top: 4px;
  left: 179px;
  z-index: 100;
}
.YShowHide {
  cursor: pointer;
  text-align: center;
  width: 20px;
  height: 43px;
  background: rgba(255, 209, 73, 1);
  color: #222222;
  line-height: 43px;
  position: absolute;
  top: 4px;
  left: 179px;
  z-index: 100;
}
</style>

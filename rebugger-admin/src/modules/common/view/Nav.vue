<template>
  <el-row class="Ynav">
    <!-- <h3 class="sys-name" v-if="lips">系统管理</h3>
    <h3 class="sys-name" v-else></h3> -->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo menu" @select="selectMenu" :collapse="isCollapse" background-color="#21376b" text-color="#fdfefe" active-text-color="rgba(240, 133, 25, 1)" :router="true" :unique-opened="true">
      <template v-for="item in menus">
        <el-menu-item v-if="!item.children || item.children.length==0" :key="item.id" :index="item.url||item.menuUrl || ''" class="spec_menu_item">
          <i :class="'iconfont ' + item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <!-- :popper-class="Theme.yellowheader? 'yellow-pover-class':'blue-pover-class'" -->
        <el-submenu :popper-class="''" v-else-if="item.children || item.children.length>0" :index="item.id+'_'" :key="item.id">
          <template slot="title">
            <i :class="'iconfont ' + item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <template v-for="sub2 in item.children">
              <el-menu-item v-if="!sub2.children || sub2.children.length==0" :index="sub2.url || sub2.menuUrl || ''" :key="sub2.id">{{sub2.name}}</el-menu-item>
              <el-submenu v-else-if="sub2.children || sub2.children.length>0" :key="sub2.id" :index="sub2.url || sub2.menuUrl || ''" class="submenu3">
                <span slot="title">{{sub2.name}}</span>
                <template v-for="sub3 in sub2.children">
                  <el-menu-item :key="sub3.id" :index="sub3.url">{{sub3.name}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-row>
</template>

<script>

import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data () {
    return {
      Openactive: "menus",
      perIndex: "0"
    };
  },
  created () {
    if (window.sessionStorage.getItem("Openactive")) {
      this.Openactive = window.sessionStorage.getItem("Openactive");
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      selectedTab: state => state.default.selectedTab,
      menus: state => state.default.menus
    }),
    ...mapGetters({
      flatMenu: "flatMenu" // getToDo 不是字符串，对应的是getter里面的一个方法名字 然后将这个方法名字重新取一个别名 todosALise
    })
  },
  props: ["isCollapse", "lips"],
  methods: {
    // ...mapActions([""]),
    ...mapMutations(["updateSelectedTab"]),
    selectMenu (index) {
      // console.log("selectMenu");
      // console.log(index);
      // this.perIndex = this.selectedTab
      // this.updateSelectedTab(index)
      // this.$nextTick(() => {
      //   this.updateSelectedTab(this.perIndex)
      //   this.$el.focus()
      //   const menu = this.flatMenu.find((m) => m.id === index)
      //   if (menu) {
      //     this.$router.push(menu.url)
      //   }
      // })
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/vars.scss";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}

.el-submenu__icon-arrow {
    right: 10px;
    margin-top: -5px;
}

.el-menu-item-group__title {
  padding: 0px !important;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}

.Ynav {
  //  background:#fff;
  text-align: left;
  background-color: $nav_bg_color;
  h3 {
    height: 50px;
    border-bottom: 1px solid #e4e4e4;
    font-size: $l_fontsize;
    font-family: $fontfamily;
    color: #222222;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .el-menu--collapse {
    width: 38px !important;
    .el-submenu__title {
      padding: 0 6px !important;
    }
    .el-tooltip {
      padding: 0 6px !important;
      width: 37px !important;
    }
  }
  .menu {
    border-right: 0 none;
    .el-menu-item-group__title {
      padding: 0;
    }
    .el-submenu__title {
      padding-left: 6px !important;
      height: 40px;
      line-height: 40px;
      i {
        color: #fdfefe !important;
      }
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      i {
        color: #fdfefe !important;
      }
      list-style: disc inside;
      // background:#ffffff ;
      &:hover {
        background: rgba(253, 242, 210, 1);
      }
    }

    .el-menu-item.is-active {
      i {
        color: #ec8d00 !important;
      }
    }

    .iconfont {
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      vertical-align: middle;
      vertical-align: text-bottom;
      margin-right: 0px;

      width: 24px;
      text-align: center;
      font-size: 18px;
      // color: #555555 !important;
    }

    .submenu3 {
      .el-submenu__title {
        padding-left: 40px !important;
        background: #ffffff !important;
      }
    }
    .spec_menu_item {
      padding-left: 6px !important;
      list-style: none;
      // background-color: #ffffff !important;
      i {
        // color: #222222 !important;
        color: #fdfefe !important;
      }
    }
    .el-icon-message,
    .el-icon-setting,
    .el-icon-menu {
      color: white !important;
    }
  }
}
</style>

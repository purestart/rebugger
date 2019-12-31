
<template>
  <div class="tabs-container" flex="box:last" v-if="tabs.length">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane :key="item.name" v-for="item in tabs" :label="item.title" :closable="!item.noClose" :name="item.name"></el-tab-pane>
    </el-tabs>
    <el-dropdown trigger="click" class="action" flex="cross:center" @command="removeTabs" @visible-change="toggleMenuVisible">
      <span class="p-h-4 p-v-6 cp" :class="{'menu-visible': menuVisible}">
        <i class="el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="noActive">关闭未激活</el-dropdown-item>
        <el-dropdown-item command="left">关闭左边</el-dropdown-item>
        <el-dropdown-item command="right">关闭右边</el-dropdown-item>
        <el-dropdown-item command="all" divided>关闭所有</el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      perTab: '0',
      menuVisible: false
    }
  },
  computed: {
    ...mapState({
      menuTabs: state => state.default.menuTabs,
      selectedTab: state => state.default.selectedTab
    }),
    ...mapGetters({
      flatMenu: 'flatMenu'
    }),
    activeTab: {
      get () {
        return this.selectedTab
      },
      set (val) {
        this.perTab = this.activeTab
        this.updateSelectedTab(val)
      }
    },
    tabs () {
      const menus = this.menuTabs.map(o => {
        const menu = o.menus[o.menus.length - 1]
        return {
          title: menu.name.name || menu.name,
          name: o.key,
          noClose: menu.menuUrl === '/home' // menu.noClose
        }
      })
      return menus
    }
  },
  watch: {
    flatMenu (val) {
      if (val.length) {
        if (this.$route.path !== '' && this.$route.path !== '/') {
          this.$utils.toTab(this.$route.fullPath, this.$route)
        }
      }
    }
  },
  methods: {
    ...mapMutations(['updateSelectedTab']),
    clickTab (tab) {
      const perTab = this.perTab // 保存住跳转前的tab
      this.$nextTick(() => {
        // 此时，激活的选项卡已经改变，再手动改回去，
        // 此处理是为了实现，点击选项卡后，如果页面被拦截没有跳转的话，tab页应该也不能改变激活的选项卡
        // 而只有当路由真的跳转后，再更新激活的选项卡。
        this.updateSelectedTab(perTab)
        const item = this.menuTabs.find(item => item.key === tab.name)
        if (item) {
          this.$router.push(item.url)
        }
      })
    },
    toggleMenuVisible (visible) {
      this.menuVisible = visible
    },
    removeTab (key) {
      this.$utils.removeTab(key)
    },
    removeTabs (command) {
      this.$utils.removeTabs(command)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-container {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.el-tabs--border-card {
  border-left: 0;
  border-right: 0;
  border-top: 0;
  box-shadow: none;
  /deep/ {
    .el-tabs__content {
      padding: 0;
    }
    .el-tabs__nav-wrap {
      margin-bottom: 0;
    }
    .el-tabs__header {
      border: 0;
    }
  }
}
.action {
  background-color: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  /*border-left: 1px solid #e4e7ed;*/
}
.el-dropdown {
  span:focus {
    outline: none;
  }
  i {
    transition: all 0.3s;
  }
  .menu-visible i {
    transform: rotate(180deg);
  }
}
</style>

/* eslint-disable quotes */
/**
 * Created by 詹陈龙 on 2019.02.18
 */

// import userApi from '../api/demo'

import router from "../../../src/router";
import { Base64 } from "js-base64";

import { utils } from "../../utils/utils";

// const defaultTabs = [{
//   key: '0',
//   url: '/',
//   menus: [{
//     id: '0',
//     name: '首页',
//     url: '/home',
//     noClose: true
//   }]
// }]

let tmpMenus = [
  {
    id: 6666,
    parentId: 0,
    children: [],
    name: "首页",
    icon: "icon-home",
    sortNo: 1,
    menuUrl: "/home",
    menuType: 0,
    applicationId: 81,
    isVisible: 1
  },
  {
    id: 6661,
    parentId: 0,
    children: [],
    name: "项目管理",
    icon: "icon-fa-columns",
    sortNo: 1,
    menuUrl: "/project/list",
    menuType: 0,
    applicationId: 81,
    isVisible: 1
  },
  // {
  //   id: 67,
  //   parentId: 0,
  //   name: "我的工作台",
  //   icon: "icon-fa-columns",
  //   sortNo: 2,
  //   menuUrl: null,
  //   menuType: 1,
  //   applicationId: 81,
  //   isVisible: 1,
  //   children: [
  //     {
  //       id: 69,
  //       parentId: 67,
  //       children: [],
  //       name: "我的待办",
  //       icon: null,
  //       sortNo: 1,
  //       menuUrl: "/myAgent",
  //       menuType: 0,
  //       applicationId: 81,
  //       isVisible: 1
  //     }
  //   ]
  // },
  {
    id: 99,
    name: "日志管理",
    icon: "icon-gongnengdingyi",
    sortNo: 2,
    menuUrl: null,
    menuType: 1,
    applicationId: 81,
    isVisible: 1,
    children: [
      {
        id: 991,
        parentId: 99,
        children: [],
        name: "日志信息",
        icon: null,
        sortNo: 3,
        menuUrl: "/report/errorInfo/tab/info",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      },
      {
        id: 992,
        parentId: 99,
        children: [],
        name: "异常信息",
        icon: null,
        sortNo: 3,
        menuUrl: "/report/errorInfo",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      }
      // {
      //   id: 993,
      //   parentId: 99,
      //   children: [],
      //   name: "TreeTable",
      //   icon: null,
      //   sortNo: 3,
      //   menuUrl: "/table",
      //   menuType: 0,
      //   applicationId: 81,
      //   isVisible: 1
      // }
      // {
      //   id: 994,
      //   parentId: 99,
      //   children: [],
      //   name: "地图选址",
      //   icon: null,
      //   sortNo: 3,
      //   menuUrl: "/table",
      //   menuType: 0,
      //   applicationId: 81,
      //   isVisible: 1
      // },
      // {
      //   id: 999,
      //   parentId: 99,
      //   children: [],
      //   name: "文件上传",
      //   icon: null,
      //   sortNo: 3,
      //   menuUrl: "/table",
      //   menuType: 0,
      //   applicationId: 81,
      //   isVisible: 1
      // }
    ]
  },
  {
    id: 88,
    name: "报表统计",
    icon: "icon-jichuguanli",
    sortNo: 2,
    menuUrl: null,
    menuType: 1,
    applicationId: 81,
    isVisible: 1,
    children: [
      {
        id: 881,
        parentId: 88,
        children: [],
        name: "综合图表",
        icon: null,
        sortNo: 3,
        menuUrl: "/chart",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      },
      {
        id: 882,
        parentId: 88,
        children: [],
        name: "设备统计",
        icon: null,
        sortNo: 3,
        menuUrl: "/chart",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      }
    ]
  },
  // {
  //   id: 66,
  //   name: "编辑器",
  //   icon: "icon-tianshenpi",
  //   sortNo: 2,
  //   menuUrl: null,
  //   menuType: 1,
  //   applicationId: 81,
  //   isVisible: 1,
  //   children: [
  //     {
  //       id: 661,
  //       parentId: 66,
  //       children: [],
  //       name: "文章编辑示例",
  //       icon: null,
  //       sortNo: 3,
  //       menuUrl: "/editor",
  //       menuType: 0,
  //       applicationId: 81,
  //       isVisible: 1
  //     }
  //   ]
  // },
  {
    id: 77,
    parentId: 0,
    children: [
      {
        id: 132,
        parentId: 77,
        children: [],
        name: "部门管理",
        icon: null,
        sortNo: 3,
        menuUrl: "/dept",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      },
      {
        id: 118,
        parentId: 77,
        children: [],
        name: "角色管理",
        icon: null,
        sortNo: 4,
        menuUrl: "/role",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      },
      {
        id: 119,
        parentId: 77,
        children: [],
        name: "人员管理",
        icon: null,
        sortNo: 5,
        menuUrl: "/user",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      },
      {
        id: 121,
        parentId: 77,
        children: [],
        name: "菜单管理",
        icon: null,
        sortNo: 6,
        menuUrl: "/menu",
        menuType: 0,
        applicationId: 81,
        isVisible: 1
      }
    ],
    name: "权限管理",
    icon: "icon-security",
    sortNo: 9,
    menuUrl: null,
    menuType: 1,
    applicationId: 81,
    isVisible: 1
  }
];

const state = {
  loading: false,
  allAreas: [],
  noMenuTabsMap: {},
  userInfo: {},
  userMenus: [],
  appId: "pc",
  menuTabs: [], // tabs
  selectedTab: "0", // 当前激活的tab
  msg: "vuex data",
  permissions: ["sys:user:delete", "sys:user:export"], // 资源按钮权限
  Theme: {
    currentTheme: {
      name: "橘黄色主题",
      baseColor: "rgba(240, 133, 25, 1)", // 主题基础色
      className: "orangeTheme",
      headerFontColor: "#ffffff",
      navBgColor: "#414141", // 菜单背景颜色
      navTextColor: "#fdfefe", // 菜单字体颜色
      navActiveTextColor: "rgba(240, 133, 25, 1)", // 菜单选中字体颜色
      bacgroundImage: null
    }
  },
  menus: [],
  selectedMenu: {},
  mainMenu: [],
  categoryList: []
};
const getters = {
  // 打平的菜单，只有一个层级
  flatMenu(state) {
    return utils.flatObject(state.menus).map(menu => ({
      ...menu,
      id: menu.id + ""
    }));
  },
  isSuperAdmin(state) {
    return state.userInfo.userType === 3;
    // return state.userInfo && state.userInfo.roleVoList && state.userInfo.roleVoList.filter(r => r.roleCode === 'OP001').length === 1
  },
  categoryMap(state) {
    const map = {};
    state.categoryList.forEach(c => {
      map[c.value] = c.label;
    });
    return map;
  },
  isOp(state) {
    return state.userInfo.companyCode === "oppein.com";
  },
  isJxs(state) {
    return state.userInfo.userType === 2;
  },
  allAreasK(state) {
    const allAreasK = {};
    state.allAreas.forEach(item => {
      allAreasK[item.id] = item.provinceName;
    });
    return allAreasK;
  }
};
const mutations = {
  updateLoading(state, show) {
    state.loading = show;
  },
  updateTabTitle(state, name) {
    const tab = state.menuTabs.find(t => t.key === state.selectedTab);
    if (tab) {
      const menu = tab.menus[0];
      if (menu) {
        menu.name = name;
        tab.menus.slice(0, 1, menu);
      }
    }
  },
  updateCategory(state, categoryList) {
    state.categoryList = categoryList;
  },
  clearUserInfo(state) {
    // state.selectedTab =
    // state.noMenuTabsMap = {};
    // state.menus = [];
    state.menuTabs = [];
    state.userInfo = {};
    // localStorage.removeItem("token");
    // localStorage.removeItem("ticket");
  },
  updateUserInfo(state, payload) {
    state.userInfo = payload;
    // localStorage.setItem(
    //   "HEADER-USERINFO",
    //   Base64.encode(
    //     JSON.stringify({
    //       userId: payload.userInfo.id
    //     })
    //   )
    // );
  },
  updateMsg(state, payload) {
    state.msg = payload;
  },
  // 更新tab页
  updateTabs(state, params) {
    if (params.key) {
      state.menuTabs.push(params);
    }
  },
  // 更新当前选择的tab
  updateSelectedTab(state, key) {
    if (key) {
      state.selectedTab = key;
    }
  },
  // 更新当前选择的tab的url
  updateTabUrl(state, { item, url }) {
    item.url = url;
  },
  // 关闭tab
  removeTab(state, key) {
    if (!key) {
      key = state.selectedTab;
    }
    // 从menuTabs里面删除tab
    const index = state.menuTabs.findIndex(o => o.key === key);
    if (index >= 0) {
      state.menuTabs.splice(index, 1);
    }
    // delete state.noMenuTabsMap[key]
    // 如果删除的是当前激活的，要重新激活一个标签
    // 暂定激活下一个
    if (key === state.selectedTab) {
      const newIndex = state.menuTabs[index] ? index : index - 1;
      // state.selectedTab = state.menuTabs[newIndex].key
      // 跳转url
      if (state.menuTabs.length === 0) {
        state.selectedTab = null;
        router.push("/home");
      } else {
        router.push(state.menuTabs[newIndex].url);
      }
    }
  },
  // 关闭tab
  removeTabAndBack(state, key) {
    if (!key) {
      key = state.selectedTab;
    }
    // 从menuTabs里面删除tab
    const index = state.menuTabs.findIndex(o => o.key === key);
    if (index >= 0) {
      state.menuTabs.splice(index, 1);
    }
    router.back();
  },
  removeTabs(state, command) {
    const index = state.menuTabs.findIndex(
      tab => tab.key === state.selectedTab
    );
    if (command === "noActive") {
      state.menuTabs.splice(index + 1);
      if (index > 0) {
        state.menuTabs.splice(1, index - 1);
      }
    } else if (command === "all") {
      state.menuTabs = [];
      router.push("/home");
    } else if (command === "left") {
      if (index > 0) {
        state.menuTabs.splice(1, index - 1);
      }
    } else if (command === "right") {
      state.menuTabs.splice(index + 1);
    }
  },
  clearTabs(state, command) {
    state.menuTabs = [];
  },
  updateMenus(state, menus) {
    const home = menus.find(m => m.menuUrl === "/" || m.menuUrl === "/home");
    if (state.menuTabs.length === 0) {
      state.menuTabs.push({
        key: home.id + "",
        url: "/home",
        menus: [
          {
            ...home,
            noClose: true
          }
        ]
      });
    }
    state.menus = menus;
  },
  updateApp(state, app) {
    state.app = app;
  },
  updateAllAreas(state, areas) {
    state.allAreas = areas;
  }
};
const actions = {
  updateUserInfo(context, params) {
    context.commit("updateUser", params);
  },
  clearUserInfo(context, params) {
    context.commit("clearUserInfo");
  },
  login(context, params) {
    // return systemApi.login(params)
  },
  async getUserMenu(context, params) {
    //
    // const superAdmin = context.state.userInfo && context.state.userInfo.roleVoList && context.state.userInfo.roleVoList.filter(r => r.roleCode === 'superAdmin').length === 1
    // const isSuperAdmin = context.getters.isSuperAdmin
    context.commit("updateMenus", tmpMenus);
    // if (isSuperAdmin) {
    //   const {
    //     data
    //   } = await systemApi.menuPage({
    //     applicationId: context.state.app.id
    //   })
    //   if (data) {
    //     context.commit('updateMenus', utils.list2Tree(data, 0))
    //   }
    // } else {
    //   const {
    //     data
    //   } = await systemApi.menuTree({
    //     appId: context.state.appId
    //   })
    //   if (data) {
    //     context.commit('updateMenus', data)
    //   }
    // }
  },
  updateTabs({ commit, dispatch }, payload) {
    commit("updateTabs", payload);
  },
  updateSelectedTab({ commit, dispatch }, payload) {
    commit("updateSelectedTab", payload);
  },
  updateTabUrl({ commit, dispatch }, payload) {
    commit("updateTabUrl", payload);
  },
  removeTab({ commit, dispatch }, payload) {
    commit("removeTab", payload);
  },
  removeTabs({ commit, dispatch }, payload) {
    commit("removeTabs", payload);
  },
  getUserAuth(context, params) {
    // userApi.getUserAuth(params)
  },
  // 获取用户授权资源
  fetchAuth(
    { commit, dispatch },
    payload = {
      noShare: false
    }
  ) {
    // let params = {}
    // userApi.getUserAuth(params).then((res) => {
    // }).catch(() => {})
  },
  logOut(
    { commit, dispatch },
    payload = {
      noShare: false
    }
  ) {
    // userApi.logOut({}).then(res => {
    //   if (res.status === 200) {
    //     localStorage.removeItem('ticket')
    //     commit('clearUserInfo')
    //     localStorage.removeItem('token')
    //     if (localStorage.getItem('nativeLogin')) {
    //       localStorage.removeItem('nativeLogin')
    //       router.push('/login')
    //     } else {
    //       // window.location.href = ssoUrl + '/logout?service=' + location.origin + '/home'
    //     }
    //   }
    // })
    // userApi.logOut((res) => {
    //
    // }, err => {}, {})
  },
  getArea(content, params) {
    // return systemApi.getArea(params)
  },
  async getAllArea(context, params) {
    if (context.state.allAreas.length === 0) {
      let data = false;
      // const {
      //   data
      // } = await systemApi.getAllArea(params)
      if (data) {
        data.forEach((a, index, arr) => {
          if (a.parentId === "-1") {
            a.level = 1;
          } else {
            const children = arr.find(c => c.parentId === a.id);
            if (children) {
              a.level = 2;
            } else {
              a.level = 3;
            }
          }
        });
        context.commit("updateAllAreas", data);
      }
    }
    return utils.deepCopy(context.state.allAreas);
  },
  nativeLogin(context, params) {
    // return systemApi.nativeLogin(params)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

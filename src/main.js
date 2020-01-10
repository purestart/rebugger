/* eslint-disable quotes */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import ElementUI from "element-ui";
import formVerify from "./utils/formVerify";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import JsonViewer from "vue-json-viewer";
import "default-passive-events"; // 去 Added non-passive event listener to a scroll-blocking。。。的警告

import regComponents from "./utils/regComponents.js";
import "flex.css";
import "./assets/css/base.scss";
import utils from "./utils";
import "./assets/icons/icon";
Vue.prototype.$echarts = echarts;
Vue.use(JsonViewer);

Vue.use(ElementUI, {
  size: "small"
});
Vue.use(formVerify);
Vue.use(regComponents);
Vue.use(utils);

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  let user = localStorage.getItem("user");
  NProgress.start();
  if (to.path == "/login") {
    window.localStorage.removeItem("user");
    window.sessionStorage.clear();
    store.commit("clearUserInfo", {});
    // 清除所有tab缓存
    store.commit("clearTabs", "all");
    next();
  } else {
    // if (!token || !user) {
    if (token && user) {
      // store.commit('updateLoginTokenCPM', token);
      // store.commit('updateLoginUserCPM', JSON.parse(user));
      // setGlobalTopNavs(to, next);
      next();
    } else {
      next({
        path: "/login"
      });
    }
    // } else {
    // next();
    // }
  }
  next();
});

router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done();
  }, 200);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

/* eslint-disable quotes */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import echarts from "echarts";
import ElementUI from "element-ui";
import formVerify from "./utils/formVerify";

import regComponents from "./utils/regComponents.js";
import "flex.css";
import "./assets/css/base.scss";
import utils from "./utils";
import "./assets/icons/icon";
// Vue.prototype.$echarts = echarts;

Vue.use(ElementUI, {
  size: "small"
});
Vue.use(formVerify);
Vue.use(regComponents);
Vue.use(utils);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

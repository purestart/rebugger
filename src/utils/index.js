import constant from "./constant";
import ls from "./lsUtils";
import utils from "./uiUtils";
import axios from "axios";
import * as config from "../config/index";

export default {
  install (Vue, $i18n) {
    Vue.prototype.$axios = axios;
    Vue.prototype.$bus = utils.bus;
    Vue.prototype.$c = constant;
    Vue.prototype.$ls = ls;
    Vue.prototype.$utils = utils;
    Vue.prototype.$config = config;

    // 权限检查方法
    Vue.prototype.$_has = function (value) {
      // debugger
      console.log(value);
      let isExist = false;
      let buttonpermsStr = sessionStorage.getItem("buttenpremissions");
      if (buttonpermsStr === undefined || buttonpermsStr == null) {
        return false;
      }
      let buttonperms = JSON.parse(buttonpermsStr);
      for (let i = 0; i < buttonperms.length; i++) {
        if (buttonperms[i].perms.indexOf(value) > -1) {
          isExist = true;
          break;
        }
      }
      return isExist;
    };

    /** 权限指令**/
    Vue.directive("auth", {
      bind: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
          el.parentNode.removeChild(el);
        }
      }
    });
  }
};

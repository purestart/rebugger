/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */

import utils from "./utils";
import lsUtil from "./lsUtils";
var customFieldUtil = {
  getCustomField: function(customField) {
    if (!customField || !utils.isObject(customField)) {
      return {};
    }
    let ret = {};
    for (var field in customField) {
      let item = customField[field];
      let origin = item.origin;
      let paths = item.paths;
      switch (origin) {
        case "localStorage":
          ret[field] = customFieldUtil.getByLocalStorage(paths);
          break;
        case "sessionStorage":
          ret[field] = customFieldUtil.getBySessionStorage(paths);
          break;
        case "window":
          ret[field] = customFieldUtil.getByWindow(paths);
          break;
        case "cookie":
          ret[field] = customFieldUtil.getByCookie(paths);
          break;
        default:
          console.warn("customField > origin is not allowed : " + origin);
          ret[field] = '';
          break;
      }
    }
    return ret;
  },
  getByLocalStorage: function(paths) {
    if (!paths) return "";
    let arr = paths.split(".");
    if (arr.length == 0) {
      return "";
    }
    let obj;
    if (arr.length > 0) {
      obj = lsUtil.get(arr[0]);
    }
    let ret = obj;
    if (utils.isEmpty(ret)) {
      return "";
    }
    if (arr.length > 1) {
      ret = JSON.parse(ret);
      for (let index = 1; index < arr.length; index++) {
        const element = arr[index];
        ret = ret[element];
      }
    }
    return ret;
  },
  getBySessionStorage: function(paths) {
    if (!paths) return "";
    let arr = paths.split(".");
    if (arr.length == 0) {
      return "";
    }
    let obj;
    if (arr.length > 0) {
      obj = sessionStorage.getItem(arr[0]) || "";
    }
    let ret = obj;
    if (utils.isEmpty(ret)) {
      return "";
    }
    if (arr.length > 1) {
      ret = JSON.parse(ret);
      for (let index = 1; index < arr.length; index++) {
        const element = arr[index];
        ret = ret[element];
      }
    }
    return ret;
  },
  getByWindow: function(paths) {
    if (!paths) return "";
    let arr = paths.split(".");
    if (arr.length == 0) {
      return "";
    }
    let ret = window[arr[0]];
    if (arr.length > 1) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        ret = ret[element];
      }
    }
    return ret;
  },
  getByCookie: function(paths) {
    if (!paths) return "";
    let arr = paths.split(".");
    if (arr.length == 0) {
      return "";
    }
    let obj;
    if (arr.length > 0) {
      obj = customFieldUtil.getCookie(arr[0]) || "";
    }
    let ret = obj;
    if (utils.isEmpty(ret)) {
      return "";
    }
    if (arr.length > 1) {
      ret = JSON.parse(ret);
      for (let index = 1; index < arr.length; index++) {
        const element = arr[index];
        ret = ret[element];
      }
    }
    return ret;
  },
  getCookie: function(name) {
    var strcookie = document.cookie; // 获取cookie字符串
    var arrcookie = strcookie.split("; "); // 分割
    // 遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name) {
        return arr[1];
      }
    }
    return "";
  }
};

export default customFieldUtil;

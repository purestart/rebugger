/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */

var utils = {
  // 判断是否为对象
  isObject: function(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  },
  // 判断是否为数组
  isArray: function(a) {
    return Object.prototype.toString.call(a) == "[object Array]";
  },
  // 判断是否为字符串
  isString: function(str) {
    return typeof str == "string";
  },
  isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  }
};

export default utils;

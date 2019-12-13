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
  },
  // 时间字符串比较 2019-12-12 13:13:13
  CompareDate(d1, d2) {
    return new Date(d1.replace(/-/g, "/")) > new Date(d2.replace(/-/g, "/"));
  }
};

export default utils;

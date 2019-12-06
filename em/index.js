// var utils = require('./lib/common');
import utils from "./lib/common";
import config from "./config/index";

var rebugger = {
  // 初始化 rebugger 框架内使用
  init(apikey, options) {},
  getHostName: function() {
    return document.domain;
  },
  report: function(paramStr) {
    var reportUrl = config.baseUrl;
    new Image().src = reportUrl + "?" + paramStr;
  },
  // 发送错误对象信息
  reportObject: function(obj) {
    let paramStr = "";
    for (var key in obj) {
      paramStr = paramStr + key + "=" + obj[key] + "&";
    }
    this.report(paramStr);
  }
};
export default rebugger;
// debuger
(function() {
  let apikey = "";
  // 是否获取自定义字段收集
  let customField = false;
  // 是否禁用 rebugger 不收集任何信息
  let silent = false;
  // 开发环境是否收集
  let silentDev = false;
  // 测试环境是否收集
  let silentTest = false;
  // 预发布环境是否收集
  let silentPre = false;

  var script = document.querySelector("#rebugger");
  if (script) {
    apikey = script.getAttribute("apikey");
    let customFieldStr = script.getAttribute("customField");
    let silentAttr = script.getAttribute("silent");
    if (customFieldStr && customFieldStr == "true") {
      customField = true;
    }
    if (silentAttr && silentAttr == "true") {
      console.log("silent true");
      silent = true;
      return;
    }
    let silentDevAttr = script.getAttribute("silentDev");
    if(silentDevAttr && silentDevAttr == 'true'){
      silentDev = true;
      let isDev = false;
      let domain = document.domain;
      let arr = domain.split('.');
      if(domain === '127.0.0.1' || domain === 'localhost' || arr[0].indexOf('dev')!=-1){
        // 开发环境禁用
        console.log("silentDev true");
        isDev = true;
        return;
      }
    }
    let silentTestAttr = script.getAttribute("silentTest");
    if(silentTestAttr && silentTestAttr == 'true'){
      silentTest = true;
      if(domain.indexOf('test')!=-1){
        // 测试环境禁用
        console.log("silentTest true");
        return;
      }
    }
    let silentPreAttr = script.getAttribute("silentPre");
    if(silentPreAttr && silentPreAttr == 'true'){
      silentPre=true;
      if(domain.indexOf('pre')!=-1){
        // 预发布环境禁用
        console.log("silentPre true");
        return;
      }
    }
  } else {
    console.warn("script should be set id = 'rebugger'");
    return;
  }

  let ip = "";
  let cityId = "";
  let cityName = "";
  // 获取客户端ip和城市信息
  if (returnCitySN) {
    ip = returnCitySN["cip"];
    cityId = returnCitySN["cid"];
    cityName = returnCitySN["cname"];
  }
  let initParam = { apikey, ip, cityId, cityName };
  console.log("init rebugger");
  if (!apikey) {
    console.warn("rebugger request apikey");
    console.warn("rebugger 缺少apikey 请到rebugger管理后台注册应用后使用");
    // return;
  }

  if (customField) {
    try {
      // 获取后端自定义收集字段信息
    } catch (error) {
      console.log(error);
    }
  }
  // window.onerror = function(message, source, lineno, colno, error){
  //   console.log("window.onerror");
  //   console.log("msg ",message,source,lineno,colno,error);
  // }
  window.addEventListener(
    "error",
    event => {
      // 过滤js error
      let target = event.target || event.srcElement;
      let isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement;
      if (!isElementTarget) {
        // js报错
        console.log("js error", event);
        let filename, lineno, colno;
        filename = event.filename;
        // console.log(scriptURI);
        lineno = event.lineno;
        colno = event.colno;
        console.log("err ", filename,lineno,colno);
        let title = event.message;
        let stack = event.error ? event.error.stack : "";
      } else {
        // 上报资源地址
        let url = target.src || target.href;
        console.log("资源加载异常", url);
        console.log(event);
        let targetEle = target.tagName;
        console.log(targetEle);
      }
    },
    true
  );

  // 被Vue捕获的错误
  if (window.Vue) {
    Vue.config.errorHandler = function(err, vm, info) {
      // handle error
      // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
      // 只在 2.2.0+ 可用
      console.error("Vue errror", err);
      let { 
        message, // 异常信息
        name, // 异常名称
        script,  // 异常脚本url
        line,  // 异常行号
        column,  // 异常列号
        stack  // 异常堆栈信息
      } = err;
      // let title = info;
      // let stack = err.stack.toString();
      // console.log(initParam);
      // console.log(rebugger);
      console.log("=======");
      console.log(name);
      console.log(message);
      console.log(script);
      console.log(line);
      console.log(column);
      console.log(stack.toString());
      let reportInfo = utils.getReportInfo();
      let params = Object.assign({}, initParam, reportInfo);
      console.log(params);
      rebugger.reportObject(params);
    };
  }
  //未处理的promise错误 rejectionhandled unhandledrejection
  window.addEventListener("unhandledrejection", event => {
    // 错误的详细信息在reason字段
    // demo:settimeout error
    console.log("未处理的promise错误", event);
    let title = event.reason.message;
    let stack = event.reason.stack;
    console.log(title);
  });

  // 处理的promise错误
  window.addEventListener("rejectionhandled", event => {
    // 错误的详细信息在reason字段
    // demo:settimeout error
    console.log("已处理的promise错误", event);
    let title = event.reason.message;
    let stack = event.reason.stack;
  });
  
})();

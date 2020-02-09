/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
// type异常类型 warn info caught 手动上报异常 unCaught 自动捕获代码异常 sourceError 资源加载异常 httpError 请求异常 unhandledRejection 未处理promise异常 handledRejection
import utils from "./lib/common";
import customFieldUtil from "./lib/customFieldUtil";
import reportHandller from "./lib/reportHandller";
import ajax from "./lib/ajax";

var logger = {
  options: {
    apikey: "",
    useCustomField: false,
    silent: false,
    silentDev: false,
    silentPre: false,
    silentVideo: false,
    // 异常上传模式 onError 立即上传 byNum 按天存储满多少个上传 byDay 按天上传 onErrorOffline 立即上报且支持线下缓存
    reportMode: "onError",
    // 满10条数据上报一次
    reportNum: 10,
    // 缓存数据最大数
    limitNum: 20,
    // 版本信息
    appVersion: "",
    // 环境信息
    env: "",
    // 用户信息
    user: {
      name: "",
      email: ""
    },
    // 其它自定义信息
    metaData: {},
    ip: "",
    cityNo: "",
    cityName: "",
    // 自定义保存字段 数据将会保存在metaData里面 origin: localStorage / sessionStorage / window / cookie 不能获取跨域信息 需要将js文件下载
    customField: {
      fullName: {
        origin: "localStorage",
        paths: "user.fullName"
      },
      uid: {
        origin: "localStorage",
        paths: "user.uid"
      }
      // token: {
      //   origin: "sessionStorage",
      //   paths: "token"
      // }
      // returnCitySN: {
      //   origin: "window",
      //   paths: "returnCitySN"
      // }
    },
    today: "",
    // logger服务器的baseUrl
    baseUrl: "http://localhost:9090"
  },
  // 初始化 logger 框架内使用
  init(apikey, options) {},
  getHostName: function() {
    return document.domain;
  },
  reportByIMG: function(paramStr) {
    var reportUrl = logger.baseUrl + "/api/report/uploadShort";
    new Image().src = reportUrl + "?" + paramStr;
  },
  // 发送错误对象信息
  reportObjectByIMG: function(obj) {
    let paramStr = "";
    for (var key in obj) {
      paramStr = paramStr + key + "=" + obj[key] + "&";
    }
    this.reportByIMG(paramStr);
  },
  // 上报http异常 用于手动
  reportHttpError: function(errorInfo, flag = true) {
    errorInfo.type = "httpError";
    logger.reportError(errorInfo, flag);
  },
  reportInfo: function(errorInfo, flag = true) {
    errorInfo.type = "info";
    logger.reportError(errorInfo, flag);
  },
  reportWarning: function(errorInfo, flag = true) {
    errorInfo.type = "warn";
    logger.reportError(errorInfo, flag);
  },
  // 上报promise异常捕获信息 用于手动
  reportHandledRejection: function(errorInfo, flag = true) {
    errorInfo.type = "handledRejection";
    logger.reportError(errorInfo, flag);
  },
  // 默认type caught 用于手动  flag是否需要获取基础信息baseInfo和MetaData
  reportError: function(errorInfo, flag = true) {
    // 是否需要获取基础信息 立即发送
    if (flag) {
      let initParam = {
        apikey: logger.options.apikey,
        ip: logger.options.ip,
        cityNo: logger.options.cityNo,
        cityName: logger.options.cityName,
        emitTime: new Date(),
        type: errorInfo.type ? errorInfo.type : "caught"
      };
      let baseInfo = utils.getBaseInfo();
      let metaData = logger.getMetaData(errorInfo.metaData);
      errorInfo = Object.assign({}, initParam, baseInfo, errorInfo, metaData);
    }
    let options = {
      method: "POST",
      url: logger.options.baseUrl + "/api/report/create",
      data: errorInfo
    };
    ajax(options)
      .then(res => {
        // console.log("success", res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 批量上传异常数据
  reportErrorList: function(list, flag = true) {
    let dataObj = {
      list: list
    };
    if (flag) {
      // 获取baseInfo等基础信息
    }
    let options = {
      method: "POST",
      url: logger.options.baseUrl + "/api/report/createList",
      data: dataObj
    };
    ajax(options)
      .then(res => {
        console.log("report success", res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 获取异常组件名称
  getComponentName(vm) {
    if (vm.$root === vm) return "root";
    var name = vm._isVue
      ? (vm.$options && vm.$options.name) ||
        (vm.$options && vm.$options._componentTag)
      : vm.name;
    return (
      (name ? "component <" + name + ">" : "anonymous component") +
      (vm._isVue && vm.$options && vm.$options.__file
        ? " at " + (vm.$options && vm.$options.__file)
        : "")
    );
  },
  initVueErrorHandler(vue) {
    vue.config.errorHandler = function(err, vm, info) {
      // handle error
      // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
      // 只在 2.2.0+ 可用
      console.error("捕获 Vue errror", err);
      // console.log(info);
      let componentName = logger.getComponentName(vm);
      let propsData = vm.$options && vm.$options.propsData;
      let {
        message, // 异常信息
        name, // 异常名称
        fileName, // 异常脚本url
        lineNumber, // 异常行号
        columnNumber, // 异常列号
        stack // 异常堆栈信息
      } = err;

      let initParam = {
        apikey: logger.options.apikey,
        ip: logger.options.ip,
        cityNo: logger.options.cityNo,
        cityName: logger.options.cityName
      };

      let stackStr = stack.toString();
      let arr = stackStr.split(/[\n]/);
      if (arr.length > 1 && !fileName) {
        let str = arr[1];
        let tempArr = str.split("(");
        if (tempArr.length == 2) {
          str = tempArr[1];
          let tmpArr = str.split(":");
          if (tmpArr.length > 1) {
            lineNumber = tmpArr[tmpArr.length - 2];
            columnNumber = tmpArr[tmpArr.length - 1];
            fileName = str.replace(":" + lineNumber + ":" + columnNumber, "");
            columnNumber = columnNumber.replace(")", "");
            // console.log(lineNumber);
            // console.log(columnNumber);
            // console.log(fileName);
          }
        }
      }
      let errorInfo = {
        name: name,
        message: name + ":" + message,
        fileName,
        lineNumber,
        columnNumber,
        componentName,
        type: "unCaught",
        emitTime: new Date(),
        propsData: propsData ? JSON.stringify(propsData) : "",
        stack: stack.toString()
      };
      let baseInfo = utils.getBaseInfo();
      let metaData = logger.getMetaData();
      let params = Object.assign({}, initParam, baseInfo, metaData, errorInfo);
      // console.log(params);
      // logger.reportObject(params);
      reportHandller.report(logger, params);
    };
  },
  getMetaData: function(defaultInfo) {
    defaultInfo = defaultInfo || {};
    let metaData = defaultInfo;
    // console.log(logger.options);
    if (logger.options.useCustomField) {
      let customFieldInfo = customFieldUtil.getCustomField(
        logger.options.customField
      );
      // console.log(metaData);
      // console.log(customFieldInfo);
      metaData = Object.assign({}, metaData, customFieldInfo);
    }
    // console.log(logger.options);
    // console.log(metaData);
    // 其它途径获取的metaData ...
    return { metaData: JSON.stringify(metaData) };
  },
  // 格式化上报数据
  formatErrorInfo(errorInfo) {
    // 内容截取
    if (errorInfo.message && errorInfo.message.length > 2040) {
      errorInfo.message = errorInfo.message.substring(0, 2040);
    }
    if (errorInfo.stack && errorInfo.stack.length > 60000) {
      errorInfo.stack = errorInfo.stack.substring(0, 60000);
    }

    if (errorInfo.name && errorInfo.name.length > 254) {
      errorInfo.name = errorInfo.name.substring(0, 254);
    }
    return errorInfo;
  }
};
export default logger;
// debuger
(function() {
  let apikey = "";
  // 是否获取自定义字段收集
  let useCustomField = false;
  // 是否禁用 logger 不收集任何信息
  let silent = false;
  // 开发环境是否收集
  let silentDev = false;
  // 测试环境是否收集
  let silentTest = false;
  // 预发布环境是否收集
  let silentPre = false;
  // 异常上报模式 onError 立即上报 byDay 按天上报 onErrorOffline 立即上报但支持线下缓存
  let reportMode = "onError";

  // var script = document.querySelector("#logger");
  var script = document.getElementById("front-logger");
  if (script) {
    apikey = script.getAttribute("apikey");
    let useCustomFieldStr = script.getAttribute("useCustomField");
    let silentAttr = script.getAttribute("silent");
    if (useCustomFieldStr && useCustomFieldStr == "true") {
      useCustomField = true;
    }
    if (silentAttr && silentAttr == "true") {
      console.log("silent true");
      silent = true;
      return;
    }
    let silentDevAttr = script.getAttribute("silentDev");
    let domain = document.domain;
    if (silentDevAttr && silentDevAttr == "true") {
      silentDev = true;
      let isDev = false;
      let arr = domain.split(".");
      if (
        domain === "127.0.0.1" ||
        domain === "localhost" ||
        arr[0].indexOf("dev") != -1
      ) {
        // 开发环境禁用
        console.log("silentDev true");
        isDev = true;
        return;
      }
    }
    let silentTestAttr = script.getAttribute("silentTest");
    if (silentTestAttr && silentTestAttr == "true") {
      silentTest = true;
      if (domain.indexOf("test") != -1) {
        // 测试环境禁用
        console.log("silentTest true");
        return;
      }
    }
    let silentPreAttr = script.getAttribute("silentPre");
    if (silentPreAttr && silentPreAttr == "true") {
      silentPre = true;
      if (domain.indexOf("pre") != -1) {
        // 预发布环境禁用
        console.log("silentPre true");
        return;
      }
    }
    let silentVideo = script.getAttribute("silentVideo");
    if (silentVideo && silentVideo == "true") {
      logger.options.silentVideo = true;
    }
    let reportMode = script.getAttribute("reportMode");
    if (reportMode && reportMode.length > 0) {
      logger.options.reportMode = reportMode;
    }
    let customField = script.getAttribute("customField");
    if (customField && customField.length > 0) {
      logger.options.customField = JSON.parse(customField);
    }
  } else {
    console.warn("script should be set id = 'front-logger'");
    return;
  }

  let ip = "";
  let cityNo = "";
  let cityName = "";
  // 获取客户端ip和城市信息
  // eslint-disable-next-line no-undef
  if (window.returnCitySN) {
    // eslint-disable-next-line no-undef
    ip = returnCitySN["cip"];
    // eslint-disable-next-line no-undef
    cityNo = returnCitySN["cid"];
    // eslint-disable-next-line no-undef
    cityName = returnCitySN["cname"];
  }

  logger.options.ip = ip;
  logger.options.cityNo = cityNo;
  logger.options.cityName = cityName;
  let initParam = { apikey, ip, cityNo, cityName };
  console.log("init logger");
  if (!apikey) {
    console.warn("logger request apikey");
    console.warn("logger 缺少apikey 请到logger管理后台注册应用后使用");
    // return;
  }

  logger.options.apikey = apikey;
  logger.options.useCustomField = useCustomField;
  logger.options.silent = silent;
  logger.options.silentDev = silentDev;
  logger.options.silentTest = silentTest;
  logger.options.silentPre = silentPre;
  logger.options.today =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();
  // 获取默认baseUrl
  let baseUrl = utils.getDefaultBaseUrl();
  logger.options.baseUrl = baseUrl;
  // 初始化 reportHandller
  reportHandller.init(logger);
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
        let fileName, lineNumber, columnNumber;
        fileName = event.filename;
        // console.log(scriptURI);
        lineNumber = event.lineno;
        columnNumber = event.colno;
        let title = event.message;
        let stack = event.error ? event.error.stack : "";
        let errorInfo = {
          name: event.message,
          message: event.message,
          fileName,
          lineNumber,
          columnNumber,
          type: "unCaught",
          emitTime: new Date(),
          stack: stack.toString()
        };
        let baseInfo = utils.getBaseInfo();
        let metaData = logger.getMetaData();
        let params = Object.assign(
          {},
          initParam,
          baseInfo,
          metaData,
          errorInfo
        );
        // console.log(params);
        // logger.reportObject(params);
        reportHandller.report(logger, params);
      } else {
        // 上报资源地址
        let src = target.src || target.href;
        // console.log("资源加载异常", src);
        console.log(event);
        let tagName = target.tagName;
        let outerHTML = target.outerHTML;
        let selector = "";
        let paths = event.path;
        if (paths && paths.length > 0) {
          paths.reverse();
          // console.log(paths);
          let arr = [];
          if (paths.length > 4) {
            arr = paths.slice(paths.length - 5);
          } else {
            arr = paths;
          }
          arr.forEach((item, index) => {
            let className = item.className
              ? "." + item.className.replace(/\s+/g, ".")
              : "";
            if (index == arr.length - 1) {
              selector = selector + item.tagName.toLowerCase() + className;
            } else {
              selector =
                selector + item.tagName.toLowerCase() + className + " > ";
            }
          });
        } else {
          // 通过parentNode来寻找 先不递归 按层获取
          let selectorArr = [];
          let currentNode = target;
          let tagName = currentNode.tagName.toLowerCase();
          let className = currentNode.className
            ? "." + currentNode.className.replace(/\s+/g, ".")
            : "";
          if (tagName != "body") {
            selectorArr.push(tagName + className);
            currentNode = currentNode.parentNode;
            tagName = currentNode.tagName.toLowerCase();
            className = currentNode.className
              ? "." + currentNode.className.replace(/\s+/g, ".")
              : "";
            if (tagName != "body") {
              selectorArr.push(tagName + className);
              currentNode = currentNode.parentNode;
              tagName = currentNode.tagName.toLowerCase();
              className = currentNode.className
                ? "." + currentNode.className.replace(/\s+/g, ".")
                : "";
              if (tagName != "body") {
                selectorArr.push(tagName + className);
                currentNode = currentNode.parentNode;
                tagName = currentNode.tagName.toLowerCase();
                className = currentNode.className
                  ? "." + currentNode.className.replace(/\s+/g, ".")
                  : "";
                selectorArr.push(tagName + className);
              }
            }
          }
          selectorArr.reverse();
          selectorArr.forEach((item, index) => {
            if (index == selectorArr.length - 1) {
              selector = selector + item;
            } else {
              selector = selector + item + " > ";
            }
          });
        }
        // outerHTML XPath status 404 statusText selector
        let errorInfo = {
          name: "sourceError",
          message: "资源加载异常",
          src: src,
          tagName,
          outerHTML,
          status: 404,
          statusText: "Not Found",
          selector,
          emitTime: new Date(),
          type: "sourceError"
        };
        let baseInfo = utils.getBaseInfo();
        let metaData = logger.getMetaData();
        let params = Object.assign(
          {},
          initParam,
          baseInfo,
          metaData,
          errorInfo
        );
        // console.log(params);
        // logger.reportObject(params);
        reportHandller.report(logger, params);
      }
    },
    true
  );

  // 被Vue捕获的错误
  if (window.Vue) {
    logger.initVueErrorHandler(window.Vue);
  }
  // 未处理的promise错误 rejectionhandled unhandledrejection
  window.addEventListener("unhandledrejection", event => {
    // 错误的详细信息在reason字段
    // demo:settimeout error
    console.log("未处理的promise错误", event);
    let message = event.reason.message;
    let stack = event.reason.stack;
    let type = "unhandledRejection";
    if (!message && !stack) {
      message = "caught promise error";
      stack = JSON.stringify(event.reason);
    }
    let errorInfo = {
      name: event.reason.stack.name ? event.reason.stack.name : message,
      message,
      stack,
      type,
      columnNumber: event.reason.columnNumber,
      fileName: event.reason.fileName,
      lineNumber: event.reason.lineNumber,
      emitTime: new Date()
    };
    let reason = event.reason;
    let metaData = {};
    // 未处理网络promiase异常
    if (message == "Network Error" || message == "网关超时") {
      type = "httpError";
      errorInfo.type = "httpError";
      if (reason.config) {
        let requestInfo = {
          method: reason.config.method,
          url: reason.config.url,
          headers: reason.config.headers
        };
        errorInfo.src = reason.config.url;
        metaData = Object.assign(metaData, requestInfo);
        let responseInfo = {};
        // 未验证 待验证
        if (reason.response) {
          errorInfo.status = reason.response.status;
          errorInfo.statusText = reason.response.statusText;
        }
      }
    }
    // 未处理promise里面的语法异常
    if (message != "Network Error" && message != "caught promise error" && message != "网关超时") {
      let stackStr = event.reason.stack.toString();
      let arr = stackStr.split(/[\n]/);
      let fileName, lineNumber, columnNumber;
      if (arr.length > 1 && arr[1].indexOf("at") != -1 && !errorInfo.fileName) {
        let str = arr[1];
        let tempArr = str.split("(");
        if (tempArr.length == 2) {
          str = tempArr[1];
          let tmpArr = str.split(":");
          if (tmpArr.length > 1) {
            lineNumber = tmpArr[tmpArr.length - 2];
            columnNumber = tmpArr[tmpArr.length - 1];
            fileName = str.replace(":" + lineNumber + ":" + columnNumber, "");
            columnNumber = columnNumber.replace(")", "");
            // console.log(lineNumber);
            // console.log(columnNumber);
            // console.log(fileName);
            errorInfo.lineNumber = lineNumber;
            errorInfo.columnNumber = columnNumber;
            errorInfo.fileName = fileName;
          }
        }
      }
    }
    // console.log(errorInfo);
    let baseInfo = utils.getBaseInfo();
    metaData = logger.getMetaData(metaData);
    let params = Object.assign({}, initParam, baseInfo, metaData, errorInfo);
    // console.log(params);
    // logger.reportObject(params);
    reportHandller.report(logger, params);
  });

  // 处理的promise错误
  window.addEventListener("rejectionhandled", event => {
    // 错误的详细信息在reason字段
    // demo:settimeout error
    console.log("rejectionhandled promise error", event);
    let title = event.reason.message;
    let stack = event.reason.stack;
  });
})();

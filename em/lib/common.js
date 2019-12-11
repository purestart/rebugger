/* eslint-disable spaced-comment */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
// 屏幕分辨率
var utils = {
  // 获取 系统 浏览器等相关信息
  getBaseInfo: function() {
    // 获取屏幕信息
    let screenInfo = this.getScreen();
    screenInfo = Object.assign({}, screenInfo, {
      colorDepth: this.getcolorDepth(),
      pixelDepth: this.getPixelDepth()
    });
    let languageInfo = Object.assign({}, { language: this.getLanguage() });
    let getSysInfo = this.getSysInfo();
    let agentInfo = {
      agent: this.getAgent(),
      url: this.getLocalUrl(),
      online: this.getNetStatus()
    };
    let ret = Object.assign(
      {},
      screenInfo,
      languageInfo,
      getSysInfo,
      agentInfo
    );
    return ret;
  },
  getScreen: function() {
    // var screen = {};
    let clientWidth = document.body.clientWidth;
    let clientHeight = document.body.clientHeight;
    let availWidth = window.screen.availWidth;
    let availHeight = window.screen.availHeight;
    let width = window.screen.width;
    let height = window.screen.height;
    var myScreen = {
      clientWidth,
      clientHeight,
      availWidth,
      availHeight,
      width,
      height
    };
    // myScreen.clientWidth = clientWidth;
    // myScreen.clientHeight = clientHeight;
    return myScreen;
  },
  // 函数可对字符串进行编码，防止中文乱码
  encodeURI: function(str) {
    // 进行URL编码
    return encodeURI(str);
  },
  // 颜色质量 色彩深度
  getcolorDepth: function() {
    var c = "";
    if (self.screen) {
      c = screen.colorDepth + "-bit";
    }
    return c;
  },
  // screen.pixelDepth 像素深度
  getPixelDepth: function() {
    var c = "";
    if (self.screen) {
      c = screen.pixelDepth + "-bit";
    }
    return c;
  },
  // 返回当前的浏览器语言
  getLanguage: function() {
    var l = "";
    var n = navigator;

    if (n.language) {
      l = n.language.toLowerCase();
    } else if (n.browserLanguage) {
      l = n.browserLanguage.toLowerCase();
    }

    return l;
  },
  // 获取浏览器设置语言首选项 真正应用的浏览器语言
  getFirstLanguage: function() {},
  // 返回浏览器类型IE,Firefox
  getAgent: function() {
    var a = "";
    var n = navigator;
    if (n.userAgent) {
      a = n.userAgent;
    }
    return a;
  },
  // 返回客户端时间
  getTime: function() {
    return new Date().getTime();
  },
  // 获取当前页面URL
  getLocalUrl: function() {
    return window.location.href;
  },
  // 获取上一次页面URL
  getLastUrl: function() {
    return document.referrer;
  },
  // 获取上一个路由信息
  getLastRoute: function() {},
  // 获取网络状态  true / false
  getNetStatus: function() {
    // var connection = navigator.connection ||
    //   navigator.mozConnection ||
    //   navigator.webkitConnection || { tyep: "unknown" };
    // console.log(connection);
    // var typeText = ["unknown", "ethernet", "wifi", "2g", "3g", "4g", "none"];
    // if (typeof connection.type == "number") {
    //   connection.typeText = typeText[connection.type];
    // } else {
    //   connection.typeText = connection.type;
    // }
    // if (typeof connection.bandwidth == "number") {
    //   if (connection.bandwidth > 10) {
    //     connection.type = "wifi";
    //   } else if (connection.bandwidth > 2) {
    //     connection.type = "3g";
    //   } else if (connection.bandwidth > 0) {
    //     connection.type = "2g";
    //   } else if (connection.bandwidth == 0) {
    //     connection.type = "none";
    //   } else {
    //     connection.type = "unknown";
    //   }
    // }
    // var html = "Type : " + connection.typeText;
    // html += "Bandwidth : " + connection.bandwidth;
    // var html += " isOnline : " + navigator.onLine;
    return navigator.onLine;
  },

  // 获取系统信息
  getSysInfo: function() {
    let sysInfo = {};
    let browser = this.getBrowser().browser || "未知浏览器"; //获取浏览器名
    let version = this.getBrowser().version || "未知浏览器版本号"; //获取浏览器版本
    let OS = this.getOS() + " " + this.getDigits() || "未知操作系统"; //系统版本号
    sysInfo.browser = browser;
    sysInfo.version = version;
    sysInfo.OS = OS;
    return sysInfo;
  },
  getOS: function() {
    //判断所处操作系统
    var sUserAgent = navigator.userAgent.toLowerCase();
    var isWin =
      navigator.platform == "Win32" ||
      navigator.platform == "Win64" ||
      navigator.platform == "wow64";
    var isMac =
      navigator.platform == "Mac68K" ||
      navigator.platform == "MacPPC" ||
      navigator.platform == "Macintosh" ||
      navigator.platform == "MacIntel";
    if (isMac) return "Mac";
    var isUnix = navigator.platform == "X11" && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = String(navigator.platform).indexOf("Linux") > -1;
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
    if (isLinux) {
      if (bIsAndroid) return "Android";
      else return "Linux";
    }
    if (isWin) {
      var isWin2K =
        sUserAgent.indexOf("Windows nt 5.0") > -1 ||
        sUserAgent.indexOf("Windows 2000") > -1;
      if (isWin2K) return "Win2000";
      var isWinXP =
        sUserAgent.indexOf("Windows nt 5.1") > -1 ||
        sUserAgent.indexOf("Windows XP") > -1;
      if (isWinXP) return "WinXP";
      var isWin2003 =
        sUserAgent.indexOf("Windows nt 5.2") > -1 ||
        sUserAgent.indexOf("Windows 2003") > -1;
      if (isWin2003) return "Win2003";
      var isWinVista =
        sUserAgent.indexOf("Windows nt 6.0") > -1 ||
        sUserAgent.indexOf("Windows Vista") > -1;
      if (isWinVista) return "WinVista";
      var isWin7 =
        sUserAgent.indexOf("Windows nt 6.1") > -1 ||
        sUserAgent.indexOf("Windows 7") > -1;
      if (isWin7) return "Win7";
      var isWin8 =
        sUserAgent.indexOf("windows nt 6.2") > -1 ||
        sUserAgent.indexOf("Windows 8") > -1;
      if (isWin8) return "Win8";
      var isWin10 =
        sUserAgent.indexOf("windows nt 10.0") > -1 ||
        sUserAgent.indexOf("Windows 10") > -1;
      if (isWin10) return "Win10";
    }
    return "其他";
  },
  getDigits: function() {
    //判断当前操作系统的版本号
    var sUserAgent = navigator.userAgent.toLowerCase();
    var is64 =
      sUserAgent.indexOf("win64") > -1 || sUserAgent.indexOf("wow64") > -1;
    if (is64) {
      return "64位";
    } else {
      return "32位";
    }
  },
  getBrowser: function() {
    // 获取浏览器名
    // eslint-disable-next-line no-useless-escape
    var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var rEdge = /(chrome)\/([\w.]+)/; // IE
    var rFirefox = /(firefox)\/([\w.]+)/; // 火狐
    var rOpera = /(opera).+version\/([\w.]+)/; // 旧Opera
    var rNewOpera = /(opr)\/(.+)/; // 新Opera 基于谷歌
    var rChrome = /(chrome)\/([\w.]+)/; // 谷歌
    var rUC = /(chrome)\/([\w.]+)/; // UC
    var rMaxthon = /(chrome)\/([\w.]+)/; // 遨游
    var r2345 = /(chrome)\/([\w.]+)/; // 2345
    var rQQ = /(chrome)\/([\w.]+)/; // QQ
    // var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
    var rSafari = /version\/([\w.]+).*(safari)/;
    var ua = navigator.userAgent.toLowerCase();
    var matchBS, matchBS2;
    // IE 低版
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
      matchBS2 = rTrident.exec(ua);
      if (matchBS2 != null) {
        switch (matchBS2[2]) {
          case "4.0":
            return {
              browser: "Microsoft IE",
              version: "IE: 8" //内核版本号
            };
            // break;
          case "5.0":
            return {
              browser: "Microsoft IE",
              version: "IE: 9"
            };
            // break;
          case "6.0":
            return {
              browser: "Microsoft IE",
              version: "IE: 10"
            };
            // break;
          case "7.0":
            return {
              browser: "Microsoft IE",
              version: "IE: 11"
            };
            // break;
          default:
            return {
              browser: "Microsoft IE",
              version: "Undefined"
            };
        }
      } else {
        return {
          browser: "Microsoft IE",
          version: "IE:" + matchBS[2] || "0"
        };
      }
    }

    //谷歌浏览器
    matchBS = rChrome.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      matchBS2 = rNewOpera.exec(ua);
      if (matchBS2 == null) {
        return {
          browser: "谷歌浏览器",
          version: "Chrome/" + matchBS[2] || "0"
        };
      } else {
        return {
          browser: "Opera",
          version: "opr/" + matchBS2[2] || "0"
        };
      }
    }

    //IE最新版
    matchBS = rEdge.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "Microsoft Edge",
        version: "Chrome/" + matchBS[2] || "0"
      };
    }
    //UC浏览器
    matchBS = rUC.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "UC",
        version: "Chrome/" + matchBS[2] || "0"
      };
    }
    //火狐浏览器
    matchBS = rFirefox.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "火狐",
        version: "Firefox/" + matchBS[2] || "0"
      };
    }
    //Oper浏览器
    matchBS = rOpera.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "Opera",
        version: "Chrome/" + matchBS[2] || "0"
      };
    }
    //遨游
    matchBS = rMaxthon.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "遨游",
        version: "Chrome/" + matchBS[2] || "0"
      };
    }
    //2345浏览器
    matchBS = r2345.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "2345",
        version: "Chrome/ " + matchBS[2] || "0"
      };
    }
    //QQ浏览器
    matchBS = rQQ.exec(ua);
    if (matchBS != null && !window.attachEvent) {
      return {
        browser: "QQ",
        version: "Chrome/" + matchBS[2] || "0"
      };
    }
    //Safari（苹果）浏览器
    matchBS = rSafari.exec(ua);
    if (
      matchBS != null &&
      !window.attachEvent &&
      !window.chrome &&
      !window.opera
    ) {
      return {
        browser: "Safari",
        version: "Safari/" + matchBS[1] || "0"
      };
    }
  }
};

export default utils;

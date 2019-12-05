var rebugger = {
  a:1,
  getHostName:()=> {
    return document.domain
  },

};
module.exports = rebugger;
// debuger
  (function() {
    console.log("init rebuger");
    console.log(rebugger.getHostName());
    window.addEventListener('error', event => {
      // 过滤js error 
      let target = event.target || event.srcElement;
      let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
      if (!isElementTarget){
        // js报错
        console.log("js报错",event);
        let title = event.message;
        let desp = event.error ? event.error.stack :'';

      }else{
        // 上报资源地址
        let url = target.src || target.href;
        console.log("资源加载异常",url);
        console.log(event);
        let targetEle = target.tagName;
        console.log(targetEle);
        
      }
    }, true);

    // 被Vue捕获的错误
    if(window.Vue){
      Vue.config.errorHandler = function (err, vm, info) {
        // handle error
        // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
        // 只在 2.2.0+ 可用
        console.log("Vue捕获的错误",err);
        let title = info;
        let desp = err.stack.toString()

      }
    }
    //未处理的promise错误 rejectionhandled unhandledrejection
    window.addEventListener('unhandledrejection', event => {
      // 错误的详细信息在reason字段
      // demo:settimeout error
      console.log("未处理的promise错误",event);
      let title = event.reason.message;
      let desp = event.reason.stack;
      console.log(title);
    });

    // 处理的promise错误
    window.addEventListener('rejectionhandled', event => {
      // 错误的详细信息在reason字段
      // demo:settimeout error
      console.log("已处理的promise错误",event);
      let title = event.reason.message;
      let desp = event.reason.stack;
    });

    console.log(sad);
    
  })();
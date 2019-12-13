/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
import utils from "./utils";

export default function ajax(options) {
  // 这个options时传入给ajax的配置参数
  return new Promise((resolve, reject) => {
    // 返回一个promise对象 resolve成功是的处理，reject失败时的处理
    if (!options.url) {
      // 需要请求的路径
      console.log("url empty");
      return;
    }
    let method = options.method || "GET"; // 请求方式如果没有就默认为get
    method = method.toUpperCase();
    let async = options.async || true; // ajax是否异步请求默认位true
    let xhr = false;
    try {
      xhr = new XMLHttpRequest();
    } catch (error) {
      try {
        // eslint-disable-next-line no-undef
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (error1) {
        try {
          // eslint-disable-next-line no-undef
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (error2) {
          xhr = false;
        }
      }
    }
    if (xhr) {
      if (method === "GET") {
        let params = options.params;
        let paramStr = "";
        if (params && utils.isObject(params)) {
          for (let key in params) {
            paramStr = paramStr + key + "=" + params[key] + "&";
          }
          options.url =
            options.url + "?" + paramStr + "timeStamp=" + new Date().getTime;
        } else {
          options.url = options.url + "?" + "timeStamp=" + new Date().getTime; // 防止缓存
        }
        xhr.open(method, options.url, async);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(null);
      } else if (method === "POST") {
        xhr.open(method, options.url, async);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(options.data));
      }
      // xhr.responseType = options.type || "";
      xhr.onreadystatechange = () => {
        // console.log(xhr);
        if (xhr.responseText && xhr.status == 200) {
          // 有数据说明相应成功
          resolve(xhr.responseText);
        }
      };
      xhr.onerror = err => {
        reject(err);
      };
    } else {
      reject(new Error("无法创建 XMLHttpRequest 对象！"));
    }
  }).catch(e => {
    // 可以用image 收集简单异常信息
    console.log("catch err", e);
  });
}

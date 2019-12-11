/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */

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
        xhr.open(method, options.url + "?" + Math.random(), async); // 防止缓存
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(null);
      } else if (method === "POST") {
        xhr.open(method, options.url, async);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(options.data);
      }
      // xhr.responseType = options.type || "";
      xhr.onreadystatechange = () => {
        if (xhr.responseText) {
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
  });
}

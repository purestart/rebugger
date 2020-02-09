/*
 * Description:api请求封装
 * Author:詹陈龙
 * Update:2017-05-10
 */
import axios from "axios";
import { url } from "../config/index";
import { Message } from "element-ui";
import store from "../store";
import router from "../router";
import utils from "../utils/uiUtils";

axios.interceptors.request.use(
  function(config) {
    // Vue.$vux.loading.show({text: '数据加载中'})
    // console.log("数据加载中");
    // config.headers['token'] = Cookies.get('token');
    config.headers["token"] = sessionStorage.getItem("token") || "";
    // config.headers["HEADER-USERINFO"] = localStorage.getItem("HEADER-USERINFO");
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      config.headers["Cache-Control"] = "no-cache";
      config.headers["Pragma"] = "no-cache";
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    if (response.status === 204) {
      return { status: 204 };
    }
    if (response.config.responseType === "blob") {
      if (response.data.type !== "application/octet-stream") {
        // 下载文件时登录过期的处理
        const reader = new FileReader();
        reader.readAsText(response.data);
        reader.onload = e => {
          const result = JSON.parse(e.target.result);
          if (result.status === 401) {
            return handler401(result.message);
          } else {
            Message({
              message: result.message || "请求错误",
              type: "error"
            });
          }
        };
        return {};
      }
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "";
      if (contentDisposition) {
        fileName = contentDisposition.replace(/.*filename=(.*)/, "$1");
      }
      fileName = decodeURI(fileName);
      if (navigator && navigator.msSaveBlob) {
        // ie下载
        navigator.msSaveBlob(response.data, fileName);
      } else {
        let url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }
      return { status: 200 };
    }
    if (response.data.status === 401) {
      // 401, token失效
      return handler401(response.data.message);
    }
    return response;
  },
  function(error) {
    console.log("网络异常");
    return Promise.reject(error);
  }
);

function handler401(msg) {
  utils.message("登录失败，将退出重登：" + msg, "error");
  // 清除登录信息
  // store.commit("clearUserInfo");
  router.push("/login");
  return { status: 204 };
}

export default function setAxios() {
  // 测试验证
  axios.defaults.baseURL = url;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return function fetch(
    url,
    method,
    allParams = {},
    config = {},
    headers = {}
  ) {
    return new Promise((resolve, reject) => {
      let params = {};
      let data = {};
      if (method === "get") {
        params = allParams;
      } else {
        data = allParams;
      }
      let responseType = "json";
      if (config.download) {
        responseType = "blob";
      }
      axios
        .request({ url, method, params, data, responseType, headers })
        .then(res => {
          if (config.download) {
            return resolve({});
          }
          if (res.status === 204) {
            return resolve({});
          }
          // console.log(res);
          if (res.data.code === 200 || res.data.code === 0) {
            // return reject(res.data);
            return resolve(res.data);
          } else {
            if (!config.hideError) {
              Message({
                message: res.data.message || "服务器异常",
                type: "error"
              });
            }
            return resolve({ status: 500, msg: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          if (!config.hideError) {
            Message({
              message:
                "请求失败！" +
                (err.response && err.response.data
                  ? err.response.data.message
                  : ""),
              type: "error"
            });
          }
          return resolve({ status: 406, msg: err });
        });
    });
  };
}

export const request = (url, method, data = {}, config) => {
  return setAxios()(url, method, data, config)
    .then(data => {
      // if (data.status === 406 || data.status === 500) {
      //   return { error: data };
      // } else {
      //   if (data && typeof data === "string" && data.indexOf("F:") === 0) {
      //     return { error: data };
      //   }
      //   return { data: data.data || data.result || data || {} };
      // }
      return data;
    })
    .catch(error => {
      console.log(error);
      Message({
        message: "服务器异常",
        type: "error"
      });
    });
};

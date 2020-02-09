// 配置文件
let domain = document.domain,
  protocol = window.location.protocol;

let config = {
  // 环境配置
  dev: {
    // 基础域名
    baseUrl: "http://localhost:9090"
  },
  test: {
    baseUrl: protocol + "//apirebuggertest.xxxxxx.com"
  },
  prod: {
    baseUrl: protocol + "//apirebugger.xxxxxx.com"
  }
};

export default config;

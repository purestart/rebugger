import { request } from "../../api/set-axios";

export default {
  // 登录
  login: params => request("/api/auth/login", "post", params)
};

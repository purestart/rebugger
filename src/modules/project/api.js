import { request } from "../../api/set-axios";

export default {
  // 登录
  fetchProjectList: params => request("/api/project/list", "post", params),
  fetchProjectById: params => request("/api/project/info", "post", params)
};

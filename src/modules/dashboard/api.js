import { request } from "../../api/set-axios";

export default {
  // 登录
  fetchDashboardStatInfo: params => request("/api/dashboard/statInfo", "post", params)
};

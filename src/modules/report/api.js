import { request } from "../../api/set-axios";

export default {
  // 登录
  fetchReportList: params => request("/api/report/list", "post", params),
  fetchReportById: params => request("/api/report/info", "post", params),
  updateReport: params => request("/api/report/update", "post", params),
  deleteReport: params => request("/api/report/delete", "post", params)
};

import { request } from "../../api/set-axios";

export default {
  fetchUserList: params => request("/api/user/list", "post", params),
  fetchUserById: params => request("/api/user/info", "post", params),
  createOrUpdateUser: params => request("/api/user/createOrUpdate", "post", params),
  deleteUser: params => request("/api/user/delete", "post", params),
  updatePassword: params => request("/api/user/updatePassword", "post", params)
};

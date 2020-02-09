import RoleService from "../service/roleService";
import BaseController from "../../../base/controller/baseController";
import { Context } from "koa";
class RoleController extends BaseController {
  constructor(entityService, prefix, option?: any) {
    super(entityService, prefix, option);
  }

  /**
   * getCustomRouter
   * 自定义扩展路由
   */
  public getCustomRouter() {
    return [
      // 自定义扩展
      // {
      //   url: this.profix + "/info",
      //   method: "post",
      //   function: async (ctx: Context) => {}
      // }
    ];
  }
}

let roleController = new RoleController(RoleService, "/api/role", {
  infoCacheable: false,
  findCacheable: false
});
let roleRouter = roleController
  .getBaseRouter()
  .concat(roleController.getCustomRouter());

export default roleRouter;

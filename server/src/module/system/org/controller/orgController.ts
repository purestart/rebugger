import OrgService from "../service/orgService";
import BaseController from "../../../base/controller/baseController";
import { Context } from "koa";
class OrgController extends BaseController {
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

let orgController = new OrgController(OrgService, "/api/org", {
  infoCacheable: false,
  findCacheable: false
});
let orgRouter = orgController
  .getBaseRouter()
  .concat(orgController.getCustomRouter());

export default orgRouter;

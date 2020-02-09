import IpAuthService from "../service/ipAuthService";
import BaseController from "../../base/controller/baseController";
import { Context } from "koa";

class IpAuthController extends BaseController {
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

let ipAuthController = new IpAuthController(IpAuthService, "/ipAuth", {
  infoCacheable: true,
  findCacheable: false
});
let projectRouter = ipAuthController
  .getBaseRouter()
  .concat(ipAuthController.getCustomRouter());

export default projectRouter;

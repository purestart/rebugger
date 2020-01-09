import ConfigService from "../service/configService";
import BaseController from "../../../base/controller/baseController";
import { Context } from "koa";
class ConfigController extends BaseController {
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

let configController = new ConfigController(ConfigService, "/api/config", {
  infoCacheable: false,
  findCacheable: false
});
let configRouter = configController
  .getBaseRouter()
  .concat(configController.getCustomRouter());

export default configRouter;

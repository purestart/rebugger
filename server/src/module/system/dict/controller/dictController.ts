import DictService from "../service/dictService";
import BaseController from "../../../base/controller/baseController";
import { Context } from "koa";
class DictController extends BaseController {
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

let dictController = new DictController(DictService, "/api/dict", {
  infoCacheable: false,
  findCacheable: false
});
let dictRouter = dictController
  .getBaseRouter()
  .concat(dictController.getCustomRouter());

export default dictRouter;

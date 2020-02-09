import MenuService from "../service/menuService";
import BaseController from "../../../base/controller/baseController";
import { Context } from "koa";
class MenuController extends BaseController {
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

let menuController = new MenuController(MenuService, "/api/menu", {
  infoCacheable: false,
  findCacheable: false
});
let menuRouter = menuController
  .getBaseRouter()
  .concat(menuController.getCustomRouter());

export default menuRouter;

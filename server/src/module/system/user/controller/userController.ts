import UserService from "../service/userService";
import BaseController from "../../../base/controller/baseController";
import { Context } from "koa";
class UserController extends BaseController {
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
      {
        url: this.profix + "/updatePassword",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.updatePassword(obj);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: ret
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              message: "修改失败，请稍后再试"
            };
          }
        }
      }
    ];
  }
}

let userController = new UserController(UserService, "/api/user", {
  infoCacheable: false,
  findCacheable: false
});
let userRouter = userController
  .getBaseRouter()
  .concat(userController.getCustomRouter());

export default userRouter;

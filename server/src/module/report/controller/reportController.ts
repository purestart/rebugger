import ReportService from "../service/reportService";
import BaseController from "../../base/controller/baseController";
import { Context } from "koa";

class ReportController extends BaseController {
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
        url: this.profix + "/resolveStatus",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.resolveStatus(obj);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: ret
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "保存失败，请稍后再试"
            };
          }
        }
      }
    ];
  }
}

let projectController = new ReportController(ReportService, "/api/report", {
  infoCacheable: true
});
let projectRouter = projectController
  .getBaseRouter()
  .concat(projectController.getCustomRouter());

export default projectRouter;

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
      },
      {
        url: this.profix + "/createList",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.createList(obj);
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
      },
      {
        url: this.profix + "/resolveList",
        method: "post",
        function: async (ctx: Context) => {
          let { pageNum = 1, pageSize = 10, ...where } = ctx.request.body;
          // console.log(ctx.request.body);
          
          //获取搜索参数
          where = where || {};
          // 去空字符串和 null 以及undefined
          let obj = {};
          for(let key in where){
            if(where[key] && where[key] !==''){
              obj[key]=where[key];
            }
          }
          where = obj;
          const ret = await this.entityService.resolveList(pageNum, pageSize, where);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: ret
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "查询失败"
            };
          }
        }
      }
    ];
  }
}

let projectController = new ReportController(ReportService, "/api/report", {
  infoCacheable: false
});
let projectRouter = projectController
  .getBaseRouter()
  .concat(projectController.getCustomRouter());

export default projectRouter;

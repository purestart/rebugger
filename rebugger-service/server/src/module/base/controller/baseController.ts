/**
 * 基础controller
 */

import { Context } from "koa";
import sysConfig from "../../../../config/default";

export default class BaseController {
  protected entityService;
  public profix: string;
  public infoCacheable = false;
  public findCacheable = false;
  public options: any = {
    exprires: sysConfig.redis.exprires,
    infoCacheable: false,
    findCacheable: false
  };
  constructor(entityService, profix, options?: any) {
    this.entityService = entityService;
    this.profix = profix;
    if (options && options.infoCacheable) {
      this.infoCacheable = options.infoCacheable;
    }
    if (options && options.findCacheable) {
      this.findCacheable = options.findCacheable;
    }
    if (options) {
      this.options = Object.assign({}, this.options, options);
    }
  }

  /**
   * getBaseRouter
   */
  public getBaseRouter() {
    return [
      {
        url: this.profix + "/info",
        method: "post",
        function: async (ctx: Context) => {
          // const id = ctx.request.query.id;
          // const id=ctx.params.id;
          const id = ctx.request.body.id;
          const ret = await this.entityService.info(id, this.infoCacheable);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: ret
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "查询失败，查询不到该数据"
            };
          }
        }
      },
      {
        url: this.profix + "/find",
        method: "post",
        function: async (ctx: Context) => {
          let where = ctx.request.body;
          const ret = await this.entityService.find(where, this.findCacheable);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: {
                list: ret
              }
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "查询失败，请稍后再试"
            };
          }
        }
      },
      {
        url: this.profix + "/delete",
        method: "post",
        function: async (ctx: Context) => {
          //const id=ctx.request.query.id;
          //const id=ctx.params.id;
          let ids = ctx.request.body.ids;
          if (ids && ids.length > 0) {
            try {
              let ret = null;
              await new Promise((resolve, reject) => {
                ids.forEach(async (id: string, idx: any) => {
                  ret = await this.entityService.delete(id);
                  if (idx == ids.length - 1) {
                    resolve();
                  }
                });
              });

              if (ret) {
                ctx.response.body = {
                  code: 200,
                  data: ret
                };
              } else {
                ctx.response.body = {
                  code: 503,
                  data: null
                };
              }
            } catch (error) {
              ctx.response.body = {
                code: 503,
                data: null,
                errMsg: "no this data"
              };
            }
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "删除失败，请传入要删除的id"
            };
          }
        }
      },
      {
        url: this.profix + "/create",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.create(obj);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: ret
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "创建失败，请稍后再试"
            };
          }
        }
      },
      {
        url: this.profix + "/list",
        method: "post",
        function: async (ctx: Context) => {
          // const pageSize = ctx.request.query.pageSize
          //   ? parseInt(ctx.request.query.pageSize)
          //   : 10;
          // const pageNum = ctx.request.query.pageNum
          //   ? parseInt(ctx.request.query.pageNum)
          //   : 1;

          // const name = ctx.request.query.name;
          let { pageNum = 1, pageSize = 10, ...where } = ctx.request.body;
          console.log(ctx.request.body);
          
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
          const ret = await this.entityService.list(pageNum, pageSize, where);
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
      },
      {
        url: this.profix + "/update",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.update(obj);
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
        url: this.profix + "/createOrUpdate",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.createOrUpdate(obj);
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
        url: this.profix + "/updateExist",
        method: "post",
        function: async (ctx: Context) => {
          let obj = ctx.request.body;
          const ret = await this.entityService.updateExist(obj);
          if (ret) {
            ctx.response.body = {
              code: 200,
              data: ret
            };
          } else {
            ctx.response.body = {
              code: 503,
              data: null,
              errMsg: "更新失败，请稍后再试"
            };
          }
        }
      }
    ];
  }
}

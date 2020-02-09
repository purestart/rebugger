import userService from '../service/userService';
import { Context } from 'koa';

export default [
  {
    url: "/api/user/info",
    method: "get",
    function: async (ctx: Context) => {
      const id = ctx.request.query.id;
      // const id=ctx.params.id;
      const ret = await userService.info(id);
      if (ret) {
        ctx.response.body = {
          code: 200,
          data: ret
        };
      } else {
        ctx.response.body = {
          code: 503,
          data: null,
          errMsg: "查询错误"
        };
      }
    }
  },
  {
    url: "/api/user/delete",
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
              ret = await userService.delete(id);
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
          errMsg: "请传入要删除的id"
        };
      }
    }
  },
  {
    url: "/api/user/create",
    method: "post",
    function: async (ctx: Context) => {
      let obj = ctx.request.body;
      const ret = await userService.create(obj);
      if (ret) {
        ctx.response.body = {
          code: 200,
          data: ret
        };
      } else {
        ctx.response.body = {
          code: 503,
          data: null,
          errMsg: "创建失败"
        };
      }
    }
  },
  {
    url: "/api/user/list",
    method: "post",
    function: async (ctx: Context) => {
      const pageSize = ctx.request.query.pageSize
        ? parseInt(ctx.request.query.pageSize)
        : 10;
      const pageNum = ctx.request.query.pageNum
        ? parseInt(ctx.request.query.pageNum)
        : 1;

      const name = ctx.request.query.name;
      //获取搜索参数
      let searchParams;
      if (name && name.length > 0) {
        searchParams.name = name;
      }else{
        searchParams={};
      }
      const ret = await userService.list(pageSize, pageNum, searchParams);
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
    }
  },
  {
    url: "/api/user/update",
    method: "post",
    function: async (ctx: Context) => {
      let obj = ctx.request.body;

      const ret = await userService.update(obj);
      if (ret) {
        ctx.response.body = {
          code: 200,
          data: ret
        };
      } else {
        ctx.response.body = {
          code: 503,
          data: null,
          errMsg: "更新失败"
        };
      }
    }
  }
];

const userService = require("../service/userService");
// const config=require("../../config/generator-config");

module.exports = [
  {
    url: "/user/info",
    method: "get",
    function: async (ctx: any) => {
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
    url: "/user/delete",
    method: "post",
    function: async (ctx: any) => {
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
    url: "/user/create",
    method: "post",
    function: async (ctx: any) => {
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
    url: "/user/list",
    method: "get",
    function: async (ctx: any) => {
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
    url: "/user/update",
    method: "post",
    function: async (ctx: any) => {
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

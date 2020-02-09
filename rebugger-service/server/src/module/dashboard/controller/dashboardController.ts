import dashboardService from '../service/dashboardService';
import { Context } from 'koa';

export default [
  {
    url: "/api/dashboard/statInfo",
    method: "post",
    function: async (ctx: Context) => {
      let params:any = ctx.request.body;
      let ret = await dashboardService.stat(params);
      if(ret){
        ctx.body={
          code:200,
          data:ret
        };
      }else{
        ctx.response.body = {
          code: 503,
          data: null,
          message: "服务器异常，请稍后再试"
        };
      }
    }
  }
]
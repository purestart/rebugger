import authService from '../service/authService';
import { Context } from 'koa';

export default [
  {
    url: "/api/auth/login",
    method: "post",
    function: async (ctx: Context) => {
      let params:any = ctx.request.body;
      let ret = await authService.login(params)
      ctx.body=ret; 
    }
  }
]
import { Context } from 'koa';
// import * as compose from 'koa-compose';
let compose = require("koa-compose");

const handler = async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (error) {
    // ctx.log.error(error);
    console.log("异常捕获", error);

    if (error.isBoom) {
      ctx.body = {
        code:503,
        data:null,
        errMsg:error.output.payload
      };
      // ctx.status = error.output.statusCode;
      ctx.status = 200;

      return;
    } else {
      // General Exception
      let errMsg =error.message +": "+ (error.parent ? error.parent.message:'');

      ctx.body = {
        code:503,
        data:null,
        errMsg:errMsg
      };
      // ctx.status = error.statusCode || 500;
      ctx.status = 200;
      return;
    }
  }
};

export default () => compose([
  handler,
]);
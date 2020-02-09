import { Context } from 'koa';
// import * as compose from 'koa-compose';
let compose = require("koa-compose");
import logger from './logger';
// var process = require('child_process');

const handler = async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (error) {
    // ctx.log.error(error);
    // console.log(process.env.NODE_ENV);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log("异常捕获", error);
    }
    
    // let errMsg = "";
    // console.log(ctx.request.body);
    let errorObj ={
      message:"",
      url:ctx.request.url,
      method:ctx.request.method,
      body:JSON.stringify(ctx.request.body),
      query:JSON.stringify(ctx.request.query),
      stack:""
    }
    if (error.isBoom) {
      errorObj.message = error.output.payload;
      ctx.body = {
        code:503,
        data:error.stack,
        message:error.output.payload
      };
      // ctx.status = error.output.statusCode;
      ctx.status = 200;

    } else {
      // General Exception
      let errMsg =error.message +": "+ (error.parent ? error.parent.message:'');
      errorObj.message = errMsg;
      ctx.body = {
        code:503,
        data:error.stack,
        message:errMsg
      };
      // ctx.status = error.statusCode || 500;
      ctx.status = 200;

    }
    logger.logger.log("error", errorObj);
    return;
  }
};

export default () => compose([
  handler,
]);
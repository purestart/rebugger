const bluebird = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = bluebird.promisify(jwt.verify);
import config from "../../config/default";

async function check(ctx, next) {
  let url = ctx.request.url;
  // 登录 和上报 不用检查
  if (url == "/auth/login" || url.indexOf("/report/") != -1) await next();
  else {
    // 规定token写在header 的 'autohrization'
    let token = ctx.request.headers["authorization"];
    console.log(token);
    if(!token){
      //没有token
      ctx.body = {
        status: 401,
        message: "没有token"
      };
    }else{
      // 解码
      let payload = await verify(token, config.secret);
      let { time, timeout } = payload;
      console.log(payload);
      let data = new Date().getTime();
      if (data - time <= timeout) {
        // 未过期
        await next();
      } else {
        //过期
        ctx.body = {
          status: 401,
          message: "token 已过期"
        };
      }
    }
    
  }
}

export default check;

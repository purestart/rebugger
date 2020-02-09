const bluebird = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = bluebird.promisify(jwt.verify);
import config from "../../config/default";

async function check(ctx, next) {
  let url = ctx.request.url;
  // 登录 和上报 不用检查 url.indexOf("/report/") != -1
  if (url == "/api/auth/login" || url == "/api/report/create" || url == "/api/report/createList") await next();
  else {
    // 规定token写在header 的 'autohrization'
    let token = ctx.request.headers["token"];
    // console.log(token);
    if (!token) {
      //没有token
      ctx.body = {
        code: 401,
        status: 401,
        message: "没有token"
      };
    } else {
      try {
        // 解码
        let payload = await verify(token, config.secret);
        let { time, timeout } = payload;
        // console.log(payload);
        let data = new Date().getTime();
        if (data - time <= timeout) {
          // 未过期
          await next();
        } else {
          //过期
          ctx.body = {
            code: 401,
            status: 401,
            message: "token 已过期"
          };
        }
      } catch (error) {
        console.log(error);
        //过期
        ctx.body = {
          code: 401,
          status: 401,
          message: "无效的token"
        };
      }
    }
  }
}

export default check;

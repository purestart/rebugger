const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const koaStatic = require("koa-static");
const path = require("path");
const Router = require("koa-router");
const router = new Router();
const Kcors = require("kcors");
// const koaLogger = require('koa-logger-winston');
// import logger from './src/middleware/logger';

import sample from './src/router/sample';
import myRouter from './src/router/index';
import errorMiddleware from './src/middleware/error';
import checkMiddleware from './src/middleware/check';

// 验证是否有token
//POST解析
app.use(bodyParser());
// 跨域设置
const corsOptions = {
  origin: "",
  credentials: true,
  maxAge: 3600
};
app.use(Kcors(corsOptions));

app.use(checkMiddleware);
app.use(errorMiddleware());
// console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'development'){
  app.use(koaStatic(path.resolve(__dirname, "./public")));
}else{
  app.use(koaStatic(path.resolve(__dirname, "../public")));
}
// 路由配置
router.get("/", sample);
for(var i in myRouter) {
  myRouter[i].forEach((item)=>{
      if(item.method=='get'){
          router.get(item.url, item.function);
      }else if(item.method=='post'){
          router.post(item.url, item.function);
      }
  })
}

//正常请求的日志
// app.use(koaLogger(logger.success));

app
  .use(router.routes()) //把路由都引入进来
  .use(router.allowedMethods());

// 收集错误日志
// app.use(koaLogger(logger.error));

console.log("listen 9090");
app.listen(9090);

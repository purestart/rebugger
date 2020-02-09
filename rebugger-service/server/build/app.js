"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var app = new Koa();
var koaStatic = require("koa-static");
var path = require("path");
var Router = require("koa-router");
var router = new Router();
var Kcors = require("kcors");
// const koaLogger = require('koa-logger-winston');
// import logger from './src/middleware/logger';
var sample_1 = __importDefault(require("./src/router/sample"));
var index_1 = __importDefault(require("./src/router/index"));
var error_1 = __importDefault(require("./src/middleware/error"));
var check_1 = __importDefault(require("./src/middleware/check"));
// 验证是否有token
//POST解析
app.use(bodyParser());
// 跨域设置
var corsOptions = {
    origin: "",
    credentials: true,
    maxAge: 3600
};
app.use(Kcors(corsOptions));
app.use(check_1.default);
app.use(error_1.default());
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(koaStatic(path.resolve(__dirname, "./public")));
}
else {
    app.use(koaStatic(path.resolve(__dirname, "../public")));
}
// 路由配置
router.get("/", sample_1.default);
for (var i in index_1.default) {
    index_1.default[i].forEach(function (item) {
        if (item.method == 'get') {
            router.get(item.url, item.function);
        }
        else if (item.method == 'post') {
            router.post(item.url, item.function);
        }
    });
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

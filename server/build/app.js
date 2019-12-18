"use strict";
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var app = new Koa();
var koaStatic = require("koa-static");
var path = require("path");
var Router = require("koa-router");
var router = new Router();
var Kcors = require("kcors");
var sample = require("./src/router/sample");
var myRouter = require('./src/router/index');
//POST解析
app.use(bodyParser());
// 跨域设置
var corsOptions = {
    origin: "",
    credentials: true,
    maxAge: 3600
};
app.use(Kcors(corsOptions));
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(koaStatic(path.resolve(__dirname, "./public")));
}
else {
    app.use(koaStatic(path.resolve(__dirname, "../public")));
}
// 路由配置
router.get("/", sample);
for (var i in myRouter) {
    myRouter[i].forEach(function (item) {
        if (item.method == 'get') {
            router.get(item.url, item.function);
        }
        else if (item.method == 'post') {
            router.post(item.url, item.function);
        }
    });
}
app
    .use(router.routes()) //把路由都引入进来
    .use(router.allowedMethods());
console.log("listen 9090");
app.listen(9090);

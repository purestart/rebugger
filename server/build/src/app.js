"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var createError = require('http-errors');
var path = require('path');
var app = express();
app.use('/public', express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, 'public')))
// 声明一个处理get请求的服务
app.get("/", function (req, res) {
    res.send("Hello Express");
});
app.get("/products", function (req, res) {
    res.send("接收到商品查询请求pm2 restart");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var server = app.listen(9090, "localhost", function () {
    console.log("服务器已启动, 地址是：http://localhost:9090");
});

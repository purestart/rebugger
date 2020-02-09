"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
// const config = require("../../config/default");
var default_1 = __importDefault(require("../../config/default"));
// console.log(process.env.NODE_ENV);
var localConfig = default_1.default;
if (process.env.NODE_ENV == "test") {
    localConfig = default_1.default.test;
}
else if (process.env.NODE_ENV == "prod") {
    localConfig = default_1.default.prod;
}
// console.log(localConfig);
// const mysql = new Sequelize(config.mysql.default, {
//   define: {
//     timestamps: false,
//   },
//   operatorsAliases: false
// });
var sequelized = new Sequelize(localConfig.database.DATABASE, localConfig.database.USER, localConfig.database.PASSWORD, {
    host: localConfig.database.HOST,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    // 添加这个配置 格式化日期
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    'define': {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        'underscored': true
    },
    // 时区东八区
    timezone: '+08:00'
});
exports.default = sequelized;

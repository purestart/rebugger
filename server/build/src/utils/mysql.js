"use strict";
var Sequelize = require("sequelize");
var config = require("../config/default");
// const mysql = new Sequelize(config.mysql.default, {
//   define: {
//     timestamps: false,
//   },
//   operatorsAliases: false
// });
var sequelize = new Sequelize(config.database.DATABASE, config.database.USER, config.database.PASSWORD, {
    host: config.database.HOST,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
module.exports = sequelize;

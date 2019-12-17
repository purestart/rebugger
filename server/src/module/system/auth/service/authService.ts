// const mysql = require("../../../../utils/mysql");
// const sequelize = require("sequelize");
var UserDao = require("../../user/schema/user")(require("../../../../utils/mysql"), require("sequelize")); // 引入user的表结构
var uuid = require("node-uuid");
class authService {
  constructor(parameters) {
  }
  /**
   * login
   */
  public login() {
    
  }
}
import mysql from '../../../../utils/mysql';
import sequelize from 'sequelize';
import userSchema from "../../user/schema/userSchema";
const UserDao = userSchema(mysql, sequelize); // 引入user的表结构
const jwt = require('jsonwebtoken');
import config from '../../../../../config/default';
import md5 from 'js-md5';

class authService {
  constructor() {
  }
  /**
   * login 46f94c8de14fb36680850768ff1b7f2a
   */
  public async login(params : any) {
    if(params.password){
      params.password = md5(params.password);
    }

    if(params.userName && params.password){
      let ret = await this.loginByLoginName(params.userName, params.password);
      if(ret){
        ret.password = "";
      // 帐号密码正确  创建token   
      //payload中写入一些值  time:创建日期  timeout：多长时间后过期
      let payload = {userId:ret.id,time:new Date().getTime(),timeout:1000*60*60*2}
      let token = jwt.sign(payload, config.secret);
        return {
          code: 200,
          data: ret,
          token
        }
      }else{
        return {
          code: 503,
          data: null,
          message: "登录失败,账号或密码错误！"
        }
      }
    }else{
      return {
        code: 503,
        data: null,
        message: "登录失败,账号或密码错误！"
      }
    }
  }

  /**
   * name
   */
  public async loginByLoginName(loginName: string, password: string) {
    return await UserDao.findOne({
      where: {
        loginName,
        password
      }
    });
  }

  /**
   * loginByEmail
   */
  public async loginByEmail(email: string, password: string) {
    return await UserDao.findOne({
      where: {
        email,
        password
      }
    });
  }

}
const authServiceImpl = new authService();
export default authServiceImpl;
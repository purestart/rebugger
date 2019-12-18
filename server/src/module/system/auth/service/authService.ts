import mysql from '../../../../utils/mysql';
import sequelize from 'sequelize';
import userSchema from "../../user/schema/user";
const UserDao = userSchema(mysql, sequelize); // 引入user的表结构

class authService {
  constructor() {
  }
  /**
   * login
   */
  public async login(params : any) {
    if(params.userName && params.password){
      let ret = await this.loginByLoginName(params.userName, params.password);
      if(ret){
        ret.password = "";
        return {
          code: 200,
          data: ret
        }
      }else{
        return {
          code: 503,
          data: null,
          errMsg: "登录失败"
        }
      }
    }else{
      return {
        code: 503,
        data: null,
        errMsg: "登录失败,账号或密码错误！"
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
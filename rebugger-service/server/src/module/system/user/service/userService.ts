import BaseService from "../../../base/service/baseService";
import mysql from "../../../../utils/mysql";
import sequelize from "sequelize";
import userSchema from "../schema/userSchema";
import userRoleSchema from '..//schema/userRoleSchema';
const uuid = require("node-uuid");
import md5 from 'js-md5';

const UserDao = userSchema(mysql, sequelize);
// 用于更新角色 批量保存角色 菜单关联表
const UserRoleDao = userRoleSchema(mysql, sequelize);

// 重新生成表
// UserDao.sync({ alter: true, force: true });
// UserRoleDao.sync({ alter: true, force: true });

class UserService extends BaseService {
  constructor() {
    super(UserDao);
  }
  /**
   * 分页查询
   */
  public async list(pageNum = 1, pageSize = 10, where) {
    let total = 0;
    total = await this.entityDao.count({ where }, { logging: true });
    if (total < 1) {
      return {
        pageSize,
        pageNum,
        list:[],
        total:0
      };
    }
    let offset = 0;
    if (pageNum > 1) {
      offset = (pageNum - 1) * pageSize;
    }
    // console.log(offset);
    let list = await this.entityDao.findAll({
      where,
      order: [["updateDate", "DESC"]],
      offset: offset,
      limit: pageSize
    });
    if(list && list.length>0){
      list.forEach(item=>{
        item.password = "";
      })
    }
    let result = {
      pageSize,
      pageNum,
      list,
      total
    };
    return result;
  }

  /**
   * update
   */
  public async update(model: any, ignoreFields: Array<string> = []) {
    let defaultIgnore: Array<string> = ["createDate","password"]; // 默认不更新字段
    ignoreFields = ignoreFields.concat(defaultIgnore);
    ignoreFields = Array.from(new Set(ignoreFields));

    let o = await this.entityDao.findOne({
      where: {
        id: model.id
      }
    });
    o.updateDate = Date.now();
    // 字段过滤
    for (let key in model) {
      if (!ignoreFields.includes(key)) {
        o[key] = model[key];
      }
    }
    return await o.save();
  }

  /**
   * updatePassword
   */
  public async updatePassword(model: any) {
    if(model.password && model.newPassword){
      model.password = md5(model.password);
      model.newPassword = md5(model.newPassword);
    }else{
      return null;
    }
    let o = await this.entityDao.findOne({
      where: {
        id: model.id,
        password: model.password
      }
    });
    
    if(!o) {
      return null;
    }
    o.updateDate = Date.now();
    o.password = model.newPassword;
    return await o.save();
  }


  /**
   * 保存 新增 修改
   */
  public async create(model: any) {
    if(model.password){
      model.password = md5(model.password);
    }
    return await this.entityDao.create({
      id: uuid.v1(),
      createDate: new Date(),
      updateDate: new Date(),
      ...model
    });
  }


}
const userService = new UserService();
export default userService;

import BaseService from "../../../base/service/baseService";
import mysql from "../../../../utils/mysql";
import sequelize from "sequelize";
import roleSchema from "../schema/roleSchema";
import roleMenuSchema from '..//schema/roleMenuSchema';

const RoleDao = roleSchema(mysql, sequelize);
// 用于更新角色 批量保存角色 菜单关联表
const RoleMenuDao = roleMenuSchema(mysql, sequelize);

// 重新生成表
// RoleDao.sync({ alter: true, force: true });
// RoleMenuDao.sync({ alter: true, force: true });

class RoleService extends BaseService {
  constructor() {
    super(RoleDao);
  }
}
const roleService = new RoleService();
export default roleService;

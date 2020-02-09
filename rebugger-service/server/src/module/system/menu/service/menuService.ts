import BaseService from "../../../base/service/baseService";
import mysql from "../../../../utils/mysql";
import sequelize from "sequelize";
import menuSchema from "../schema/menuSchema";


const MenuDao = menuSchema(mysql, sequelize);

// 重新生成表

// MenuDao.sync({ alter: true, force: true });

class MenuService extends BaseService {
  constructor() {
    super(MenuDao);
  }
}
const menuService = new MenuService();
export default menuService;

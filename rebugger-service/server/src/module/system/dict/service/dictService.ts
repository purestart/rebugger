import BaseService from "../../../base/service/baseService";
import mysql from "../../../../utils/mysql";
import sequelize from "sequelize";
import dictSchema from "../schema/dictSchema";

const dictDao = dictSchema(mysql, sequelize);

// 重新生成表
// dictDao.sync({ alter: true, force: true });

class DictService extends BaseService {
  constructor() {
    super(dictDao);
  }
}
const dictService = new DictService();
export default dictService;

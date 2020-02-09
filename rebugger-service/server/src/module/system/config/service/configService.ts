import BaseService from "../../../base/service/baseService";
import mysql from "../../../../utils/mysql";
import sequelize from "sequelize";
import configSchema from "../schema/configSchema";

const configDao = configSchema(mysql, sequelize);

// 重新生成表
// configDao.sync({ alter: true, force: true });

class ConfigService extends BaseService {
  constructor() {
    super(configDao);
  }
}
const configService = new ConfigService();
export default configService;

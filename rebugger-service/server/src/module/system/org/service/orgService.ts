import BaseService from "../../../base/service/baseService";
import mysql from "../../../../utils/mysql";
import sequelize from "sequelize";
import orgSchema from "../schema/orgSchema";

const OrgDao = orgSchema(mysql, sequelize);

// 重新生成表
// OrgDao.sync({ alter: true, force: true });

class OrgService extends BaseService {
  constructor() {
    super(OrgDao);
  }
}
const orgService = new OrgService();
export default orgService;

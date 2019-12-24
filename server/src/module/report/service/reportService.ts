import BaseService from "../../base/service/baseService";
import projectService from "../../project/service/projectService";
import mysql from "../../../utils/mysql";
import sequelize from "sequelize";
import reportSchema from "../schema/reportSchema";
const ReportDao = reportSchema(mysql, sequelize);
const uuid = require("node-uuid");

// 重新生成表
ReportDao.sync({ alter: true, force: true });

class ReportService extends BaseService {
  constructor() {
    super(ReportDao);
  }
  /**
   * 重写 保存 新增
   * override
   */
  public async create(model: any) {
    let apikey = model.apikey;
    if (apikey && apikey.length > 0) {
      let project = await projectService.find({ apikey });
      if(project && project.length == 1){
        model.code = project[0].code;
      }else{
        return {
          code: 503,
          data: null,
          errMsg: "report error, no this project"
        };
      }
    } else {
      return {
        code: 503,
        data: null,
        errMsg: "report error, no this project"
      };
    }
    return await this.entityDao.create({
      id: uuid.v1(),
      createDate: new Date(),
      updateDate: new Date(),
      ...model
    });
  }
}
const repoetService = new ReportService();
export default repoetService;

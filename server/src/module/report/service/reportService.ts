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
      let project = await projectService.find({ apikey }, true);
      if (project && project.length == 1) {
        let currentProject = project[0];
        // 取自定义字段
        if (model.metaData && model.metaData.length > 5) {
          let metaObj = JSON.parse(model.metaData);

          if (currentProject.retainNameConfig && currentProject.retainNameConfig.length > 0) {
            console.log(currentProject.retainNameConfig);
            let retainNameConfig = JSON.parse(currentProject.retainNameConfig);
            console.log(retainNameConfig);
            model.retainName = metaObj[retainNameConfig.meta];
          }
          if (currentProject.retainIdConfig && currentProject.retainIdConfig.length > 0) {
            let retainIdConfig = JSON.parse(currentProject.retainIdConfig);
            model.retainId = metaObj[retainIdConfig.meta];
          }
          if (
            currentProject.retainFieldConfig &&
            currentProject.retainFieldConfig.length > 0
          ) {
            let retainFieldConfig = JSON.parse(currentProject.retainFieldConfig);
            model.retainField = metaObj[retainFieldConfig.meta];
          }
        }
        // 取子模块
        if (currentProject.moduleConfig && currentProject.moduleConfig.length > 0) {
          let moduleConfig = JSON.parse(currentProject.moduleConfig);
          let module = moduleConfig.find(
            item => model.url.indexOf(item.prefix) != -1
          );
          if (module) {
            model.moduleName = module.moduleName;
          }
        }
      }
      if (project && project.length == 1) {
        model.code = project[0].code;
        model.projectName = project[0].name;
      } else {
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

  /**
   * 重写 查询list
   */
  public async list(pageNum = 1, pageSize = 10, where) {
    let project = null;
    if (where.code && where.code.length > 0) {
      // 获取项目信息
      let projectRet = await projectService.find({ code: where.code }, true);
      if(projectRet && projectRet.length>0){
        projectRet[0].apikey = "";
        project = projectRet[0];
      }
    }
    let total = 0;
    total = await this.entityDao.count({ where }, { logging: true });
    if (total < 1) {
      return {
        pageSize,
        pageNum,
        list: [],
        total: 0,
        project
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
    let result = {
      pageSize,
      pageNum,
      list,
      total,
      project
    };
    return result;
  }
}
const repoetService = new ReportService();
export default repoetService;

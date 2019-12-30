import BaseService from "../../base/service/baseService";
import mysql from "../../../utils/mysql";
import sequelize from "sequelize";
import projectSchema from "../schema/projectSchema";
import ipAuthService from "../../ipAuth/service/ipAuthService";
const ProjectDao = projectSchema(mysql, sequelize);

// 重新生成表
// ProjectDao.sync({ alter: true, force: true });

class ProjectService extends BaseService {
  constructor() {
    super(ProjectDao);
  }

  /**
   * 保存 新增 修改
   * 重写
   */
  public async create(model: any) {
    let ret = await super.create(model);
    if (model.domain && model.domain.length > 0) {
      // 获取配置好的domain
      let domains = model.domain.split(",");
      ipAuthService.createOrUpdateDomain(model.domain);
    }
    return ret;
  }

  /**
   * createOrUpdate
   */
  // public async createOrUpdate(model: any) {
  //   let ret = await super.createOrUpdate(model);
  //   if (model.domain && model.domain.length > 0) {
  //     // 获取配置好的domain
  //     ipAuthService.createOrUpdateDomain(model.domain);
  //   }
  //   return ret;
  // }

  /**
   * update
   */
  public async update(model: any, ignoreFields: Array<string> = []) {
    let defaultIgnore: Array<string> = ["createDate"]; // 默认不更新字段
    ignoreFields = ignoreFields.concat(defaultIgnore);
    ignoreFields = Array.from(new Set(ignoreFields));

    let o = await this.entityDao.findOne({
      where: {
        id: model.id
      }
    });
    let oldDomain = o.domain;
    o.updateDate = Date.now();
    // 字段过滤
    for (let key in model) {
      if (!ignoreFields.includes(key)) {
        o[key] = model[key];
      }
    }
    if (model.domain && model.domain.length > 0) {
      ipAuthService.createOrUpdateDomain(model.domain, oldDomain);
    }
    return await o.save();
  }
}
const projectService = new ProjectService();
export default projectService;

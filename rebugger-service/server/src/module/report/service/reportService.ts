import BaseService from "../../base/service/baseService";
import projectService from "../../project/service/projectService";
import mysql from "../../../utils/mysql";
import sequelize from "sequelize";
import reportSchema from "../schema/reportSchema";
import sysConfig from "../../../../config/default";
import cacheUtil from "../../../utils/cacheUtil";
const ReportDao = reportSchema(mysql, sequelize);
const uuid = require("node-uuid");
import logger from '../../../middleware/logger';
const Op = sequelize.Op;

// 重新生成表
// ReportDao.sync({ alter: true, force: true });

class ReportService extends BaseService {
  constructor() {
    super(ReportDao);
  }
  /**
   * 重写 保存 新增
   * override
   */
  public async create(model: any) {
    // console.log(process.env.NODE_ENV);
    let apikey = model.apikey;
    if (apikey && apikey.length > 0) {
      let options ={
        keyPrefix:"report:",
        exprires: 60000 * 10  // 10分钟缓存
      }
      let project = await projectService.find({ apikey }, true, options);
      if (project && project.length == 1) {
        let currentProject = project[0];
        // 取自定义字段
        if (model.metaData && model.metaData.length > 5) {
          let metaObj = JSON.parse(model.metaData);

          if (currentProject.retainNameConfig && currentProject.retainNameConfig.length > 0) {
            // console.log(currentProject.retainNameConfig);
            let retainNameConfig = JSON.parse(currentProject.retainNameConfig);
            // console.log(retainNameConfig);
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
        model.resolveStatus = 0;  // 初始化解决状态
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
   * createList 批量上传数据
   */
  public async createList(model: any) {

    // let errorObj = null;
    model.list.forEach(async (item)=>{
      try {
        await this.create(item);
      } catch (error) {
        // throw error;
        // console.log(error);
        // Unhandled promise rejection 不会被捕抓 手动保存日志
        let errorObj ={
          message:error.message +": "+ (error.parent ? error.parent.message:''),
          url:"/api/report/createList",
          method:"post",
          body:JSON.stringify(item)
        }
        logger.logger.log("error", errorObj);
        // errorObj = error;
      }
    })
    // if(errorObj){
    //   throw errorObj;
    // }
    return {list:[],total:model.list.length}
  }


  /**
   * 重写 查询list
   */
  public async list(pageNum = 1, pageSize = 10, whereParams) {
    let project = null;
    let {startTime = null,endTime = null, ...where} = whereParams;
    // 时间间隔查询
    if(startTime && endTime){
      let emitTime = {
        [Op.gt]: startTime,
        [Op.lt]: endTime
      }
      where = {emitTime, ...where};
    }
    // console.log(where);
    if ((where.code && where.code.length > 0) || (where.projectName && where.projectName.length>0)) {
      // 获取项目信息
      let projectWhere = {}
      if(where.projectName && where.projectName.length>0){
        projectWhere = {name: where.projectName}
      }

      if(where.code && where.code.length > 0){
        projectWhere = {code: where.code}
      }

      let projectRet = await projectService.find({ ...projectWhere }, true);
      if(projectRet && projectRet.length>0){
        projectRet[0].apikey = "";
        project = projectRet[0];
      }
    }
    let total = 0;

    let { projectName = null,retainName = null, ...reportWhere } = where;
    if(where.projectName && where.projectName.length>0){
      projectName = {
        [Op.like]: "%" + projectName + "%"
      }
      reportWhere = {
        projectName,
        ...reportWhere
      }
    }

    if(where.retainName && where.retainName.length>0){
      retainName = {
        [Op.like]: "%" + retainName + "%"
      }
      reportWhere = {
        retainName,
        ...reportWhere
      }
    }
    
    total = await this.entityDao.count({ where:reportWhere }, { logging: true });
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
      where:reportWhere,
      order: [["emitTime", "DESC"]],
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

  /**
   * 重写 查询已解决list
   */
  public async resolveList(pageNum = 1, pageSize = 10, whereParams) {
    let project = null;
    let {startTime = null,endTime = null, ...where} = whereParams;
    // 时间间隔查询
    if(startTime && endTime){
      let emitTime = {
        [Op.gt]: startTime,
        [Op.lt]: endTime
      }
      where = {
        emitTime, 
        ...where,
        type:{
          [Op.notIn]: ["info", "warning"]
        },
        resolveStatus:{
          [Op.lte]: 0
        }
      };
    }
    // console.log(where);
    // if ((where.code && where.code.length > 0) || (where.projectName && where.projectName.length>0)) {
    //   // 获取项目信息
    //   let projectWhere = {}
    //   if(where.projectName && where.projectName.length>0){
    //     projectWhere = {name: where.projectName}
    //   }

    //   if(where.code && where.code.length > 0){
    //     projectWhere = {code: where.code}
    //   }

    //   let projectRet = await projectService.find({ ...projectWhere }, true);
    //   if(projectRet && projectRet.length>0){
    //     projectRet[0].apikey = "";
    //     project = projectRet[0];
    //   }
    // }
    let total = 0;
    total = await this.entityDao.count({ where }, { logging: true });
    if (total < 1) {
      return {
        pageSize,
        pageNum,
        list: [],
        total: 0
        // project
      };
    }
    let offset = 0;
    if (pageNum > 1) {
      offset = (pageNum - 1) * pageSize;
    }
    // console.log(offset);
    let list = await this.entityDao.findAll({
      where,
      order: [["emitTime", "DESC"]],
      offset: offset,
      limit: pageSize
    });
    let result = {
      pageSize,
      pageNum,
      list,
      total
      // project
    };
    return result;
  }

  /**
   * 更新 异常状态
   * 
   */
  public async resolveStatus(model: any) {
    let o = await this.entityDao.findOne({
      where: {
        id: model.id
      }
    });
    o.updateDate = Date.now();
    // 更新部分字段
    o.resolveStatus = model.resolveStatus;
    o.resolveUserId = model.resolveUserId;
    o.resolveUserName = model.resolveUserName;
    if(model.comment){
      o.comment=model.comment;
    }
    return await o.save();
  }

/**
   * id 查询字段
   * cacheable 是否开启缓存
   */
  public async info(id: string, cacheable = false, options?: any) {
    if (cacheable) {
      let obj = await cacheUtil.get(id);
      if (obj) {
        obj = JSON.parse(obj);
        return obj;
      } else {
        let ret = await this.entityDao.findOne({
          where: {
            id
          }
        });
        if (ret) {
          cacheUtil.set(
            id,
            JSON.stringify(ret),
            options && options.exprires
              ? options.exprires
              : sysConfig.redis.exprires
          );
        }
        return ret;
      }
    } else {
      return await this.entityDao.findOne({
        where: {
          id
        }
      });
    }
  }


}
const repoetService = new ReportService();
export default repoetService;

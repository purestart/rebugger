import mysqlSequelize from '../../../utils/mysql';
import sequelize from 'sequelize';
import reportSchema from "../../report/schema/reportSchema";
const ReportDao = reportSchema(mysqlSequelize, sequelize); // 引入user的表结构
const jwt = require('jsonwebtoken');
import moment from "moment"
import config from '../../../../config/default';
import md5 from 'js-md5';
import ProjectService from "../../project/service/projectService";
import cacheUtil from "../../../utils/cacheUtil";
const Op = sequelize.Op;

class DashboardService {
  constructor() {
  }
  
  /**
   * name
   */
  public async stat(param) {
    // 新增缓存 5分钟统计一次
    let obj = await cacheUtil.get("dashboard:stat");
    if (obj) {
      obj = JSON.parse(obj);
      console.log("取缓存");
      return obj;
    }

    var startTime = moment().startOf("day");
    let endTime = moment().endOf("day");
    // console.log(startTime);
    // console.log(endTime);
    let emitTime = {
      [Op.gt]: startTime,
      [Op.lt]: endTime
    }
    let dayTotalWhere = {
      emitTime
    }
    let infoTotalWhere = {
      emitTime,
      [Op.or]: [
        { type: "info" },
        { type: "warning" }
      ]
      // type:{
      //   [Op.in]: ["info", "warning"]
      // }
    }
    let errorTotalWhere = {
      emitTime,
      [Op.and]: [
        { type: {[Op.ne]:"info"} },
        { type: {[Op.ne]:"warning"} }
      ]
      // type:{
      //   [Op.notIn]: ["info", "warning"]
      // }
    }
    // 统计当天总数
    let dayTotal = await ReportDao.count({ where:dayTotalWhere }, { logging: true });
    let infoTotal = await ReportDao.count({ where:infoTotalWhere }, { logging: true });
    let errorTotal = await ReportDao.count({ where:errorTotalWhere }, { logging: true });
    // let totalObj = await mysqlSequelize.query("select table_schema,table_name,table_type,table_rows from information_schema.tables where table_schema='front_logger_db' and table_name='report'", { type: mysqlSequelize.QueryTypes.SELECT });
    let total = await ReportDao.count({ where:{} }, { logging: true });
    // if(totalObj && totalObj.length == 1){
    //   total = totalObj[0].table_rows;
    //   // total = total + 1;
    // }
    let dailySum = await this.dailySum(12);
    let projectSum = await this.statByProject();
    let typeSum = await this.statByType();
    let ret = {
      dayTotal,
      infoTotal,
      errorTotal,
      total:total,
      dailySum,
      projectSum,
      typeSum
    }
    cacheUtil.set(
      "dashboard:stat",
      JSON.stringify(ret),
      60000 * 10
    );
    
    return ret;
  }

  /**
   * name
   * 
   * 按天统计数据
   */
  public async dailySum(dayCount = 12) {

    let ret = await new Promise(async (resolve,reject)=>{
      let arr :Array<Object> = [];
      for(let i=dayCount -1; i>-1; i--){
        let date = moment().subtract('days', i).format('YYYY-MM-DD');//n天前
        let emitTime = {
          [Op.gt]: date + " 00:00:00",
          [Op.lt]: date + " 23:59:59"
        }
        let dayTotalWhere = {
          emitTime
        }
        let dayTotal = 0
        dayTotal = await ReportDao.count({ where:dayTotalWhere }, { logging: true });
        let obj = {
          date,
          dayTotal: dayTotal?dayTotal:0
        }
        arr.push(obj);
      }
      resolve(arr);
    });
    return ret;
  }

  /**
   * statByProject
   * 按项目统计当天数量
   */
  public async statByProject() {
    let ret = await new Promise(async (resolve,reject)=>{
      let arr :Array<Object> = [];
      let result = await ProjectService.list(1,10,{});
      if(result && result.list && result.list.length > 0){
        for(let i=0; i < result.list.length; i++){
          let project = result.list[i];
          let date = moment().subtract('days', 0).format('YYYY-MM-DD');//今天
          let emitTime = {
            [Op.gt]: date + " 00:00:00",
            [Op.lt]: date + " 23:59:59"
          }
          let dayTotalWhere = {
            emitTime,
            code: project.code
          }
          let dayTotal = 0
          dayTotal = await ReportDao.count({ where:dayTotalWhere }, { logging: true });
          let obj = {
            id: project.id,
            name: project.name,
            date,
            total: dayTotal?dayTotal:0
          }
          arr.push(obj);
        }
      }
      resolve(arr);
    })
    return ret;
  }

  /**
   * statByType
   * 按异常类型统计
   */
  public async statByType() {
    let types = ["unCaught","caught","info","warning","sourceError","httpError","unhandledRejection","handledRejection"];
    let typeNames = ["捕获代码异常","主动上报代码异常","日志信息","警告信息","资源加载异常","接口请求异常","未处理promise异常","已处理promise异常"];
    let ret = await new Promise(async (resolve,reject)=>{
      let arr :Array<Object> = [];
      for(let i=0; i < types.length; i++){
        let type = types[i];
        let typeName = typeNames[i];
        let date = moment().subtract('days', 0).format('YYYY-MM-DD');//今天
        let emitTime = {
          [Op.gt]: date + " 00:00:00",
          [Op.lt]: date + " 23:59:59"
        }
        let dayTotalWhere = {
          emitTime,
          type: type
        }
        let dayTotal = 0
        dayTotal = await ReportDao.count({ where:dayTotalWhere }, { logging: true });
        let obj = {
          type,
          typeName,
          date,
          total: dayTotal?dayTotal:0
        }
        arr.push(obj);
      }
      resolve(arr);
    })
    return ret;
  }

}
const dashboardService = new DashboardService();
export default dashboardService;
import mysqlSequelize from '../../../utils/mysql';
import sequelize from 'sequelize';
import reportSchema from "../../report/schema/reportSchema";
const ReportDao = reportSchema(mysqlSequelize, sequelize); // 引入user的表结构
const jwt = require('jsonwebtoken');
import moment from "moment"
import config from '../../../../config/default';
import md5 from 'js-md5';
const Op = sequelize.Op;

class DashboardService {
  constructor() {
  }
  
  /**
   * name
   */
  public async stat(param) {
    var startTime = moment().startOf("day");
    let endTime = moment().endOf("day");
    console.log(startTime);
    console.log(endTime);
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
    let totalObj = await mysqlSequelize.query("select table_schema,table_name,table_type,table_rows from information_schema.tables where table_schema='rebugger_db' and table_name='report'", { type: mysqlSequelize.QueryTypes.SELECT });
    let total = 0;
    if(totalObj && totalObj.length == 1){
      total = totalObj[0].table_rows;
    }
    let dailySum = await this.dailySum(12);
    return {
      dayTotal,
      infoTotal,
      errorTotal,
      total:total,
      dailySum
    }
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

}
const dashboardService = new DashboardService();
export default dashboardService;
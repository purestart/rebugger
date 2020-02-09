import mysql from "../../../utils/mysql";
import sequelize from "sequelize";
import reportSchema from "../schema/reportSchema";
const ReportDao = reportSchema(mysql, sequelize); // 引入user的表结构

import cache from "memory-cache";

// 重新生成表
ReportDao.sync({ alter: true, force: true });

const uuid = require("node-uuid");

export default {
  info: async (id: string) => {
    let ret = await ReportDao.findOne({
      where: {
        id
      }
    });
    return ret;
  },
  infoByName: async (name: string) => {
    return await ReportDao.findOne({
      where: {
        name
      }
    });
  },
  list: async (pageSize = 10, pageNum: number, searchParams: object) => {
    let total = 0;
    total = await ReportDao.count({ where: searchParams }, { logging: false });
    if (total < 1) {
      return [];
    }
    let offset = 0;
    if (pageNum > 1) {
      offset = (pageNum - 1) * pageSize;
    }
    let list = await ReportDao.findAll({
      where: searchParams,
      //order: [['update_date', 'DESC']],
      offset: offset,
      limit: pageSize
    });

    list.forEach((item: any) => {
      item.password = "";
    });
    let result = {
      pageSize,
      pageNum,
      list,
      total
    };
    return result;
  },

  create: async (obj: object) => {
    return await ReportDao.create({
      id: uuid.v1(),
      createDate: new Date(),
      updateDate: new Date(),
      ...obj
    });
  },
  delete: async (id: string) => {
    let o = await ReportDao.findOne({
      where: {
        id: id
      }
    });
    return await o.destroy();
  },
  update: async (obj: any) => {
    let o = await ReportDao.findOne({
      where: {
        id: obj.id
      }
    });
    o.update_date = Date.now();
    o.name = obj.name;
    o.remarks = obj.remarks;
    return await o.save();
  },
  updateExist: async (obj: any) => {
    let o = await ReportDao.findOne({
      where: {
        id: obj.id
      }
    });
    o.updateDate = Date.now();
    if (obj.name) {
      o.name = obj.name;
    }
    if (obj.create_date) {
      o.createDate = obj.createDate;
    }
    if (obj.remarks) {
      o.remarks = obj.remarks;
    }
    return await o.save();
  }
};

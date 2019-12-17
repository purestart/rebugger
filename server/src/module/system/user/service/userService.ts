const mysql = require("../../../../utils/mysql");
const sequelize = require("sequelize");
var UserDao = require("../schema/user")(mysql, sequelize); // 引入user的表结构
var uuid = require("node-uuid");

module.exports = {
  info: async (id: string) => {
    return await UserDao.findOne({
      where: {
        id
      }
    });
  },
  infoByName: async (name: string) => {
    return await UserDao.findOne({
      where: {
        name
      }
    });
  },
  list: async (pageSize = 10, pageNum: number, searchParams: object) => {
    let total = 0;
    total = await UserDao.count({ where: searchParams }, { logging: false });
    // console.log(total);
    if (total < 1) {
      return [];
    }
    let offset = 0;
    // console.log(pageSize);
    if (pageNum > 1) {
      offset = (pageNum - 1) * pageSize;
    }
    let list = await UserDao.findAll({
      where: searchParams,
      //order: [['update_date', 'DESC']],
      offset: offset,
      limit: pageSize
    });

    list.forEach(( item:any)=>{
      item.password=""
    })

    let result = {
      pageSize,
      pageNum,
      list,
      total
    };
    return result;
  },
  create: async (obj: object) => {
    return await UserDao.create({
      id: uuid.v1(),
      ...obj
    });
  },
  delete: async (id: string) => {
    var o = await UserDao.findOne({
      where: {
        id: id
      }
    });
    return await o.destroy();
  },
  update: async (obj: any) => {
    var o = await UserDao.findOne({
      where: {
        id: obj.id
      }
    });
    o.update_date = Date.now();
    o.name = obj.name;
    o.remarks = obj.remarks;
    return await o.save();
  },
  updateExist: async (obj:any) => {
    var o = await UserDao.findOne({
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

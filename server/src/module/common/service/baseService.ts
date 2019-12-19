import mysql from "../../../utils/mysql";
import sequelize from "sequelize";
import sysConfig from '../../../../config/default';
import cacheUtil from "memory-cache";
// 重新生成表
// ReportDao.sync({ alter: true, force: true });
const uuid = require("node-uuid");

export class baseService {
  protected entityDao;
  constructor(entityDao) {
    this.entityDao = entityDao;
  }
  /**
   * id 查询字段
   * cacheable 是否开启缓存
   */
  public async info(id: string, cacheable = false) {
    if (cacheable) {
      let obj = cacheUtil.get(id);
      if (obj) {
        return obj;
      } else {
        let ret = await this.entityDao.findOne({
          where: {
            id
          }
        });
        if (ret) {
          cacheUtil.put(id, ret, sysConfig.cacheTimeOut);
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
  /**
   * 字段查询 返回列表 适用于少量数据的查询
   * where 搜索条件 返回所有
   * cacheable 是否开启缓存
   */
  public async find(where : object, cacheable = false) {
    if (cacheable) {
      let key = JSON.stringify(where);
      let obj = cacheUtil.get(key);
      if (obj) {
        return obj;
      } else {
        let ret = await this.entityDao.findAll({
          order: [['update_date', 'DESC']],
          where
        });
        if (ret) {
          cacheUtil.put(key, ret, sysConfig.cacheTimeOut);
        }
        return ret;
      }
    }else{
      return await this.entityDao.findAll({
        order: [['update_date', 'DESC']],
        where
      });
    }
  }
  /**
   * 分页查询
   */
  public async list({pageNum = 1, pageSize = 10, ...where}) {
    let total = 0;
    total = await this.entityDao.count({ where }, { logging: true });
    if (total < 1) {
      return [];
    }
    let offset = 0;
    if (pageNum > 1) {
      offset = (pageNum - 1) * pageSize;
    }
    let list = await this.entityDao.findAll({
      where,
      order: [['update_date', 'DESC']],
      offset: offset,
      limit: pageSize
    });
    let result = {
      pageSize,
      pageNum,
      list,
      total
    };
    return result;
  }

  /**
   * 保存 新增 修改
   */
  public async create(model: object) {
    return await this.entityDao.create({
      id: uuid.v1(),
      createDate: new Date(),
      updateDate: new Date(),
      ...model
    });
  }

  /**
   * createOrUpdate
   */
  public async createOrUpdate(model: object) {
    
  }

  /**
   * update
   */
  public async update(model: any, ignoreFields = []) {
    let o = await this.entityDao.findOne({
      where: {
        id: model.id
      }
    });
    o.update_date = Date.now();
    // 字段过滤
    
    return await o.save();
  }
  /**
   * delete
   */
  public async delete() {
    
  }
}

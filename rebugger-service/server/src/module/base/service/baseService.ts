/**
 * 基础service
 */

import sysConfig from "../../../../config/default";
import cacheUtil from "../../../utils/cacheUtil";
const uuid = require("node-uuid");

export default class baseService {
  protected entityDao;
  constructor(entityDao) {
    this.entityDao = entityDao;
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

  /**
   * 字段查询 返回列表 适用于少量数据的查询
   * where 搜索条件 返回所有
   * cacheable 是否开启缓存
   */
  public async find(where: object, cacheable = false, options?: any) {
    if (cacheable) {
      let key = JSON.stringify(where);
      if(options && options.keyPrefix){
        key = options.keyPrefix + key;
      }
      let obj = await cacheUtil.get(key);
      if (obj) {
        obj = JSON.parse(obj);
        return obj;
      } else {
        let ret = await this.entityDao.findAll({
          order: [["updateDate", "DESC"]],
          where
        });
        if (ret) {
          cacheUtil.set(
            key,
            JSON.stringify(ret),
            options && options.exprires
              ? options.exprires
              : sysConfig.redis.exprires
          );
        }
        return ret;
      }
    } else {
      return await this.entityDao.findAll({
        order: [["updateDate", "DESC"]],
        where
      });
    }
  }

  /**
   * 分页查询
   */
  public async list(pageNum = 1, pageSize = 10, where) {
    let total = 0;
    total = await this.entityDao.count({ where }, { logging: true });
    if (total < 1) {
      return {
        pageSize,
        pageNum,
        list:[],
        total:0
      };
    }
    let offset = 0;
    if (pageNum > 1) {
      offset = (pageNum - 1) * pageSize;
    }
    console.log(offset);
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
      total
    };
    return result;
  }

  /**
   * 保存 新增 修改
   */
  public async create(model: any) {
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
  public async createOrUpdate(model: any) {
    if (model.id) {
      // 修改
      return await this.update(model);
    } else {
      // 创建
      return await this.create(model);
    }
  }

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
    o.updateDate = Date.now();
    // 字段过滤
    for (let key in model) {
      if (!ignoreFields.includes(key)) {
        o[key] = model[key];
      }
    }
    return await o.save();
  }

  /**
   * updateIfExist
   * 保存存在的字段 不存在或者undefined不保存
   */
  public async updateExist(model: any) {
    let o = await this.entityDao.findOne({
      where: {
        id: model.id
      }
    });
    o.updateDate = Date.now();
    for (let key in model) {
      if (key && model[key] !== undefined) {
        o[key] = model[key];
      }
    }
    return await o.save();
  }

  /**
   * delete
   */
  public async delete(id: string) {
    let o = await this.entityDao.findOne({
      where: {
        id: id
      }
    });
    return await o.destroy();
  }
}

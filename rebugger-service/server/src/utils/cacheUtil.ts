/*
 * Description:缓存工具类
 * Author:詹陈龙
 * Update:
 */

import baseCache from "memory-cache";
import sysConfig from "../../config/default";
import redisUtil from "./redisUtil";

class CacheUtil {
  constructor() {}
  /**
   * get
   */
  public async get(key) {
    if (sysConfig.useRedis) {
      return await redisUtil.get(key);
    }
    return baseCache.get(key);
  }

  /**
   * set
   * exprires 统一设定为 ms redis单位为s 需要除以1000
   */
  public set(key, value: any, exprires: any) {
    if (sysConfig.useRedis) {
      redisUtil.set(key, value);
      exprires = exprires?exprires:sysConfig.redis.exprires;
      if(exprires>1000){
        exprires = exprires / 1000;
      }
      // console.log(exprires);
      redisUtil.expire(key, exprires);
    } else {
      baseCache.put(
        key,
        value,
        exprires ? exprires : sysConfig.redis.exprires
      );
    }
  }
}

const cacheUtil = new CacheUtil();
export default cacheUtil;

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
   */
  public set(key, value: any, exprires: any) {
    if (sysConfig.useRedis) {
      redisUtil.set(key, value);
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

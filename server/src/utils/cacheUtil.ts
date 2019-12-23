/*
* Description:缓存工具类
* Author:詹陈龙
* Update:
*/
import baseCache from "memory-cache";
import sysConfig from '../../config/default';

class CacheUtil {
  constructor() {}
  /**
   * get
   */
  public get(key) {
    return baseCache.get(key);
  }

  /**
   * set
   */
  public set(key, value: any, cacheTimeOut: any) {
    baseCache.put(key, value, cacheTimeOut?cacheTimeOut:sysConfig.cacheTimeOut);
  }

}

const cacheUtil = new CacheUtil();
export default cacheUtil;
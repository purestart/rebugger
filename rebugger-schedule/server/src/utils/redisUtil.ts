const redis = require("./redis");

class RedisUtil {
  constructor() {}
  /**
   * get
   */
  public async get(key) {
    return await redis.get(key);
  }

  /**
   * set
   */
  public async set(key, value: any) {
    redis.set(key, value);
  }

  /**
   * 设置过期时间
   */
  public expire(key, expire) {
    redis.expire(key, expire);
  }
}
const redisUtil = new RedisUtil();
export default redisUtil;

/* eslint-disable quotes */
const Redis = require("ioredis");
const redis = {
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  prefix: "rebugger:", // 存诸前缀
  ttl: 60 * 60 * 23, // 默认过期时间
  family: 4,
  db: 0
};
const newRedis = new Redis(redis);
module.exports = newRedis;

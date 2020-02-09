/* eslint-disable quotes */
const Redis = require("ioredis");
import config from '../../config/default';

console.log("NODE_ENV: " + process.env.NODE_ENV);

let localConfig: any = config;
if(process.env.NODE_ENV == "test"){
  localConfig = config.test;
}else if(process.env.NODE_ENV == "prod"){
  localConfig = config.prod;
}
// console.log(localConfig);

const redis = {
  port: localConfig.redis.port, // Redis port
  host: localConfig.redis.host, // Redis host
  password: localConfig.redis.password,
  prefix: localConfig.redis.prefix, // 存诸前缀
  keyPrefix: localConfig.redis.keyPrefix,
  ttl: 60 * 60 * 23, // 默认过期时间
  family: 4,
  db: 0
};
const newRedis = new Redis(redis);
module.exports = newRedis;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable quotes */
var Redis = require("ioredis");
var default_1 = __importDefault(require("../../config/default"));
console.log("NODE_ENV: " + process.env.NODE_ENV);
var localConfig = default_1.default;
if (process.env.NODE_ENV == "test") {
    localConfig = default_1.default.test;
}
else if (process.env.NODE_ENV == "prod") {
    localConfig = default_1.default.prod;
}
// console.log(localConfig);
var redis = {
    port: localConfig.redis.port,
    host: localConfig.redis.host,
    password: localConfig.redis.password,
    prefix: localConfig.redis.prefix,
    keyPrefix: localConfig.redis.keyPrefix,
    ttl: 60 * 60 * 23,
    family: 4,
    db: 0
};
var newRedis = new Redis(redis);
module.exports = newRedis;

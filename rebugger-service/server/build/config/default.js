"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 3000,
    database: {
        HOST: '127.0.0.1',
        PORT: '3306',
        USER: 'root',
        PASSWORD: '18819640516',
        DATABASE: 'front_logger_db' //选中数据库
    },
    useRedis: true,
    redis: {
        exprires: 60000 * 5,
        port: 6379,
        host: "127.0.0.1",
        password: "",
        prefix: "front-logger:",
        keyPrefix: "front-logger:" // 存诸前缀
    },
    secret: "gesafe",
    // 生产环境配置文件
    prod: {
        database: {
            HOST: 'rm-2ze8wa1j31ay60omx.mysql.rds.aliyuncs.com',
            PORT: '3306',
            USER: 'front_logger_db',
            PASSWORD: 'front_logger_db!@#QWE',
            DATABASE: 'front_logger_db' //选中数据库
        },
        redis: {
            exprires: 60000 * 5,
            port: 6379,
            host: "r-2zeoy97gwck0jyyv6s.redis.rds.aliyuncs.com",
            password: "sKzJedjM5OsWr2Ra",
            prefix: "front-logger:",
            keyPrefix: "front-logger:" // 存诸前缀
        }
    },
    // daditest
    test: {
        database: {
            HOST: 'rm-8vb94upn9y782wh4e20800.mysql.zhangbei.rds.aliyuncs.com',
            PORT: '3306',
            USER: 'front_logger_db',
            PASSWORD: 'front_logger_db!@#QWE',
            DATABASE: 'front_logger_db' //选中数据库
        },
        redis: {
            exprires: 60000 * 5,
            port: 6379,
            host: "r-8vby8jsgwho40hv6y1.redis.zhangbei.rds.aliyuncs.com",
            password: "dVzVkKjUnAs4pXBD",
            prefix: "front-logger:",
            keyPrefix: "front-logger:" // 存诸前缀
        }
    }
};

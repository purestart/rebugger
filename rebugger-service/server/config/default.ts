export default{
  port: 3000,
  database: {
    HOST: '127.0.0.1',  //数据库地址
    PORT: '3306',
    USER: 'root', //数据库用户
    PASSWORD: '18819640516', //数据库密码
    DATABASE: 'front_logger_db' //选中数据库
  },
  useRedis:true, // 缓存使用 redis
  redis:{
    exprires:60000 * 5, //默认缓存时间 单位ms 本地缓存ms单位 redis设置s 已在redis工具统一使用ms
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    password: "",
    prefix: "front-logger:", // 存诸前缀
    keyPrefix: "front-logger:" // 存诸前缀
  },
  secret:"gesafe",
  // 生产环境配置文件
  prod: {
    database: {
      HOST: 'xxxxxx.com',  //数据库地址
      PORT: '3306',
      USER: 'front_logger_db', //数据库用户
      PASSWORD: 'xxxx', //数据库密码
      DATABASE: 'front_logger_db' //选中数据库
    },
    redis:{
      exprires:60000 * 5, //默认缓存时间 单位ms 本地缓存ms单位 redis设置s 已在redis工具统一使用ms
      port: 6379, // Redis port
      host: "xxxx.com", // Redis host
      password: "xxxxx",
      prefix: "front-logger:", // 存诸前缀
      keyPrefix: "front-logger:" // 存诸前缀
    }
  },
  // test
  test: {
    database: {
      HOST: 'xxxxxx.com',  //数据库地址
      PORT: '3306',
      USER: 'front_logger_db', //数据库用户
      PASSWORD: 'xxxxx', //数据库密码
      DATABASE: 'front_logger_db' //选中数据库
    },
    redis:{
      exprires:60000 * 5, //默认缓存时间 单位ms 本地缓存ms单位 redis设置s 已在redis工具统一使用ms
      port: 6379, // Redis port
      host: "xxxxx.com", // Redis host
      password: "xxxxx",
      prefix: "front-logger:", // 存诸前缀
      keyPrefix: "front-logger:" // 存诸前缀
    }
  }
}

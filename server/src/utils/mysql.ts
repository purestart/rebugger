const Sequelize = require("sequelize");
// const config = require("../../config/default");
import config from '../../config/default';


// const mysql = new Sequelize(config.mysql.default, {
//   define: {
//     timestamps: false,
//   },
//   operatorsAliases: false
// });

var sequelized = new Sequelize(
  config.database.DATABASE,
  config.database.USER,
  config.database.PASSWORD,
  {
    host: config.database.HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
    // 添加这个配置 格式化日期
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    'define': {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      'underscored': true
    }
  }
);

export default sequelized;

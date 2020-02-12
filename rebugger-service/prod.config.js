module.exports = {
  apps: [
    {
      name: "rebugger-server",
      script: "server/build/app.js",
      // watch: true,
      // watch: [
      //   // 监控变化的目录，一旦变化，自动重启
      //   "server"
      // ],
      instances: "max",
      ignore_watch: [
        // 从监控目录中排除
        "node_modules",
        "logs",
        "server/logs"
      ],
      error_file: "./logs/app-err.log", // 错误日志路径
      // out_file: "./logs/app-out.log", // 普通日志路径
      env: {
        NODE_ENV: "development"
      },
      env_dev: {
        NODE_ENV: "development"
      },
      env_test: {
        NODE_ENV: "test"
      },
      env_prod: {
        NODE_ENV: "prod"
      }
    }
  ]
};

/*
 * Description:系统常量
 * Author:zcl
 * Update:
 */
import { utils } from "./utils";

class Constant {
  // 性别
  SexV = {
    男: "M",
    女: "F"
  };

  ProjectTypeV = {
    PC端: 1,
    移动端: 2,
    小程序: 3
  };

  // 异常类型
  ErrorTypeV = {
    日志信息: "info",
    主动上报代码异常: "caught",
    自动捕获代码异常: "unCaught",
    资源加载异常: "sourceError",
    接口请求异常: "httpError",
    未处理promise异常: "unhandledRejection",
    已处理promise异常: "handledRejection"
  }

  options = {
    sex: utils.objToArr(this.SexV),
    projectType: utils.objToArr(this.ProjectTypeV),
    errorType: utils.objToArr(this.ErrorTypeV)
  };

  constructor() {
    this.sexK = utils.reverse(this.SexV);
    this.projectTypeK = utils.reverse(this.ProjectTypeV);
    this.errorTypeK = utils.reverse(this.ErrorTypeV);
  }
}
const constant = new Constant();
export default constant;

/*
 * Description:系统常量
 * Author:zcl
 * Update:
 */
import { utils } from "./utils";

class Constant {
  // 性别
  SexV = {
    男: 1,
    女: 0
  };

  ProjectTypeV = {
    PC端: 1,
    移动端: 2,
    小程序: 3
  };

  // 异常类型
  ErrorTypeV = {
    捕获代码异常: "unCaught",
    主动上报代码异常: "caught",
    日志信息: "info",
    警告信息: "warning",
    资源加载异常: "sourceError",
    接口请求异常: "httpError",
    未处理promise异常: "unhandledRejection",
    已处理promise异常: "handledRejection"
  }

  // 异常字段
  ReportFieldV = {
    项目编码: "code",
    项目名称: "projectName",
    日志名称: "name",
    异常类型: "type",
    异常信息: "message",
    系统信息: "OS",
    异常发生时间: "emitTime",
    浏览器特征: "agent",
    异常堆栈: "stack",
    异常文件: "fileName",
    所在文件行: "lineNumber",
    所在文件列: "columnNumber",
    其它信息: "metaData",
    异常组件: "componentName",
    浏览器: "browser",
    城市编码: "cityNo",
    城市名称: "cityName",
    屏幕信息: "screenInfo",
    colorDepth: "colorDepth",
    屏幕高度: "height",
    设备IP: "ip",
    语言首选项: "language",
    网络是否在线: "online",
    pixelDepth: "pixelDepth",
    组件参数: "propsData",
    当前路由: "url",
    内核版本信息: "coreVersion",
    屏幕宽度: "width",
    资源接口地址: "src",
    资源标签: "tagName",
    资源HTML: "outerHtml",
    状态码: "status",
    状态内容: "statusText",
    资源选择器: "selector",
    监控视频id: "videoId",
    解决状态: "resolveStatus",
    问题描述: "comment",
    子模块名称: "moduleName",
    创建日期: "createDate",
    处理人: "resolveUserName",
    环境类型: "env"
  }
  // 解决状态
  ResolveStatusV = {
    未解决: 0,
    已解决: 1,
    其它原因: 2
  }

  // 环境
  EnvInfoV = {
    生产环境: "pro",
    预发布环境: "pre",
    测试环境: "test",
    开发环境: "dev"
  }

  options = {
    sex: utils.objToArr(this.SexV),
    projectType: utils.objToArr(this.ProjectTypeV),
    errorType: utils.objToArr(this.ErrorTypeV),
    resolveStatus: utils.objToArr(this.ResolveStatusV),
    reportField: utils.objToArr(this.ReportFieldV),
    envInfo: utils.objToArr(this.EnvInfoV)
  };

  constructor() {
    this.sexK = utils.reverse(this.SexV);
    this.projectTypeK = utils.reverse(this.ProjectTypeV);
    this.errorTypeK = utils.reverse(this.ErrorTypeV);
    this.resolveStatusK = utils.reverse(this.ResolveStatusV);
    this.reportFieldK = utils.reverse(this.ReportFieldV);
    this.envInfoK = utils.reverse(this.EnvInfoV);
  }
}
const constant = new Constant();
export default constant;

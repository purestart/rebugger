/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
import lsUtils from "./lsUtils";

var reportHandller = {
  // 查询当天是否有上报
  init: function(vm, params) {
    console.log("init reportHandller");
  },
  report: function(vm, params) {
    let reportMode = vm.options.reportMode;
    if (params.fileName.indexOf("rebugger.min") != -1) {
      console.warn("rebugger report warn");
      return;
    }
    switch (reportMode) {
      case "onError":
        vm.reportObject(params);
        break;
      case "byNum":
        break;
      case "byDay":
        break;
      case "onErrorOffline":
        break;
      default:
        console.warn("rebugger > no this reportMode : " + reportMode);
        break;
    }
  }
};
export default reportHandller;

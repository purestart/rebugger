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

  options = {
    sex: utils.objToArr(this.SexV),
    projectType: utils.objToArr(this.ProjectTypeV)
  };

  constructor() {
    this.sexK = utils.reverse(this.SexV);
    this.projectTypeK = utils.reverse(this.ProjectTypeV);
  }
}
const constant = new Constant();
export default constant;

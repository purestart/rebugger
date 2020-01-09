import BaseService from "../../base/service/baseService";

import mysql from "../../../utils/mysql";
import sequelize from "sequelize";
import ipAuthSchema from "../schema/ipAuthSchema";
const ipAuthDao = ipAuthSchema(mysql, sequelize);

// 重新生成表
// ipAuthDao.sync({ alter: true, force: true });

class IpAuthService extends BaseService {
  constructor() {
    super(ipAuthDao);
  }

  /**
   * createOrUpdateDomain
   */
  public async createOrUpdateDomain(domains: string, oldDomains?: string) {
    let deleteArr: Array<string> = [];
    if (!domains || domains.length == 0) {
      return;
    }
    if (oldDomains && oldDomains.length > 0) {
      // 获取旧数据 找出要删除的数据
      let oldDomainsArr = oldDomains.split(",");
      let newDomainArr = domains.split(",");
      oldDomainsArr.forEach(item => {
        let existItem = newDomainArr.find(el => el === item);
        if (!existItem && existItem!=="localhost" && existItem!=="127.0.0.1") {
          deleteArr.push(item);
        }
      });
    }
    // console.log("deleteArr",deleteArr);
    let ret = await this.find({ type: 1 });
    ret = ret || [];
    if (ret.length == 1) {
      // 取出domain 合并domain并保存
      let obj = ret[0];
      let domainStr = "";
      if (obj.domain && obj.domain.length > 0) {
        domainStr = obj.domain + "," + domains;
      } else {
        domainStr = domains;
      }
      let tmpArr: Array<string> = domainStr.split(",");
      tmpArr = Array.from(new Set(tmpArr));
      if (deleteArr.length > 0) {
        // 做差集
        tmpArr = tmpArr.filter(item => !deleteArr.some(ele => ele === item));
      }
      domainStr = tmpArr.join(",");
      if (obj.domain != domainStr) {
        obj.domain = domainStr;
        this.update(obj);
      }
    } else if (ret.length == 0) {
      // 创建一条数据 并保存
      let entity = {
        type: 1,
        name: "允许域名访问列表",
        domain: domains
      };
      this.create(entity);
    }
  }
}
const ipAuthService = new IpAuthService();
export default ipAuthService;

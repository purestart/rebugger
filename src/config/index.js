/*
 * Description:配置文件
 * Author:詹陈龙
 * Update:2018-08-06
 */
// 基础Url配置
const url = process.env.VUE_APP_BASE_URL || "http://127.0.0.1:9090";

// 图表库配置
const iconList = [
  "iconfont icon-dashboard",
  "iconfont icon-location-fill",
  "iconfont icon-fa-codepen",
  "iconfont icon-security",
  "iconfont icon-fa-columns",
  "iconfont icon-Afa-cog",
  "iconfont icon-fa-video-camera",
  "iconfont icon-gongnengdingyi",
  "iconfont icon-jichuguanli",
  "iconfont icon-tianshenpi",
  "iconfont icon-shujukanban",
  "iconfont icon-shujukanban",
  "iconfont icon-shujuwajue",
  "iconfont icon-iframetianjia",
  "iconfont icon-home",
  "el-icon-menu"
];

export { url, iconList };

import reportList from "./view/reportList.vue";
import reportInfo from "./view/reportInfo.vue";

export default [
  {
    path: "/report/errorInfo",
    name: "report",
    component: reportList
  },
  {
    path: "/report/errorInfo/tab/:activeTab",
    name: "reportTab",
    meta: [
      { name: "日志管理", url: "/report/errorInfo" },
      { name: "项目日志", url: "" }
    ],
    component: reportList
  },
  {
    path: "/report/errorInfo/projectCode/:code",
    name: "reportCode",
    meta: [
      { name: "日志管理", url: "/report/errorInfo" },
      { name: "项目日志", url: "" }
    ],
    component: reportList
  },
  {
    path: "/report/info/:id",
    name: "reportInfo",
    meta: [
      { name: "日志管理", url: "/report/errorInfo" },
      { name: "日志详情", url: "" }
    ],
    component: reportInfo
  }
  // {
  //   path: "/project/edit/:id",
  //   name: "editProject",
  //   meta: [
  //     { name: "项目管理", url: "/department" },
  //     { name: "编辑项目", url: "" }
  //   ],
  //   component: editProject
  // }
];

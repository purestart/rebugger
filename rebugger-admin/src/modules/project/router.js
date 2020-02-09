import project from "./view/project.vue";
import editProject from "./view/editProject.vue";

export default [
  {
    path: "/project/list",
    name: "project",
    component: project
  },
  {
    path: "/project/edit/:id",
    name: "editProject",
    meta: [
      { name: "项目管理", url: "/department" },
      { name: "编辑项目", url: "" }
    ],
    component: editProject
  }
];

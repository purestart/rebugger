/* eslint-disable quotes */
import Vue from "vue";
import Router from "vue-router";
// import Home from './views/Home.vue'
import MainLayout from "./modules/common/view/MainLayout.vue";
import Page404 from "./modules/common/view/Page404.vue";
import dashboard from "./modules/dashboard/router.js";
import system from "./modules/system/router";
import publicRouter from "./modules/public/router";
import chart from "./modules/chart/router";
import projectRouter from "./modules/project/router";

// 全局处理异常 this.$router.push('/home') 出现 NavigationDuplicated 的bug
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...publicRouter,
    {
      path: "/",
      component: MainLayout,
      children: [...dashboard, ...system, ...chart, ...projectRouter]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: "*",
      component: Page404
    }
  ]
});

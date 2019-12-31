export default [{
  path: '/user',
  name: 'user',
  component: () => import(/* webpackChunkName: "system" */ './view/User.vue')
}, {
  path: '/role',
  name: 'role',
  component: () => import(/* webpackChunkName: "system" */ './view/Role.vue')
}, {
  path: '/dept',
  name: 'dept',
  component: () => import(/* webpackChunkName: "system" */ './view/Dept.vue')
}, {
  path: '/menu',
  name: 'menu',
  component: () => import(/* webpackChunkName: "system" */ './view/Menu.vue')
}]

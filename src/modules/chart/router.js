export default [{
  path: '/chart',
  name: 'chart',
  component: () => import(/* webpackChunkName: "system" */ './view/engChart.vue')
}]

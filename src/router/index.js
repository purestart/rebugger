const rebuggerRoutes = [
  {
    path: 'sample',
    meta: {
      title: 'sample页面'
    },
    component: ()=> import(/* webpackChunkName: "frame" */ 'rebuggerSrc/views/sample/index'),
    name: 'sample页面'
  }
]
export default rebuggerRoutes

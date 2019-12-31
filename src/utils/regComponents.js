import DyTable from '../components/base/DyTable.vue'
import EditModel from '../components/base/EditModel.vue'
import DyForm from '../components/base/DyForm.vue'
import TreeTable from '../components/TreeTable/TreeTable.vue'

import VueProgressBar from 'vue-progressbar'

export default {
  install (Vue) {
    Vue.component('dy-table', DyTable)
    Vue.component(EditModel.name, EditModel)
    Vue.component('dy-form', DyForm)
    Vue.component(TreeTable.name, TreeTable)

    Vue.use(VueProgressBar, {
      color: '#93ccf8',
      failedColor: '#F56C6C'
    })
  }
}

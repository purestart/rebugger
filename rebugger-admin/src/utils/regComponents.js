import DyTable from "../components/base/DyTable.vue";
import EditModel from "../components/base/EditModel.vue";
import DyForm from "../components/base/DyForm.vue";
import TreeTable from "../components/TreeTable/TreeTable.vue";
import DyFormItem from "../components/base/DyFormItem.vue";
import utils from "./uiUtils";
import constant from "./constant";
import "../assets/css/element-common.scss";

import VueProgressBar from "vue-progressbar";

export default {
  install(Vue) {
    Vue.prototype.$utils = utils;
    Vue.prototype.$to = utils.to;
    Vue.prototype.$c = constant;

    Vue.component("dy-table", DyTable);
    Vue.component(EditModel.name, EditModel);
    Vue.component("dy-form", DyForm);
    Vue.component(TreeTable.name, TreeTable);
    Vue.component("dy-form-item", DyFormItem);

    Vue.use(VueProgressBar, {
      color: "#93ccf8",
      failedColor: "#F56C6C"
    });
  }
};

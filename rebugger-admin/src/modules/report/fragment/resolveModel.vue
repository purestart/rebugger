<template>
  <div class="resolve-model">
    <edit-model
      :hideSubmitBtn="false"
      title="处理异常信息"
      :modelVisible="modelVisible"
      @submit="onSubmit"
      @close="modelVisible = false"
    >
      <div class="p-t-20 p-b-40 p-r-20">
        <el-form
          size="small"
          label-width="120px"
          :model="model"
          ref="form"
          class="my-form"
        >
          <template v-for="item in formItems">
            <div
              :style="item.fullWidth ? 'flex: 0 1 100%;' : 'flex: 0 1 50%;'"
              :key="item.prop"
            >
              <dy-form-item
                :key="item.prop"
                :model="model"
                :item="item"
                v-if="!item.if || item.if()"
              ></dy-form-item>
            </div>
          </template>
        </el-form>
      </div>
    </edit-model>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex';
import ReportApi from '../api';
export default {
  props: {
    info: {
      type: Object,
      require: true
    },
    project: {
      type: Object,
      require: false
    }
  },
  data () {
    return {
      modelVisible:false,

      model: {},
      formItems:[
        { label: "异常名称：", prop: "name", type: "view" },
        { label: "异常类型：", prop: "type", type: "view", fullWidth: false },
        { label: "异常信息：", prop: "message", type: "view", fullWidth: false },
        { label: "解决状态：", prop: "resolveStatus", type: "radio", options:"resolveStatus",formatter: (row, column, cellValue) => this.$c.resolveStatusK[cellValue], fullWidth: true},
        { label: "问题描述：", prop: "comment", type: "textarea",props:{ rows:5 }, fullWidth: true}
      ]
    }
  },
  computed:{
    ...mapState({
      userInfo: state => state.default.userInfo,
    }),
  },
  created () {
  },
  mounted () {

  },
  methods:{
    showResolveModel(modelVisible, mode = "edit"){
      let formItems = JSON.parse(JSON.stringify(this.formItems));
      if(mode == "view"){
        formItems[3].type = "view";
        formItems[4].type = "view";
      }else{
        formItems[3].type = "radio";
        formItems[4].type = "textarea";
      }
      this.formItems=formItems;
      console.log(this.formItems);
      this.$forceUpdate();
      this.model = JSON.parse(JSON.stringify(this.info));
      this.modelVisible = modelVisible;
    },
    async onSubmit(){
      if(this.formItems[4].type == "view"){
        this.modelVisible = false;
        return;
      }
      this.model.resolveUserId = this.userInfo.id;
      this.model.resolveUserName = this.userInfo.name;
      let params = this.model;
      console.log(params);
      let [err,ret] = await this.$to(ReportApi.resolveStatus(params));
      if(err) return;
      if(ret.code == 200){
        this.$utils.message("保存成功！");
        this.modelVisible = false;
        this.$emit("refresh");
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

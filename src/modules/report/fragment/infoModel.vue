/* * Description: * Author:詹陈龙 * Update: */
<template>
  <div class="report-info-model">
    <edit-model
      :hideSubmitBtn="false"
      title="查看日志详情"
      :modelVisible="modelVisible"
      @submit="onSubmit"
      @close="modelVisible = false"
    >
      <div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="日志详情" name="first">
            <div class="p-b-40">
              <el-form size="small" label-width="120px" :model="model" ref="form" class="my-form">
                <template v-for="item in formItems">
                  <div
                    :style="item.fullWidth ? 'flex: 0 1 100%;' : 'flex: 0 1 50%;'"
                    :key="item.prop"
                  >
                    <dy-form-item
                      :key="item.prop"
                      :model="info"
                      :item="item"
                      v-if="!item.if || item.if()"
                    ></dy-form-item>
                  </div>
                </template>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="原始数据" name="second">
            <json-viewer :value="info"></json-viewer>
          </el-tab-pane>
        </el-tabs>
      </div>
    </edit-model>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    info: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      activeName: "first",
      model: {},
      modelVisible: false,
      formItems: [
        { label: "异常名称", prop: "name", type: "view" },
        { label: "异常类型", prop: "type", type: "view", fullWidth: false }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    showInfoModel(modelVisible) {
      // 处理formItems
      let formItems = [];
      let errorType = this.info.type;
      switch (errorType) {
        case "info": // 日志信息
          break;
        case "caught": // 主动上报异常
          break;
        case "unCaught": // 自动捕获代码异常
          break;
        case "sourceError": // 资源加载异常
          break;
        case "httpError": // 接口请求异常
          break;
        case "unhandledRejection": // 未处理promise异常
          break;
        case "handledRejection": // 已处理promise异常
          break;

        default:
          // 默认使用 info + uncaught 内容

          break;
      }
      this.modelVisible = modelVisible;
    },
    // 获取显示字段和隐藏字段 showFields 要首先显示的字段
    getFormItems(showFields = []) {},
    onSubmit() {
      this.modelVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.report-info-model {
  /deep/ .jv-container .jv-code {
    padding: 0px 10px;
    padding-bottom: 40px;
  }
}
</style>

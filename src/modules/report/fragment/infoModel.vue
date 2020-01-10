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
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="日志详情" name="info">
            <div class="p-b-40">
              <el-form
                size="small"
                label-width="120px"
                :model="model"
                ref="form"
                class="my-form"
              >
                <template v-for="item in formItems">
                  <div
                    :style="
                      item.fullWidth ? 'flex: 0 1 100%;' : 'flex: 0 1 50%;'
                    "
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
                <span v-show="!infoMoreVisiable" @click="infoMoreVisiable = true" class="c-link f-14 p-v-10 show-more">查看更多...</span>
                <template v-for="item in moreFormList">
                  <div
                    :style="
                      item.fullWidth ? 'flex: 0 1 100%;' : 'flex: 0 1 50%;'
                    "
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
          <el-tab-pane label="设备信息" name="device">
            <div class="p-b-40">
              <el-form
                size="small"
                label-width="120px"
                :model="model"
                ref="form"
                class="my-form"
              >
                <template v-for="item in deviceFormItems">
                  <div
                    :style="
                      item.fullWidth ? 'flex: 0 1 100%;' : 'flex: 0 1 50%;'
                    "
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
          <el-tab-pane label="位置信息" name="zone">
            <div class="p-b-40">
              <el-form
                size="small"
                label-width="120px"
                :model="model"
                ref="form"
                class="my-form"
              >
                <template v-for="item in zoneFormItems">
                  <div
                    :style="
                      item.fullWidth ? 'flex: 0 1 100%;' : 'flex: 0 1 50%;'
                    "
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
          <el-tab-pane label="原始数据" name="json">
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
    },
    project: {
      type: Object,
      require: false
    }
  },
  data() {
    return {
      infoMoreVisiable:false,
      activeTab: "info",
      model: {},
      modelVisible: false,
      fullWidthField: { stack: true, metaData: true, agent: true, fileName: true, selector:true, componentName:true,url:true},
      formItems: [
        { label: "异常名称：", prop: "name", type: "view" },
        { label: "异常类型：", prop: "type", type: "view", fullWidth: false }
      ],
      deviceFormItems: [
        { label: "设备IP：", prop: "ip", type: "view" },
        { label: "所在城市：", prop: "cityName", type: "view", fullWidth: false },
        { label: "浏览器：", prop: "browser", type: "view" },
        { label: "内核版本信息：", prop: "coreVersion", type: "view" },
        { label: "操作系统：", prop: "OS", type: "view" },
        { label: "网络是否在线：", prop: "online", type: "view" },
        { label: "屏幕宽度：", prop: "width", type: "view" },
        { label: "屏幕高度：", prop: "height", type: "view" },
        { label: "其它屏幕信息：", prop: "screenInfo", type: "view" },
        { label: "浏览器特征：", prop: "agent", type: "view", fullWidth: true }
      ],
      // 位置信息 包括IP 城市 城市编码 和自定义字段的用户信息
      zoneFormItems: [
        { label: "设备IP：", prop: "ip", type: "view" },
        { label: "所在城市：", prop: "cityName", type: "view", fullWidth: false },
        { label: "城市编码：", prop: "cityNo", type: "view" }

      ],
      moreFormItems: []
    };
  },
  computed:{
    moreFormList(){
      if(this.infoMoreVisiable){
        return this.moreFormItems
      }else{
        return [];
      }
    }
  },
  created() {},
  mounted() {},
  methods: {

    showInfoModel(modelVisible, activeTab = "info") {
      this.infoMoreVisiable = false;
      // 处理formItems
      let formItems = [];
      let errorType = this.info.type;
      let showFields = ["name","projectName", "type", "message","emitTime","url","fileName","lineNumber","columnNumber","componentName", "stack"];
      // 根据类型自定义显示字段
      switch (errorType) {
        case "info": // 日志信息
             showFields = ["name","projectName", "type", "message","emitTime","url","fileName","lineNumber","columnNumber","componentName","stack"];
          break;
        case "caught": // 主动上报异常

          break;
        case "unCaught": // 自动捕获代码异常
          break;
        case "sourceError": // 资源加载异常
              showFields = ["name","projectName", "type", "message","emitTime","url","src","tagName","outerHtml","selector"];
          break;
        case "httpError": // 接口请求异常
              showFields = ["name","projectName", "type", "message","emitTime","url","src","status","statusText","stack"];
          break;
        case "unhandledRejection": // 未处理promise异常
              showFields = ["name","projectName", "type", "message","emitTime","url","fileName","lineNumber","columnNumber","stack"];
          break;
        case "handledRejection": // 已处理promise异常

          break;

        default:
          // 默认使用 info + uncaught 内容

          break;
      }

      this.getFormItems(showFields);
      // 处理自定义字段 放到 zoneFormItems
      this.handleCustomField();
      this.activeTab = activeTab;
      this.modelVisible = modelVisible;
    },
    // 处理自定义字段 zoneFormItems接收
    handleCustomField(){
      let project = this.project;
      let zoneFormItems = this.zoneFormItems;
      if (project && project.code) {
        let retainNameConfig = project.retainNameConfig;
        if (retainNameConfig && retainNameConfig.length > 5) {
          retainNameConfig = JSON.parse(retainNameConfig);
          let item ={ label: retainNameConfig.title , prop: "retainName", type: "view" };
          let retainNameColumn = zoneFormItems.find(
            item => item.prop == "retainName"
          );
          if(!retainNameColumn){
            zoneFormItems.push(item)
          }
        }else{
          zoneFormItems = zoneFormItems.filter(item => item.prop !="retainName");
        }
        let retainIdConfig = project.retainIdConfig;
        if (retainIdConfig && retainIdConfig.length > 5) {
          retainIdConfig = JSON.parse(retainIdConfig);
          let item ={ label: retainIdConfig.title , prop: "retainId", type: "view" };
          let retainIdColumn = zoneFormItems.find(
            item => item.prop == "retainId"
          );
          if(!retainIdColumn){
            zoneFormItems.push(item)
          }
        }else{
          zoneFormItems = zoneFormItems.filter(item => item.prop !="retainId");
        }
      }else{
        // 删除行
        zoneFormItems = zoneFormItems.filter(item => (item.prop !="retainName" && item.prop !="retainId"));
      }
      console.log(zoneFormItems);
      this.zoneFormItems = zoneFormItems;

    },
    // 获取显示字段和隐藏字段 showFields 要首先显示的字段
    getFormItems(showFields = []) {
      let keys = Object.keys(this.info);
      let formItems = showFields.map(item => {
        let fullWidth = false;
        if (this.fullWidthField[item]) {
          fullWidth = true;
        }
        let label = this.$c.reportFieldK[item] || item;
        label = label + "：";
        let prop = item;
        return {
          label,
          prop,
          fullWidth,
          type: "view"
        };
      });

      this.formItems = formItems;
      // 获取剩余的项目
      let leftKeys = keys.filter(i=>(showFields.every(j=>i!=j) && i !="id" && i!= "keyVisible" && i !="resolveUserId"));
      // console.log(leftKeys);
      let moreFormItems = leftKeys.map(item => {
        let fullWidth = false;
        if (this.fullWidthField[item]) {
          fullWidth = true;
        }
        let label = this.$c.reportFieldK[item] || item;
        label = label + "：";
        let prop = item;
        return {
          label,
          prop,
          fullWidth,
          type: "view"
        };
      });
      this.moreFormItems =moreFormItems;
    },
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
  .show-more{
    display: block;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
}
</style>

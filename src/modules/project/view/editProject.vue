<template>
  <div class="edit-project p-16">
    <div class="w-800">
      <el-form size="small" label-width="120px" :model="model" ref="form" class="my-form">
        <template v-for="item in formItems1">
          <dy-form-item :key="item.prop" :model="model" :item="item" v-if="!item.if || item.if()"></dy-form-item>
        </template>
        <!-- <el-form-item label="状态" size="mini" prop="status">
          <el-radio-group v-model="model.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="允许域名" prop="domain">
            <el-input rows="5" type="textarea" v-model="model.domain" placeholder="允许域名"></el-input>
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="apikey" prop="apikey">
            <span v-if="model.apikey">{{model.apikey}}</span> <a @click="generateApiKey" class="m-l-10">生成apikey</a>
            <!-- <el-input rows="3" type="textarea" v-model="model.apikey" placeholder="apikey"></el-input> -->
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="项目描述" prop="description">
            <el-input rows="3" type="textarea" v-model="model.description" placeholder="项目描述"></el-input>
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="项目图片" prop="url">
            <image-select :url="model.image" @onSelect="onSelect" />
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="保留字段" prop="retainNameConfig">
            <el-input rows="3" type="textarea" v-model="model.retainNameConfig" placeholder="{'title':'用户名','meta':'fullName','hideField':true,'searchAble':true}"></el-input>
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="保留字段一" prop="retainIdConfig">
            <el-input rows="3" type="textarea" v-model="model.retainIdConfig" placeholder="{'title':'用户名','meta':'fullName','hideField':true,'searchAble':true}"></el-input>
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="保留字段二" prop="retainFieldConfig">
            <el-input rows="3" type="textarea" v-model="model.retainFieldConfig" placeholder="{'title':'用户名','meta':'fullName','hideField':true,'searchAble':true}"></el-input>
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="模块分类配置" prop="moduleConfig">
            <el-input rows="3" type="textarea" v-model="model.moduleConfig" placeholder="[{'moduleName':'票务系统','code':'ctm','prefix':'/ticket/'}]"></el-input>
          </el-form-item>
        </div>
        <div class="w-p-100 m-t-10">
          <el-form-item label="" prop="mobile">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import projectApi from "../api";
import ImageSelect from "../fragment/imageSelect";
export default {
  components: {
    ImageSelect
  },
  data() {
    return {
      model: {

      },
      formItems1: [
        {
          label: "项目名称",
          prop: "name",
          props: { readonly: false },
          verify: {}
        },
        { label: "项目编码", prop: "code", verify: {}},
        {
          label: "项目类型",
          type: "select",
          options: "projectType",
          prop: "type",
          formatter: (row, column, cellValue) => this.$c.projectTypeK[cellValue]
        },
        { label: "编写语言", prop: "language" },
        { label: "使用框架", prop: "frame" }
      ]
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.id && this.$route.params.id != "0") {
      // 编辑
      this.getData(this.$route.params.id);
    }
  },
  methods: {
    async generateApiKey() {
      if (this.model.apikey && this.model.apikey.length > 0) {
        const ret = await this.$utils.confirm("确定重新生成apikey吗？生成后原来的apikey将作废！");
        if (!ret) return;
      }
      this.model.apikey = this.$utils.generateUUID();
      this.$nextTick(() => {
        this.$forceUpdate();
      });
      this.$utils.message("生成秘钥成功！");
    },
    async getData(id) {
      let params = { id };
      let [err, ret] = await this.$to(projectApi.fetchProjectById(params));
      if (err) return;
      // console.log(ret);
      this.model = ret.data;
    },
    onSelect(url) {
      this.model.image = url;
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    async onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          let params = this.model;
          let [err, ret] = await this.$to(projectApi.createOrUpdateProject(params));
          if (err) return;
          // console.log(ret);
          if (ret.code == 200) {
            this.$utils.message("保存成功！");
            this.$utils.closeTab("/project/list");
          }
        } else {
          this.$utils.message("输入错误,请检查您的输入!!!", "error");
        }
      });
    },
    onCancel() {
      this.$utils.closeTab("/project/list");
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-project {
  background-color: #ffffff;
}
</style>

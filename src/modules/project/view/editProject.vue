<template>
  <div class="edit-project p-16">
    <div class="w-800">
      <el-form size="small" label-width="120px" :model="model" ref="form" class="my-form">
        <template v-for="item in formItems1">
          <dy-form-item :key="item.prop" :model="model" :item="item" v-if="!item.if || item.if()"></dy-form-item>
        </template>
        <el-form-item label="状态" size="mini" prop="status">
          <el-radio-group v-model="model.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="项目描述" prop="mobile">
            <el-input rows="5" type="textarea" v-model="model.mobile" placeholder="项目描述"></el-input>
          </el-form-item>
        </div>
        <div style="display:block;flex: 0 1 100%;">
          <el-form-item label="项目图片" prop="mobile">
            <image-select :url="model.url" @onSelect="onSelect" />
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
          props: { readonly: true },
          verify: {}
        },
        { label: "项目编码", prop: "code" },
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
    if (this.$route.params.id) {
      // 编辑
      this.getData(this.$route.params.id);
    }
  },
  methods: {
    async getData(id) {
      let params = { id };
      let [err, ret] = await this.$to(projectApi.fetchProjectById(params));
      if (err) return;
      console.log(ret);
      this.model = ret.data;
    },
    onSelect(url) {
      this.model.url = url;
      console.log(url);
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    onSubmit() {},
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

<template>
  <div class="project-list">
    <div class="search">
      <el-form class="base-form" :inline="true" :model="dataForm" @keyup.enter.native="getData()">
        <el-form-item label="项目名称：">
          <el-input v-model="dataForm.name" clearable placeholder="方案名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="getData()">查询</el-button>
          <el-button type="primary" size="small" @click="add()">新建项目</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dy-table border ref="dyTable" v-loading="loading" :columns="columns" :rows="rows"></dy-table>
    <el-pagination
      class="m-t-10 a-c"
      background
      @current-change="pageNumChange"
      @size-change="pageSizeChange"
      :page-size="pageSize"
      :current-page="pageNum"
      :layout="layout"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import baseMixins from "../../../mixins/baseMixins";
import projectApi from "../api";
export default {
  mixins: [baseMixins.pageMixin],
  data() {
    return {
      dataForm: {},
      loading: false,
      
      rows: [],
      columns: [
        // { type: 'index', align: 'center', label: '序号' },
        { label: "项目名称", prop: "name" },
        { label: "项目编码", prop: "code", width: 120 },
        { label: "项目类型", prop: "type", width: 120 },
        { label: "编写语言", prop: "language", width: 120 },
        { label: "使用框架", prop: "frame" },
        { label: "更新日期", prop: "updateDate" },
        {
          label: "apikey",
          prop: "apikey",
          align: "center",
          width: "150",
          renderCell: (h, value, row) => (
            <div>
              <span class="apikey-bg p-h-5">
                {row.keyVisible ? row.apikey : "*********"}
              </span>
              <el-button
                size="mini"
                onClick={() => this.showApikey(row)}
                plain
                class="m-l-10"
              >
                {row.keyVisible ? "不显示" : "显示"}
              </el-button>
            </div>
          )
        },
        {
          label: "操作",
          width: "150",
          fixed: "right",
          align: "center",
          target: ["table"],
          renderCell: (h, value, row, index) => {
            return (
              <div>
                <el-button size="mini" class="f-12 c-link" type="text" onClick={e => this.edit(e, row)}>
                  编辑
                </el-button>
                <el-button size="mini" class="f-12 c-link" type="text" onClick={e => this.delete(e, row)}>
                  删除
                </el-button>
                <el-button size="mini" class="f-12 c-link" type="text" onClick={e => this.toReportInfo(row)}>
                  项目日志
                </el-button>
              </div>
            );
          }
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    add() {
      this.$router.push({ name: "editProject", params: { id: 0 } });
    },
    async getData() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.dataForm
      };
      let [err, ret] = await this.$to(projectApi.fetchProjectList(params));
      if (err || ret.code != 200) {
        console.log(err);
        return;
      }
      // console.log(ret);
      ret.data.list.forEach(item => {
        item.keyVisible = false;
      });
      this.total = ret.data.total;
      this.rows = ret.data.list;
    },
    async delete(e, row) {
      let str = "确定要删除该项目吗？";
      const ret = await this.$utils.confirm(str);
      if (ret) {
        let [err, ret] = await this.$to(
          projectApi.deleteProject({ ids: [row.id] })
        );
        if (err) return;
        if (ret.code == 200) {
          this.$utils.message("删除成功！");
          this.getData();
        }
      }
    },
    edit(e, row) {
      this.$router.push({ name: "editProject", params: { id: row.id } });
    },
    toReportInfo(row) {
      this.$router.push("/report/errorInfo/projectCode/" + row.code);
    },
    showApikey(row) {
      if (row.keyVisible) {
        row.keyVisible = false;
      } else {
        row.keyVisible = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.project-list {
  padding: 16px;
  background-color: #ffffff;
  /deep/ .apikey-bg {
    background-color: #efefef;
    display: inline-block;
  }
}
</style>

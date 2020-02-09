<template>
  <pannel v-bind="$attrs" v-on="$listeners">
    <div class="p-10">
    <dy-table border ref="dyTable" v-loading="loading" :columns="columns" :rows="rows"></dy-table>
    <el-pagination
      v-if="total>10"
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
  </pannel>
</template>

<script type='text/ecmascript-6'>
import baseMixins from "../../../mixins/baseMixins";
import projectApi from "../../project/api";
import pannel from "./pannel";
export default {
  mixins: [baseMixins.pageMixin],
  components: {
    pannel
  },
  data () {
    return {
      loading: false,
      rows: [],
      columns: [
        // { type: 'index', align: 'center', label: '序号' },
        { label: "项目名称", prop: "name" },
        { label: "项目编码", prop: "code", width: 120 },
        { label: "项目类型", prop: "type", width: 120, formatter: (row, column, cellValue) => this.$c.projectTypeK[cellValue]},
        { label: "编写语言", prop: "language", width: 120 },
        { label: "使用框架", prop: "frame" },
        { label: "更新日期", prop: "updateDate" },
        {
          label: "操作",
          width: "150",
          fixed: "right",
          align: "center",
          target: ["table"],
          renderCell: (h, value, row, index) => {
            return (
              <div>
                <el-button size="mini" class="f-12 c-link" type="text" onClick={e => this.toReportInfo(row)}>
                  查看日志
                </el-button>
              </div>
            );
          }
        }
      ]
    };
  },
  created () {
  },
  mounted () {

  },
  methods: {
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
    toReportInfo(row) {
      this.$router.push("/report/errorInfo/projectCode/" + row.code);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
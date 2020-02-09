<template>
  <pannel v-bind="$attrs" v-on="$listeners">
    <div class="p-10 info-table">
      <dy-table border ref="dyTable" v-loading="loading" :columns="columns" :rows="rows"></dy-table>
    </div>
  </pannel>
</template>

<script type='text/ecmascript-6'>
import baseMixins from "../../../mixins/baseMixins";
import projectApi from "../../project/api";
import reportApi from '../../report/api';
import pannel from './pannel';
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
        { label: "异常名称", prop: "name" },

        { label: "更新日期", prop: "updateDate" },
        {
          label: "操作",
          width: "70",
          fixed: "right",
          align: "center",
          target: ["table"],
          renderCell: (h, value, row, index) => {
            return (
              <div>
                <el-button size="mini" class="f-12 c-link" type="text" onClick={e => this.toReportInfo(row)}>
                  查看详情
                </el-button>
              </div>
            );
          }
        }
      ]
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    async getData() {
      let params = {
        pageNum: this.pageNum,
        pageSize: 6,
        ...this.dataForm
      };
      let [err, ret] = await this.$to(reportApi.fetchResolveList(params));
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
      this.$router.push("/report/info/" + row.id);
    },
  }
}
</script>

<style lang='scss' scoped>
.info-table{
  max-height: calc(40vh - 45px);
  overflow: hidden;
}
</style>
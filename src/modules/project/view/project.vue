<template>
  <div class="project-list">
    <div class="search">
      <el-form
        class="base-form"
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="getData()"
      >
        <el-form-item label="方案名称：">
          <el-input
            v-model="dataForm.name"
            clearable
            placeholder="方案名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="getData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dy-table
      border
      ref="dyTable"
      v-loading="loading"
      :columns="columns"
      :rows="rows"
    ></dy-table>
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
import baseMixins from '../../../mixins/baseMixins';
export default {
  mixins:[baseMixins.pageMixin],
  data () {
    return {
      dataForm:{},
      loading:false,
      rows: [
        {
          apikey:"sad",
          keyVisible:false
        }
      ],
      columns: [
        // { type: 'index', align: 'center', label: '序号' },
        { label: '项目名称', prop: 'name' },
        { label: '项目编码', prop: 'code', width: 120 },
        { label: '项目类型', prop: 'type', width: 120 },
        { label: '编写语言', prop: 'language', width: 120 },
        { label: '使用框架', prop: 'frame'},
        { label: '更新日期', prop: 'updateDate'},
        { label: 'apikey', prop: 'apikey',
          renderCell: (h, value, row) => (
            <div>
              <span class="apikey-bg p-h-5">{row.keyVisible?row.apikey:'******'}</span>
              <el-button onClick={()=>this.showApikey(row)} plain class="m-l-10">{row.keyVisible?'不显示':'显示'}</el-button>
            </div>
          )
        }
      ]
    }
  },
  created () {
  },
  mounted () {

  },
  methods:{
    getData(){

    },
    showApikey(row){
      if(row.keyVisible){
        row.keyVisible=false;
      }else{
        row.keyVisible=true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project-list {
  padding: 16px;
  background-color: #ffffff;
  /deep/ .apikey-bg{
    background-color: #efefef;
    display: inline-block;
  }
}
</style>

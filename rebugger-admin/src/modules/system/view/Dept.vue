
<template>
  <div class="page-dept--list">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input size="small" v-model="dataForm.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="queryForm()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="info" @click="exportHandle()">导入</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="success" @click="exportHandle()">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-table
      :data="dataList"
      border
      size="small"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"> -->
    <!-- :evalFunc="func" :evalArgs="args" -->
    <tree-table :data="dataList" :typeName="typeName" @selectionChange="selectionChangeHandle" :expandAll="expandAll">
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column prop="parent_id" header-align="center" align="center" label="父级id">
      </el-table-column>
      <el-table-column prop="order_num" header-align="center" align="center" label="排序">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)" v-if="$hasPermission('dept:tb-depts:edit')">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)" v-if="$hasPermission('dept:tb-depts:delete')">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <!-- </el-table> -->
    <div class="m-t-10 a-c">
      <el-pagination class="a-c" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update :visible="addOrUpdateVisible" ref="addOrUpdate" @closeModel="addOrUpdateVisible=false" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './DeptAddOrUpdate'
// import treeTable from '../../../components/TreeTable'
// import treeToArray from '../../../components/TreeTable/eval.js'

export default {
  data () {
    return {
      dataForm: {
        name: ''
      },
      query: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      // func: treeToArray,
      expandAll: false,
      typeName: '组织名称',
      args: null
    }
  },
  components: {
    AddOrUpdate
    // treeTable
  },
  activated () {
    this.getDataList()
  },
  methods: {
    resetForm () {
      this.dataForm = {}
      this.query = {}
    },
    queryForm () {
      this.query = JSON.parse(JSON.stringify(this.dataForm))
      this.getDataList()
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$axios.get(
        `${this.$baseUrl}/dept/tb-depts/list`,
        {
          params: {
            'pageNum': this.pageIndex,
            'pageSize': this.pageSize,
            'query': this.query
          }
        }
      ).then(({ data }) => {
        if (data && data.success === 1) {
          this.dataList = data.data
          // this.totalPage = data.data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      console.log(val)
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = id || 0
        this.$refs.addOrUpdate.init()
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定进行${id ? '删除' : '批量删除'}操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          `${this.$baseUrl}/dept/tb-depts/delete`,
          { ids }
        ).then(({ data }) => {
          if (data && data.success === 1) {
            this.getDataList()
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message({
              message: data.errMsg,
              type: 'error',
              duration: 1500
            })
          }
        })
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-dept--list {
  padding: 16px;
  background-color: #ffffff;
}
</style>

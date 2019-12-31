<template>
  <div class="sys-user--list">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input size="small" v-model="dataForm.username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!-- $hasPermission('sys:user:save') -->
        <el-button size="small" v-if="true" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
      <!-- v-if="$hasPermission('sys:user:delete')" -->
      <el-form-item>
        <!-- $hasPermission('sys:user:delete') -->
        <el-button size="small" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
      <!-- v-if="$hasPermission('sys:user:export')" -->
      <el-form-item>
        <el-button size="small" type="info" @click="exportHandle()">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" size="small" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="userId" header-align="center" align="center" width="80" label="ID">
      </el-table-column>
      <el-table-column prop="username" header-align="center" align="center" label="用户名">
      </el-table-column>
      <el-table-column prop="deptName" header-align="center" align="center" label="所属部门">
      </el-table-column>
      <el-table-column prop="email" header-align="center" align="center" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" header-align="center" align="center" label="手机号">
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="updateStatusHandle(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" width="180" label="创建时间">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <!-- $hasPermission('sys:user:update') -->
          <el-button v-if="true" type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
          <el-button v-if="true" type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-16 a-c">
      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './UserAddOrUpdate'
// import Cookies from 'js-cookie'
// import qs from 'qs'
export default {
  data () {
    return {
      dataForm: {
        username: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      const data = require('./user-list.json')

      if (data && data.code === 0) {
        this.dataList = data.data
        this.totalPage = data.count
      } else {
        this.dataList = []
        this.totalPage = 0
      }
      this.dataListLoading = false

      // this.$http.get(
      //   `${window.SITE_CONFIG['baseURL']}/sys/user/list`,
      //   {
      //     params: {
      //       'page': this.pageIndex,
      //       'limit': this.pageSize,
      //       'username': this.dataForm.username
      //     }
      //   }
      // ).then(({data}) => {
      //   if (data && data.code === 0) {
      //     this.dataList = data.data
      //     this.totalPage = data.count
      //   } else {
      //     this.dataList = []
      //     this.totalPage = 0
      //   }
      //   this.dataListLoading = false
      // })
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
        return item.userId
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(
          `${window.SITE_CONFIG['baseURL']}/sys/user/delete`,
          ids
        ).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => { })
    },
    // 修改状态
    updateStatusHandle (row) {
      this.$confirm(`确定对[id=${row.userId}]状态进行[${row.status ? '开启' : '禁用'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(
          `${window.SITE_CONFIG['baseURL']}/sys/user/status`,
          {
            'userId': row.userId,
            'status': row.status
          },
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }
        ).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            row.status = Number(!row.status)
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {
        row.status = Number(!row.status)
      })
    }
    // 导出
    // exportHandle () {
    //   var params = {
    //     'token': Cookies.get('token'),
    //     'username': this.dataForm.username
    //   }
    //   window.location.href = `${window.SITE_CONFIG['baseURL']}/sys/user/export?${qs.stringify(params)}`
    // }
  }
}
</script>
<style lang="scss" scoped>
.sys-user--list {
  padding: 16px;
  background-color: #ffffff;
}
</style>

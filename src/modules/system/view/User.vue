<template>
  <div class="sys-user--list">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getData()">
      <el-form-item>
        <el-input size="small" v-model="dataForm.username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getData()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!-- $hasPermission('sys:user:save') -->
        <el-button size="small" v-if="true" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
      <!-- v-if="$hasPermission('sys:user:delete')" -->
      <el-form-item>
        <!-- $hasPermission('sys:user:delete') -->
        <el-button
          size="small"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
      </el-form-item>
      <!-- v-if="$hasPermission('sys:user:export')" -->
      <!-- <el-form-item>
        <el-button size="small" type="info" @click="exportHandle()">导出</el-button>
      </el-form-item> -->
    </el-form>
    
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

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :user="currentRow" @refreshDataList="getData"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from "./UserAddOrUpdate";
import userApi from "../api";
import baseMixins from "../../../mixins/baseMixins";
// import Cookies from 'js-cookie'
// import qs from 'qs'
export default {
  mixins: [baseMixins.pageMixin],
  data () {
    return {
      dataForm: {
        username: ""
      },
      currentRow: {},
      loading: false,
      dataList: [],
      dataListSelections: [],
      addOrUpdateVisible: false,
      rows: [],
      columns: [
        // { type: 'index', align: 'center', label: '序号' },
        { label: "用户名", prop: "name" },
        { label: "所属部门", prop: "orgName" },
        { label: "邮箱", prop: "email" },
        { label: "手机号", prop: "tel" },
        { label: "创建时间", prop: "createDate" },
        {
          label: "操作",
          width: "200",
          fixed: "right",
          align: "center",
          target: ["table"],
          renderCell: (h, value, row, index) => {
            return (
              <div>
                <el-button
                  size="mini"
                  type="text"
                  class="el-dropdown-link"
                  onClick={e => this.edit(row)}
                >
                  编辑
                </el-button>
               <el-button
                  size="mini"
                  type="text"
                  class="el-dropdown-link"
                  onClick={e => this.delete(row)}
                >
                  删除
                </el-button>
                </div>
            );
          }
        }

      ]
    };
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 获取数据列表
    async getData () {
      // const data = require("./user-list.json");
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.dataForm
      };
      let [err, ret] = await this.$to(userApi.fetchUserList());

      if (ret && ret.code === 200) {
        this.rows = ret.data.list || [];
        this.total = ret.data.total;
      } else {
        this.rows = [];
        this.total = 0;
      }
    },
    async delete (row) {
      let str = "确定要删除该用户吗？";
      const ret = await this.$utils.confirm(str);
      if (ret) {
        let [err, ret] = await this.$to(
          userApi.deleteUser({ ids: [row.id] })
        );
        if (err) return;
        if (ret && ret.code == 200) {
          this.$utils.message("删除成功！");
          this.getData();
        }
      }
    },
    edit(row) {
      this.addOrUpdateHandle(row);
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true;
      this.currentRow = row || {};
      this.$nextTick(() => {
        // this.$refs.addOrUpdate.dataForm.id = id || 0;
        this.$refs.addOrUpdate.init();
      });
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
};
</script>
<style lang="scss" scoped>
.sys-user--list {
  padding: 16px;
  background-color: #ffffff;
}
</style>

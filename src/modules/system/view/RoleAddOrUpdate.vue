<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptName">
        <el-popover ref="deptListPopover" placement="bottom-start" trigger="click">
          <el-tree :data="deptList" :props="deptListTreeProps" node-key="deptId" ref="deptListTree" @current-change="deptListTreeCurrentChangeHandle" :highlight-current="true" :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.deptName" v-popover:deptListPopover :readonly="true" placeholder="所属部门"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item size="mini" label="功能授权">
            <el-tree :data="menuList" :props="menuListTreeProps" node-key="menuId" ref="menuListTree" show-checkbox>
            </el-tree>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item size="mini" label="数据授权">
            <el-tree :data="deptList" :props="deptListTreeProps" node-key="deptId" ref="deptListTreeByAuth" show-checkbox>
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      visible: false,
      deptList: [],
      deptListTreeProps: {
        label: 'name',
        children: 'children'
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        id: 0,
        roleName: '',
        deptId: 0,
        deptName: '',
        remark: ''
      },
      dataRule: {
        roleName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ]
      },
      tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题.
    }
  },
  methods: {
    init () {
      Promise.all([
        this.getDeptList(),
        this.getMenuList()
      ]).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.menuListTree.setCheckedKeys([])
          this.$refs.deptListTreeByAuth.setCheckedKeys([])
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.getRoleInfo()
          }
        })
      })
    },
    // 获取部门列表
    getDeptList () {
      return new Promise((resolve, reject) => {
        let data = require('./dept-list.json')
        this.deptList = this.$utils.treeDataTranslate(data || [], 'deptId')
        resolve()
      })

      // return this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/dept/list`).then(({data}) => {
      //   this.deptList = treeDataTranslate(data || [], 'deptId')
      // })
    },
    // 获取角色列表
    getMenuList () {
      return new Promise((resolve, reject) => {
        let data = require('./menu.json')
        this.menuList = this.$utils.treeDataTranslate(data || [], 'menuId')
        resolve()
      })

      // return this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/menu/list`).then(({data}) => {
      //   this.menuList = treeDataTranslate(data || [], 'menuId')
      // })
    },
    // 获取角色信息
    getRoleInfo () {
      let data = require('./role-info.json')
      //      this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/role/info/${this.dataForm.id}`).then(({data}) => {
      if (data && data.code === 0) {
        this.dataForm.roleName = data.role.roleName
        this.dataForm.deptId = data.role.deptId
        this.dataForm.remark = data.role.remark
        // 部门树设置当前选中节点
        this.$refs.deptListTree.setCurrentKey(this.dataForm.deptId)
        this.dataForm.deptName = this.dataForm.deptId === this.$refs.deptListTree.getCurrentKey()
          ? this.$refs.deptListTree.getCurrentNode()['name']
          : ''
        // 功能授权
        this.$refs.menuListTree.setCheckedKeys(this.removeTreeTempKeyHandle(data.role.menuIdList))
        // 数据授权
        this.$refs.deptListTreeByAuth.setCheckedKeys(this.removeTreeTempKeyHandle(data.role.deptIdList))
      }
      //       })
    },
    // 部门树选中
    deptListTreeCurrentChangeHandle (data, node) {
      this.dataForm.deptId = data.deptId
      this.dataForm.deptName = data.name
    },
    // 移除tree临时key和半选中状态项
    removeTreeTempKeyHandle (list) {
      var idx = list.indexOf(this.tempKey)
      if (idx !== -1) {
        list.splice(idx, list.length - idx)
      }
      return list
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http.post(
            `${window.SITE_CONFIG['baseURL']}/sys/role/${!this.dataForm.id ? 'save' : 'update'}`,
            {
              'roleId': this.dataForm.id || undefined,
              'roleName': this.dataForm.roleName,
              'deptId': this.dataForm.deptId,
              'deptName': this.dataForm.deptName,
              'remark': this.dataForm.remark,
              'menuIdList': [
                ...this.$refs.menuListTree.getCheckedKeys(),
                ...[this.tempKey],
                ...this.$refs.menuListTree.getHalfCheckedKeys()
              ],
              'deptIdList': [
                ...this.$refs.deptListTreeByAuth.getCheckedKeys(),
                ...[this.tempKey],
                ...this.$refs.deptListTreeByAuth.getHalfCheckedKeys()
              ]
            }
          ).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

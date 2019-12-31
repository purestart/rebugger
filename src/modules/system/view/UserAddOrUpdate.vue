<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataForm.username" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptName">
        <el-popover ref="deptListPopover" placement="bottom-start" trigger="click">
          <el-tree :data="deptList" :props="deptListTreeProps" node-key="deptId" ref="deptListTree" @current-change="deptListTreeCurrentChangeHandle" :highlight-current="true" :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.deptName" v-popover:deptListPopover :readonly="true" placeholder="所属部门"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

// import { isEmail, isMobile } from '@/utils/validate'
export default {
  data () {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('必填项不能为空'))
      } else {
        callback()
      }
    }
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('必填项不能为空'))
      } else if (this.dataForm.password !== value) {
        callback(new Error('确认密码与密码输入不一致'))
      } else {
        callback()
      }
    }

    // var validateEmail = (rule, value, callback) => {
    //   if (!isEmail(value)) {
    //     callback(new Error('邮箱格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateMobile = (rule, value, callback) => {
    //   if (!isMobile(value)) {
    //     callback(new Error('手机号格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      visible: false,
      deptList: [],
      deptListTreeProps: {
        label: 'name',
        children: 'children'
      },
      roleList: [],
      dataForm: {
        id: 0,
        username: '',
        deptId: 0,
        deptName: '',
        password: '',
        comfirmPassword: '',
        salt: '',
        email: '',
        mobile: '',
        roleIdList: [],
        status: 1
      },
      dataRule: {
        username: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
          // { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
          // { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      Promise.all([
        this.getDeptList(),
        this.getRoleList()
      ]).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.getUserInfo()
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
    getRoleList () {
      return new Promise((resolve, reject) => {
        let data = require('./role-list.json')
        if (data && data.code === 0) {
          this.roleList = data.data || []
          resolve()
        }
      })
      // return this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/role/select`).then(({data}) => {
      //   if (data && data.code === 0) {
      //     this.roleList = data.list || []
      //   }
      // })
    },
    // 获取用户信息
    getUserInfo () {
      let data = require('./user-info.json')
      // this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/user/info/${this.dataForm.id}`).then(({data}) => {
      if (data && data.code === 0) {
        this.dataForm.username = data.user.username
        this.dataForm.deptId = data.user.deptId
        this.dataForm.salt = data.user.salt
        this.dataForm.email = data.user.email
        this.dataForm.mobile = data.user.mobile
        this.dataForm.roleIdList = data.user.roleIdList
        this.dataForm.status = data.user.status
        // 部门树设置当前选中节点
        this.$refs.deptListTree.setCurrentKey(this.dataForm.deptId)
        this.dataForm.deptName = this.dataForm.deptId === this.$refs.deptListTree.getCurrentKey()
          ? this.$refs.deptListTree.getCurrentNode()['name']
          : ''
      }
      // })
    },
    // 部门树选中
    deptListTreeCurrentChangeHandle (data, node) {
      this.dataForm.deptId = data.deptId
      this.dataForm.deptName = data.name
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http.post(
            `${window.SITE_CONFIG['baseURL']}/sys/user/${!this.dataForm.id ? 'save' : 'update'}`,
            {
              'userId': this.dataForm.id || undefined,
              'username': this.dataForm.username,
              'deptId': this.dataForm.deptId,
              'deptName': this.dataForm.deptName,
              'password': this.dataForm.password,
              'salt': this.dataForm.salt,
              'email': this.dataForm.email,
              'mobile': this.dataForm.mobile,
              'status': this.dataForm.status,
              'roleIdList': this.dataForm.roleIdList
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

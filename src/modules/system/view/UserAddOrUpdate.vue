<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="onSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="dataForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="dataForm.loginName" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.id" label="密码" prop="password" :class="{ 'is-required': !user.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.id" label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !user.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptName">
        <el-popover ref="deptListPopover" placement="bottom-start" trigger="click">
          <el-tree :data="deptList" :props="deptListTreeProps" node-key="deptId" ref="deptListTree" @current-change="deptListTreeCurrentChangeHandle" :highlight-current="true" :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.orgName" v-popover:deptListPopover :readonly="true" placeholder="所属部门"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="dataForm.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.isDel">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

// import { isEmail, isMobile } from '@/utils/validate'
import userApi from "../api";
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("必填项不能为空"));
      } else {
        callback();
      }
    };
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("必填项不能为空"));
      } else if (this.dataForm.password !== value) {
        callback(new Error("确认密码与密码输入不一致"));
      } else {
        callback();
      }
    };

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
        label: "name",
        children: "children"
      },
      roleList: [],
      dataForm: {
        // id: 0,
        // username: "",
        // deptId: 0,
        // deptName: "",
        // password: "",
        // comfirmPassword: "",
        // salt: "",
        // email: "",
        // mobile: "",
        // roleIdList: [],
        // status: 1
      },
      dataRule: {
        name: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        loginName: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        // deptName: [
          // { required: true, message: "必填项不能为空", trigger: "change" }
        // ],
        password: [
          { validator: validatePassword, trigger: "blur" }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: "blur" }
        ]
        // email: [
          // { required: true, message: "必填项不能为空", trigger: "blur" }
          // { validator: validateEmail, trigger: 'blur' }
        // ],
        // mobile: [
          // { required: true, message: "必填项不能为空", trigger: "blur" }
          // { validator: validateMobile, trigger: 'blur' }
        // ]
      }
    };
  },
  methods: {
    init () {
      this.visible = true;
      if (this.user && this.user.id) {
        console.log("编辑");
        this.dataForm = this.user;
      } else {
        console.log("新增");

        this.dataForm = {};
      }
      // Promise.all([
      //   this.getDeptList(),
      //   this.getRoleList()
      // ]).then(() => {
      //   this.visible = true;
      //   this.$nextTick(() => {
      //     this.$refs["dataForm"].resetFields();
      //     if (this.dataForm.id) {
      //       this.getUserInfo();
      //     }
      //   });
      // });
    },
    // 获取部门列表
    getDeptList () {
      return new Promise((resolve, reject) => {
        // let data = require('./dept-list.json')
        let data = [];
        this.deptList = this.$utils.treeDataTranslate(data || [], "deptId");
        resolve();
      });
      // return this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/dept/list`).then(({data}) => {
      //   this.deptList = treeDataTranslate(data || [], 'deptId')
      // })
    },
    // 获取角色列表
    getRoleList () {
      return new Promise((resolve, reject) => {
        let data = require("./role-list.json");
        if (data && data.code === 0) {
          this.roleList = data.data || [];
          resolve();
        }
      });
      // return this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/role/select`).then(({data}) => {
      //   if (data && data.code === 0) {
      //     this.roleList = data.list || []
      //   }
      // })
    },
    // 部门树选中
    deptListTreeCurrentChangeHandle (data, node) {
      this.dataForm.deptId = data.deptId;
      this.dataForm.deptName = data.name;
    },
    // 表单提交
    async onSubmit () {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          let params = this.dataForm;
          console.log(params);
          let [err, ret] = await this.$to(userApi.createOrUpdateUser(params));
          if (ret && ret.code == 200) {
            this.$utils.message("保存成功！");
            this.visible = false;
            this.$emit("refreshDataList");
          }
        }
      });
    }
  }
};
</script>

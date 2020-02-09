<template>
  <div class="header-container">
    <div class="logo" :class="isCollapse?'collapse':''">
      <!-- <img v-if="!isCollapse" class="img-logo p-l-20" src="../../../assets/logo1.png"> -->
      <span v-if="!isCollapse" class="f-18">异常监控系统</span>
      <dy-icon v-if="isCollapse" name="gcjzlogo" size="37" />
    </div>
    <div class="h_nav">
      <dy-icon :name="isCollapse?'expand':'unexpand'" @click="expandChange" size="45" class="expand" />
      <ul class="list">
        <li v-if="false">后台管理系统</li>
        <!-- <el-popover placement="bottom" width="300" trigger="hover">
          <div style="display:flex">
            <div @click="toPage('eng-chart')" style="cursor: pointer;flex:1;text-align:center;padding:10px;5px;background-color:#f2f2f2;margin:5px;">工程线</div>
            <div @click="toPage('dealer-chart')" style="cursor: pointer;flex:1;text-align:center;padding:10px;5px;background-color:#f2f2f2;margin:5px;">经销商</div>
            <div @click="toPage('work-team')" style="cursor: pointer;flex:1;text-align:center;padding:10px;5px;background-color:#f2f2f2;margin:5px;">施工队</div>
          </div>
          <li slot="reference">驾驶舱</li>
        </el-popover> -->
        <el-dropdown v-if="false" trigger="hover" @command="changeSys()">
          <li>更多系统</li>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="安全设置">客服系统</el-dropdown-item>
            <el-dropdown-item command="changetheme">呼叫中心系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </ul>
      <div class="h_user">
        <!-- <div class="gap"></div> -->
        <!-- <el-popover
            placement="bottom-end"
            trigger="hover"
            width="200"
            v-model="schedulePopver">
            <p>您有0条未读消息 <a href="javascript:void(0)">查看所有></a></p>
            <a slot="reference" href="javascript:void(0)">
              <el-badge :value="10" :max="99" class="bell-item">
                <span class="bell-text">待办</span>
              </el-badge>
            </a>
        </el-popover>-->
        <!-- <div class="gap"></div> -->
        <div flex="main:center cross:center" class="f-14 m-r-15">
          <!-- <span class="h-100 a-c p-r-15">
            <a class="c-white" target="_blank" href="#">旧系统</a>
          </span> -->
          <a class="a-c p-r-15 c-white" style="cursor: pointer;" href="/doc" target="_blank">
            <dy-icon name="wenhao" size="16" />
          </a>
        </div>
        <el-dropdown trigger="hover" placement="bottom-end" @command="selectSelf">
          <div class="login-user">
            <img src="../../../assets/images/head.jpg" alt>
            <span class="username">{{userInfo.name?userInfo.name:'未登录'}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="桌面配置">桌面配置</el-dropdown-item> -->
            <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
            <el-dropdown-item command="password" v-if="!$store.getters.isOp">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="3">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <edit-model :hideSubmitBtn="false" title="修改个人信息" :modelVisible="modelVisibleUser" @submit="onSubmitUser" @close="modelVisibleUser=false">
      <dy-form v-if="!isPwd" ref="formUser" :data="formDataUser" class="my-form col-2 m-r-16 p-v-16"></dy-form>
      <dy-form v-else ref="formPwd" :data="formDataPwd" class="my-form col-2 m-r-16 p-v-16"></dy-form>
    </edit-model>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SystemApi from "../../../modules/system/api";
export default {
  components: {
  },
  data () {
    return {
      modelVisibleUser: false,
      isPwd: false,
      msgPopver: false,
      showThemeBox: false,
      schedulePopver: false,
      modelVisible: false,
      selectVisible: false,
      userDashboard: [],
      userDashboardClone: [],
      rowHight: 30,
      colNum: 8,
      formDataUser: {
        props: {
          size: "small"
          // disabled:
          //   this.$utils.getUserInfo('userType') === this.$c.UserTypeV.欧派
        },
        model: {},
        items: [
          {
            label: "登录名",
            prop: "loginName",
            props: { disabled: true },
            verify: {}
          },
          { label: "用户名", prop: "name", verify: { maxLength: 20 } },
          // { label: "昵称", prop: "nickName", verify: { maxLength: 20, canBeEmpty: "" } },
          // { label: "岗位", prop: "position", props: { disabled: true } },
          // {
          //   label: "代码",
          //   prop: "code",
          //   props: { disabled: true },
          //   target: ["table", "editForm", "view"],
          //   verify: { maxLength: 20 }
          // },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            target: ["table", "editForm"],
            verify: {},
            options: this.$c.options.sex
          },
          {
            label: "手机号码",
            prop: "tel",
            target: ["table", "editForm", "view"],
            verify: { phone: true }
          },
          {
            label: "邮箱",
            prop: "email",
            target: ["table", "editForm", "view"],
            verify: { email: true }
          }
        ],
        btns: []
      },
      formDataPwd: {
        props: { size: "small" },
        model: {},
        items: [
          {
            label: "原密码",
            type: "password",
            prop: "password",
            verify: { maxLength: 20 }
          },
          {
            label: "新密码",
            type: "password",
            prop: "newPassword",
            verify: { maxLength: 20 }
          },
          {
            label: "重复新密码",
            type: "password",
            prop: "newPassword2",
            verify: { watch: "newPassword", maxLength: 20 }
          }
        ],
        btns: []
      }
    };
  },
  props: ["username", "isCollapse"],
  computed: {
    ...mapState({
      userInfo: state => state.default.userInfo
    }),
    selected () {
      return this.userDashboard.map(
        userDashboard => userDashboard.dashboard.id
      );
    }
  },
  created () {
    this.initData();
  },
  mounted () { },
  methods: {
    ...mapActions(["fetchCourse", "changeTheme", "logOut"]),
    expandChange () {
      this.$emit("changeCollapse");
    },
    initData () { },
    onLayoutUpdated () { },
    sumitForm () { },
    toPage (name) {
      this.$router.push({ name: name });
    },
    async onChangeUserInfo () {
      this.isPwd = false;
      this.modelVisibleUser = true;
      // const { data } = await this.$store.dispatch(
      //   "getUserInfo",
      //   this.$store.state.default.userInfo.id
      // );
      // if (data) {
      this.formDataUser.model = this.userInfo;
      //
    },
    async onSubmitUser () {
      if (this.isPwd) {
        this.$refs["formPwd"].validate(async valid => {
          if (valid) {
            if (
              this.formDataPwd.model.newPassword !==
              this.formDataPwd.model.newPassword2
            ) {
              this.$utils.message("2次输入的密码不一致", "error");
              return;
            }
            // const { data } = await this.$store.dispatch(
            //   "changePwd",
            //   this.formDataPwd.model
            // );
            // console.log(this.formDataPwd.model);
            let params = {...this.formDataPwd.model, id: this.formDataUser.model.id};
            params.id = this.userInfo.id;
            console.log(params);

            let [err, ret] = await this.$to(SystemApi.updatePassword(params));
            if (ret && ret.code == 200) {
              this.modelVisibleUser = false;
              this.$utils.message("修改密码成功");
            }
          } else {
            return false;
          }
        });
      } else {
        this.$refs["formUser"].validate(async valid => {
          if (valid) {
            // const { data } = await this.$store.dispatch(
            //   "userSave",
            //   this.formDataUser.model
            // );
            let [err, ret] = await this.$to(SystemApi.createOrUpdateUser(this.formDataUser.model));
            if (ret && ret.code == 200) {
              this.modelVisibleUser = false;
              this.$utils.message("修改个人资料成功");
            }
          } else {
            return false;
          }
        });
      }
    },
    onChangePwd () {
      this.isPwd = true;
      this.modelVisibleUser = true;
    },
    selectSelf (a) {
      switch (a) {
        case "桌面配置":
          this.modelVisible = true;
          break;
        case "3":
          // this.doLogout()
          this.$router.push("/login");
          break;
        case "changetheme":
          // this.ThemeChange();
          break;
        case "userInfo":
          this.onChangeUserInfo();
          break;
        case "password":
          this.onChangePwd();
          break;
      }
    },
    changeSys () {
      // 更换系统
    },
    doLogout () {
      // 注销登录信息
      // this.$router.push({ path: "/login" });
      this.logOut();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/vars.scss";

.header-container {
  height: 45px;
  display: flex;
  background-color: $bg_color;
  .logo {
    width: 180px;
    // font-size: 20px;
    color: rgba(255, 255, 255, 1);
    // line-height: 28px;
    display: flex;
    align-items: center;
    box-pack: center;
    -webkit--moz-box-pack: center;
    -moz-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    // transition: all .5s;
    &.collapse {
      width: 37px;
    }
    img {
      max-height: 50px;
    }
    // padding-left: 20px;
    // padding: 16px 35px 6px 25px;
  }
  .h_nav {
    .expand {
      &:hover {
        background-color: #ff7c1a;
      }
    }
    flex: 1;
    // padding-left: 14px;
    display: flex;
    .list {
      flex: 1;
      height: 100%;
      li {
        float: left;
        // width: 90px;
        height: 100%;
        font-size: 15px;

        color: white;
        line-height: 50px;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        cursor: pointer;
        // &:hover {
        //   // border-bottom: 2px solid $focusfontcolor;
        //   // cursor: pointer;
        // }
        // &.active{
        //   color:$focusfontcolor;
        // }
      }
    }
    .h_user {
      display: flex;
      // min-width: 372px;
      padding-right: 24px;
      .gap {
        width: 1px;
        height: 14px;
        margin-top: 18px;
        margin-right: 17px;
        background: $fontcolor;
      }
      .el-dropdown-link {
        color: $fontcolor;
      }
      .el-icon-bell {
        align-self: flex-end;
        width: 12px;
        height: 12px;
        margin-bottom: 5px;
        margin-right: 23px;
        margin-left: 5px;
        color: $fontcolor;
      }
      .bell-text {
        margin-right: 30px;
        color: $fontcolor;
        font-size: 14px;
        color: #fff;
      }
      .el-icon-setting {
        color: $fontcolor;
      }
      .login-user {
        line-height: 45px;
        vertical-align: middle;
        display: -ms-flexbox;
        display: -moz-box;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-align: center;
        -moz-box-align: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          border: 1px solid #e4e4e4;
          border-radius: 100%;
          margin-right: 5px;
        }
        .username {
          color: #fff;
          font-size: 14px;
          // margin-right: 13px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.header-container {
  .bell-item {
    .is-fixed {
      top: 15px;
      right: 30px;
    }
  }
}
.setting-theme-dropdown {
  position: relative;
  .theme-menu-box {
    position: absolute;
    left: -50px;
    top: 0px;
    background-color: #fff;
    color: #777;
    padding-right: 20px;
    .theme-box {
      width: 30px;
      height: 30px;
      // background-color:#fee;
      cursor: pointer;
      &.red-theme {
        background-color: #f08519;
      }
      &.gray-theme {
        background-color: #b0b0b0;
      }
    }
  }
}
</style>

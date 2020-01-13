<template>
  <div class="login-box">
    <div class="layer-box">
    <div class="mian-box">
      <!-- <img src=""> -->
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container full-width">
        <div class="header">
          <!-- <img src=""> -->
          <h3 class="title">
            <span class="tit-one">辰星web异常监控系统</span>
            <span class="tit-two m-t-10">Minitor System</span>
          </h3>
          <!-- <img src=""> -->
        </div>
        <el-form-item prop="companyCode">
          <el-input type="text" v-model="ruleForm2.companyCode" auto-complete="off" placeholder="请输入组织编码"></el-input>
          <span class="el-input__prefix "><img class="myIcon el-input__icon" src="../../../assets/images/login_icon2_n.png"></span>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="请输入账户号码"></el-input>
          <span class="el-input__prefix "><img class="myIcon el-input__icon" src="../../../assets/images/login_icon2_n.png"></span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
          <span class="el-input__prefix "><img class="myIcon el-input__icon" src="../../../assets/images/login_icon3_n.png"></span>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import NProgress from 'nprogress'
import publicApi from "../api";
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        companyCode: "oristar",
        userName: "",
        password: ""
      },
      rules2: {
        // organNum: [
        //   { required: true, message: '请输入组织机构代码', trigger: 'blur' },
        //   //{ validator: validaePass }
        // ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          // { validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  mounted() {
    let formData = this.$ls.getObj("cacheForm");
    if (formData) {
      let ruleForm2 = {
        companyCode: this.$utils.deCode(formData.companyCode),
        userName: this.$utils.deCode(formData.userName),
        password: this.$utils.deCode(formData.password)
      };
      this.ruleForm2 = ruleForm2;
      this.checked = formData.checked;
    }
  },
  methods: {
    ...mapMutations(["updateUserInfo"]),
    handleReset2 () {
      this.$refs.ruleForm2.resetFields();
    },
    async handleSubmit2 () {
      if (this.checked) {
        // 加密
        let formData = {
          checked: this.checked,
          companyCode: this.$utils.enCode(this.ruleForm2.companyCode),
          userName: this.$utils.enCode(this.ruleForm2.userName),
          password: this.$utils.enCode(this.ruleForm2.password)
        };
        this.$ls.set("cacheForm", formData);
      } else {
        this.$ls.remove("cacheForm");
      }
      let [err, ret] = await this.$to(publicApi.login(this.ruleForm2));
      if (err) {
        console.log(err);
        return;
      }
      console.log(ret);
      if (ret.code == 200) {
        // 登录成功 存储用户信息 存储token
        sessionStorage.setItem("token", ret.token);
        localStorage.setItem("user", JSON.stringify(ret.data));
        this.updateUserInfo(ret.data);
        this.$router.push("/home");
      }
      // this.$router.push('/home')
      // const { data } = await this.$store.dispatch('nativeLogin', this.ruleForm2)
      // if (data) {
      //   localStorage.setItem('nativeLogin', 1)
      //   localStorage.setItem('token', data.token)
      //   this.$store.commit('updateUser', data)
      //   this.$router.push('/')
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  height: 100%;
  width: 100%;
  // background: url("../../../assets/images/login_bg.png") no-repeat;
  background: url("../../../assets/images/login-bg.png") center left no-repeat;
  overflow: hidden;
  background-size: 100% 100%;
  overflow: hidden;
  display: -ms-flexbox;
  display: -moz-box;
  display:-webkit-box;
  display: -webkit-flex;
  display: flex;
  /deep/ .el-button{
    background-color: #390b98;
    color: #FFF;
    border-color: #580ef3;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #6835d2;
    border-color: #8767ca;
  }
  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #8767ca;
  }
  .layer-box{
    background-color: #111d75;
    height: 100%;
    width: 100%;
    opacity: 0.75;
    display: flex;
    align-items:center;
    justify-content:center;
  }
  .mian-box {
    opacity: 1;
    box-shadow: 0 0 25px #cac6c6;
    margin: 72px auto;
    height: 550px;
    width: 745px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
      width: 50%;
    }
    .login-container {
      background-clip: padding-box;
      height: 100%;
      width: 50%;
      padding: 95px 35px 15px 35px;
      // background: #fff;
      // opacity: 0.8;
      /*border: 1px solid #eaeaea;*/
      .header {
        display: flex;
        -webkit--moz-box-pack: center;
        -moz-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        width: 100%;
        img {
          width: 44px;
          margin-top: 4px;
        }
        .title {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin: 0px auto 40px auto;
          color: #ffffff;
          .tit-one {
            font-size: 23px;
          }
          .tit-two {
            font-size: 10px;
          }
        }
      }
      .myIcon {
        width: 17px;
        height: 17px;
        margin-left: 3px;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
}
</style>

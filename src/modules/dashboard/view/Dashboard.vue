/*
* Description:主页
* Author:
* Update:
*/
<template>
  <div class="dashboard-container">
    <div v-loading="loading">

      <div class="info-wrapper">
        <el-row :gutter="10">
          <el-col :span="6">
            <div @click="toMyMessage" class="info-box message">
              <div class="info-icon">
                <i class="icon-font el-icon-menu"></i>
              </div>
              <div class="right-box">
                <div class="num">{{unreadCount.message}}</div>
                <div class="title">消息提醒</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="toMyAgent" class="info-box schedule">
              <div class="info-icon">
                <i class="icon-font el-icon-menu"></i>
              </div>
              <div class="right-box">
                <div class="num">{{unreadCount.todo}}</div>
                <div class="title">待办事项</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="toMyNotice" class="info-box notice">
              <div class="info-icon">
                <i class="icon-font el-icon-menu"></i>
              </div>
              <div class="right-box">
                <div class="num">{{unreadCount.notice}}</div>
                <div class="title">通知公告</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="toTemplate" class="info-box template">
              <div class="info-icon">
                <i class="icon-font el-icon-menu"></i>
              </div>
              <div class="right-box">
                <div class="num">{{unreadCount.template}}</div>
                <div class="title">制度模板</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div flex="box:mean" class="panel-wrapper m-t-10">
        <panel class="m-r-10" height = "200px" />
        <panel height = "200px" />
      </div>
      <div flex="box:mean" class="panel-wrapper m-t-10">
        <panel class="m-r-10" height = "200px" />
        <panel  height = "200px" />
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
import panel from "../fragment/pannel";
// import ItemAgent from './fragment/ItemAgent.vue'
// import ItemMessage from './fragment/ItemMessage'
// import ItemNotice from './fragment/ItemNotice.vue'
// import ItemTemplate from './fragment/ItemTemplate.vue'
// import agentApi from '../../api/agentApi.js'
const agentApi = null;
export default {
  components: {
    panel
    // ItemAgent,
    // ItemMessage,
    // ItemNotice,
    // ItemTemplate
  },
  data () {
    return {
      notices: [],
      messages: [],
      templates: [],
      todos: [],
      unreadCount: {
        message: 20,
        todo: 30,
        notice: 2,
        template: 4
      },
      loading: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.default.userInfo
    })
  },
  created () { },
  mounted () { },
  activated () {
    // this.getStoreUser();
    // this.getAgent()
    // this.getNotice()
    // this.getMessageList()
    // this.getCountUnread()
    // this.getHomeTemplate()
  },
  methods: {
    toMyMessage () {
      this.$router.push("/myMessage");
    },
    toMyAgent () {
      this.$router.push("/myAgent");
    },
    toMyNotice () {
      this.$router.push("/myNotice");
    },
    toTemplate () {
      this.$router.push("/template");
    },
    // 获取通知公告
    async getNotice () {
      let params = {
        pageNum: 1,
        pageSize: 10,
        userId: this.user.id,
        type: 1
      };
      this.loading = true;
      let data = await agentApi.getHomeNotice(params);
      this.loading = false;
      if (data.status === 200) {
        this.notices = data.data.records;
        console.log(data);
      }
    },
    // 获取消息列表
    async getMessageList () {
      let params = {
        pageNum: 1,
        pageSize: 14,
        userId: this.user.id,
        readStatus: 2
      };
      //   this.loading = true;
      let data = await agentApi.getMessageList(params);

      //   this.loading = false;
      if (data.status === 200) {
        this.messages = data.data.records;
        this.total = data.data.total;
      }
      console.log(data);
    },
    // 获取未读统计
    async getCountUnread () {
      let params = {
        userId: this.user.id,
        fdNotifyType: "todo",
        systemId: this.$bpmSysId,
        fdLoginName: this.user.companyCode !== "oppein.com"
          ? this.user.userName + "@" + this.user.companyCode
          : this.user.userName
      };
      let data = await agentApi.getCountUnread(params);
      if (data.status === 200) {
        this.unreadCount = data.data;
      }
    },
    // 获取制度模板
    async getHomeTemplate () {
      let params = {
        userId: this.user.id,
        pageNum: 1,
        pageSize: 10
      };
      let data = await agentApi.getHomeTemplate(params);
      console.log(data);
      if (data.status === 200) {
        this.templates = data.data.records;
      }
    },
    // 获取首页代办
    async getAgent () {
      let params = {
        fdNotifyType: "todo",
        fdLoginName: this.user.companyCode !== "oppein.com" ? this.user.userName + "@" + this.user.companyCode : this.user.userName,
        systemId: this.$bpmSysId,
        fdNotifySubType: "1"
      };
      this.loading = true;
      let data = await agentApi.getHomeAgent(params);
      this.loading = false;
      console.log(data);
      if (data.status === 200) {
        this.todos = data.data;
      }
    },
    getStoreUser () {
      if (!this.user.id) {
        let userStr = this.$ls.get("user");
        this.user = JSON.parse(userStr);
        console.log(this.user);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.dashboard-container {
  margin: 0px;
  .panel-wrapper{
    position: relative;
  }
  .info-wrapper {
    .info-box {
      //    background-color: rgb(83, 190, 234);
      cursor: pointer;
      display: -ms-flexbox;
      display: -moz-box;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      color: #ffffff;
      padding: 10px 30px;
      justify-content: space-between;
      box-align: center;
      -moz-box-align: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      border-radius: 5px;

      &.message {
        background-color: rgba(0, 204, 0, 1);
      }
      &.schedule {
        background-color: rgba(255, 102, 0, 1);
      }
      &.notice {
        background-color: rgba(255, 153, 0, 1);
      }
      &.template {
        background-color: rgba(255, 204, 51, 1);
      }
      .info-icon {
        .icon-font {
          font-size: 60px;
        }
      }
      .right-box {
        text-align: center;
        .num {
          font-size: 20px;
        }
        .title {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

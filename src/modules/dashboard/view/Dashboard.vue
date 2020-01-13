/*
* Description:主页
* Author:
* Update:
*/
<template>
  <div class="dashboard-container">
    <div v-loading="loading">

      <div v-if="false" class="info-wrapper">
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
      <div flex="box:first">
        <lineChartPanel :statInfo="statInfo" ref="lineChartPanel" title="日志统计" class="m-r-10" width = "75%" height = "40vh" />
        <handleInfo title="处理记录" height = "40vh" />
      </div>
      <div flex="box:mean" class="panel-wrapper m-t-10">
        <statPannel :statInfo="statInfo" title="概况" class="m-r-10" height = "200px" />
        <panel title="日志分布" height = "200px" />
      </div>
      <div flex="box:mean" class="panel-wrapper m-t-10">
        <projectPannel title="所有项目" class="" minHeight = "200px" />
        <!-- <panel  height = "200px" /> -->
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
import panel from "../fragment/pannel";
import lineChartPanel from '../fragment/lineChartPanel';
import projectPannel from '../fragment/projectPannel';
import statPannel from '../fragment/statPannel';
import handleInfo from '../fragment/handleInfo';
import dashboardApi from '../api';
const agentApi = null;
export default {
  components: {
    panel,
    lineChartPanel,
    projectPannel,
    statPannel,
    handleInfo
  },
  data () {
    return {
      statInfo:{},
      loading: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.default.userInfo
    })
  },
  created () { },
  mounted () {
    this.getStatInfo();
   },
  activated () {
  },
  methods: {
    async getStatInfo(){
      let params = {};
      let [err, ret] = await this.$to(dashboardApi.fetchDashboardStatInfo(params));
      if(err || ret.code!=200) return;
      console.log(ret);
      let xAxisData = [];
      let seriesData = [];
      if (ret.data && ret.data.dailySum) {
        ret.data.dailySum.forEach(item=>{
          xAxisData.push(item.date);
          seriesData.push(item.dayTotal);
        })
        ret.data.xAxisData = xAxisData;
        ret.data.seriesData = seriesData;
      }
      this.$refs.lineChartPanel.lineOption.xAxis[0].data = xAxisData;
      this.$refs.lineChartPanel.lineOption.series[0].data = seriesData;
      this.$refs.lineChartPanel.drawLineChart();
      this.statInfo = ret.data;
      this.$forceUpdate();
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

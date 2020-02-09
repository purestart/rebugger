<template>
  <div class="project-list">
    <div class="search">
      <el-form
        class="base-form"
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="getData()"
      >
        <el-form-item label="项目名称:">
          <el-input
            v-model="dataForm.projectName"
            clearable
            placeholder="项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目编码:">
          <el-input
            v-model="dataForm.code"
            clearable
            placeholder="项目编码"
          ></el-input>
        </el-form-item>
        <template v-for="(item, index) in dynamicSearchFormList">
          <el-form-item :key="index" :label="item.title + ':'">
            <el-input
              v-model="dataForm[item.fieldName]"
              clearable
              :placeholder="item.title"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item label="异常类型:" prop="type">
          <el-select v-model="dataForm.type" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in $c.options.errorType"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="环境类型:" prop="env">
          <el-select v-model="dataForm.env" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in $c.options.envInfo"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期筛选:">
          <el-date-picker
            clearable
            v-model="rangeDate"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="selectDate"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00','23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="getData(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dy-table
      border
      ref="dyTable"
      v-loading="loading"
      :columns="columns"
      :rows="rows"
    ></dy-table>
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
    <info-model :info="infoModelData" :project="project" ref="infoModel" />
    <resolve-model
      :info="infoModelData"
      :project="project"
      @refresh="getData"
      ref="resolveModel"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import baseMixins from "../../../mixins/baseMixins";
import projectApi from "../api";
import InfoModel from "../fragment/infoModel";
import ResolveModel from "../fragment/resolveModel";
export default {
  mixins: [baseMixins.pageMixin],
  components: {
    InfoModel,
    ResolveModel
  },
  data() {
    return {
      rangeDate: [],
      infoModelData: {},
      dynamicSearchForm: {},
      dataForm: {},
      loading: false,
      project: null,
      rows: [],
      columns: [
        // { type: 'index', align: 'center', label: '序号' },
        { label: "日志名称", prop: "name" },
        {
          label: "异常类型",
          prop: "type",
          width: 120,
          formatter: (row, column, cellValue) => this.$c.errorTypeK[cellValue]
        },
        { label: "异常发生时间", prop: "emitTime", width: 140 },
        { label: "异常信息", prop: "message" },
        { label: "项目名称", prop: "projectName" },
        {
          label: "浏览器",
          prop: "browser",
          showOverflowTooltip: true,
          renderCell: (h, value, row) => (
            <span>{row.browser + row.coreVersion}</span>
          )
        },
        { label: "路由信息", prop: "url" },
        // { label: '路由信息', prop: 'url',
        //   align: 'center',
        //   width: '150',
        //   renderCell: (h, value, row) => (
        //     <div>
        //       <span class="apikey-bg p-h-5">{row.keyVisible?row.apikey:'*********'}</span>
        //       <el-button size="mini" onClick={()=>this.showApikey(row)} plain class="m-l-10">{row.keyVisible?'不显示':'显示'}</el-button>
        //     </div>
        //   )
        // },
        {
          label: "状态",
          prop: "resolveStatus",
          width: 70,
          formatter: (row, column, cellValue) =>
            this.$c.resolveStatusK[cellValue]
        },
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
                  onClick={e => this.info(row)}
                >
                  查看详情
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  class="el-dropdown-link"
                  onClick={e => this.showResolveModel(row)}
                >
                  编辑状态
                </el-button>
                <el-dropdown
                  onCommand={command => this.handleCommand(command, row)}
                >
                  <el-button
                    type="text"
                    size="mini"
                    class="el-dropdown-link m-l-10"
                  >
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="device">
                      设备信息
                    </el-dropdown-item>
                    <el-dropdown-item command="zone">位置信息</el-dropdown-item>
                    <el-dropdown-item command="status">
                      查看状态
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            );
          }
        }
      ]
    };
  },
  computed: {
    dynamicSearchFormList() {
      let arr = [];
      let dynamicSearchForm = this.dynamicSearchForm;
      // console.log(dynamicSearchForm);
      for (let key in dynamicSearchForm) {
        arr.push(dynamicSearchForm[key]);
      }
      return arr;
    }
  },
  created() {
    if (this.$route.params.activeTab) {
      this.dataForm = {type: this.$route.params.activeTab};
    }
    if (this.$route.params.code) {
      this.dataForm = {code: this.$route.params.code};
    }
  },
  mounted() {},
  methods: {
    selectDate(val) {
      console.log(val);
      
      if (val) {
        this.dataForm.startTime = val[0];
        this.dataForm.endTime = val[1];
      } else {
        this.dataForm.startTime = undefined;
        this.dataForm.endTime = undefined;
      }
    },
    handleCommand(command, row) {
      switch (command) {
        case "device":
          this.info(row, "device");
          break;
        case "zone":
          this.info(row, "zone");
          break;
        case "status":
          this.showResolveModel(row, "view");
          break;

        default:
          break;
      }
    },
    showResolveModel(row, mode = "edit") {
      this.infoModelData = row;
      this.$nextTick(() => {
        this.$refs.resolveModel.showResolveModel(true, mode);
      });
    },
    info(row, activeTab = "info") {
      this.infoModelData = row;
      this.$nextTick(() => {
        this.$refs.infoModel.showInfoModel(true, activeTab);
      });
    },
    add() {
      this.$router.push({ name: "editProject", params: { id: 0 } });
    },
    async getData(pageNum = undefined) {
      this.loading = true;
      if(pageNum){
        this.pageNum = pageNum;
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.dataForm
      };
      let [err, ret] = await this.$to(projectApi.fetchReportList(params));
      this.loading = false;
      if (err) {
        console.log(err);
        return;
      }
      // console.log(ret);
      if (ret.code != 200) return;
      let project = ret.data.project;
      this.project = project;
      let dynamicSearchForm = {};
      if (project) {
        // let columns = JSON.parse(JSON.stringify(this.columns));
        let columns = this.columns;
        let retainNameConfig = project.retainNameConfig;
        if (retainNameConfig && retainNameConfig.length > 5) {
          retainNameConfig = JSON.parse(retainNameConfig);
          retainNameConfig.fieldName = "retainName";
          dynamicSearchForm["retainName"] = retainNameConfig;
          // console.log(retainNameConfig);
          let retainNameColumn = columns.find(
            item => item.prop == "retainName"
          );
          if (!retainNameColumn) {
            columns.push({
              label: retainNameConfig.title,
              prop: "retainName"
            });
          } else {
            retainNameColumn.label = retainNameConfig.title;
          }
        }
        let retainIdConfig = project.retainIdConfig;
        if (retainIdConfig && retainIdConfig.length > 5) {
          retainIdConfig = JSON.parse(retainIdConfig);
          retainIdConfig.fieldName = "retainId";
          dynamicSearchForm["retainId"] = retainIdConfig;
          // console.log(retainNameConfig);
          let retainNameColumn = columns.find(
            item => item.prop == "retainId"
          );
          if (!retainNameColumn) {
            columns.push({
              label: retainIdConfig.title,
              prop: "retainId"
            });
          } else {
            retainNameColumn.label = retainIdConfig.title;
          }
        }
        let retainFieldConfig = project.retainFieldConfig;
        if (retainFieldConfig && retainFieldConfig.length > 5) {
          retainFieldConfig = JSON.parse(retainFieldConfig);
          retainFieldConfig.fieldName = "retainField";
          dynamicSearchForm["retainField"] = retainFieldConfig;
          // console.log(retainNameConfig);
          let retainNameColumn = columns.find(
            item => item.prop == "retainField"
          );
          if (!retainNameColumn) {
            columns.push({
              label: retainFieldConfig.title,
              prop: "retainField"
            });
          } else {
            retainNameColumn.label = retainFieldConfig.title;
          }
        }

        this.columns = columns;
        this.dynamicSearchForm = dynamicSearchForm;
        console.log(dynamicSearchForm);
      }
      if (ret.data.list && ret.data.list.length > 0) {
        ret.data.list.forEach(item => {
          item.keyVisible = false;
        });
      }
      this.total = ret.data.total;
      this.rows = ret.data.list || [];
    },
    async delete(e, row) {
      let str = "确定要删除该项目吗？";
      const ret = await this.$utils.confirm(str);
      if (ret) {
        let [err, ret] = await this.$to(
          projectApi.deleteProject({ ids: [row.id] })
        );
        if (err) return;
        if (ret.code == 200) {
          this.$utils.message("删除成功！");
          this.getData();
        }
      }
    },
    edit(e, row) {
      this.$router.push({ name: "editProject", params: { id: row.id } });
    },
    showApikey(row) {
      if (row.keyVisible) {
        row.keyVisible = false;
      } else {
        row.keyVisible = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.project-list {
  padding: 16px;
  background-color: #ffffff;
  /deep/ .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    font-size: 12px;
  }
  /deep/ .el-icon-arrow-down {
    font-size: 12px;
  }
  /deep/ .apikey-bg {
    background-color: #efefef;
    display: inline-block;
  }
  /deep/ .el-dropdown-menu__item:not(.is-disabled):hover,
  .el-dropdown-menu__item:focus {
    background-color: #fdf4e6;
    color: #409eff;
  }
}
</style>

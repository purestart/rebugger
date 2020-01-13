<template>
  <pannel v-bind="$attrs" v-on="$listeners">
    <div flex = "box:mean" class="p-v-20 p-h-10">
      <div style="" class="b-r">
        <div id="pie-chart" class="pie-chart"></div>
      </div>
      <div style="" class="">
        <div id="pie-chart-type" class="pie-chart-type"></div>
      </div>
    </div>
  </pannel>
</template>

<script type='text/ecmascript-6'>
import pannel from "./pannel";
export default {
  props: {
    statInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    pannel
  },
  data () {
    return {
      pieOption: {
        title: {
          subtext: "项目统计分布"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} ({d}%)"
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            itemStyle: {
              // normal : {
              //     label : {
              //         show : false
              //     },
              //     labelLine : {
              //         show : false
              //     }
              // },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "14",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: [
              { value: 335, name: "直接访问： 335" },
              { value: 310, name: "邮件营销： 335" },
              { value: 234, name: "联盟广告： 234" },
              { value: 135, name: "视频广告： 135" },
              { value: 1548, name: "搜索引擎： 1548" }
            ]
          }
        ]
      }
    };
  },
  created () {
  },
  mounted () {
    var pieChart = this.$echarts.init(document.getElementById("pie-chart"));
    pieChart.setOption(this.pieOption, true);
    var pieChartType = this.$echarts.init(document.getElementById("pie-chart-type"));
    pieChartType.setOption(this.pieOption, true);
  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
.gray-font{
  color: #a0a0a0;
}
.pie-chart{
  height: 120px;
}
.pie-chart-type{
  height: 120px;
}
</style>
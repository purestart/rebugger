<template>
  <pannel v-bind="$attrs" v-on="$listeners">
    <div flex="box:mean" class="p-v-20 p-h-10">
      <div style="" class="b-r">
        <div id="pie-chart" class="pie-chart"></div>
      </div>
      <div style="" class="">
        <div id="pie-chart-type" class="pie-chart-type"></div>
      </div>
    </div>
  </pannel>
</template>

<script type="text/ecmascript-6">
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
        color: ['#0A64A4', '#8505A9', '#00B160'],
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
            name: "统计来源",
            type: "pie",
            radius: ["50%", "70%"],
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    '#83bbe8','#64ADB1','#ff8040', '#8505A9', '#00B160'
                  ];
                  return colorList[params.dataIndex]
                }
              },
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
              // { value: 335, name: "直接访问： 335" },
              // { value: 310, name: "邮件营销： 335" }
            ]
          }
        ]
      },
      pieTypeOption: {
        title: {
          subtext: "类型统计分布"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} ({d}%)"
        },
        calculable: true,
        series: [
          {
            name: "统计来源",
            type: "pie",
            radius: ["50%", "70%"],
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    '#64ADB1','#ff8040','#83bbe8', '#8505A9', '#00B160'
                  ];
                  return colorList[params.dataIndex]
                }
              },
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
              // { value: 335, name: "直接访问： 335" },
              // { value: 310, name: "邮件营销： 335" }
            ]
          }
        ]
      },
      pieChart: null,
      pieChartType: null
    };
  },
  created () {
  },
  mounted () {
    var pieChart = this.$echarts.init(document.getElementById("pie-chart"));
    pieChart.setOption(this.pieOption, true);
    this.pieChart = pieChart;
    var pieChartType = this.$echarts.init(document.getElementById("pie-chart-type"));
    pieChartType.setOption(this.pieTypeOption, true);
    this.pieChartType = pieChartType;
  },
  methods: {
    drawPieChart (pieProjectDate, pieTypeDate) {
      this.pieOption.series[0].data = pieProjectDate;
      this.pieTypeOption.series[0].data = pieTypeDate;

      this.pieChart.setOption(this.pieOption)
      this.pieChartType.setOption(this.pieTypeOption)
    }
  }
};
</script>

<style lang="scss" scoped>
.gray-font {
  color: #a0a0a0;
}
.pie-chart {
  height: 120px;
}
.pie-chart-type {
  height: 120px;
}
</style>

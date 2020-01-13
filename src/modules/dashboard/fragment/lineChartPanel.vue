<template>
  <pannel v-bind="$attrs" v-on="$listeners">
    <div class="line-chart-content" id="line-chart"></div>
  </pannel>
</template>

<script type="text/ecmascript-6">
import pannel from './pannel';
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
      lineChart: null,
      lineOption: {
        color: ["#5CACEE"],
        title: {
          subtext: '日志统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['20.11.3', '20.11.4', '20.11.5', '20.11.6', '20.11.7', '20.11.8', '20.11.9', '20.11.10', '20.11.11', '20.11.12', '20.11.13', '20.11.13'],
            axisLabel: {
              textStyle: {
                fontSize: '12',
                color: '#606060'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: '12',
                color: '#606060'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            }
          }
        ],
        series: [
          {
            name: '日志总量',
            type: 'line',
            stack: '总量',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,//变化度
                    //三种由深及浅的颜色
                    [{
                      offset: 0,
                      color: '#83bbe8'
                    }, {
                      offset: 0.5,
                      color: '#77b8ec'
                    }, {
                      offset: 1,
                      color: '#c1d7e8'
                    }]),

                }
              }
            },
            data: [150, 232, 201, 154, 190, 330, 410, 390, 320, 290, 320, 350],
            smooth: true
          },
          // {
          //   name: '直接访问',
          //   type: 'line',
          //   stack: '总量',
          //   itemStyle: { normal: { areaStyle: { type: 'default' } } },
          //   data: [320, 332, 301, 334, 390, 330, 320, 340, 360, 350, 330, 300]
          // },
          // {
          //   name: '搜索引擎',
          //   type: 'line',
          //   stack: '总量',
          //   itemStyle: { normal: { areaStyle: { type: 'default' } } },
          //   data: [820, 932, 901, 934, 1290, 1330, 1320, 1230, 1130, 1000, 900, 1200]
          // }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
      }
    }
  },
  created () {
  },
  mounted () {
    var lineChart = this.$echarts.init(document.getElementById('line-chart'))
    lineChart.setOption(this.lineOption, true)
    this.lineChart = lineChart;
  },
  methods: {
    drawLineChart () {
      console.log(this.lineOption);
      // console.log(this.columnOption)
      this.lineChart.setOption(this.lineOption)
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart-content {
  width: 100%;
  height: calc(40vh - 40px);
  color: #5cacee;
}
</style>

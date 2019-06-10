// 近24h车辆在线率
<style lang="scss" scoped>
/deep/ .spin {
  background: transparent;
  .loader {
    text-align: center;
    img {
      width: 55%;
    }
  }
}
.left-panel-item {
  height: 30%;
  .hd {
    height: 2.5vh;
    line-height: 2.5vh;
    padding-left: 2.1vw;
    font-size: .6vw;
    font-weight: bold;
    color: #3de6b1;
    background: url("../../../../../static/images/taskProgress/hd_arrow.png") 1vw center
      no-repeat;
    background-size: auto 0.5vw;
  }
  .bd {
    position: relative;
    height: 100%;
    .chart {
      height: 88%;
    }
  }
}
</style>
<template>
  <div class="left-panel-item">
    <div class="hd">近24h设备在线率</div>
    <div class="bd">
      <div v-if="spinShow" fix class="spin">
        <div class="loader"><img src="../../../../../static/images/taskProgress/loading-black.gif"></div>
      </div>
      <div v-else ref="chart" class="chart"/>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { on } from '@/libs/utils/index'
export default {
  name: 'CarOnlineRateChart',
  data() {
    return {
      spinShow: true,
      dom: {} // 车型能耗排行dom
    }
  },
  mounted() {
    // this.initChart();
  },
  created() {
    setTimeout(() => {
      this.spinShow = false
      this.$nextTick(() => {
        this.initChart()
      })
    }, 2500)
  },
  beforeDestroy() {
    this.dom.clear()
  },
  methods: {
    // 屏幕的宽度设置echarts的fontSize
    getSize() {
      const winWidth = document.documentElement.clientWidth
      return winWidth / 1082 * 8
    },
    // 车型能耗排行
    initChart() {
      // 设置X轴数据
      // 线查询当前1个小时的每隔5分钟的数据
      // let now = new Date();
      //   nowHour = now.getHours();
      // nowMinu = now.getMinutes();
      // let xData = [];
      // while (nowMinu < 0) {
      //   xData.push(nowHour);
      // }
      // console.log(now);
      // 绘制图表
      const seriesData = [
        {
          value: ['2019-06-02 14:09', 23]
        },
        {
          value: ['2019-06-02 14:08', 43]
        },
        {
          value: ['2019-06-02 14:07', 58]
        },
        {
          value: ['2019-06-02 14:06', 67]
        },
        {
          value: ['2019-06-02 14:05', 34]
        },
        {
          value: ['2019-06-02 14:04', 88]
        },
        {
          value: ['2019-06-02 14:03', 25]
        },
        {
          value: ['2019-06-02 14:02', 24]
        },
        {
          value: ['2019-06-02 14:01', 25]
        },
        {
          value: ['2019-06-02 14:00', 25]
        }
      ]
      const seriesData2 = [
        {
          value: ['2019-06-02 14:09', 48]
        },
        {
          value: ['2019-06-02 14:08', 36]
        },
        {
          value: ['2019-06-02 14:07', 21]
        },
        {
          value: ['2019-06-02 14:06', 18]
        },
        {
          value: ['2019-06-02 14:05', 26]
        },
        {
          value: ['2019-06-02 14:04', 77]
        },
        {
          value: ['2019-06-02 14:03', 83]
        },
        {
          value: ['2019-06-02 14:02', 42]
        },
        {
          value: ['2019-06-02 14:01', 29]
        },
        {
          value: ['2019-06-02 14:00', 52]
        }
      ]
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 26, 33, 0.68)',
          borderColor: '#01525b',
          extraCssText: 'box-shadow: 0 0 8px rgba(15, 235, 255, 0.56) inset',
          formatter: function(params) {
            const content = `${params[0].value[0]}<br>
            ${params[0].seriesName}: ${params[0].value[1]}%<br>
            ${params[1].seriesName}: ${params[1].value[1]}万`
            return content
          }
        },
        grid: {
          top: '22%',
          left: '4%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        textStyle: {
          color: '#fff'
        },
        xAxis: {
          type: 'time',
          nameTextStyle: {
            fontSize: this.getSize()
          },
          // boundaryGap: false,
          // minInterval: 4,
          axisTick: {
            show: false // 隐藏坐标轴刻度线
          },
          splitNumber: 8,
          splitLine: {
            lineStyle: {
              color: 'rgba(1, 53, 64, 1)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(1, 53, 64, 1)'
            }
          },
          axisLabel: {
            // formatter: value => {
            //   return this._hyTool.DateFormat(new Date(value), 'hh:mm')
            // }
            textStyle: {
              fontSize: this.getSize()
            }
          }
        },
        yAxis: [
          {
            name: '在线率 %',
            type: 'value',
            nameTextStyle: {
              fontSize: this.getSize()
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                fontSize: this.getSize()
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(1, 53, 64, 1)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(1, 53, 64, 1)'
              }
            },
            // minInterval: 10,
            min: 0,
            max: 100,
            interval: 25,
            boundaryGap: [0, '20%']
          },
          {
            name: '在线数量/万',
            nameTextStyle: {
              fontSize: this.getSize()
            },
            type: 'value',
            position: 'right',
            // minInterval: 100,
            min: 0,
            max: 300,
            interval: 100,
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                fontSize: this.getSize()
              }
            },
            axisTick: { show: false }, // 隐藏坐标轴刻度线
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '在线率',
            lineStyle: {
              color: 'rgba(0, 255, 255, 1)'
            },
            data: seriesData,
            type: 'line',
            smooth: true
          },
          {
            name: '在线数量',
            type: 'line',
            lineStyle: {
              color: 'rgba(221, 201, 32, 1)'
            },
            smooth: true,
            barWidth: 14,
            data: seriesData2,
            yAxisIndex: 1
          }
        ]
      }
      this.dom = echarts.init(this.$refs.chart)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
      // 模拟动态添加
      // setInterval(() => {
      //   let nowData = new Date().getTime() + 1 * 60 * 1000;
      //   let newData = {
      //     value: [
      //       this._hyTool.DateFormat(new Date(nowData), "yyyy-MM-dd hh:mm"),
      //       Math.round(Math.random() * 60)
      //     ]
      //   };
      //   seriesData.insert(0, newData);
      //   seriesData.splice(seriesData.length - 1, seriesData.length);
      //   this.dom.setOption(option);
      // }, 5000);
    },
    // 重置尺寸
    resize() {
      this.dom.resize()
    }
  }
}
</script>

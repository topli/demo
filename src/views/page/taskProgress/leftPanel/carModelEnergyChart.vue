// 车型能耗
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
  height: 31%;
  .hd {
    height: 2.5vh;
    padding-left: 2.1vw;
    line-height: 2.5vh;
    font-size: 0.6vw;
    font-weight: bold;
    color: #3de6b1;
    background: url("../../../../../static/images/taskProgress/hd_arrow.png") 1vw center
      no-repeat;
    background-size: auto 0.5vw;
  }
  .bd {
    // 车型能耗排行
    position: relative;
    height: 100%;
    .car-type {
      text-align: right;
      margin: 0.5vw 1vw 0;
      // transform: scale(0.9);
      a {
        display: inline-block;
        padding: .1vw .5vw;
        font-size: .7vw;
        line-height: 125%;
        text-align: center;
        color: rgba(17, 237, 255, 1);
        border: 1px solid rgba(17, 237, 255, 1);
        &:first-child {
          margin-left: 0;
        }
        &.cur {
          color: #ffffff;
          border: 1px solid rgba(0, 189, 207, 1);
          background: rgba(0, 189, 207, 1);
        }
      }
    }
    .bd-chart {
      height: 76%;
    }
  }
}
</style>
<template>
  <div class="left-panel-item">
    <div class="hd">设备油耗排行</div>
    <div class="bd">
      <div v-if="spinShow" fix class="spin">
        <div class="loader"><img src="../../../../../static/images/taskProgress/loading-black.gif"></div>
      </div>
      <div v-else class="car-type">
        <a v-for="item in carType" :key="item.id" :class="item.id === curCarType ? 'cur': ''" @click="clickCarType(item)">{{ item.name }}</a>
      </div>
      <div ref="chart" class="bd-chart"/>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { on } from '@/libs/utils/dom'

export default {
  name: 'CarModelEnergyChart',
  data() {
    return {
      carType: [
        {
          id: 1,
          name: '矿车'
        },
        {
          id: 2,
          name: '挖机'
        },
        {
          id: 3,
          name: '运输车'
        }
      ],
      winWidth: 0,
      spinShow: true,
      barData: [14.7, 13.7, 12.0, 6.7, 4.7],
      curCarType: 1,
      // yData: ["ERX5", "E550", "E950", "EI5", "Marve", "EMG6"],
      yData: ['120301070001A', '120301070002A', '120301070003A', '120301070004A', '120301070005A'],
      dom: {} // 车型能耗排行dom
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.resize)
  },
  created() {
    setTimeout(() => {
      this.spinShow = false
      this.$nextTick(() => {
        this.initChart()
      })
    }, 1500)
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
    getBarWidth() {
      const winWidth = document.documentElement.clientWidth
      return winWidth / 1082 * 10
    },
    clickCarType(item) {
      this.curCarType = item.id
      if (item.id === 1) {
        this.barData = [14.7, 13.7, 12.0, 6.7, 4.7]
      } else if (item.id === 2) {
        this.barData = [7.2, 11.7, 14.5, 8.7, 9.7]
      } else if (item.id === 3) {
        this.barData = [12.2, 11.7, 14.5, 8.7, 11.7]
      }
      this.initChart()
    },
    initChart() {
      // 绘制图表
      const option = {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          top: '6%',
          left: '28%',
          right: '6%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          name: '(L/100KM)',
          nameLocation: 'start',
          nameTextStyle: {
            padding: [0, 0, 30, 0],
            fontSize: this.getSize()
          },
          type: 'value',
          position: 'top',
          boundaryGap: [0, '20%'],
          minInterval: 5,
          splitLine: { show: false },
          axisLine: {
            // 坐标轴颜色
            lineStyle: {
              color: 'rgba(1, 53, 64, 1)'
            }
          },
          axisTick: {
            show: false // 隐藏坐标轴刻度线
          },
          axisLabel: {
            textStyle: {
              fontSize: this.getSize(),
              fontFamily: 'Helvetica Neue'
            }
          }
        },
        yAxis: {
          inverse: true,
          type: 'category',
          data: this.yData,
          splitLine: { show: false }, // 隐藏分割线
          axisLine: {
            lineStyle: {
              color: 'rgba(1, 53, 64, 1)'
            }
          },
          axisTick: {
            show: false // 隐藏坐标轴刻度线
          },
          axisLabel: {
            // formatter: function(value, index) {
            //   return (
            //     '{num' + index + '| ' + ++index + ' }{value|' + value + '}'
            //   )
            // },
            textStyle: {
              align: 'left',
              padding: [0, 0, 0, -(this.getSize()) * 10],
              fontSize: this.getSize()
            }
            // rich: {
            //   value: {
            //     padding: [0, 0, 2, 8]
            //   },
            //   num0: {
            //     width: 42,
            //     height: 42,
            //     lineHeight: 14,
            //     fontSize: 30,
            //     align: 'center',
            //     borderRadius: 2,
            //     backgroundColor: 'rgba(255, 126, 0, 1)'
            //   },
            //   num1: {
            //     width: 22,
            //     height: 22,
            //     lineHeight: 12,
            //     fontSize: this.getSize(),
            //     align: 'center',
            //     verticalAlign: 'middle',
            //     borderRadius: 2,
            //     backgroundColor: 'rgba(221, 201, 32, 1)'
            //   },
            //   num2: {
            //     width: 12,
            //     height: 12,
            //     lineHeight: 12,
            //     fontSize: this.getSize(),
            //     align: 'center',
            //     verticalAlign: 'middle',
            //     borderRadius: 2,
            //     backgroundColor: 'rgba(83, 146, 255, 1)'
            //   },
            //   num3: {
            //     width: 12,
            //     height: 12,
            //     lineHeight: 12,
            //     fontSize: this.getSize(),
            //     align: 'center',
            //     verticalAlign: 'middle',
            //     borderRadius: 2,
            //     backgroundColor: 'rgba(0, 189, 207, 1)'
            //   },
            //   num4: {
            //     width: 12,
            //     height: 12,
            //     lineHeight: 12,
            //     fontSize: this.getSize(),
            //     align: 'center',
            //     verticalAlign: 'middle',
            //     borderRadius: 2,
            //     backgroundColor: 'rgba(0, 189, 207, 1)'
            //   },
            //   num5: {
            //     width: 12,
            //     height: 12,
            //     lineHeight: 12,
            //     fontSize: this.getSize(),
            //     align: 'center',
            //     verticalAlign: 'middle',
            //     borderRadius: 2,
            //     backgroundColor: 'rgba(0, 189, 207, 1)'
            //   }
            // }
          },
          zlevel: 1
        },
        series: [
          {
            type: 'bar',
            barWidth: this.getBarWidth(),
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'right',
                  color: '#828689',
                  fontSize: this.getSize()
                },
                // barBorderRadius: [0, 1, 200, 0],
                color: params => {
                  const colorList = [
                    {
                      color1: 'rgba(152, 84, 17, 1)',
                      color2: 'rgba(255, 126, 0, 1)'
                    },
                    {
                      color1: 'rgba(137, 123, 60, 1)',
                      color2: 'rgba(254, 236, 83, 1)'
                    },
                    {
                      color1: '#214075',
                      color2: '#528df4'
                    },
                    {
                      color1: '#3d7b84',
                      color2: '#62e8eb'
                    },
                    {
                      color1: '#3d7b84',
                      color2: '#62e8eb'
                    },
                    {
                      color1: '#3d7b84',
                      color2: '#62e8eb'
                    }
                  ]
                  const curColor = colorList[params.dataIndex]
                  const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: 'rgba(2, 11, 18, 1)' },
                    { offset: 0.97, color: curColor.color1 },
                    { offset: 1, color: curColor.color2 }
                  ])
                  return color
                },
                borderWidth: [2, 0, 2, 0],
                borderColor: '#fff'
              }
            },
            data: this.barData
          }
        ]
      }
      this.dom = echarts.init(this.$refs.chart)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    },
    // 重置尺寸
    resize() {
      this.dom.resize()
    }
  }
}
</script>

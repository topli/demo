// 右侧地图和报表
<style lang="scss" scoped>
// 右侧面板
/deep/.digit {
    height: 0.65rem!important;
    line-height: 0.65rem!important;
  }
/deep/ .spin {
  background: transparent;
  .loader {
    margin-top: 1rem;
    text-align: center;
  }
}
.rigth-panel {
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 4.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  .rigth-panel-main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &.zoom-in {
    .map-box {
      // height: calc(100% - 0.34rem);
      height: 94%;
    }
    .bottom-panel {
      bottom: -22%;
      // height: 10%;
      // transform: translateY(0.34rem);
    }
  }
  // 地图
  .map-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 72%;
    transition: all 0.5s;
    // z-index: 2;
    // 头部总数
    .map-header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      .title {
        padding-left: 0.22rem;
        font-size: 0.12rem;
        font-weight: bold;
        color: #0febff;
        background: url("../../../../../static/images/taskProgress/hd_arrow.png") left center
          no-repeat;
        background-size: auto 0.09rem;
      }
      ul.total {
        display: none;
        margin-top: 0.1rem;
        li {
          display: inline;
          font-size: 0.3rem;
          color: #00bdcf;
          font-weight: 600;
          margin-right: 0.12rem;
        }
        .num {
          display: inline-block;
          width: 0.44rem;
          height: 0.58rem;
          line-height: 0.58rem;
          text-align: center;
          border: 1px solid #00bdcf;
          background-color: rgba(0, 122, 135, 0.33);
        }
      }
    }
    // 左下角状态概览
    .status-overview {
      position: absolute;
      left: 0;
      bottom: -10px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 0.14rem;
        span {
          margin-left: 0.08rem;
          text-align: left;
          color: #fff;
        }
      }
    }
    .btn-back {
      position: absolute;
      top: 0;
      right: 0;
      color: #1b9aab;
      z-index: 999;
      cursor: pointer;
    }
    .map {
      width: 100%;
      height: 100%;
    }
  }
  .btn-fold {
    position: absolute;
    top: -10%;
    right: 5%;
    z-index: 1;
    width: 0.94rem;
    height: 0.2rem;
    // margin: 0 auto;
    text-align: center;
    color: #1b9aab;
    overflow: hidden;
    background: url("../../../../../static/images/taskProgress/fold_bg.png") center center
      no-repeat;
    background-size: 100% 100%;
  }
  // 底部图表
  .bottom-panel {
    position: absolute;
    width: 100%;
    height: 28%;
    background: url("../../../../../static/images/taskProgress/bottom-panel-b.png") top center
      no-repeat;
    background-size: 100% 100%;
    left: 0;
    bottom: 0;
    z-index: 1;
    transition: all 0.5s;
    .hd {
      height: 0.16rem;
      padding-right: 0.22rem;
      font-size: 0.12rem;
      font-weight: bold;
      color: rgba(61, 230, 177, 1);
      text-align: right;
      .img {
        transform: rotate(180deg);
      }
    }
    .bd {
      position: relative;
      height: 100%;
      .chart {
        height: 90%;
      }
    }
    // &.bottom-enter-active,
    // &.bottom-leave-active {
    //   transition: all 0.5s;
    //   // .map-box {
    //   //   height: calc(100% - 0.34rem);
    //   // }
    //   .bottom-panel {
    //     // transition: all 0.5s;
    //   }
    // }
    // &.bottom-enter,
    // &.bottom-leave-to {
    //   // bottom: -10%;
    //   .bottom-panel {
    //     // transform: translateY(-0.34rem);
    //   }
    // }
  }
}

// 顶部全国车辆数字
.child-box {
  display: inline-block;
  margin-top: 0.1rem;
  padding: 0 0.15rem;
  color: #0febff;
  font-size: 0.42rem;
  font-weight: 600;
  border: 1px solid #0febff;
  background-color: rgba(0, 122, 135, 0.33);
  > div {
    height: 0.63rem !important;
  }
  /deep/ .ctnr {
    position: relative;
    margin-right: 0.1rem;
    text-align: center;
    &:last-child {
      margin-right: 0;
    }
  }
  /deep/ .sprtr {
    margin-right: 0.1rem;
    text-align: center;
  }
}
</style>
<template>
  <div :class="zoom" class="rigth-panel">
    <div class="rigth-panel-main" style="position: relative">
      <div ref="mapBox" class="map-box">
        <div v-if="spinShow" fix class="spin">
          <div class="loader"><img src="../../../../../static/images/taskProgress/loading-black.gif"></div>
        </div>
        <template v-else>
          <div class="map-header">
            <div class="title">全国设备(辆)</div>
            <!-- <ul class="total">
              <li v-for="(item, index) in totalList" :key="index" :class="item.type ? 'num' : 'dot'">{{item.num}}</li>
            </ul> -->
            <div class="child-box">
              <div class="separate"/>
            </div>
          </div>
          <!-- 状态概览 -->
          <ul class="status-overview">
            <li>
              <img src="../../../../../static/images/taskProgress/charging.png">
              <span class="name">待机</span>
              <span class="num">12,456</span>
              <span class="rate">8.4%</span>
            </li>
            <li>
              <img src="../../../../../static/images/taskProgress/travel.png">
              <span class="name">工作中</span>
              <span class="num">132,656</span>
              <span class="rate">89.9%</span>
            </li>
            <li>
              <img src="../../../../../static/images/taskProgress/offline.png">
              <span class="name">离线</span>
              <span class="num">2,456</span>
              <span class="rate">1.7%</span>
            </li>
          </ul>
          <!-- 返回中国地图 -->
          <div v-show="showBack" class="btn-back" @click.stop="backChinaMap">
            <!-- <Icon size="24" type="ios-redo" color="#1b9aab"/> -->
            <svg-icon icon-class="back-right"/>返回
          </div>
          <div id="map" ref="map" class="map"/>
        </template>
      </div>
      <!-- 底部表格 -->
      <div class="bottom-panel">
        <!-- 折叠底部按钮 -->
        <a class="btn-fold" @click="flod">
          <!-- <Icon :type="btnFoldIcon" size="24" color="#1b9aab" />{{ foldText }} -->
        </a>
        <div class="hd">
          全国设备总数与里程统计
          <img class="img" src="../../../../../static/images/taskProgress/hd_arrow.png">
        </div>
        <div class="bd">
          <div v-if="spinShow" fix class="spin">
            <div class="loader"><img style="width: 76%" src="../../../../../static/images/taskProgress/loading-black.gif"></div>
          </div>
          <div v-else ref="chart" class="chart"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { on } from '@/libs/nav'
import echarts from 'echarts'
import citymap from './citymap'
import axios from 'axios'
import { Flip } from 'number-flip'

export default {
  name: 'RightPanel',
  data() {
    return {
      // 头部总数
      total: 147568,
      totalList: [],
      zoom: '',
      showBack: false,
      flip: null,
      // 地图
      mapDom: {},
      btnFoldIcon: 'ios-arrow-down',
      foldText: '折叠',
      provinces: {
        // 23个省
        台湾: 'taiwan',
        河北: 'hebei',
        山西: 'shanxi',
        辽宁: 'liaoning',
        吉林: 'jilin',
        黑龙江: 'heilongjiang',
        江苏: 'jiangsu',
        浙江: 'zhejiang',
        安徽: 'anhui',
        福建: 'fujian',
        江西: 'jiangxi',
        山东: 'shandong',
        河南: 'henan',
        湖北: 'hubei',
        湖南: 'hunan',
        广东: 'guangdong',
        海南: 'hainan',
        四川: 'sichuan',
        贵州: 'guizhou',
        云南: 'yunnan',
        陕西: 'shanxi1',
        甘肃: 'gansu',
        青海: 'qinghai',
        // 5个自治区
        新疆: 'xinjiang',
        广西: 'guangxi',
        内蒙古: 'neimenggu',
        宁夏: 'ningxia',
        西藏: 'xizang',
        // 4个直辖市
        北京: 'beijing',
        天津: 'tianjin',
        上海: 'shanghai',
        重庆: 'chongqing',
        // 2个特别行政区
        香港: 'xianggang',
        澳门: 'aomen'
      },
      special: ['北京', '天津', '上海', '重庆', '香港', '澳门'], // 直辖市和特别行政区-只有二级地图，没有三级地图
      mapdata: [],
      citymap: citymap,
      // 底部---全国车辆总数与里程统计
      spinShow: true,
      showBottom: true,
      dom: {},
      // 缓存数据
      xDataNational: [],
      yDataNumNational: [],
      yDataMileageNational: [],
      xData: [
        '上海',
        '北京',
        '天津',
        '陕西',
        '黑龙江',
        '江西',
        '湖南',
        '湖北',
        '四川'
      ],
      yDataNum: [],
      yDataMileage: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.spinShow = false
      this.$nextTick(() => {
        this.getMapData()
        this.hts()
      })
    }, 1500)
  },
  created() {},
  beforeDestroy() {
    this.mapDom && this.mapDom.clear()
    this.dom && this.dom.clear()
  },
  methods: {
    // 头部全国车辆总数
    hts() {
      const $Q = document.querySelector.bind(document)
      this.flip = new Flip({
        node: $Q('.separate'),
        from: 0,
        to: this.total,
        separator: ',',
        delay: 0.5,
        duration: 1.5
      })
    },
    // 全国车辆处理
    handleTotal() {
      // 0是逗号，1是数字
      let type = 0
      const totalAry = this.total.split('')
      totalAry.forEach(item => {
        if (isNaN(item)) type = 0
        else type = 1
        this.totalList.push({
          type: type,
          num: item
        })
      })
    },
    async getMapData() {
      let data = {}
      this.xData = []
      try {
        data = (await axios.get('/static/map/china.json')).data
      } catch (error) {
        data = error
      }
      for (var i = 0; i < data.features.length; i++) {
        this.mapdata.push({
          name: data.features[i].properties.name,
          value: Math.round(Math.random() * 1000)
        })
        // 地图X坐标数据
        this.xDataNational.push(data.features[i].properties.name)
        this.yDataNumNational.push(Math.round(Math.random() * 1000))
        this.yDataMileageNational.push(Math.round(Math.random() * 100))
      }
      this.mapDom = echarts.init(this.$refs.map)
      // 注册地图
      echarts.registerMap('china', data)
      // 绘制地图
      this.renderMap('china', this.mapdata)
      // on(window, 'resize', this.resize)
      // 绑定点击事件
      this.mapDom.on('click', this.selectProvinces)

      this.xData = this.xDataNational
      this.yDataNum = this.yDataNumNational
      this.yDataMileage = this.yDataMileageNational
      this.initChart()
    },
    // 地图绘制
    renderMap(map, data) {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        roam: false, // 禁用缩放
        visualMap: {
          min: 0,
          max: 1000,
          left: 'right',
          bottom: 20,
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          textStyle: {
            color: 'rgba(0, 189, 207, 1)'
          },
          inRange: {
            color: ['#264b6c', '#014757', '#01323f', '#011d35']
          }
        },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000
      }
      option.series = [
        {
          type: 'map',
          name: map,
          mapType: map,
          nameMap: {
            china: '中国'
          },
          itemStyle: {
            normal: {
              // 地图描边
              borderWidth: 1,
              borderColor: '#010810'
            }
          },
          emphasis: {
            itemStyle: {
              areaColor: '#0febff'
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 13
              }
            }
            // emphasis: {
            //   show: true,
            //   textStyle: {
            //     // color: "#fff",
            //     fontSize: 13
            //   }
            // }
          },
          data: data
        }
      ]
      // 渲染地图
      this.mapDom.setOption(option)
    },
    // 选择省份
    selectProvinces(params) {
      this.showBack = true
      if (params.name in this.provinces) {
        // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        axios
          .get('/static/map/province/' + this.provinces[params.name] + '.json')
          .then(
            data => {
              echarts.registerMap(params.name, data.data)
              const provincedata = []
              this.xData = []
              this.yDataNum = []
              this.yDataMileage = []
              for (var i = 0; i < data.data.features.length; i++) {
                provincedata.push({
                  name: data.data.features[i].properties.name,
                  value: Math.round(Math.random() * 1000)
                })

                this.xData.push(data.data.features[i].properties.name)
                this.yDataNum.push(Math.round(Math.random() * 1000))
                this.yDataMileage.push(Math.round(Math.random() * 100))
              }
              this.renderMap(params.name, provincedata)
              this.initChart()
            }
          )
          .catch(data => {
            echarts.registerMap(params.name, data)
            const provincedata = []
            this.xData = []
            this.yDataNum = []
            this.yDataMileage = []
            for (var i = 0; i < data.features.length; i++) {
              provincedata.push({
                name: data.features[i].properties.name,
                value: Math.round(Math.random() * 1000)
              })

              this.xData.push(data.features[i].properties.name)
              this.yDataNum.push(Math.round(Math.random() * 1000))
              this.yDataMileage.push(Math.round(Math.random() * 100))
            }
            this.renderMap(params.name, provincedata)
            this.initChart()
          })
      } else if (params.seriesName in this.provinces) {
        // 如果是【直辖市/特别行政区】只有二级下钻
        // if (special.indexOf(params.seriesName) >= 0) {
        //   renderMap("china", mapdata);
        // } else {
        //   //显示县级地图
        //   $.getJSON(
        //     "static/map/city/" + cityMap[params.name] + ".json",
        //     function(data) {
        //       echarts.registerMap(params.name, data);
        //       var d = [];
        //       for (var i = 0; i < data.features.length; i++) {
        //         d.push({
        //           name: data.features[i].properties.name
        //         });
        //       }
        //       this.renderMap(params.name, d);
        //     }
        //   );
        // }
      }
    },
    // 返回到中国地图
    backChinaMap() {
      this.renderMap('china', this.mapdata)
      this.xData = this.xDataNational
      this.yDataNum = this.yDataNumNational
      this.yDataMileage = this.yDataMileageNational
      this.initChart()
    },
    // 全国车辆总数与里程统计chart
    initChart() {
      // 绘制图表
      const option = {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          top: '36%',
          left: '2%',
          right: '4%',
          bottom: 20,
          containLabel: true,
          zoomLock: true
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 60,
            minSpan: 10,
            maxSpan: 50,
            bottom: 6,
            height: 6,
            textStyle: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 26, 33, 0.68)',
          borderColor: '#01525b',
          extraCssText: 'box-shadow: 0 0 8px rgba(15, 235, 255, 0.56) inset',
          formatter: function(params) {
            const content = `${params[0].name}<br>
            ${params[0].seriesName}: ${params[0].value}辆<br>
            ${params[1].seriesName}: ${params[1].value}万km`
            return content
          }
        },
        legend: {
          left: 16,
          itemWidth: 6,
          itemHeight: 6,
          data: [
            {
              name: '数量',
              // 强制设置图形为圆。
              icon: `image://${require('../../../../../static/images/taskProgress/legend_icon_1.png')}`,
              // 设置文本为红色
              textStyle: {
                color: 'rgba(255, 255, 255, 1)'
              }
            },
            {
              name: '里程',
              // 强制设置图形为圆。
              icon: `image://${require('../../../../../static/images/taskProgress/legend_icon_2.png')}`,
              // 设置文本为红色
              textStyle: {
                color: 'rgba(255, 255, 255, 1)'
              }
            }
          ]
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          splitLine: { show: false }, // 去掉网格
          axisTick: { show: false }, // 隐藏坐标轴刻度线
          data: this.xData
        },
        yAxis: [
          {
            name: '（数量）',
            type: 'value',
            position: 'left',
            splitLine: { show: false }, // 去掉网格
            axisTick: { show: false }, // 隐藏坐标轴刻度线
            minInterval: 10,
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            name: '里程（万）',
            type: 'value',
            position: 'right',
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: { show: false }, // 去掉网格
            axisTick: { show: false }, // 隐藏坐标轴刻度线
            minInterval: 10,
            axisLine: { show: false } // 隐藏坐标轴
          }
        ],
        series: [
          // 背景
          {
            name: '数量',
            type: 'bar',
            // barWidth: 18,
            barMaxWidth: 14,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: 'rgba(0, 7, 14, 1)' },
                  { offset: 0.97, color: 'rgba(35, 104, 114, 1)' },
                  { offset: 1, color: 'rgba(0, 255, 255, 1)' }
                ])
              }
            },
            data: this.yDataNum
          },
          {
            name: '里程',
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: 'rgba(0, 6, 14, 1)' },
                  { offset: 0.97, color: 'rgba(102, 36, 43, 1)' },
                  { offset: 1, color: 'rgba(255, 74, 90, 1)' }
                ])
              }
            },
            barMaxWidth: 14,
            data: this.yDataMileage,
            yAxisIndex: 1
          }
        ]
      }
      this.dom = echarts.init(this.$refs.chart)
      this.dom.setOption(option)
      // on(window, 'resize', this.resize)
    },
    // 折叠底部图表
    flod() {
      this.zoom = this.zoom ? '' : 'zoom-in'
      this.foldText = this.foldText === '折叠' ? '展开' : '折叠'
      this.showBottom = !this.showBottom
      this.btnFoldIcon =
        this.btnFoldIcon === 'ios-arrow-down'
          ? 'ios-arrow-up'
          : 'ios-arrow-down'
      setTimeout(() => {
        this.mapDom.resize()
      }, 400)
    },
    // 重置尺寸
    resize() {
      this.mapDom && this.mapDom.resize()
      this.dom && this.dom.resize()
      this.flip._initHTML(0, this.total)
    }
  }
}
</script>

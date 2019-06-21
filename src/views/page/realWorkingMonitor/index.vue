<template>
  <div class="map-template" style="position:relative;">
    <div class="map-search">
      <el-input :placeholder="$t('device.number')" v-model="deviceNumber"/>
    </div>
    <div id="map" style="height: 55vh;width: 100%;"/>
    <div class="device-info">
      <el-row style="margin-bottom: 10px;">
        <el-col :span="24">
          <el-card>
            <div slot="header">
              <span>今日信息</span>
            </div>
            <el-row :gutter="15">
              <el-col :span="6">
                <statistics :number="98" icon="mileage" title="里程" color="red" unit="km"/>
              </el-col>
              <el-col :span="6">
                <statistics :number="78" icon="shalou" title="工作时长" color="#39b7e3" unit="min"/>
              </el-col>
              <el-col :span="6">
                <statistics :number="15" icon="oil" title="总油耗" color="#4baba6" unit="L/H"/>
              </el-col>
              <el-col :span="6">
                <statistics :number="0" icon="alarmCount" title="报警次数" color="#fa7459" unit="次"/>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-bottom: 10px;">
        <el-col :span="14">
          <el-card>
            <div slot="header">
              <span>基本信息</span>
            </div>
            <el-row>
              <el-col v-for="(item, i) in dashboards" :key="i" :span="8">
                <echarts :report-object="item" height="230"/>
              </el-col>
              <el-col :span="24">
                <div class="device-box">
                  <div v-for="(item, i) in infos1" :key="i" class="attribute-box">
                    <div class="attribute vertical-center">{{ item.title }}</div>
                    <div class="attribute vertical-center">
                      <span>{{ item.value }}</span>
                      <div class="splitLine"/>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="device-box">
                  <div v-for="(item, i) in infos2" :key="i" class="attribute-box">
                    <div class="attribute vertical-center">{{ item.title }}</div>
                    <div class="attribute vertical-center">
                      <span>{{ item.value }}</span>
                      <div class="splitLine"/>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="9">
                <div style="height: 250px;display: flex;justify-content: center;align-items: center;">
                  <div style="background: url('./static/images/realWorkingMoniter/engine.png') no-repeat center;height: 100%;width:100%">
                    <div style="height:120px;display: flex;justify-content: center;align-items: center;font-size: 20px;font-weight: 700px;color: white">档  位</div>
                    <div style="height:100px;display: flex;justify-content: center;align-items: center;">
                      <div style="width: 50px;height: 50px;border-radius: 50%;margin-right: 20px;background-color: #44ce93;-webkit-box-shadow: 0 0 15px rgba(68,206,147,.6);box-shadow: 0 0 15px rgba(68,206,147,.6);"/>
                      <div style="font-size: 20px;font-weight: 700px">状  态</div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="5">
                <echarts :report-object="barReport[0]" height="250"/>
              </el-col>
              <el-col :span="5">
                <echarts :report-object="barReport[1]" height="250"/>
              </el-col>
              <el-col :span="5">
                <echarts :report-object="barReport[2]" height="250"/>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card style="width:100%;margin-bottom: 18px">
            <div slot="header">
              <span>探针信息</span>
            </div>
            <el-row>
              <el-col :span="7">
                <div style="width:100%;height:80px;display:flex;justify-content: center;align-items: center;">
                  <svg-icon icon-class="temple" class="statistics-icon" style="font-size:70px;color: red"/>
                  <div style="display: inline-block">
                    <div style="color:red;font-size: 30px">60 ℃</div>
                    <div style="font-size: 12px;color: #515a6e">
                      <div>最高温度</div>
                      <div>探针：0</div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
                <div style="width:100%;height:80px;display:flex;justify-content: center;align-items: center;">
                  <div style="width:60px;text-align:center;color:#515a60e;font-size: 12px;">
                    <div style="border-bottom: 1px solid #e2e6ef">50 ℃</div>
                    <div>温差</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div style="width:100%;height:80px;display:flex;justify-content: center;align-items: center;">
                  <div style="display: inline-block">
                    <div style="color:blue;font-size: 30px">10 ℃</div>
                    <div style="font-size: 12px;color: #515a6e">
                      <div>最低温度</div>
                      <div>探针：0</div>
                    </div>
                  </div>
                  <svg-icon icon-class="temple" class="statistics-icon" style="font-size:70px;color: blue"/>
                </div>
              </el-col>
              <el-col :span="24">
                <echarts :report-object="barLine1" height="300"/>
              </el-col>
            </el-row>
          </el-card>
          <el-card style="width:100%">
            <div slot="header">
              <span>电压信息</span>
            </div>
            <el-row>
              <el-col :span="7">
                <div style="font-size: 12px;text-align:center">最高电压</div>
                <div style="width:100%;height:140px;display:flex;justify-content: center;align-items: center;">
                  <echarts :report-object="highVoltage" height="140"/>
                </div>
              </el-col>
              <el-col :span="10">
                <div style="width:100%;height:140px;display:flex;justify-content: center;align-items: center;">
                  <div style="width:60px;text-align:center;color:#515a60e;font-size: 12px;">
                    <div style="border-bottom: 1px solid #e2e6ef">387 V</div>
                    <div>压差</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div style="font-size: 12px;text-align:center">最低电压</div>
                <div style="width:100%;height:140px;display:flex;justify-content: center;align-items: center;">
                  <echarts :report-object="lowVoltage" height="140"/>
                </div>
              </el-col>
              <el-col :span="24">
                <echarts :report-object="barLine2" height="300"/>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import '@/styles/map-template.scss'
import BMap from 'BMap'
import statistics from './components/statistics'
// import BMapLib from 'BMapLib'
export default {
  components: { statistics },
  data() {
    return {
      map: null,
      dashboards: [],
      deviceNumber: '120301070001A',
      infos1: [
        { title: '总里程', value: '46523km' },
        { title: '小计里程', value: '56km' },
        { title: '总油耗', value: '23L' },
        { title: '总工作时间', value: '3H' },
        { title: '总装车次数', value: '3次' },
        { title: '总无动作时间', value: '30min' },
        { title: '总无动作油耗', value: '3L' }
      ],
      infos2: [
        { title: 'H 模式总工作时间', value: '2H' },
        { title: 'H 模式总油耗', value: '18L' },
        { title: 'S 模式总工作时间 ', value: '3H' },
        { title: 'S 模式总油耗', value: '20L' },
        { title: '锁机剩余时间', value: '3H' }
      ],
      barReport: [],
      barLine1: {},
      barLine2: {},
      highVoltage: {},
      lowVoltage: {}
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    this.initMap()
    this.getAllReports()
    this.barLine1 = {
      grid: {
        left: 40,
        right: 40
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] }
        },
        padding: [20, 40]
      },
      dataZoom: [{
        type: 'inside'
      },
      {
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      // legend: {
      //   data: ['平均温度']
      // },
      xAxis: [
        {
          type: 'category',
          data: ['08:10:00', '08:20:00', '08:30:00', '08:40:00', '08:50:00', '09:00:00', '09:10:00', '09:20:00', '09:30:00', '09:40:00'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '℃',
          min: 0,
          max: 125,
          interval: 25
        }
      ],
      series: [
        {
          name: '温度',
          type: 'line',
          data: [10, 31, 33, 45, 60, 10, 20, 23, 23, 16, 12.0, 21]
        }
      ]
    }
    this.barLine2 = {
      grid: {
        left: 40,
        right: 40
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] }
        },
        padding: [20, 40]
      },
      dataZoom: [{
        type: 'inside'
      },
      {
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      // legend: {
      //   data: ['平均温度']
      // },
      xAxis: [
        {
          type: 'category',
          data: ['08:10:00', '08:20:00', '08:30:00', '08:40:00', '08:50:00', '09:00:00', '09:10:00', '09:20:00', '09:30:00', '09:40:00'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'V',
          min: 0,
          max: 1000,
          interval: 100
        }
      ],
      series: [
        {
          name: '电压',
          type: 'line',
          data: [300, 400, 564, 347, 421, 687, 563, 553, 345, 623, 456, 489]
        }
      ]
    }
    this.highVoltage = this.getGauge({ min: 0, max: 1000, value: 687, splitNumber: 1, startAngle: 180, endAngle: 1, unit: 'V', hideAxis: true })
    this.lowVoltage = this.getGauge({ min: 0, max: 1000, value: 300, splitNumber: 1, startAngle: 180, endAngle: 1, unit: 'V', hideAxis: true })
  },
  // 方法集合
  methods: {
    initMap() {
      this.map = new BMap.Map('map', { enableMapClick: false })
      this.map.centerAndZoom(new BMap.Point(112.352013, 39.469762), 12)
      // this.map.setCurrentCity('北京')
      this.map.enableScrollWheelZoom(true)
      this.map.setMapType(window.BMAP_HYBRID_MAP)
      this.map.addControl(new BMap.MapTypeControl({
        mapTypes: [
          window.BMAP_NORMAL_MAP,
          window.BMAP_HYBRID_MAP
        ]
      }))
      var myIcon = new BMap.Icon('/static/images/loader.png', new BMap.Size(50, 50))
      var marker = new BMap.Marker(new BMap.Point(112.352013, 39.469762), { icon: myIcon })
      var label = new BMap.Label(this.deviceNumber, { offset: new BMap.Size(-23, 50) })
      marker.setLabel(label)
      this.map.addOverlay(marker)
    },
    getAllReports() {
      this.getDashboards()
      this.getBar()
    },
    getGauge(item) {
      return {
        tooltip: {
          formatter: `{a} : {c} ${item.unit || ''}`
        },
        series: [
          {
            name: item.title || '',
            center: ['50%', '50%'],
            radius: '95%',
            type: 'gauge',
            min: item.min,
            max: item.max,
            splitNumber: item.splitNumber,
            startAngle: item.startAngle || 225,
            endAngle: item.endAngle || -45,
            detail: {
              formatter: `{value} ${item.unit}`,
              offsetCenter: [0, '60%'],
              textStyle: {
                color: 'gray',
                fontSize: 22,
                fontWeight: 'nomal'
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 0, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              show: !item.hideAxis
            },
            data: [{ value: item.value || 0, name: item.title || '' }],
            axisLine: {
              // 仪表盘轴线相关配置
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[(item.value - item.min) / (item.max - item.min), '#E62C19'], [1, '#C4C4C4']],
                width: 5,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              length: 0 // 属性length控制线长
            },
            pointer: {
              // 指针
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              width: 2
            }
          }
        ],
        animationDuration: 5000,
        animationDurationUpdate: 5000
      }
    },
    getDashboards() {
      let dashboards = [
        { title: '燃油利用率', min: 0, max: 100, value: 50, splitNumber: 10, unit: '%' },
        { title: '车速', min: 0, max: 220, value: 30, splitNumber: 11, unit: 'km/h' },
        { title: '发动机转速', min: -20, max: 50, value: 20, splitNumber: 7, unit: 'krpm' },
        { title: '总电压', min: 0, max: 1000, value: 300, splitNumber: 10, unit: 'V' },
        { title: '总电流', min: -1000, max: 1000, value: 200, splitNumber: 10, unit: 'A' }
      ]
      dashboards = dashboards.map((item) => {
        return this.getGauge(item)
      })
      this.dashboards.push(...dashboards)
    },
    getBar() {
      let data = [
        { title: '冷却水温度', value: 10 },
        { title: '液压油温度', value: 40 },
        { title: '电机控制器温度', value: 50 }
      ]
      var symbols1 = [
        'path://m317.41884,281.36186l0,-235.01328c0,-19.17849 -15.24649,-34.80215 -33.96199,-34.80215s-33.96199,15.62367 -33.96199,34.80215l0,234.9694c-15.07518,11.14722 -24.24021,29.18466 -24.24021,48.36314c0,32.91503 26.1246,59.64203 58.20219,59.64203s58.24502,-26.68311 58.24502,-59.59814c0,-19.17849 -9.16503,-37.21592 -24.28303,-48.36314l0.00001,-0.00001zm-33.96199,88.1245c-21.41361,0 -38.80146,-17.818 -38.80146,-39.76135c0,-14.08763 7.45194,-27.25364 19.40073,-34.40717c2.99791,-1.75547 4.83948,-5.04697 4.83948,-8.60179l0,-17.90577l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-19.88068l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-19.88068l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-19.88068l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-19.88068l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-19.88068l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-19.88068l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-20.05622l4.83948,0c2.69811,0 4.83948,-2.23822 4.83948,-4.9592c0,-2.76486 -2.18419,-4.9592 -4.83948,-4.9592l-4.83948,0l0,-3.73037c0,-8.20681 6.50974,-14.92148 14.56125,-14.92148c8.00869,0 14.56125,6.67078 14.56125,14.92148l0,240.36746c0,3.55482 1.84157,6.84633 4.83948,8.60179c11.99162,7.10965 19.40073,20.27566 19.40073,34.40717c0.04283,21.89946 -17.38785,39.71746 -38.80146,39.71746l0,0.00007z'
      ]

      var bodyMax = 100

      var labelSetting = {
        normal: {
          show: true,
          position: 'outside',
          offset: [0, -0],
          formatter: function(param) {
            return (param.value / bodyMax * 100).toFixed(0) + '℃'
          },
          textStyle: {
            fontSize: 18,
            fontFamily: 'Arial'
          }
        }
      }
      data = data.map((item) => {
        return {
          color: ['orange'],
          tooltip: {
            show: false
          },
          title: {
            text: item.title,
            textStyle: {
              fontSize: '16',
              fontWeight: '700'
            },
            left: 'center'
          },
          xAxis: {
            data: ['a'],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          yAxis: {
            max: bodyMax,
            offset: 20,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          grid: {
            top: '30%',
            left: '40%',
            height: '50%',
            width: '25%'
          },
          markLine: {
            z: -100
          },
          series: [{
            name: 'typeA',
            type: 'pictorialBar',
            symbolClip: true,
            symbolBoundingData: bodyMax,
            label: labelSetting,
            data: [{
              value: item.value,
              symbol: symbols1[0]
            }],
            //					markLine: markLineSetting,
            z: 10
          }, {
            name: 'bg',
            type: 'pictorialBar',
            symbolBoundingData: bodyMax,
            label: {
              show: false
            },
            animationDuration: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colors = ['lightblue', 'green', 'red']
                  return colors[params.dataIndex]
                }
              }
            },
            data: [{
              value: 1,
              symbol: symbols1[0]

            }]
          }]
        }
      })
      this.barReport.push(...data)
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.map-search {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index:10;
}
</style>
<style lang="scss">
.device-info {
  margin: 10px 0;
  .vertical-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-card__header {
    padding: 10px 20px;
    span{
      font-weight: 700;
      font-size:16px;
    }
  }
  .device-box{
    margin-bottom: 28px;
    height: 84px;
    border: 1px solid #46a5f0;
    display: flex;
    font-size:14px;
    .attribute-box{
      flex-grow: 1;
      .attribute{
        height:50%;
        position: relative;
        .splitLine{
          border-right: 1px solid #bfcff7;
          position: absolute;
          right:0;
          height:50%;
        }
      }
    }
    .attribute-box:last-child {
        .splitLine{
          display: none;
        }
    }
  }
}
</style>

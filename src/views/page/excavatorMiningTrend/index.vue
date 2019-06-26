<style lang="scss" scoped>
/deep/.el-card__header {
  padding: 0.5vw 0.6vw;
}
</style>
<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form label-position="left" inline>
        <el-form-item class="item1" label-width="80px" label="日期范围">
          <el-radio-group v-model="timeType" @change="changeTime(timeType)">
            <el-radio-button v-for="ti in timeList" :key="ti.value" :label="ti.value">{{ ti.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchData.dataRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchData.status"
            placeholder="省市"
            style="width: 200px"
            filterable
            transfer
            clearable>
            <el-option v-for="(option, index) in cityList" :value="option.value" :key="index">{{ option.label }}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </search-tem>
    <el-row :gutter="10">
      <el-col :span="24" style="margin-bottom: 10px">
        <el-card class="chart-half">
          <div slot="header">
            <span style="font-weight: 700;font-size:0.6vw;font-family: weiruanyahei">全矿总量及油耗统计</span>
          </div>
          <echarts ref="chartOne" :report-object="listData1" :height="chartOneHeight"/>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="chart-half-two">
          <div slot="header">
            <span style="font-weight: 700;font-size:0.6vw;font-family: weiruanyahei">故障数量占比</span>
          </div>
          <echarts ref="chartTwo" :report-object="listData2" :height="chartTwoHeight"/>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="chart-half-two">
          <div slot="header">
            <span style="font-weight: 700;font-size:0.6vw;font-family: weiruanyahei">挖机开采量总和统计</span>
          </div>
          <echarts ref="chartThree" :report-object="listData3" :height="chartTwoHeight"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import list from '@/libs/mixins/list'
export default {
  mixins: [list],
  data() {
    return {
      searchData: {
        dataRange: [],
        type: '',
        status: ''
      },
      cityList: [],
      listData1: {},
      listData2: {},
      listData3: {},
      timeType: 1,
      timeList: [
        { label: '日', value: 1 },
        { label: '月', value: 2 },
        { label: '年', value: 3 }
      ],
      dateType: 'date',
      chartOneHeight: '300',
      chartTwoHeight: '200'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  created() {
  },
  mounted() {
    this.chartOneHeight = this.getHeightOne()
    this.chartTwoHeight = this.getHeightTwo()
    window.onresize = () => {
      this.chartOneHeight = this.getHeightOne()
      this.chartTwoHeight = this.getHeightTwo()
    }
    setTimeout(() => {
      this.$refs.chartOne.chart.resize()
      this.$refs.chartTwo.chart.resize()
      this.$refs.chartThree.chart.resize()
    }, 200)
  },
  methods: {
    _getList() {
      this.getList()
    },
    // 屏幕的宽度设置echarts的fontSize
    getSize() {
      const winWidth = document.documentElement.clientWidth
      return winWidth / 1082 * 8.2
    },
    getHeightOne() {
      const winWidth = document.documentElement.clientHeight
      return winWidth / 1082 * 400
    },
    getHeightTwo() {
      const winWidth = document.documentElement.clientHeight
      return winWidth / 1082 * 300
    },
    // 日期格式
    changeTime(type) {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      switch (type) {
        case 1:
          this.dateType = 'date'
          this.searchData.startTime = new Date(
            +new Date() - 15 * 24 * 60 * 60 * 1000
          )
          this.searchData.endTime = new Date()
          break
        case 2:
          this.dateType = 'month'
          this.searchData.endTime = '' + year
          if (month < 6) {
            year = year - 1
            month = month + 12 - 6
          }
          this.searchData.startTime = '' + year
          break
        case 3:
          this.dateType = 'year'
          this.searchData.startTime = '2016'
          this.searchData.endTime = '' + year
          break
      }
    },
    getList() {
      // todo 获取统计数据
      // bar
      this.listData1 = {
        color: '#78b2df',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            },
            label: {
              fontSize: this.getSize()
            }
          },
          textStyle: {
            fontSize: this.getSize()
          }
        },
        grid: {
          top: '13%',
          left: '4%',
          bottom: '4%',
          containLabel: true
        },
        legend: {
          data: ['当月总方量', '当月累计油耗'],
          orient: 'vertical',
          right: '1%',
          top: '8%',
          textStyle: {
            fontSize: this.getSize()
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              textStyle: {
                fontSize: this.getSize()
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(方量)',
            nameTextStyle: {
              fontSize: this.getSize(),
              padding: this.getSize()
            },
            min: 0,
            max: 200,
            interval: 40,
            axisLabel: {
              textStyle: {
                fontSize: this.getSize()
              }
            }
            // axisLabel: {
            //   formatter: '{value} 元'
            // }
          },
          {
            type: 'value',
            name: '(油耗L)',
            nameTextStyle: {
              fontSize: this.getSize(),
              padding: this.getSize()
            },
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: '{value} ',
              fontSize: this.getSize()
            }
          }
        ],
        series: [
          {
            name: '当月总方量',
            type: 'bar',
            data: [3, 6, 8, 32, 57, 88, 109, 145, 45, 29, 24, 17]
          },
          {
            name: '当月累计油耗',
            type: 'line',
            yAxisIndex: 1,
            data: [11, 18, 19, 20, 48, 30, 35, 45, 34, 29, 21, 11],
            itemStyle: {
              normal: {
                color: '#fed64f'
              }
            }
          }
        ]
      }
      // pie
      this.listData2 = {
        color: ['#6cbfff', '#b55454', '#6f9fa7', '#c1883a', '#23ccda'],
        legend: {
          orient: 'vertical',
          top: '18%',
          right: 0,
          width: '20px',
          data: ['平朔安太堡露天矿', '杨庄煤矿', '山西煤矿'],
          textStyle: {
            fontSize: this.getSize()
          },
          formatter: (name) => {
            let num = 10
            if (document.body.clientWidth < 1100) {
              num = 6
            }
            if (document.body.clientWidth < 1000) {
              num = 5
            }
            if (document.body.clientWidth < 900) {
              num = 4
            }
            if (document.body.clientWidth < 800) {
              num = 3
            }
            if (document.body.clientWidth < 730) {
              num = 2
            }
            const result = []
            for (let i = 0, len = name.length; i < len; i += num) {
              result.push(name.slice(i, i + num))
            }
            return result.join('\n')
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['35%', '50%'],
            // avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%',
                textStyle: {
                  fontSize: this.getSize()
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: [
              { value: 335, name: '平朔安太堡露天矿' },
              { value: 310, name: '杨庄煤矿' },
              { value: 234, name: '山西煤矿' }
            ]
          }
        ]
      }
      this.listData3 = {
        interval: 0,
        xAxis: {
          name: '方量',
          splitLine: { show: false }
        },
        yAxis: {
          data: ['山西煤矿', '杨庄煤矿', '平朔安太堡露天矿'],
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: this.getSize()
            }
          }
        },
        series: [{
          type: 'bar',
          data: [101, 125, 112],
          barWidth: '45%',
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = ['#bf9000', '#00b050', '#c00000']
                return colorList[params.dataIndex]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: this.getSize()
              }
            }
          }
        }],
        grid: {
          // left: '0%',
          // right: '10%',
          x: 40,
          y: 20,
          x2: 70,
          y2: 30,
          containLabel: true
        }
      }
    }
  }
}
</script>

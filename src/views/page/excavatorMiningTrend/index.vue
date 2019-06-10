<style lang="scss" scoped>
.tem-div {
  height: calc(100vh - 50px);
  padding: 10px;
  background: #eee;
  display: flex;
  flex-direction: column;
  .search-div {
    padding: 10px 15px;
    height: 72px;
    widows: 100%;
    background: #fff;
    border-radius: 4px;
    .item1 {
      width: 220px;
    }
    .item2,.item3 {
      margin-right: 5px;
    }
    .search-button {
      position: absolute;
      top: 37px;
      right: 65px;
    }
  }
  .chart-half {
    background: #fff;
    margin-top: 10px;
    border-radius: 4px;
    min-height: 305px;
    flex: 1;
  }
  .chart-half-two {
    // background: #fff;
    margin-top: 10px;
    display: flex;
    min-height: 255px;
    flex: 1;
    .chart-1 {
      flex: 1;
      background: #fff;
      margin-right: 5px;
       border-radius: 4px;
    }
    .chart-2 {
      flex: 1;
      background: #fff;
      margin-left: 5px;
      border-radius: 4px;
    }
  }
  .chart-title {
    padding: 10px;
    span {
      font-size: 14px;
      font-weight: 700;
      display: inline-block;
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
  }
}

</style>
<template>
  <div class="tem-div">
    <div :style="{height: searchDivHeight+ 'px'}" class="search-div">
      <el-form
        label-position="left"
        inline
        class="clear"
        style="padding-top: 20px;padding-right: 140px"
      >
        <el-form-item class="item1" label-width="80px" label="日期范围">
          <el-radio-group v-model="timeType" @change="changeTime(timeType)">
            <el-radio-button v-for="ti in timeList" :key="ti.value" :label="ti.value">{{ ti.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="item2" label="">
          <el-date-picker
            :type="dateType"
            v-model="searchData.startTime"
            :options="reportDate"
            :clearable="false"
            :editable="false"
            placement="bottom-end"
            placeholder="开始时间"
          />
        </el-form-item>
        <el-form-item class="item3">
          -
        </el-form-item>
        <el-form-item class="item4" label="">
          <el-date-picker
            :type="dateType"
            v-model="searchData.endTime"
            :options="reportDate"
            :clearable="false"
            :editable="false"
            placement="bottom-end"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item class="item5" label-width="44px" label="车型">
          <el-select
            v-model="searchData.type"
            placeholder="车型"
            style="width: 200px"
            filterable
            transfer
            clearable
          >
            <el-option v-for="(option, index) in typeList" :value="option.value" :key="index">{{ option.label }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item6" label-width="44px" label="省市">
          <el-select
            v-model="searchData.status"
            placeholder="省市"
            style="width: 200px"
            filterable
            transfer
            clearable
          >
            <el-option v-for="(option, index) in cityList" :value="option.value" :key="index">{{ option.label }}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button :loading="actionLoading" class="search-button" type="primary" icon="ios-search" @click="getList">查询</el-button>
    </div>
    <div class="chart-half">
      <div class="chart-title">
        <span>全矿总量及油耗统计</span>
      </div>
      <!-- <bar-chart :value="listData1"/> -->
      <echarts :report-object="listData1" :height="chartOneHeight" width="96%"/>
    </div>
    <div class="chart-half-two">
      <div class="chart-1">
        <div class="chart-title">
          <span>故障数量占比</span>
        </div>
        <!-- <pie-chart :value="listData2"/> -->
        <echarts :report-object="listData2" :height="chartTwoHeight"/>
      </div>
      <div class="chart-2">
        <div class="chart-title">
          <span>挖机开采量总和统计</span>
        </div>
        <!-- <scatter-chart :value="listData3"/> -->
        <echarts :report-object="listData3" :height="chartTwoHeight"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import date from 'mixins/date'
// import remote from 'mixins/remote'
// import searchDate from 'mixins/searchDate'
// import BarChart from 'common/echarts/bar'
// import PieChart from 'common/echarts/pie'
// import ScatterChart from 'common/echarts/scatter'
export default {
  // components: { BarChart, PieChart, ScatterChart },
  // mixins: [remote, date, searchDate],
  data() {
    return {
      searchData: {
        startTime: '',
        endTime: '',
        type: '',
        status: ''
      },
      typeList: [],
      cityList: [],
      actionLoading: false,
      //
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
      chartOneHeight: '252',
      chartTwoHeight: '206',
      searchDivHeight: '72',
      reportDate: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  created() {
    this.searchData.startTime = new Date(
      +new Date() - 15 * 24 * 60 * 60 * 1000
    )
    this.searchData.endTime = new Date()
  },
  mounted() {
    this.getList()
    if (this.sidebar.opened) {
      this.$store.dispatch('ToggleSideBar')
    }
    this.chartOneHeight = document.getElementsByClassName('chart-half')[0].clientHeight - 54 + ''
    this.chartTwoHeight = document.getElementsByClassName('chart-half-two')[0].clientHeight - 48.6 + ''
    this.searchDivHeight = document.getElementsByClassName('el-form')[0].clientHeight + 20 + ''
    console.log(this.searchDivHeight)
    window.onresize = () => {
      this.chartOneHeight = document.getElementsByClassName('chart-half')[0].clientHeight - 54 + ''
      this.chartTwoHeight = document.getElementsByClassName('chart-half-two')[0].clientHeight - 44.6 + ''
    }
  },
  methods: {
    // 日期格式
    changeTime(type) {
      console.log(type)
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
          console.log(this.searchData.startTime, this.searchData.endTime)
          console.log(year, month)
          this.searchData.endTime = '' + year
          if (month < 6) {
            year = year - 1
            month = month + 12 - 6
          }
          this.searchData.startTime = '' + year
          console.log(this.searchData.startTime, this.searchData.endTime)
          break
        case 3:
          this.dateType = 'year'
          console.log(this.searchData.startTime, this.searchData.endTime)
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
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        grid: {
          top: '10%',
          left: '4%',
          bottom: '4%',
          containLabel: true
        },
        legend: {
          data: ['当月总方量', '当月累计油耗'],
          orient: 'vertical',
          right: '0%',
          top: '8%'
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(方量)',
            min: 0,
            max: 200,
            interval: 40
            // axisLabel: {
            //   formatter: '{value} 元'
            // }
          },
          {
            type: 'value',
            name: '(油耗L)',
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: '{value} '
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '75%',
          top: '18%',
          data: ['平朔安太堡露天矿', '杨庄煤矿', '山西煤矿']
        },
        series: [
          {
            name: '故障数量',
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
                formatter: '{d}%'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
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
            show: true
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
              show: true
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

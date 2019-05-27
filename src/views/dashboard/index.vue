<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ $t('app.username') }}:{{ name }}   {{ $t('app.roles') }}:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <hr>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <statistics :number="userNumber" icon="user" title="用户列表" color="#f0ad4e"/>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <statistics :number="messageNumber" icon="message" title="报警列表" color="#4CB1CF"/>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <statistics :number="taskNumber" icon="task" title="任务列表" color="#F0433D"/>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <statistics :number="driverNumber" icon="driver" title="司机列表" color="#5cb85c"/>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16">
        <el-card class="box-card">
          <div slot="header">
            <span>一周工作量</span>
          </div>
          <echarts :report-object="reportData" height="300"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8">
        <el-card class="box-card">
          <div slot="header">
            <span>设备占比分布</span>
          </div>
          <echarts :report-object="reportData1" height="300"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="10">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import statistics from './components/statistics'
import TodoList from './components/TodoList'
import { parseTime } from '@/libs/utils'
export default {
  name: 'Dashboard',
  components: { statistics, TodoList },
  data() {
    return {
      userNumber: 201,
      messageNumber: 3215,
      taskNumber: 9641,
      driverNumber: 1258,
      reportData: {},
      reportData1: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    setTimeout(() => {
      const xData = []
      for (let i = 7; i > 0; i--) {
        const time = parseTime(new Date().getTime() - 86000000 * i, '{y}-{m}-{d}')
        xData.push(time)
      }
      this.reportData = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            name: '工作量',
            type: 'bar',
            barWidth: '40%',
            data: [4560, 4533, 5641, 6128, 6175, 6481, 4695]
          }

        ],
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        }
      }
      this.reportData1 = {
        // graphic: {
        //   elements: [{
        //     type: 'image',
        //     style: {
        //       image: giftImageUrl,
        //       width: 30,
        //       height: 30
        //     },
        //     left: 'center',
        //     top: 'center'
        //   }]
        // },
        series: [{
          type: 'pie',
          radius: [30, '55%'],
          center: ['50%', '50%'],
          // roseType: 'radius',
          color: ['#f2c955', '#00a69d', '#46d185', '#ec5845'],
          data: [{
            value: 7,
            name: '挖掘机'
          }, {
            value: 4,
            name: '装载机'
          }, {
            value: 35,
            name: '运输车'
          }],
          label: {
            normal: {
              textStyle: {
                fontSize: 14
              },
              formatter: function(param) {
                return param.name + ':\n' + Math.round(param.percent) + '%'
              }
            }
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 2
              }
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 30,
              shadowColor: 'rgba(0, 0, 0, 0.4)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200
          }
        }]
      }
    }, 1000)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

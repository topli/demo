<template>
  <el-card class="statistics">
    <div class="text">
      <div class="text-left">
        <svg-icon :icon-class="iconPeople"/>
        <span>{{ nowDate }}</span>
      </div>
      <div class="text-right" @click="$router.push({name: 'driverTask'})">
        <span>更多</span>
        <svg-icon :icon-class="iconArrow"/>
      </div>
    </div>
    <div class="line">
      <div/>
    </div>
    <div class="table" style="width: 100%;">
      <t-for-col
        :data="list"
        :border="false"
        :stripe="true"
        :columns-title="columnsTitle"
        :loading="loading"/>
    </div>
  </el-card>
</template>

<script>
import list from '@/libs/mixins/list'
import { getList } from '@/views/page/driverTask/service'
import { DateFormat } from '@/libs/utils'
import Mock from 'mockjs'

export default {
  mixins: [list],
  data() {
    return {
      iconPeople: 'driver',
      iconArrow: 'iconArrow',
      nameList: [],
      taskTypeList: ['早班', '早班', '晚班', '晚班', '休息'],
      taskStatusList: ['已调度', '已调度', '已调度', '未调度', '未调度'],
      columnsTitle: [
        {
          key: 'deviceNo',
          title: '设备编号',
          minWidth: '160'
        },
        {
          key: 'driverName',
          title: '司机姓名',
          minWidth: '90'
        },
        {
          key: 'taskType',
          title: '排班',
          minWidth: '90'
        },
        {
          key: 'taskStatus',
          title: '调度状态',
          minWidth: '80',
          render: (h, params) => {
            return h('span', {
              style: {
                color: params.row.taskStatus === '已调度' ? '#51ae48' : '#f73838'
              }
            },
            params.row.taskStatus)
          }
        }
      ]
    }
  },
  computed: {
    nowDate() {
      return DateFormat(new Date(), 'yyyy-MM-dd')
    }
  },
  created() {
    var Random = Mock.Random
    let i = 0
    while (i < 200) {
      this.nameList.push(Random.cname())
      i++
    }
  },
  mounted() {

  },
  methods: {
    _getList() {
      this.loading = true
      getList(this.searchData).then(res => {
        setTimeout(() => {
          this.loading = false
          this.list = res.data.list
          this.list = this.list.filter((item, index) => {
            return index < 5
          })
          for (let i = 0; i < 5; i++) {
            this.list[i].taskType = this.taskTypeList[i]
            this.list[i].taskStatus = this.taskStatusList[i]
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__body {
  padding: 5px;
}
.text {
  padding: 10px;
  color: #105cb0;
  font-size: 16px;
  overflow: hidden;
  .text-left {
    float: left;
    .svg-icon {
      width: 1.2em;
      height: 1.2em;
    }
    span {
      padding: 0 10px;
      margin-left: 10px;
      border-left: 1px solid #105cb0;
    }
  }
  .text-right {
    cursor: pointer;
    float: right;
    span {
      font-size: 13px;
    }
  }
}
.line {
  padding: 0 10px;
  >div {
    border-bottom: 1px solid #CBCCCE;
  }
}
.table {
  height: 194px ;
  /deep/.el-table {
    height: 200px !important;
    /deep/.el-table__header-wrapper {
      display: none;
    }
  }
}
</style>


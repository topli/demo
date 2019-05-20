<template>
  <div class="task-col">
    <el-tag>
      {{ dirverTaskInfo.driverName }}
    </el-tag>
    <el-tag :color="taskType.color" class="colorW">
      {{ taskType.label }}
    </el-tag>
    <el-tag :color="taskStatus.color" class="colorW">
      {{ taskStatus.label }}
    </el-tag>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    dirverTaskInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      taskType: {},
      taskStatus: {}
    }
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.getTaskType()
      this.getTaskStatus()
    })
  },
  // 方法集合
  methods: {
    getFilterStr(val, type) {
      const filter = Vue.filter('getDictDatas')
      return filter(val, type)
    },
    getTaskType() {
      let index = 0
      const _that = this
      function test() {
        const v = _that.getFilterStr(_that.dirverTaskInfo.taskType, 'taskType')
        _that.taskType = {}
        if (v) {
          _that.taskType = v
        }
      }
      test()
      if (_that.taskType && index < 1) {
        index++
        setTimeout(() => {
          test()
        }, 500)
      }
    },
    getTaskStatus() {
      let index = 0
      const _that = this
      function test() {
        const v = _that.getFilterStr(_that.dirverTaskInfo.taskStatus, 'taskStatus')
        _that.taskStatus = {}
        if (v) {
          _that.taskStatus = v
        }
      }
      test()
      if (_that.taskType && index < 1) {
        index++
        setTimeout(() => {
          test()
        }, 500)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.task-col{
  margin-bottom: 5px;
}
.task-col:last-child{
  margin-bottom: 0
}
.colorW {
  color: white!important;
}
</style>

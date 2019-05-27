<style lang="scss" scoped>
  .echarts-report {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
<template>
  <div class="echarts-report">
    <div :id="id" :style="style" style="height: 100%;width: 100%;"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import { monitorDomEvent } from '@/libs/utils'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    reportObject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    style() {
      const style = {}
      return style
    }
  },
  watch: {
    reportObject: {
      handler: function(val) {
        if (val && val.series) {
          this.chart.setOption(val)
        } else {
          this.chart && this.chart.clear()
        }
      },
      deep: true
    }
  },
  created() {
    // window.addEventListener('resize', this.resize)
  },
  mounted() {
    this._initCharts()
    monitorDomEvent.call(this, this.id)
  },
  beforeDestroy() {
    this.chart = null
    // window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      if (this.chart) {
        setTimeout(() => {
          this.chart.resize()
        }, 200)
      }
    },
    _initCharts() {
      setTimeout(() => {
        // 不存在echarts实例 创建实例 存在则清除之前数据
        if (!this.chart) {
          this.chart = echarts.init(document.getElementById(this.id))
        } else {
          this.chart && this.chart.clear()
        }
        const option = this.reportObject
        option && this.chart.setOption(option)
      }, 500)
    }
  }
}
</script>

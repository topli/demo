<style lang="scss" scoped>
  .echarts-report {
    position: relative;
  }
</style>
<template>
  <div :style="style"/>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '150'
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
      return {
        width: isNaN(Number(this.width)) ? this.width : this.width + 'px',
        height: isNaN(Number(this.height)) ? this.height : this.height + 'px'
      }
    }
  },
  watch: {
    reportObject: {
      handler: function(val) {
        this.chart.setOption(val)
      },
      deep: true
    }
  },
  created() {
    window.addEventListener('resize', this.resize)
  },
  mounted() {
    this._initCharts()
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.resize)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.resize)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      if ((event.type === 'transitionend' && event.propertyName === 'width') || event.type === 'resize') {
        if (this.chart) {
          setTimeout(() => {
            this.chart.resize()
          }, 200)
        }
      }
    },
    _initCharts() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption(this.reportObject)
    }
  }
}
</script>

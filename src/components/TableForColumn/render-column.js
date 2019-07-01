import Vue from 'vue'
export default {
  props: {
    renderContent: Function,
    scope: Object,
    prop: String,
    filters: String
  },
  data() {
    return {
      val: {
        value: '',
        label: ''
      }
    }
  },
  created() {
  },
  methods: {
    isChange() {
      // columns key is empty return false
      if (!this.prop) {
        return false
      }
      const newValue = this.scope.row[this.prop]
      const oldValue = this.val.value
      return !(String(newValue) === String(oldValue))
    },
    filterData() {
      if (this.filters) {
        const length = this.filters.length
        const params = this.filters.split('|')
        const type = params.slice(0, 1)
        const arg = params.slice(1, length)
        const vueFilter = Vue.filter(...type) // 挂载到vue上的过滤器
        if (vueFilter) {
          this.val.value = this.scope.row[this.prop]
          this.val.label = vueFilter(this.scope.row[this.prop], ...arg)
        } else {
          const getDictDatas = Vue.filter('getDictDatas') // 获取字典过滤器
          const dist = getDictDatas(this.scope.row[this.prop], this.filters)
          // for 中的渲染函数 render 中不能有改变值 否则报错（You may have an infinite update loop in a component render function）
          Object.keys(dist).forEach((item) => {
            this.val[item] = dist[item]
          })
        }
      } else {
        this.val.label = this.scope.row[this.prop]
      }
    }
  },
  render(h) {
    if (this.isChange()) {
      // rerender
      this.filterData()
    }
    return (this.renderContent ? this.renderContent(h, this.scope, this.val || {}) : (<span> { this.val.label }</span>))
  }
}

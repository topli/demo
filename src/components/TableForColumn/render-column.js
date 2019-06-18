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
      val: null
    }
  },
  created() {
  },
  render(h) {
    const prop = this.prop
    const scope = this.scope
    const filters = this.filters
    if (filters) {
      const type = filters.split('|').slice(0, 1)
      const params = filters.split('|').slice(1, filters.length)
      const test = Vue.filter(...type)
      if (test) {
        this.val = test(scope.row[prop], ...params)
      } else {
        const getDictDatas = Vue.filter('getDictDatas')
        if (!getDictDatas) {
          console.error('not define filters: ' + filters)
          return
        }
        this.val = getDictDatas(scope.row[prop], filters)
      }
    } else {
      this.val = scope.row[prop]
    }
    return (this.renderContent ? this.renderContent(h, scope, this.val || {}) : (<span> { this.val }</span>))
  }
}

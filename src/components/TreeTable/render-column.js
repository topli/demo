import Vue from 'vue'
export default {
  props: {
    renderContent: Function,
    scope: Object,
    prop: String,
    filters: String
  },
  render(h) {
    const prop = this.prop
    const scope = this.scope
    const filters = this.filters
    let v = null
    if (filters) {
      const type = filters.split('|').slice(0, 1)
      const params = filters.split('|').slice(1, filters.length)
      const test = Vue.filter(type)
      if (test) {
        v = test(scope.row[prop], ...params)
      } else {
        const getDictDatas = Vue.filter('getDictDatas')
        if (!getDictDatas) {
          console.error('not define filters: ' + filters)
          return
        }
        v = getDictDatas(scope.row[prop], filters)
      }
    } else {
      v = scope.row[prop]
    }
    return (this.renderContent ? this.renderContent.call(this._renderProxy, h, scope, v) : (<span> { v }</span>))
  }
}

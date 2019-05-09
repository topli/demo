import Vue from 'vue'
export default {
  props: {
    renderContent: Function,
    scope: Object,
    prop: String,
    filters: String,
    dictType: String
  },
  render(h) {
    const prop = this.prop
    const scope = this.scope
    let filters = this.filters
    const dictType = this.dictType
    let v = null
    if (filters || dictType) {
      if (dictType) {
        filters = 'getDictDatas'
      }
      const test = Vue.filter(filters)
      if (test) {
        v = test(scope.row[prop], dictType || '')
        if (this.renderContent) {
          this.$set(scope.row, '_f_' + prop, v)
        }
      } else {
        console.error('not define filters: ' + filters)
      }
    } else {
      v = scope.row[prop]
    }
    return (this.renderContent ? this.renderContent.call(this._renderProxy, h, scope) : (<span> { v }</span>))
  }
}

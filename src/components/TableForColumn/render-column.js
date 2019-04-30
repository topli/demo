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
    let v = null
    if (this.filters) {
      const test = Vue.filter(this.filters)
      v = test(scope.row[prop])
    } else {
      v = scope.row[prop]
    }
    return (this.renderContent ? this.renderContent.call(this._renderProxy, h, scope) : (<span> { v }</span>))
  }
}

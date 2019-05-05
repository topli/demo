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
      if (test) {
        v = test(scope.row[prop])
        if (this.renderContent) {
          this.$set(scope.row, '_f_' + prop, v)
        }
      } else {
        console.error('not define filters: ' + this.filters)
      }
    } else {
      v = scope.row[prop]
    }
    return (this.renderContent ? this.renderContent.call(this._renderProxy, h, scope) : (<span> { v }</span>))
  }
}

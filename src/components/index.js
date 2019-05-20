import Vue from 'vue'
import IconBtn from './IconBtn'
import SearchTem from './SearchTem'
import TableForColumn from './TableForColumn'
import OrgTree from './OrgTree'
import TreeTable from './TreeTable'
import SelectRemote from './SelectRemote'
import Echarts from './Echarts'
import TaskCol from './TaskCol'

import DialogBox from './DialogBox/index.js'

const install = function(Vue, options = {}) {
  // 静态方法
  if (install.installed) return
  install.installed = true
  // 全局组件
  Vue.component('iconBtn', IconBtn)
  Vue.component('SearchTem', SearchTem)
  Vue.component('TForCol', TableForColumn)
  Vue.component('OrgTree', OrgTree)
  Vue.component('TreeTable', TreeTable)
  Vue.component('SelectRemote', SelectRemote)
  Vue.component('Echarts', Echarts)
  Vue.component('TaskCol', TaskCol)
  // 调用组件
  Vue.prototype.$dialogBox = DialogBox
}
var components = { install }

Vue.use(components)

export default { components }

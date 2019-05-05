/**
 *  描述：Global directive js
 */

import Vue from 'vue'
import store from '@/store'

const install = Vue => {
  // 按钮权限
  Vue.directive('btnAuth', {
    bind: (el, binding) => {
      var pageBtns = store.getters.pageBtns
      var authCode = binding.value || ''
      if (!authCode) return
      if (pageBtns && pageBtns.length > 0) {
        if (pageBtns.indexOf(authCode)) {
          el.style.display = 'none' // 在dom树中隐藏
        }
      } else {
        el.style.display = 'black' // 在dom树中隐藏
      }
    }
  })
}
var directive = { install }

Vue.use(directive)

export default install

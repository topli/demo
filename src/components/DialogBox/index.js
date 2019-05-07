import Vue from 'vue'
import Main from './index.vue'
import { isNumber } from 'util'
const Dialog = Vue.extend(Main)

let instance
const instances = []
let seed = 1
// onSub、onClose 弹出层内置方法
// onSub 执行$dialog 参数中的 onSub 方法 执行完成后立即关闭弹出层
// onClose 关闭弹出层
const DialogBox = function(options) {
  options = options || {}
  const userOnSub = options.onSub
  const userOnClose = options.onClose
  const id = 'dialog_' + seed++

  options.onClose = function() {
    DialogBox.close(id, userOnClose)
  }
  options.onSub = function() {
    userOnSub && userOnSub()
    DialogBox.close(id)
  }
  if (options.width && isNumber(options.width)) {
    options.width = options.width + 'px'
  }
  instance = new Dialog({
    data: options,
    parent: this.$root
  })
  instance.vm = instance.$mount()
  instance.id = id
  document.body.appendChild(instance.vm.$el)
  instances.push(instance)
  return instance.vm
}

DialogBox.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      // 释放内存
      instances[i].$destroy()
      document.body.removeChild(instances[i].vm.$el)
      instances.splice(i, 1)
      break
    }
  }
}

DialogBox.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default DialogBox

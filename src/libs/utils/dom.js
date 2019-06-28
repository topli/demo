import screenfull from 'screenfull'
export function screenfullEl(id) {
  // todo 适配IE10 一下
  if (!screenfull.enabled) {
    this.$message({
      message: this.$t('app.fullScreenSupport'),
      type: 'warning'
    })
    return false
  }
  screenfull.toggle(document.getElementById(id))
  this.isFullscreen = true
  screenfull.on('change', (e) => {
    this.isFullscreen = screenfull.isFullscreen
  })
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

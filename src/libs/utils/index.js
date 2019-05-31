/**
 * Created by lt on 19/05/06.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
export function DateFormat(str, fmt) {
  const o = {
    'M+': str.getMonth() + 1,
    'd+': str.getDate(),
    'h+': str.getHours(),
    'm+': str.getMinutes(),
    's+': str.getSeconds(),
    'q+': Math.floor((str.getMonth() + 3) / 3),
    'S': str.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/** 调用浏览器storage
 * @param key
 * @param value
 * @param boolean
 */
export function setStorage(key, value, boolean) {
  let storageObj = null
  if (boolean) {
    storageObj = window.sessionStorage
  } else {
    storageObj = window.localStorage
  }
  if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
    value = JSON.stringify(value)
  }
  storageObj.setItem(key, value)
}

export function getStorage(key, boolean) {
  let storageObj = null
  if (boolean) {
    storageObj = window.sessionStorage
  } else {
    storageObj = window.localStorage
  }
  return storageObj.getItem(key)
}
export function removeStorage(key, boolean) {
  let storageObj = null
  if (boolean) {
    storageObj = window.sessionStorage
  } else {
    storageObj = window.localStorage
  }
  storageObj.removeItem(key)
}
export function getQueryString(url) {
  if (!url.indexOf('?')) return
  const qs = url.substr(url.indexOf('?') + 1) // 获取url中"?"符后的字串
  const args = {} // 保存参数数据的对象
  const items = qs.length ? qs.split('&') : [] // 取得每一个参数项,
  let item = null
  const len = items.length
  for (var i = 0; i < len; i++) {
    item = items[i].split('=')
    const name = decodeURIComponent(item[0])
    const value = decodeURIComponent(item[1])
    if (name) {
      args[name] = value
    }
  }
  return args
}
/**
 * confirm
 * @param {*} submitFun
 * @param {*} cancelFun
 */
export function confirm(submitFun, cancelFun) {
  this.$confirm(this.$t('app.disablesTips'), this.$t('app.disables'), {
    confirmButtonText: this.$t('app.submit'),
    cancelButtonText: this.$t('app.cancel'),
    type: 'warning',
    confirmButtonClass: 'show-del-submit'
  }).then(() => {
    submitFun && submitFun()
  }).catch(() => {
    cancelFun && cancelFun()
  })
}
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

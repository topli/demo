import { setStorage, getStorage, getQueryString } from '@/libs/utils'
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function getLocalList(param, type) {
  // 获取参数
  const p = getQueryString(param.url)
  const localData = JSON.parse(getStorage('localData'))
  let list = localData[type].list
  if (p.pageNo && p.pageSize) {
    list = list.slice((p.pageNo - 1) * p.pageSize, (p.pageNo * p.pageSize) > list.length ? list.length : p.pageNo * p.pageSize)
  }
  return {
    code: 200,
    data: {
      list: list,
      total: list.length,
      message: 'success'
    }
  }
}
export function addLocalData(param, type) {
  const localData = JSON.parse(getStorage('localData'))
  const list = localData[type].list
  const data = JSON.parse(param.body)
  const find = list.find((item) => {
    return item.username === data.username
  })
  if (find) {
    return {
      code: 500,
      data: null,
      message: '姓名重复'
    }
  }
  localData[type].list.push(data)
  setStorage('localData', localData)
  return {
    code: 200,
    data: null
  }
}

export function editLocalData(param, type) {
  const localData = JSON.parse(getStorage('localData'))
  const list = localData[type].list
  const data = JSON.parse(param.body)
  let index = null
  const find = list.find((item, i) => {
    if (item.id === data.id) {
      index = i
      return item.id === data.id
    }
  })
  if (!find) {
    return {
      code: 500,
      message: '未找到数据'
    }
  }
  list[index] = data
  setStorage('localData', localData)
  return {
    code: 200,
    data: null
  }
}

export function delLocalData(param, type) {
  const localData = JSON.parse(getStorage('localData'))
  const list = localData[type].list
  const data = JSON.parse(param.body)
  let index = null
  const find = list.find((item, i) => {
    if (item.id === data.id) {
      index = i
      return item.id === data.id
    }
  })
  if (!find) {
    return {
      code: 500,
      message: '未找到数据'
    }
  }
  list.splice(index, 1)
  setStorage('localData', localData)
  return {
    code: 200,
    data: null
  }
}

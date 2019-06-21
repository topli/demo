import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'
import { getStorage, setStorage } from '@/libs/utils'
export default {
  add: (param) => {
    const data = addLocalData(param, 'dict')
    const localData = JSON.parse(getStorage('localData'))
    const dictData = localData['dict'].data
    const body = JSON.parse(param.body)
    const find = dictData[body.group]
    if (find) {
      find.push(body)
    } else {
      dictData[body.group] = []
      dictData[body.group].push(body)
    }
    setStorage('localData', localData)
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'dict')
    const localData = JSON.parse(getStorage('localData'))
    const dictData = localData['dict'].data
    const body = JSON.parse(param.body)
    let index = null
    if (dictData[body.group]) {
      dictData[body.group].find((item, i) => {
        index = i
        return item.id === body.id
      })
      dictData[body.group][index] = body
    } else {
      dictData[body.group] = [body]
    }
    setStorage('localData', localData)
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'dict')
    const localData = JSON.parse(getStorage('localData'))
    const dictData = localData['dict'].data
    const body = JSON.parse(param.body)
    let index = null
    const find = dictData[body.group].find((item, i) => {
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
    dictData[body.group].splice(index, 1)
    setStorage('localData', localData)
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'dict')
    return data
  },
  list2: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const list = localData['dict'].data
    return {
      code: 200,
      data: {
        list: list,
        total: list.length,
        message: 'success'
      }
    }
  }
}

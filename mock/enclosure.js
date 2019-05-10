import { getLocalList, addLocalData, delLocalData } from './utils'
import { setStorage, getStorage } from '@/libs/utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'enclosure')
    return data
  },
  edit: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    localData['enclosure'].list = JSON.parse(param.body).list
    setStorage('localData', localData)
    return {
      code: 200,
      data: null
    }
  },
  del: (param) => {
    const data = delLocalData(param, 'enclosure')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'enclosure')
    console.log(data)
    return data
  }
}

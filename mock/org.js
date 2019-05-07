import { getLocalList, addLocalData, delLocalData } from './utils'
import { setStorage, getStorage } from '@/libs/utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'org')
    return data
  },
  edit: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    localData['org'].list = JSON.parse(param.body).list
    setStorage('localData', localData)
    return {
      code: 200,
      data: null
    }
  },
  del: (param) => {
    const data = delLocalData(param, 'org')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'org')
    return data
  }
}

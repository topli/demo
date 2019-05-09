import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'
import { getStorage } from '@/libs/utils'
export default {
  add: (param) => {
    const data = addLocalData(param, 'dict')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'dict')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'dict')
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

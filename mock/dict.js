import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

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
  }
}

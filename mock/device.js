import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'device')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'device')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'device')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'device')
    return data
  }
}

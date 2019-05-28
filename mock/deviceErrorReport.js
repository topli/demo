import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'deviceErrorReport')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'deviceErrorReport')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'deviceErrorReport')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'deviceErrorReport')
    return data
  }
}

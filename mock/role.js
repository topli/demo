import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'role')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'role')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'role')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'role')
    return data
  }
}

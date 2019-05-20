import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'tasks')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'tasks')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'tasks')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'tasks')
    return data
  }
}

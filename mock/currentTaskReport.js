import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'currentTaskReport')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'currentTaskReport')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'currentTaskReport')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'currentTaskReport')
    return data
  }
}

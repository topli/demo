import { getLocalList, addLocalData, editLocalData, delLocalData } from './utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'alarmSet')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'alarmSet')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'alarmSet')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'alarmSet')
    return data
  }
}

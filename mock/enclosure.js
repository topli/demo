import { getLocalList, addLocalData, delLocalData, editLocalData } from './utils'
// import { setStorage, getStorage } from '@/libs/utils'

export default {
  add: (param) => {
    const data = addLocalData(param, 'enclosure')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'enclosure')
    return data
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

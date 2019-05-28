import { getLocalList, editLocalData } from './utils'
// import { setStorage, getStorage } from '@/libs/utils'

export default {
  list: (param) => {
    const data = getLocalList(param, 'deviceError')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'deviceError')
    return data
  }
}

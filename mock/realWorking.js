import { getLocalList } from './utils'

export default {
  list: (param) => {
    const data = getLocalList(param, 'realWorking')
    return data
  }
}

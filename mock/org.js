import { getLocalList, delLocalData } from './utils'
import { setStorage, getStorage } from '@/libs/utils'

function addArrayData(menuData, menu) {
  if (menuData instanceof Array) {
    menuData.forEach((m) => {
      if (m.id === menu.parentId) {
        if (m.children && Array.isArray(m.children)) {
          m.children.push(menu)
        } else {
          m['children'] = []
          m.children.push(menu)
        }
      } else if (m.children && m.children.length > 0) {
        addArrayData(m.children, menu)
      }
    })
  }
}
function editArrayData(menuData, menu) {
  if (menuData instanceof Array) {
    menuData.forEach((m, i) => {
      if (m.id === menu.id) {
        menuData.splice(i, 1, menu)
      } else if (m.children && m.children.length > 0) {
        editArrayData(m.children, menu)
      }
    })
  }
}
export default {
  add: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const list = localData['org'].list
    addArrayData(list, JSON.parse(param.body))
    console.log(list)
    localData['org'].list = list
    setStorage('localData', localData)
    return {
      code: 200,
      data: null
    }
  },
  edit: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const list = localData['org'].list
    editArrayData(list, JSON.parse(param.body))
    setStorage('localData', localData)
    return {
      code: 200,
      data: null
    }
  },
  del: (param) => {
    const data = delLocalData(param, 'org')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'org')
    return data
  }
}

import { getStorage, setStorage } from '@/libs/utils'
function getMenuData(menuData, menu) {
  if (menuData instanceof Array) {
    menuData.forEach((m) => {
      if (m.id === menu.id) {
        Object.keys(menu).forEach(k => {
          m[k] = menu[k]
        })
      } else if (m.child && m.child.length > 0) {
        getMenuData(m.child, menu)
      }
    })
  }
}
export default {
  add: (param) => {
  },
  edit: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const menuData = localData['menu'].data
    const body = JSON.parse(param.body)
    getMenuData(menuData, body)
    setStorage('localData', localData)
    return {
      code: 200,
      data: {
        message: 'success'
      }
    }
  },
  del: (param) => {
    // const localData = JSON.parse(getStorage('localData'))
    // const dictData = localData['menu'].data
    // const body = JSON.parse(param.body)
    // let index = null
    // const find = dictData[body.group].find((item, i) => {
    //   if (item.id === data.id) {
    //     index = i
    //     return item.id === data.id
    //   }
    // })
    // if (!find) {
    //   return {
    //     code: 500,
    //     message: '未找到数据'
    //   }
    // }
    // dictData[body.group].splice(index, 1)
    // setStorage('localData', localData)
    // return {
    //   code: 200,
    //   data: {
    //     message: 'success'
    //   }
    // }
  },
  list: (param) => {
    return {
      code: 200,
      data: {
        message: 'success'
      }
    }
  },
  data: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const list = localData['menu'].data
    return {
      code: 200,
      data: {
        list: list,
        total: list.length,
        message: 'success'
      }
    }
  }
}

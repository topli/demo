import { param2Obj } from './utils'
import { getStorage, getQueryString } from '@/libs/utils'
import { setStorage } from '../src/libs/utils'
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        code: 200,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        code: 200,
        data: info
      }
    }
    return {
      code: 508,
      message: 'Login failed, unable to get user details.'
    }
  },
  logout: () => {
    return {
      code: 200,
      data: 'success'
    }
  },
  add: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const list = localData['user'].list
    const data = JSON.parse(param.body)
    const find = list.find((item) => {
      return item.username === data.username
    })
    if (find) {
      return {
        code: 500,
        data: null,
        message: '姓名重复'
      }
    }
    localData['user'].list.push(data)
    setStorage('localData', localData)
    return {
      code: 200,
      data: null
    }
  },
  edit: (param) => {
    const localData = JSON.parse(getStorage('localData'))
    const list = localData['user'].list
    const data = JSON.parse(param.body)
    let index = null
    const find = list.find((item, i) => {
      if (item.username === data.username) {
        index = i
        return item.username === data.username
      }
    })
    if (!find) {
      return {
        code: 500,
        message: '未找到数据'
      }
    }
    list[index] = data
    setStorage('localData', localData)
    return {
      code: 200,
      data: null
    }
  },
  list: (param) => {
    // 获取参数
    const p = getQueryString(param.url)
    const localData = JSON.parse(getStorage('localData'))
    let list = localData['user'].list
    if (p) {
      list = list.slice((p.pageNo - 1) * p.pageSize, (p.pageNo * p.pageSize) > list.length ? list.length : p.pageNo * p.pageSize)
    }
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

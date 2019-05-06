import { param2Obj, getLocalList, addLocalData, editLocalData, delLocalData } from './utils'
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
    const data = addLocalData(param, 'user')
    return data
  },
  edit: (param) => {
    const data = editLocalData(param, 'user')
    return data
  },
  del: (param) => {
    const data = delLocalData(param, 'user')
    return data
  },
  list: (param) => {
    const data = getLocalList(param, 'user')
    return data
  }
}

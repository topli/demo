import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import orgAPI from './org'
import roleAPI from './role'
import dictAPI from './dict'
import menuAPI from './menu'
import deviceAPI from './device'
import driverTaskAPI from './driverTask'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/user\/add/, 'post', userAPI.add)
Mock.mock(/\/user\/list/, 'get', userAPI.list)
Mock.mock(/\/user\/edit/, 'put', userAPI.edit)
Mock.mock(/\/user\/del/, 'delete', userAPI.del)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

// ORG
Mock.mock(/\/org\/add/, 'post', orgAPI.add)
Mock.mock(/\/org\/list/, 'get', orgAPI.list)
Mock.mock(/\/org\/edit/, 'put', orgAPI.edit)
Mock.mock(/\/org\/del/, 'delete', orgAPI.del)
// role
Mock.mock(/\/role\/add/, 'post', roleAPI.add)
Mock.mock(/\/role\/list/, 'get', roleAPI.list)
Mock.mock(/\/role\/edit/, 'put', roleAPI.edit)
Mock.mock(/\/role\/del/, 'delete', roleAPI.del)
// dict
Mock.mock(/\/dict\/add/, 'post', dictAPI.add)
Mock.mock(/\/dict\/list/, 'get', dictAPI.list)
Mock.mock(/\/dict\/edit/, 'put', dictAPI.edit)
Mock.mock(/\/dict\/del/, 'delete', dictAPI.del)
Mock.mock(/\/dict\/data/, 'get', dictAPI.list2)
// menu
Mock.mock(/\/menu\/add/, 'post', menuAPI.add)
Mock.mock(/\/menu\/list/, 'get', menuAPI.list)
Mock.mock(/\/menu\/edit/, 'put', menuAPI.edit)
Mock.mock(/\/menu\/del/, 'delete', menuAPI.del)
Mock.mock(/\/menu\/data/, 'get', menuAPI.data)
// menu
Mock.mock(/\/device\/add/, 'post', deviceAPI.add)
Mock.mock(/\/device\/list/, 'get', deviceAPI.list)
Mock.mock(/\/device\/edit/, 'put', deviceAPI.edit)
Mock.mock(/\/device\/del/, 'delete', deviceAPI.del)
// menu
Mock.mock(/\/driverTask\/add/, 'post', driverTaskAPI.add)
Mock.mock(/\/driverTask\/list/, 'get', driverTaskAPI.list)
Mock.mock(/\/driverTask\/edit/, 'put', driverTaskAPI.edit)
Mock.mock(/\/driverTask\/del/, 'delete', driverTaskAPI.del)
export default Mock

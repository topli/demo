import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import orgAPI from './org'

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
export default Mock

import request from '@/libs/utils/request'

const options = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE']
const http = (requestUrl, arg, config) => {
  let params = null
  let data = null
  if (arg) {
    if (arg.params) {
      params = arg.params
    }
    if (arg.data) {
      data = arg.data
    }
  }
  const method = requestUrl.split(' ')[0]
  const url = requestUrl.split(' ')[1]
  if (options.indexOf(method.toUpperCase()) === -1) {
    console.error('methods must is for [GET , HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE]')
    return
  }
  if (!url) {
    console.error('url is not null')
    return
  }
  const configs = {
    url: url,
    method: method,
    params,
    data,
    ...config,
    validateStatus: null // 所有响应都resolve
  }
  return request(configs)
}

export default http

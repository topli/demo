const baiduAK = 'gZcbYqfGW2rxGCzifkEfNV3aNORZG7qG'
export const getAddress = function(point, data) {
  const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${point.lat},${point.lng}&output=json&pois=1&ak=` + baiduAK
  return new Promise((resolve, reject) => {
    const callbackName = 'renderReverse'
    const jsNode = document.createElement('script')
    jsNode.src = url
    // 触发callback，触发后删除js标签和绑定在window上的callback
    window[callbackName] = result => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      if (result) {
        resolve(result)
      } else {
        reject('没有返回数据')
      }
    }
    // js加载异常的情况
    jsNode.addEventListener('error', () => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      reject('JavaScript资源加载失败')
    }, false)
    // 添加js节点到document上时，开始请求
    document.body.appendChild(jsNode)
  })
}

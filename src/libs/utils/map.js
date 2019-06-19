// import store from '@/store/';
import BMap from 'BMap'
const baiduAK = 'gZcbYqfGW2rxGCzifkEfNV3aNORZG7qG'

/**
 * 经纬度转百度坐标点
 * @param p
 * @param type 纠偏类型
 * @returns {BMap.Point}
 */
export const getPoint = (p, type = 'htb') => {
  let coordinate = null
  if (type === 'htb') {
    coordinate = bdEncrypt(p.lng, p.lat)
  } else {
    coordinate = { lng: p.lng, lat: p.lat }
  }
  const point = new BMap.Point(coordinate.lng, coordinate.lat)
  return point
}
/**
 * 批量经纬度转百度坐标点
 * @param array
 * @param type 纠偏类型
 * @returns {Array}
 */
export const getPoints = (array, type = 'htb') => {
  const points = []
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      const data = array[i]
      points[i] = getPoint(data, type)
    }
  }
  return points
}
/**
 * 火星转百度
 * @param lng
 * @param lat
 * @returns {{lng: number, lat: number}}
 */
const bdEncrypt = (lng, lat) => {
  const X_PI = Math.PI * 3000.0 / 180.0
  const x = lng
  const y = lat
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  const bdLon = z * Math.cos(theta) + 0.0065
  const bdLat = z * Math.sin(theta) + 0.006
  const p = { lng: bdLon, lat: bdLat }
  return p
}

export const getZoom = (map, maxLng, minLng, maxLat, minLat) => {
  const zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000'] // 级别18到3。
  const pointA = new BMap.Point(maxLng, maxLat) // 创建点坐标A
  const pointB = new BMap.Point(minLng, minLat) // 创建点坐标B
  const distance = map.getDistance(pointA, pointB).toFixed(1) // 获取两点距离,保留小数点后两位
  for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
    if (zoom[i] - distance > 0) {
      return 18 - i + 3 // 之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
    }
  }
}
export const setZoom = (map, points) => {
  if (points.length > 0) {
    let maxLng = points[0].lng
    let minLng = points[0].lng
    let maxLat = points[0].lat
    let minLat = points[0].lat
    let res
    for (let i = points.length - 1; i >= 0; i--) {
      res = points[i]
      if (res.lng > maxLng) maxLng = res.lng
      if (res.lng < minLng) minLng = res.lng
      if (res.lat > maxLat) maxLat = res.lat
      if (res.lat < minLat) minLat = res.lat
    }
    const cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
    const cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
    const zoom = getZoom(map, maxLng, minLng, maxLat, minLat)
    map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom)
  } else {
    // 没有坐标，显示全中国
    map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5)
  }
}
/**
 * 通过经纬度获取详细地址
 * */
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
/**
 * 地址转换   type：true  location is string   type: false location is BMap.Point
 */
export const geo = (location, type = true) => {
  return new Promise((resolve, reject) => {
    const geo = new BMap.Geocoder()
    if (type) {
      geo.getPoint(location, (res) => {
        resolve(res)
      })
    } else {
      geo.getLocation(location, (res) => {
        resolve(res)
      })
    }
  })
}
export default {
  getPoint,
  getPoints,
  setZoom,
  getAddress,
  geo
}

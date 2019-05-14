// import store from '@/store/';
import BMap from 'BMap';
import $ from 'jquery';

/**
 * 经纬度转百度坐标点
 * @param p
 * @param type 纠偏类型
 * @returns {BMap.Point}
 */
export const getPoint = (p, type = 'htb') => {
  let coordinate = null;
  if (type === 'htb') {
    coordinate = bdEncrypt(p.lng, p.lat);
  } else {
    coordinate = {lng: p.lng, lat: p.lat};
  }
  let point = new BMap.Point(coordinate.lng, coordinate.lat);
  return point;
};
/**
 * 批量经纬度转百度坐标点
 * @param array
 * @param type 纠偏类型
 * @returns {Array}
 */
export const getPoints = (array, type = 'htb') => {
  let points = [];
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let data = array[i];
      points[i] = getPoint(data, type);
    }
  }
  return points;
};
/**
 * 火星转百度
 * @param lng
 * @param lat
 * @returns {{lng: number, lat: number}}
 */
const bdEncrypt = (lng, lat) => {
  let X_PI = Math.PI * 3000.0 / 180.0;
  let x = lng;
  let y = lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  let bdLon = z * Math.cos(theta) + 0.0065;
  let bdLat = z * Math.sin(theta) + 0.006;
  let p = {lng: bdLon, lat: bdLat};
  return p;
};

export const getZoom = (map, maxLng, minLng, maxLat, minLat) => {
  let zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000']; // 级别18到3。
  let pointA = new BMap.Point(maxLng, maxLat);  // 创建点坐标A
  let pointB = new BMap.Point(minLng, minLat);  // 创建点坐标B
  let distance = map.getDistance(pointA, pointB).toFixed(1); // 获取两点距离,保留小数点后两位
  for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
    if (zoom[i] - distance > 0) {
      return 18 - i + 3; // 之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
    }
  }
};
export const setZoom = (map, points) => {
  if (points.length > 0) {
    let maxLng = points[0].lng;
    let minLng = points[0].lng;
    let maxLat = points[0].lat;
    let minLat = points[0].lat;
    let res;
    for (let i = points.length - 1; i >= 0; i--) {
      res = points[i];
      if (res.lng > maxLng) maxLng = res.lng;
      if (res.lng < minLng) minLng = res.lng;
      if (res.lat > maxLat) maxLat = res.lat;
      if (res.lat < minLat) minLat = res.lat;
    }
    ;
    let cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
    let cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
    let zoom = getZoom(map, maxLng, minLng, maxLat, minLat);
    map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom);
  } else {
    // 没有坐标，显示全中国
    map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
  }
};
export const getDetailAddress = (gpsDetail, fun, err) => {
  let url = `https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${gpsDetail.lat},${gpsDetail.lng}&output=json&pois=1&ak=${window._baiduKey}`;
  $.ajax({
    url: url,
    dataType: 'jsonp',
    xhrFields: {
      withCredentials: true // 设置运行跨域操作
    },
    success: data => {
      fun && fun(data);
    },
    error: error => {
      err && err(error);
    }
  });
};
export default {
  getPoint,
  getPoints,
  setZoom,
  getDetailAddress
};

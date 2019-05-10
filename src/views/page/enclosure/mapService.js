// 导入baseService
import { fetch, apiFormat, apiFormat2 } from '@/service/baseService';
// 地址查询
const getGaoDeCityApi = 'http://restapi.amap.com/v3/config/district?parameters';                 // 高德城市api
const markerClustererApi = '/api/car-center/current/gather';                 // 百度地图聚合
const getGaoDeCitySelectApi = 'http://restapi.amap.com/v3/config/district';                 // 高德城市api搜索查询-名称
const getCurrentGpsDetailApi = '/api/car-center/current/gpsDetail';                 // 当前车辆-详情
const getCurrentGpsCollectApi = '/api/car-center/current/gpsDetail/collect';                 // 当前车辆
const getCurrentGpsApi = '/api/car-center/current/gps';                 // 当前车辆
const getAreaApi = '/api/car-center/area';                 // 城市api
const getLabelsApi = '/api/car-center/label';                 // 围栏列表 标记列表 是否是围篱（1：表示是;0表示不是）
const getCarStatusApi = '/api/car-center/current/statistics/status';                 // 车辆api
const idlingeventApi = '/api/car-center/mqtt/idlingevent/{time}';                 // 车辆api -怠速 post
const speedeventApi = '/api/car-center/mqtt/speedevent/{time}';                 // 车辆api -超速 post
const warningEventApi = '/api/car-center/mqtt/driverEvent';                 // 车辆api -车辆异常事件三合一接口
const warningEventCountApi = '/api/car-center/mqtt/driverEvent/count';                 // 车辆api -车辆异常事件三合一接口--总数
const stopovertimewarningApi = '/api/car-center/mqtt/stopovertimewarning/{time}';                 // 车辆api -超时 post
const enterRangeSearchCarApi = '/api/car-center/current/enterRange/{id}';                 // 围栏查车 get

const exportDataApi = '/api/car-center/current/gpsDetail/export';                     // 导出车辆位置            method 'GET'
const exportStatusApi = '/api/car-center/status/progress/{id}';   // 服务状态管理-导出 特殊   method 'GET'
const exportDownloadApi = '/api/car-center/status/download/{id}';   // 导出车辆位置-下载   method 'GET'
/**
 * 获取位置信息
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export default {
  getGaoDeCity: (opt) => fetch.get(apiFormat2(getGaoDeCityApi, opt)),
  getClusterer: (opt) => fetch.get(apiFormat2(markerClustererApi, opt)),
  getGaoDeSelectCity: (opt) => fetch.get(apiFormat2(getGaoDeCitySelectApi, opt)),
  getCurrentGpsCollect: (opt) => fetch.get(apiFormat2(getCurrentGpsCollectApi, opt)),
  getCurrentGps: (opt) => fetch.get(apiFormat2(getCurrentGpsApi, opt)),
  getCurrentGpsDetail: (opt) => fetch.post(getCurrentGpsDetailApi, opt),
  getArea: (opt) => fetch.get(apiFormat2(getAreaApi, opt)),
  getLabels: (opt) => fetch.get(apiFormat2(getLabelsApi, opt)),
  getCarsStatus: (opt) => fetch.get(apiFormat2(getCarStatusApi, opt)),
  idlingevent: (opt) => fetch.get(apiFormat(idlingeventApi, opt)),
  speedevent: (opt) => fetch.get(apiFormat(speedeventApi, opt)),
  stopovertimewarning: (opt) => fetch.get(apiFormat(stopovertimewarningApi, opt)),
  warningEvent: (opt) => fetch.get(apiFormat2(warningEventApi, opt)),
  warningEventCount: (opt) => fetch.get(apiFormat2(warningEventCountApi, opt)),
  enterRangeSearchCar: (opt) => fetch.get(apiFormat(enterRangeSearchCarApi, opt)),
  exportCarData: (opt) => fetch.post(exportDataApi, opt),
  exportStatusMge: (opt) => fetch.get(apiFormat(exportStatusApi, opt)),
  exportDownload: (opt, payload) => fetch.get(apiFormat(exportDownloadApi, opt))
};

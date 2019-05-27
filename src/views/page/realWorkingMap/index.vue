<template>
  <div class="map-template">
    <div id="map" class="map"/>
    <div style="display:none;"><infoBox ref="renderAfter" :info-box-data="infoBoxData" v-model="showInfoBox"/></div>
    <div style="position: absolute;top:0;left:0;padding: 10px">
      <search-tem class="list-search" @on-search="onSearch">
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.organization" :placeholder="$t('map.organization')" clearable/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.equipmentNumber" :placeholder="$t('map.equipmentNumber')" clearable/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.deviceType" :placeholder="$t('map.deviceType')" clearable/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.penName" :placeholder="$t('map.penName')" clearable/>
          </el-form-item>
        </el-form>
      </search-tem>
    </div>
  </div>
</template>
<script>
import '@/styles/map-template.scss'
import { mapGetters } from 'vuex'
import BMap from 'BMap'
import infoBox from './InfoBox.vue'
import BMapLib from 'BMapLib'
export default {
  components: {
    infoBox
  },
  data() {
    return {
      searchForm: {},
      map: null,
      circle: '',
      styleOptions: {
        strokeColor: '#64D9D6', // 边线颜色。
        strokeStyle: 'solid', // 边线的样式，solid或dashed。
        strokeWeight: 1, // 边线的宽度，以像素为单位。
        strokeOpacity: 1, // 边线透明度，取值范围0 - 1。
        fillColor: '#64D9D6', // 填充颜色。当参数为空时，圆形将没有填充效果。
        fillOpacity: 0.1 // 填充的透明度，取值范围0 - 1。
      },
      // mapPointOne: '116.720204, 39.849445', // 中心点
      rangeRadius: 11000, // 圆半径
      showInfoBox: false,
      infoBoxDom: null,
      infoBoxData: {},
      deviceInfo: {
        // 八台设备信息
        deviceInfo1: {
          deviceType: '装载机',
          deviceNum: '120301070001A',
          realTimeStatus: '工作中',
          organisation: '北京总公司',
          deviceInfoAddress: '北京市通州区x005',
          workingMode: '装载模式',
          engineSpeed: '2000r/s',
          realTimeFuelConsumption: '20L/h',
          gpsNum: '88908'
        },
        deviceInfo2: {
          deviceType: '装载机',
          deviceNum: '120301070002A',
          realTimeStatus: '休息中',
          organisation: '北京总公司',
          deviceInfoAddress: '北京市通州区',
          workingMode: '装载模式',
          engineSpeed: '1900r/s',
          realTimeFuelConsumption: '20L/h',
          gpsNum: '88909'
        },
        deviceInfo3: {
          deviceType: '装载机',
          deviceNum: '120301070003A',
          realTimeStatus: '工作中',
          organisation: '北京总公司',
          deviceInfoAddress: '北京市通州区群芳南街',
          workingMode: '装载模式',
          engineSpeed: '1800r/s',
          realTimeFuelConsumption: '20L/h',
          gpsNum: '88991'
        },
        deviceInfo4: {
          deviceType: '矿车',
          deviceNum: '120301070004A',
          realTimeStatus: '工作中',
          organisation: '山西分公司',
          deviceInfoAddress: '北京市朝阳区双桥东路',
          workingMode: '运输模式',
          engineSpeed: '2000r/s',
          realTimeFuelConsumption: '20L/h',
          gpsNum: '88992'
        },
        deviceInfo5: {
          deviceType: '矿车',
          deviceNum: '120301070005A',
          realTimeStatus: '工作中',
          organisation: '山西分公司',
          deviceInfoAddress: '北京市通州区铺外路',
          workingMode: '运输模式',
          engineSpeed: '2000r/s',
          realTimeFuelConsumption: '20L/h',
          gpsNum: '88993'
        },
        deviceInfo6: {
          deviceType: '矿车',
          deviceNum: '120301070006A',
          realTimeStatus: '工作中',
          organisation: '山西分公司',
          deviceInfoAddress: '北京市通州区滨河南路',
          workingMode: '运输模式',
          engineSpeed: '2000r/s',
          realTimeFuelConsumption: '20L/h',
          gpsNum: '88994'
        },
        deviceInfo7: {
          deviceType: '挖掘机',
          deviceNum: '120301070007A',
          realTimeStatus: '工作中',
          organisation: '北京昌平分公司',
          deviceInfoAddress: '北京市通州区x002',
          workingMode: '挖掘模式',
          engineSpeed: '2000r/s',
          realTimeFuelConsumption: '30L/h',
          gpsNum: '88996'
        },
        deviceInfo8: {
          deviceType: '挖掘机',
          deviceNum: '120301070008A',
          realTimeStatus: '工作中',
          organisation: '北京昌平分公司',
          deviceInfoAddress: '北京市通州区康夏路',
          workingMode: '挖掘模式',
          engineSpeed: '1800r/s',
          realTimeFuelConsumption: '30L/h',
          gpsNum: '88995'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  mounted() {
    if (this.sidebar.opened) {
      this.$store.dispatch('ToggleSideBar')
    }
    this.init()
  },
  methods: {
    onSearch() {
      console.log('点击了搜索按钮')
    },
    // 初始化地图
    async init() {
      this.map = new BMap.Map('map', { enableMapClick: false })
      this.map.centerAndZoom(new BMap.Point(116.718695, 39.853711), 12) // 初始化北京地图
      // this.sCity = '北京' // 选择城市
      this.map.setCurrentCity('北京')
      this.map.enableScrollWheelZoom(true)
      // 平移控件
      this.map.addControl(new BMap.NavigationControl({
        offset: new BMap.Size(5, 80)
      }))
      // 单击获取点击的经纬度
      // this.map.addEventListener('click', function(e) {
      //  console.log(e.target.getZoom())
      //  alert(e.point.lng + ',' + e.point.lat)
      // })
      // 创建地图覆盖物(点)
      //  装载机
      var pt = new BMap.Point(116.738601, 39.822629)
      var pt2 = new BMap.Point(116.689158, 39.822408)
      var pt3 = new BMap.Point(116.677085, 39.863182)
      // 矿车
      var pt4 = new BMap.Point(116.619593, 39.885442)
      var pt5 = new BMap.Point(116.626493, 39.833047)
      var pt6 = new BMap.Point(116.721354, 39.880016)
      // 挖掘机
      var pt7 = new BMap.Point(116.794943, 39.875587)
      var pt8 = new BMap.Point(116.813915, 39.836593)
      var myIcon1 = new BMap.Icon('../../../../static/images/loader.png', new BMap.Size(48, 48))
      var myIcon2 = new BMap.Icon('../../../../static/images/excavator.png', new BMap.Size(48, 48))
      var myIcon3 = new BMap.Icon('../../../../static/images/harvesters.png', new BMap.Size(48, 48))
      var marker = new BMap.Marker(pt, { icon: myIcon1 }) // 创建标注
      var marker2 = new BMap.Marker(pt2, { icon: myIcon1 })
      var marker3 = new BMap.Marker(pt3, { icon: myIcon1 })
      var marker4 = new BMap.Marker(pt4, { icon: myIcon3 })
      var marker5 = new BMap.Marker(pt5, { icon: myIcon3 })
      var marker6 = new BMap.Marker(pt6, { icon: myIcon3 })
      var marker7 = new BMap.Marker(pt7, { icon: myIcon2 })
      var marker8 = new BMap.Marker(pt8, { icon: myIcon2 })
      // this.map.addOverlay(marker) // 将标注添加到地图中
      // this.map.addOverlay(marker2)
      //  this.map.addOverlay(marker3)
      //  this.map.addOverlay(marker4)
      // this.map.addOverlay(marker5)
      // this.map.addOverlay(marker6)
      // this.map.addOverlay(marker7)
      // this.map.addOverlay(marker8)

      // 点聚合
      var markers = []
      markers.push(marker, marker2, marker3, marker4, marker5, marker6, marker7, marker8)
      new BMapLib.MarkerClusterer(this.map, { markers: markers })

      // 圆 中心点提示
      var pt9 = new BMap.Point(116.718695, 39.853711)
      var myIcon4 = new BMap.Icon('../../../../static/images/weilanTips.png', new BMap.Size(20, 24))
      var marker9 = new BMap.Marker(pt9, { icon: myIcon4 }) // 创建旗帜
      this.map.addOverlay(marker9)
      var label = new BMap.Label('北京市通州区张梁路', { offset: new BMap.Size(20, -10) })
      marker9.setLabel(label)

      // 画圆
      var circle = new BMap.Circle(new BMap.Point(116.718695, 39.853711), this.rangeRadius, this.styleOptions)
      this.map.addOverlay(circle)

      // 添加点击事件
      // var _this = this
      marker.addEventListener('click', () => {
        this.showInfoWindow(marker, this.deviceInfo.deviceInfo1)
      })
      marker2.addEventListener('click', () => {
        this.showInfoWindow(marker2, this.deviceInfo.deviceInfo2)
      })
      marker3.addEventListener('click', () => {
        this.showInfoWindow(marker3, this.deviceInfo.deviceInfo3)
      })
      marker4.addEventListener('click', () => {
        this.showInfoWindow(marker4, this.deviceInfo.deviceInfo4)
      })
      marker5.addEventListener('click', () => {
        this.showInfoWindow(marker5, this.deviceInfo.deviceInfo5)
      })
      marker6.addEventListener('click', () => {
        this.showInfoWindow(marker6, this.deviceInfo.deviceInfo6)
      })
      marker7.addEventListener('click', () => {
        this.showInfoWindow(marker7, this.deviceInfo.deviceInfo7)
      })
      marker8.addEventListener('click', () => {
        this.showInfoWindow(marker8, this.deviceInfo.deviceInfo8)
      })
    },
    // 信息窗体
    async showInfoWindow(marker, deviceInfo) {
      this.infoBoxData = deviceInfo
      // console.log(marker)
      console.log('infoBox')
      // 清空infobox
      this.infoBoxDom = document.querySelector('.infoBox')
      if (this.infoBoxDom !== null) {
        this.infoBoxDom.remove()
      }
      const el = await this.$refs.renderAfter.renderComplete()
      const infoBox = new BMapLib.InfoBox(this.map, el, {
        closeIconUrl: '/static/images/close.png', // 关闭图片
        offset: new BMap.Size(0, 26), // 偏移
        enableAutoPan: true, // 启用自动平移
        align: 0 // 顶部打开
      })
      infoBox.open(marker)
      this.infoBoxDom = document.querySelector('.infoBox')
    }
  }
}
</script>
<style lang="scss">
</style>

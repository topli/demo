<template>
  <div>
    <div class="mapContent">
      <el-button class="backBtn" @click="$router.go(-1)">返回</el-button>
      <div class="l-searchAddress">
        <input id="suggestId" v-model="addressOption" class="search-input" placeholder="请输入城市/区县名称搜索..." value="百度">
      </div>
      <div v-if="!addMarkerModal" class="l-addMarkerBtns">
        <el-button-group>
          <el-button :class="{buttonCur: isMarker}" type="ghost" icon="el-icon-location" class="button" @click="setDrawingManager('marker')"/>
          <el-button :class="{buttonCur: isWeilan}" type="ghost" icon="el-icon-menu" class="button" @click="setDrawingManager('polygon')"/>
          <!-- <el-button type="ghost" icon="el-icon-circle-plus" class="button" @click="addMarker(3)"/> -->
        </el-button-group>
      </div>
      <div v-if="addMarkerModal" class="add_modal">
        <div class="content">
          <el-form ref="form" :model="formData" :rules="rules" inline label-width="60">
            <el-form-item label="名称" prop="name">
              <el-input ref="name" v-model="formData.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="所属组织" prop="org">
              <el-select ref="monitoringType" v-model="formData.org" placeholder="所属组织">
                <el-option v-for="(item, index) in monitoringTypeArray" :value="item.name" :key="index" :label="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="labelState">
              <el-select ref="labelState" v-model="formData.labelState" disabled placeholder="类型">
                <el-option v-for="(item, index) in typeArray" :value="item.value" :label="item.label" :key="index"/>
              </el-select>
            </el-form-item>
            <el-form-item label="范围" prop="scope">
              <el-select ref="scope" v-model="formData.scope" :disabled="!formData.scope" placeholder="范围" @change="changeScope">
                <el-option v-for="(item, index) in scopeArray" :value="item.value" :label="item.label" :key="index"/>
              </el-select>
            </el-form-item>
            <el-form-item label="省份" prop="province">
              <el-input v-model="formData.province" disabled/>
            </el-form-item>
            <el-form-item label="城市" prop="city">
              <el-input v-model="formData.city" disabled/>
            </el-form-item>
            <el-form-item label="区">
              <el-input v-model="formData.district" disabled/>
            </el-form-item>
            <el-form-item label="中心点地址">
              <el-input v-model="formData.address" disabled/>
            </el-form-item>
          </el-form>
          <div style="float: right;">
            <el-button :loading="actionLoading" type="primary" size="small" @click="addMarkerInfo('form')">确定</el-button>
            <el-button type="ghost" size="small" style="margin-left: 8px;" @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div id="map" class="map"/>
  </div>
</template>
<script>
import BMap from 'BMap'
import BMapLib from 'BMapLib'
import mapTool from '@/libs/utils/map'
import { getList, addData, editData } from './service'
// import axios from 'axios'
export default {
  data() {
    return {
      map: null,
      formData: {
        name: '',
        org: '',
        labelState: 1,
        monitoringType: '',
        scope: 500,
        province: '',
        city: '',
        district: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: this.$t('enclosure.nameError') }
        ],
        org: [
          { required: true, message: this.$t('enclosure.orgNameRequired') }
        ]
      },
      styleOptions: {
        strokeColor: '#A90329',
        fillColor: '#A90329',
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillOpacity: 0.7,
        strokeStyle: 'solid'
      },
      circle: null,
      prDisabled: true,
      provinceList: [],
      cityList: [],
      typeArray: [],
      monitoringTypeArray: [],
      scopeArray: [],
      actionLoading: false,
      addressOption: null,
      addMarkerModal: false,
      isMarker: false,
      isWeilan: false,
      drawingManager: null,
      drawPoints: '', // 多边形点
      marker: null
    }
  },
  created() {
    this.initJson()
  },
  mounted() {
    this.initMap()
    this.initMapTool()
    this.initData()
  },
  methods: {
    initMap() {
      this.map = new BMap.Map('map', { enableMapClick: false })
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15) // 初始化北京地图
      this.map.enableScrollWheelZoom(true)
    },
    initMapTool() {
      this.map.addControl(new BMap.NavigationControl({
        offset: new BMap.Size(5, 80)
      })) // 平移控件
      const ac = new BMap.Autocomplete({ 'input': 'suggestId', 'location': this.map }) // 建立一个自动完成的对象
      ac.addEventListener('onconfirm', (e) => { // 鼠标点击下拉列表后的事件
        this.addressOption = e.item.value.business
        mapTool.geo(e.item.value.business).then((res) => {
          // this.map.panTo(res, { noAnimation: false })
          this.map.setViewport({ center: res, zoom: 12 })
        })
      })
    },
    initData() {
      const id = this.$route.query.id
      if (id) {
        getList().then(res => {
          this.list = res.data.list
          this.list.forEach(item => {
            if (Number(item.id) === Number(id)) {
              this.formData = item
            }
          })
          this.addMarkerModal = true
          if (this.formData.labelState === 1) {
            const point = this.formData.paths.split(',')
            const BPoint = new BMap.Point(point[0], point[1])
            this.map.setViewport({ center: BPoint, zoom: this.getZoom(this.formData.scope) })
            this.createMarker(BPoint)
            this.createCircle()
          } else if (this.formData.labelState === 2) {
            const points = this.formData.paths.split(';').map(item => {
              const p = item.split(',')
              return new BMap.Point(p[0], p[1])
            })
            this.map.setViewport(points)
            this.createPolygon(points)
          }
        })
      }
    },
    getZoom(distance) {
      const zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000'] // 级别18到3。
      for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
          return 18 - i + 2 // 之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
      }
    },
    setDrawingManager(type) {
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        drawingToolOptions: {
          anchor: 0, // 位置
          offset: new BMap.Size(15, 35) // 偏离值
        },
        // drawingTypes: 'rectangle',
        circleOptions: this.styleOptions, // 圆的样式
        polylineOptions: this.styleOptions, // 线的样式
        polygonOptions: this.styleOptions, // 多边形的样式
        rectangleOptions: this.styleOptions // 矩形的样式
      })
      this.drawingManager.open()
      this.drawingManager.setDrawingMode(type)
      this.drawingManager.addEventListener('markercomplete', (overlay) => {
        this.formData.labelState = 1
        this.setFormAddress(overlay.point)
        this.addMarkerModal = true
        this.createMarker(overlay.point)
        this.createCircle()
        this.drawingManager.close()
      })
      this.drawingManager.addEventListener('polygoncomplete', (overlay) => {
        this.formData.labelState = 2
        this.formData.scope = null
        this.setFormAddress(overlay.getPath())
        this.addMarkerModal = true
        this.createPolygon(overlay.getPath())
        this.drawingManager.close()
      })
    },
    createMarker(point, editable = true) {
      this.clearMap()
      this.marker = new BMap.Marker(point)
      this.map.addOverlay(this.marker)
      if (editable) {
        this.marker.enableDragging()
        this.marker.addEventListener('dragend', (e) => {
          this.circle.setCenter(e.point)
          this.setFormAddress(e.point)
        })
      }
    },
    createPolygon(points, editable = true) {
      this.clearMap()
      this.polygon = new BMap.Polygon(points, this.styleOptions)
      this.map.addOverlay(this.polygon)
      if (editable) {
        this.polygon.enableEditing()
        this.polygon.addEventListener('lineupdate', (e) => {
          this.setFormAddress(e.target.getPath())
        })
      }
    },
    cancel() {
      if (this.$route.query.id) {
        this.$router.go(-1)
      }
      this.formData = {
        name: '',
        org: '',
        labelState: 1,
        monitoringType: '',
        scope: 500,
        province: '',
        city: '',
        district: '',
        address: ''
      }
      this.addMarkerModal = false
      this.clearMap()
    },
    createCircle() {
      if (this.circle) {
        this.map.removeOverlay(this.circle)
      }
      this.circle = new BMap.Circle(this.marker.getPosition(), this.formData.scope, this.styleOptions)
      this.map.addOverlay(this.circle)
    },
    changeScope() {
      this.createCircle()
      this.map.setViewport({ center: this.marker.getPosition(), zoom: this.getZoom(this.formData.scope) })
    },
    setFormAddress(points) {
      this.getAddressInfo(points).then((res) => {
        this.formData.province = res.addressComponents.province
        this.formData.city = res.addressComponents.city
        this.formData.district = res.addressComponents.district
        this.formData.address = res.address
      })
    },
    getAddressInfo(points) {
      return new Promise((resolve, reject) => {
        let point = null
        let type = true
        if (typeof points === 'object') {
          if (Array.isArray(points)) {
            // 计算中心点
            point = this.calcCenter(points)
            type = false
          } else {
            point = points
            type = false
          }
        } else if (typeof points === 'string') {
          point = points
          type = true
        }
        mapTool.geo(point, type).then((res) => {
          resolve(res)
        })
      })
    },
    calcCenter(points) {
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
        return new BMap.Point(cenLng, cenLat)
      }
    },
    edit() {
      editData(this.formData).then(() => {
        setTimeout(() => {
          this.actionLoading = false
          this.$message.success(this.$t('app.modify') + this.$t('app.success'))
          this.$router.push({ name: 'enclosure' })
        }, 1000)
      }).catch(error => {
        setTimeout(() => {
          console.log(error)
        }, 300)
      })
    },
    add() {
      this.formData.id = Math.round(Math.random() * 1000000)
      this.formData.createTime = new Date().getTime()
      this.formData.status = true
      addData(this.formData).then(() => {
        setTimeout(() => {
          this.actionLoading = false
          this.$message.success(this.$t('app.add') + this.$t('app.success'))
          this.$router.push({ name: 'enclosure' })
        }, 1000)
      }).catch(error => {
        setTimeout(() => {
          console.log(error)
        }, 300)
      })
    },
    addMarkerInfo(name) {
      this.actionLoading = true
      this.$refs['form'].validate((valid) => {
        if (valid) { // 验证通过
          if (this.formData.labelState === 1) {
            const point = this.marker.getPosition()
            this.formData.paths = point.lng + ',' + point.lat
          } else {
            this.formData.paths = this.polygon.getPath().map(item => { return item.lng + ',' + item.lat }).join(';')
          }
          if (this.formData.id) {
            this.edit()
          } else {
            this.add()
          }
        } else {
          this.actionLoading = false
        }
      })
    },
    // 清除地图
    clearMap() {
      this.map.clearOverlays()
    },
    initJson() {
      this.provinceList = ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '内蒙古', '广西', '西藏', '宁夏', '新疆维吾尔自治区', '香港', '澳门', '台湾']
      this.cityList = ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '海淀区', '丰台区', '石景山区', '房山区', '通州区', '顺义区', '杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水', '长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西', '兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南', '广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞']
      this.typeArray = [
        { label: '站点', value: 2 },
        { label: '围栏', value: 1 }
      ]
      this.scopeArray = [
        { label: '100米', value: 100 },
        { label: '200米', value: 200 },
        { label: '300米', value: 300 },
        { label: '500米', value: 500 },
        { label: '1000米', value: 1000 },
        { label: '2000米', value: 2000 },
        { label: '3000米', value: 3000 },
        { label: '4000米', value: 4000 },
        { label: '5000米', value: 5000 },
        { label: '15千米', value: 15000 },
        { label: '30千米', value: 30000 },
        { label: '50千米', value: 50000 },
        { label: '200千米', value: 200000 }
      ]
      this.monitoringTypeArray = [
        { id: 1, name: '北京总公司' },
        { id: 2, name: '北京昌平分公司' },
        { id: 3, name: '山西分公司' }
      ]
    }
  }
}
</script>
<style lang="scss">
  .map{
    width: 100%;
    height: calc(100vh - 50px);
    .anchorBL{
      display: none
    }
  }
  .add_modal {
    .el-form-item {
      width: 45%;
      margin-bottom: 5px!important
    }
  }
</style>
<style lang="scss" scoped>
.mapContent {
  position: absolute;
  z-index: 1;
  padding: 15px;
  width: 100%;
  .backBtn {
    float: left;
  }
  .add_modal{
    position: absolute;
    z-index: 1;
    right: 10px;
    top:20px;
    padding-bottom:10px;
    width:400px;
    height:auto;
    background: #fff;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    .title{
      text-align: center;
      font-size: 16px;
      line-height: 36px;
      border-bottom: 1px solid #d5dfe4;
    }
    .content{
      padding:10px;
      font-size: 12px !important;
      .ys_block{
        width:20px;
        height:20px;
        display: block;
        border-radius: 2px;
        margin-right:8px;
        float: left;
        cursor: pointer;
        margin-top:5px;
        .icons{
          margin-top:5px;
          margin-left:5px;
          display: block;
          color:#fff;
        }
      }
    }
  }
  .l-searchAddress{
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    position: absolute;
    z-index: 1;
    right: 158px;
    top:20px;
  }
  .search-input{
    border: 0 !important;
    border-radius: 0 !important;
    width:200px;
    height: 30px;
    border-radius: 5px;
    padding:2px 10px;
    font-size: 13px;
    font-style: normal;
  }
  .l-addMarkerBtns{
    position: absolute;
    z-index: 1;
    right: 10px;
    top:20px;
    .button{
      font-size:18px;
      background: #fff;
      padding: 5px 12px;
    }
    .buttonCur{
      color: #fff;
      background: #ffa12b;
    }
  }
}
</style>


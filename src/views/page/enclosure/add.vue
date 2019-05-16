<template>
  <div>
    <div class="mapContent">
      <el-button class="backBtn" @click="$router.go(-1)">返回</el-button>
      <div class="l-searchAddress">
        <input id="suggestId" v-model="addressOption" class="search-input" placeholder="请输入地址回车搜索..." value="百度" @keyup.enter="searchAddress()">
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"/>
      </div>
      <div v-if="!addMarkerModal" class="l-addMarkerBtns">
        <el-button-group>
          <el-button :class="{buttonCur: isMarker}" type="ghost" icon="el-icon-location" class="button" @click="addMarker(1)"/>
          <el-button :class="{buttonCur: isWeilan}" type="ghost" icon="el-icon-menu" class="button" @click="addMarker(2)"/>
          <el-button type="ghost" icon="el-icon-circle-plus" class="button" @click="addMarker(3)"/>
        </el-button-group>
      </div>
      <div v-if="addMarkerModal" class="add_modal">
        <div class="content">
          <el-form ref="form" :model="formData" label-width="60">
            <el-row>
              <el-col :span="12">
                <el-form-item label="省份" prop="province" class="l-form-input form-mini" style="width:180px;">
                  <el-select ref="province" v-model="formData.province" placeholder="请输入搜索">
                    <el-option v-for="(item, index) in provinceList" :key="index" :value="item">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城市" prop="city" class="l-form-input form-mini" style="width:180px;">
                  <el-select ref="city" v-model="formData.city" placeholder="请输入搜索">
                    <el-option v-for="(item, index) in cityList" :key="index" :value="item" :label="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="">
              <el-col :span="24">
                <!-- <el-form-item label="区县" prop="districts" style="margin-bottom:0px;margin-top:-10px;":rules="{required: true, message: '请选择区县', trigger: 'blur, change'}">
                <RadioGroup v-model="formData.districts" @on-change="checkChildArea(formData.districts)">
                  <Radio v-for="item in areaList" :key="item.id" :label="item.name">{{item.name}}</Radio>
                </RadioGroup>
              </el-form-item> -->
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称" prop="name" class="l-form-input form-mini">
                  <el-input ref="name" v-model="formData.name" placeholder="名称"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型" prop="labelState" class="l-form-input form-mini">
                  <el-select ref="labelState" v-model="formData.labelState" placeholder="类型">
                    <el-option v-for="(item, index) in typeArray" :value="item" :key="index">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="监控类型" prop="monitoringType" class="l-form-input form-mini">
                  <el-select ref="monitoringType" v-model="formData.monitoringType" placeholder="监控类型">
                    <el-option v-for="(item, index) in monitoringTypeArray" :value="item.id" :key="index">{{ item.name }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="范围" prop="scope" class="l-form-input form-mini">
                  <el-select ref="scope" v-model="formData.scope" placeholder="范围">
                    <el-option v-for="(item, index) in scopeArray" :value="item.value" :key="index">{{ item.label }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
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
import $ from 'jquery'
import BMap from 'BMap'
import BMapLib from 'BMapLib'
export default {
  data() {
    return {
      map: null,
      formData: {
        province: null,
        city: null
      },
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
      drawingManager: null
    }
  },
  created() {
    this.initJson()
  },
  mounted() {
    this.init()
  },
  methods: {
    initMap() {
      this.map = new BMap.Map('map')
      const point = new BMap.Point(116.404, 39.915)
      this.map.centerAndZoom(point, 15)
      this.map.enableScrollWheelZoom(true)
    },
    cancel() {
      this.addMarkerModal = false
      this.isMarker = false
      this.isWeilan = false
      this.clearMap()
      if (this.formData.id) this.goBack()
    },
    // 新增 1-标注 2-围栏 3区县
    addMarker(type) {
      this.drawType = type
      this.formData = {}
      if (type === 1) {
        this.isMarker = !this.isMarker
        this.isWeilan = false
        if (this.isMarker) {
          this.drawingManager.open()
          this.drawingManager.setDrawingMode('marker')
        }
      } else if (type === 2) {
        this.isWeilan = !this.isWeilan
        this.isMarker = false
        if (this.isWeilan) {
          this.drawingManager.open()
          this.drawingManager.setDrawingMode('polygon')
        }
      } else if (type === 3) {
        this.addMarkerModal = true
        this.formData.monitoringType = 1
        this.formData.color = '#A90329'
        this.colorType = 1
      }
    },
    async selectYs(type) {
      let iconUrl = ''
      this.colorType = type
      if (type === 0) {
        type = 1
      }
      if (type === 1) {
        this.formData.color = '#A90329'
      }
      if (type === 2) {
        this.formData.color = '#C79121'
      }
      if (type === 3) {
        this.formData.color = '#57889c'
      }
      if (type === 4) {
        this.formData.color = '#AC5287'
      }
      if (type === 5) {
        this.formData.color = '#356E35'
      }
      iconUrl = '/static/images/bz0' + type + '.png'
      this.clearMap()
      if (this.drawType * 1 === 1) {
        const iconSize = new BMap.Size(26, 48)
        const myIcon = new BMap.Icon(iconUrl, iconSize, {
          anchor: new BMap.Size(13, 48)
        })
        const markers = new BMap.Marker(this.newMarker, { icon: myIcon })
        if (this.formData.scope > 1000) {
          this.map.centerAndZoom(this.newMarker, 12)
        } else if (this.formData.scope > 300) {
          this.map.centerAndZoom(this.newMarker, 15)
        } else {
          this.map.centerAndZoom(this.newMarker, 16)
        }
        this.map.addOverlay(markers)
        // 创建圆对象
        this.circle = new BMap.Circle(this.newMarker, this.formData.scope, {
          strokeColor: this.formData.color,
          strokeWeight: 3,
          fillColor: this.formData.color,
          fillOpacity: 0.2
        })
        this.map.addOverlay(this.circle)
        await this.showDraggingInfo(markers)
        if (this.newMarker && this.newMarker.lat && this.newMarker.lng) {
          const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${this.newMarker.lat},${this.newMarker.lng}&output=json&pois=1&ak=ehokpezgpQESNRi1ld0fQmRSgAoO6YAG`
          $.ajax({
            url: url,
            dataType: 'jsonp',
            xhrFields: {
              withCredentials: true // 设置运行跨域操作
            },
            success: data => {
              this.$set(this.formData, 'address', data.result.formatted_address + data.result.sematic_description)
              let labelgg = new BMap.Label(this.formData.address, { offset: new BMap.Size(0, -20) })
              if (this.drawType * 1 === 3) labelgg = new BMap.Label(this.formData.districts, { offset: new BMap.Size(0, -20) })
              markers.setLabel(labelgg)
            }
          })
        }
      } else {
        const polygon = new BMap.Polygon(this.drawPoints, { strokeColor: this.formData.color, fillColor: this.formData.color, strokeWeight: 3, strokeOpacity: 0.8, fillOpacity: 0.7 })
        this.map.addOverlay(polygon)
        this.showDraggingInfoFang(polygon)
        polygon.enableEditing()
        let mPoint = ''
        // 计算中心点
        const points = this.drawPoints
        let x = points[0] && points[0].lat
        let y = points[0] && points[0].lng
        if (!x || !y) return
        points.forEach(i => {
          if (!i.lat || !i.lng) return
          x = (x * 1 + i.lat * 1) * 0.5
          y = (y * 1 + i.lng * 1) * 0.5
        })
        if (!x || !y) return
        mPoint = new BMap.Point(y, x)
        if (this.formData.id) this.map.centerAndZoom(mPoint, 12)
        const iconSize = new BMap.Size(20, 24)
        const iconWLUrl = '/static/images/weilanTips.png'
        const myIcon = new BMap.Icon(iconWLUrl, iconSize, {
          anchor: new BMap.Size(10, 24)
        })
        const markers = new BMap.Marker(mPoint, { icon: myIcon })
        this.map.addOverlay(markers)
        if (!x || !y) return
        if (x && y) {
          const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${x},${y}&output=json&pois=1&ak=ehokpezgpQESNRi1ld0fQmRSgAoO6YAG`
          $.ajax({
            url: url,
            dataType: 'jsonp',
            xhrFields: {
              withCredentials: true // 设置运行跨域操作
            },
            success: data => {
              this.$set(this.formData, 'address', data.result.formatted_address + data.result.sematic_description)
              let labelgg = new BMap.Label(this.formData.address, { offset: new BMap.Size(0, -20) })
              if (this.drawType * 1 === 3) labelgg = new BMap.Label(this.formData.districts, { offset: new BMap.Size(0, -20) })
              markers.setLabel(labelgg)
            }
          })
        }
      }
    },
    // 拖拽 -圆
    showDraggingInfo(markers) {
      const _this = this
      markers.addEventListener('dragend', function(e) {
        const __this = _this
        const gc = new BMap.Geocoder()
        // 画图 标签
        gc.getLocation(e.point, function(rs) {
          if (!e.point.lng && !e.point.lat) return
          __this.map.removeOverlay(markers.getLabel()) // 删除之前的label
          __this.newMarker = new BMap.Point(e.point.lng, e.point.lat)
          __this.formData.point = e.point.lng + ',' + e.point.lat
          // __this.formData.address = rs.address;
          console.log(rs.addressComponents.province)
          // __this.formData.province = rs.addressComponents.province;
          console.log(_this)
          __this.$set(__this.formData, 'province', rs.addressComponents.province)
          __this.formData.city = rs.addressComponents.city
          // 创建圆对象
          __this.map.removeOverlay(__this.circle) // 删除之前的circle
          const ___this = __this
          __this.circle = new BMap.Circle(__this.newMarker, __this.formData.scope, {
            strokeColor: ___this.formData.color,
            strokeWeight: 3,
            fillColor: ___this.formData.color,
            fillOpacity: 0.2
          })
          ___this.map.addOverlay(__this.circle)
          const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${e.point.lat},${e.point.lng}&output=json&pois=1&ak=ehokpezgpQESNRi1ld0fQmRSgAoO6YAG`
          $.ajax({
            url: url,
            dataType: 'jsonp',
            xhrFields: {
              withCredentials: true // 设置运行跨域操作
            },
            success: data => {
              ___this.formData.address = ''
              ___this.$set(___this.formData, 'address', data.result.formatted_address + data.result.sematic_description)
              let labelgg = new BMap.Label(___this.formData.address, { offset: new BMap.Size(0, -20) })
              if (___this.drawType * 1 === 3) labelgg = new BMap.Label(___this.formData.districts, { offset: new BMap.Size(0, -20) })
              markers.setLabel(labelgg)
            }
          })
        })
      })
      markers.enableDragging()
    },
    // 拖拽 -方
    showDraggingInfoFang(polygon) {
      const _this = this
      polygon.addEventListener('lineupdate', (e) => {
        _this.drawPoints = polygon.getPath()
        const a = []
        _this.drawPoints.forEach(item => {
          a.push(item.lng + ',' + item.lat)
        })
        _this.formData.point = a.join(';')
      })
    },
    addMarkerInfo(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.drawType === 1) {
            this.formData.scopeType = '圆形'
            if (!this.formData.scope) {
              this.$Notice.error({
                title: '请填写标注范围'
              })
              return
            }
          }
          if (this.drawType === 2) this.formData.scopeType = '多边形'
          if (this.drawType === 3) {
            this.formData.scopeType = '区县'
            if (!this.formData.districts) {
              this.$Notice.error({
                title: '请选择区县'
              })
              return
            }
            this.formData.address = this.formData.city + this.formData.districts
            if (!this.formData.point || this.formData.point === '') {
              this.$Notice.error({
                title: '未选择正确的区域'
              })
              return
            }
          }
          if (this.isSite) {
            this.formData.site = 1
          } else {
            this.formData.site = 0
          }
          if (this.isPeling) {
            this.formData.paling = 1
          } else {
            this.formData.paling = 0
          }
          if (this.isPrivatization) {
            this.formData.privatization = 0
          } else {
            this.formData.privatization = 1
          }
          if (this.isAttention) {
            this.formData.attention = 1
          } else {
            this.formData.attention = 2
          }
          // this._hyTool.cal(true);
          try {
            if (this.formData.id !== undefined && this.formData.id !== '') {
              // const opt = { id: this.formData.id }
              // service.updateApi(opt, this.formData).then((data) => {
              //   this.$Notice.success({
              //     title: '修改成功'
              //   })
              //   this.goBack()
              // })
            } else {
              // service.saveApi(this.formData).then((data) => {
              //   this.$Notice.success({
              //     title: '新增成功'
              //   })
              //   this.addMarkerModal = false
              //   this.clearMap()
              //   this.isMarker = false
              //   this.isWeilan = false
              //   this.goBack()
              // })
            }
            // this._hyTool.cal(false);
          } catch (e) {}
        }
      })
    },
    // 初始化地图
    async init() {
      this.map = new BMap.Map('map', { enableMapClick: false })
      this.map.centerAndZoom(new BMap.Point(106.530635013, 29.5446061089), 15) // 初始化重庆地图
      this.sCity = '重庆' // 选择城市
      this.map.setCurrentCity('重庆')
      this.map.enableScrollWheelZoom(true)
      this.map.addControl(new BMap.NavigationControl({
        offset: new BMap.Size(5, 80)
      })) // 平移控件
      const ac = new BMap.Autocomplete({ 'input': 'suggestId', 'location': this.map }) // 建立一个自动完成的对象
      const _this = this
      ac.addEventListener('onhighlight', function(e) { // 鼠标放在下拉列表上的事件
        let str = ''
        let _value = e.fromitem.value
        let value = ''
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business
        }
        str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value
        value = ''
        if (e.toitem.index > -1) {
          _value = e.toitem.value
          value = _value.province + _value.city + _value.district + _value.street + _value.business
        }
        str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value
        _this.getId('searchResultPanel').innerHTML = str
        //         _this.clearMap();    // 清除地图上所有覆盖物
      })
      let myValue
      ac.addEventListener('onconfirm', function(e) { // 鼠标点击下拉列表后的事件
        const _value = e.item.value
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business
        _this.getId('searchResultPanel').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue
        _this.setPlace(myValue)
        _this.clearMap() // 清除地图上所有覆盖物
      })
      this.myGeo = new BMap.Geocoder()
      const styleOptions = {
        strokeColor: '#A90329',
        fillColor: '#A90329',
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillOpacity: 0.7,
        strokeStyle: 'solid'
      }
      // 编辑
      this.formData.id = this.$route.query.id
      if (this.formData.id !== undefined && this.formData.id !== '') {
        // await this.getById(this.formData.id);
        if (this.formData.color) {
          styleOptions.strokeColor = this.formData.color
          styleOptions.fillColor = this.formData.color
        }
      } else {
        this.colorType = 1
      }
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        drawingToolOptions: {
          anchor: 0, // 位置
          offset: new BMap.Size(15, 35) // 偏离值
        },
        // drawingTypes: 'rectangle',
        circleOptions: styleOptions, // 圆的样式
        polylineOptions: styleOptions, // 线的样式
        polygonOptions: styleOptions, // 多边形的样式
        rectangleOptions: styleOptions // 矩形的样式
      })
      const overlays = []
      this.drawingManager.addEventListener('overlaycomplete', function(e) {
        if (_this.drawType === 1) {
          const marker = e.overlay.point
          _this.clearMap()
          if (!marker.lng || !marker.lat) return
          _this.newMarker = new BMap.Point(marker.lng, marker.lat)
          const iconSize = new BMap.Size(26, 48)
          const myIcon = new BMap.Icon('/static/images/bz01.png', iconSize, {
            anchor: new BMap.Size(13, 48)
          })
          const markers = new BMap.Marker(_this.newMarker, { icon: myIcon })
          _this.map.addOverlay(markers)
          _this.formData.point = marker.lng + ',' + marker.lat
          if (marker.lat && marker.lng) {
            const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${marker.lat},${marker.lng}&output=json&pois=1&ak=ehokpezgpQESNRi1ld0fQmRSgAoO6YAG`
            $.ajax({
              url: url,
              dataType: 'jsonp',
              xhrFields: {
                withCredentials: true // 设置运行跨域操作
              },
              success: data => {
                _this.$set(_this.formData, 'address', data.result.formatted_address + data.result.sematic_description)
                const labelgg = new BMap.Label(_this.formData.address, { offset: new BMap.Size(0, -20) })
                markers.setLabel(labelgg)
              }
            })
          }
          _this.myGeo.getLocation(_this.newMarker, function(rs) {
            // _this.formData.address = rs.address;
            console.log(rs.addressComponents.province)
            // _this.formData.province = rs.addressComponents.province;
            _this.$set(_this.formData, 'province', rs.addressComponents.province)
            _this.formData.city = rs.addressComponents.city
            const labelgg = new BMap.Label(_this.formData.address, { offset: new BMap.Size(0, -20) })
            markers.setLabel(labelgg)
          })
          _this.showDraggingInfo(markers)
        }
        if (_this.drawType === 2) {
          overlays.push(e.overlay)
          const path = e.overlay.getPath()
          _this.drawPoints = path
          _this.clearMap()
          const polygon = new BMap.Polygon(path, { strokeColor: '#A90329', fillColor: '#A90329', strokeWeight: 3, strokeOpacity: 0.8, fillOpacity: 0.7 }) // 创建多边形
          _this.map.addOverlay(polygon) // 增加多边形
          _this.showDraggingInfoFang(polygon)
          polygon.enableEditing()
          const a = []
          path.forEach(item => {
            a.push(item.lng + ',' + item.lat)
          })
          _this.formData.point = a.join(';')
          // 计算中心点
          let mPoint = ''
          const points = _this.drawPoints
          let x = points[0] && points[0].lng
          let y = points[0] && points[0].lat
          if (!x && !y) return
          points.forEach(i => {
            // 获取中心点
            x = (x * 1 + i.lng * 1) * 0.5
            y = (y * 1 + i.lat * 1) * 0.5
          })
          mPoint = new BMap.Point(x, y)
          const iconUrl = '/static/images/weilanTips.png'
          const iconSize = new BMap.Size(20, 24)
          const myIcon = new BMap.Icon(iconUrl, iconSize, {
            anchor: new BMap.Size(10, 24)
          })
          const markers = new BMap.Marker(mPoint, { icon: myIcon })
          _this.map.addOverlay(markers)
          if (x && y) {
            const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${y},${x}&output=json&pois=1&ak=ehokpezgpQESNRi1ld0fQmRSgAoO6YAG`
            $.ajax({
              url: url,
              dataType: 'jsonp',
              xhrFields: {
                withCredentials: true // 设置运行跨域操作
              },
              success: data => {
                _this.$set(_this.formData, 'address', data.result.formatted_address + data.result.sematic_description)
                const labelgg = new BMap.Label(_this.formData.address, { offset: new BMap.Size(0, -20) })
                markers.setLabel(labelgg)
              }
            })
          }
          _this.myGeo.getLocation(mPoint, function(rs) {
            // _this.formData.address = rs.address;
            console.log(rs.addressComponents.province)
            // _this.formData.province = rs.addressComponents.province;
            _this.$set(_this.formData, 'province', rs.addressComponents.province)
            _this.formData.city = rs.addressComponents.city
            //               let labelgg = new BMap.Label(_this.formData.address, {offset: new BMap.Size(0, -20)});
            //               markers.setLabel(labelgg);
          })
        }
        _this.addMarkerModal = true
        _this.formData.monitoringType = 1
        _this.formData.color = '#A90329'
        _this.colorType = 1
        _this.drawingManager.close() // 关闭绘画
        if (!_this.formData.id) _this.formData.labelState = '无'
      })
    },
    // 清除地图
    clearMap() {
      this.map.clearOverlays()
    },
    searchAddress() {
      if (this.addressOption) {
        const _this = this
        this.myGeo.getPoint(this.addressOption, function(point) {
          if (point) {
            console.log(_this)
            _this.map.centerAndZoom(point, 11)
            //               _this.map.addOverlay(new BMap.Marker(point));
          } else {
            _this.$Notice.error({
              title: '您选择地址没有解析到结果'
            })
          }
          this.clearMap() // 清除地图上所有覆盖物
        }, '')
      } else {
        this.$Notice.error({
          title: '请填写搜索地址'
        })
      }
    },
    initJson() {
      this.provinceList = ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '内蒙古', '广西', '西藏', '宁夏', '新疆维吾尔自治区', '香港', '澳门', '台湾']
      this.cityList = ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '海淀区', '丰台区', '石景山区', '房山区', '通州区', '顺义区', '杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水', '长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西', '兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南', '广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞']
      this.typeArray = ['基地', '中转站', '配送中心', '码头', '火车站', '经销商', '堆场', '供应商', '承运商', 'PDC', '卸货点', '回货点', '机场', '运输点', '仓库']
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
        { id: 1, name: '进出围栏' },
        { id: 2, name: '进围栏' },
        { id: 3, name: '出围栏' }
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
      .l-form-input{
        width:180px;
        line-height: 20px;
        border-radius: 0 !important;
        margin-bottom: 8px;
      }
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


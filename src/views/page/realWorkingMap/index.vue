<template>
  <div class="list-template">
    <div style="padding:20px;padding-bottom:0px;">
      <search-tem class="list-search" @on-search="onSearch">
        <el-form :inline="true" :model="searchFrom">
          <el-form-item>
            <el-input v-model="searchFrom.organization" :placeholder="$t('map.organization')" clearable/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchFrom.equipmentNumber" :placeholder="$t('map.equipmentNumber')" clearable/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchFrom.deviceType" :placeholder="$t('map.deviceType')" clearable/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchFrom.penName" :placeholder="$t('map.penName')" clearable/>
          </el-form-item>
        </el-form>
      </search-tem>
    </div>
    <div id="map" class="map"/>
  </div>
</template>
<script>
import BMap from 'BMap'
// import BMapLib from 'BMapLib'
export default {
  data() {
    return {
      searchFrom: {},
      map: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onSearch() {
      console.log('点击了搜索按钮')
    },
    // 初始化地图
    async init() {
      this.map = new BMap.Map('map', { enableMapClick: false })
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11) // 初始化北京地图
      // this.sCity = '北京' // 选择城市
      this.map.setCurrentCity('北京')
      this.map.enableScrollWheelZoom(true)
      // 平移控件
      this.map.addControl(new BMap.NavigationControl({
        offset: new BMap.Size(5, 80)
      }))
      // 创建地图覆盖物(点)
      var pt = new BMap.Point(116.417, 39.909)
      var myIcon = new BMap.Icon('../../../../static/images/loader.png', new BMap.Size(24, 24))
      var marker = new BMap.Marker(pt, { icon: myIcon }) // 创建标注
      this.map.addOverlay(marker) // 将标注添加到地图中
    }
  }
}
</script>
<style lang="scss">
  .map{
    width: 100%;
    height: calc(100vh - 120px);
  }
</style>

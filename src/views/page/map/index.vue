<template>
  <div id="map" class="map"/>
</template>
<script>
import BMap from 'BMap'
export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new BMap.Map('map')
      const point = new BMap.Point(116.404, 39.915)
      this.map.centerAndZoom(point, 15)
      this.map.enableScrollWheelZoom(true)
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

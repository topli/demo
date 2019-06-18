<template>
  <el-container class="map-template">
    <el-aside :width="leftWidth" style="transition: width 1s ease;position: relative;overflow: hidden;">
      <div class="left-plan">
        <div class="left-plan-title">
          设备列表
        </div>
        <el-tree
          :data="data"
          :default-expanded-keys="['1', '2']"
          :props="defaultProps"
          :render-content="renderContent"
          node-key="id"
          @node-click="handleNodeClick"/>
      </div>
      <div class="show-hide-left" @click="toggleShowLeft()">
        <svg-icon :icon-class="showLeft ? 'toLeft' : 'toRight'" color="white"/>
      </div>
    </el-aside>
    <el-container>
      <el-main>
        <div id="map" class="map"/>
      </el-main>
      <el-footer height="60px">
        <div style="width:100%;height:100%;position:relative;">
          <play-slider :video-data="lines" :map="map" @play="playLines"/>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import '@/styles/map-template.scss'
import BMap from 'BMap'
import playSlider from './components/playSlider'
export default {
  components: { playSlider },
  data() {
    return {
      map: null,
      showLeft: true,
      data: [
        {
          label: '北京总公司',
          icon: 'deviceHome',
          id: 1,
          children: [
            {
              label: '山西分公司',
              icon: 'deviceHome',
              id: 2,
              children: [
                {
                  label: '120301070001A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070002A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070003A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070004A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070005A',
                  icon: 'deviceNum'
                }
              ]
            }, {
              label: '武汉分公司',
              icon: 'deviceHome',
              id: 3,
              children: [
                {
                  label: '120301070006A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070007A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070008A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070009A',
                  icon: 'deviceNum'
                },
                {
                  label: '120301070010A',
                  icon: 'deviceNum'
                }
              ]
            }
          ]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      interval: null,
      lines: [],
      marker: null
    }
  },
  computed: {
    leftWidth() {
      return this.showLeft ? '300px' : '15px'
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.initMap()
    setInterval(() => {
      this.showSearch = true
    }, 2000)
  },
  beforeDestroy() {
    this.map = null
    clearInterval(this.interval)
  },
  methods: {
    initMap() {
      this.map = new BMap.Map('map', { enableMapClick: false })
      this.map.centerAndZoom(new BMap.Point(112.352013, 39.469762), 12)
      // this.map.setCurrentCity('北京')
      this.map.enableScrollWheelZoom(true)
      this.map.setMapType(window.BMAP_HYBRID_MAP)
      this.map.addControl(new BMap.MapTypeControl({
        mapTypes: [
          window.BMAP_NORMAL_MAP,
          window.BMAP_HYBRID_MAP
        ]
      }))
      var myIcon = new BMap.Icon('/static/images/device.png', new BMap.Size(28, 28), { anchor: new BMap.Size(10, 10) })
      this.marker = new BMap.Marker(new BMap.Point(112.352013, 39.469762), { icon: myIcon })
      this.map.addOverlay(this.marker)
      this.lines = [
        [112.352013, 39.469762, 300],
        [112.345348, 39.472951, 300],
        [112.345348, 39.472505, 300],
        [112.341898, 39.474288, 300],
        [112.339598, 39.474733, 300],
        [112.333849, 39.477852, 300],
        [112.332699, 39.478298, 320],
        [112.323501, 39.489881, 320],
        [112.321776, 39.492554, 320],
        [112.318327, 39.493445, 320],
        [112.318327, 39.494782, 320],
        [112.314302, 39.500127, 320],
        [112.313152, 39.502799, 340],
        [112.313152, 39.505917, 340],
        [112.309128, 39.507698, 340],
        [112.305103, 39.507698, 270],
        [112.301079, 39.507698, 270],
        [112.29648, 39.508144, 270],
        [112.293605, 39.506808, 270],
        [112.291305, 39.506362, 270],
        [112.284981, 39.505917, 270],
        [112.279232, 39.505472, 270],
        [112.272908, 39.502799, 270],
        [112.267734, 39.500572, 270],
        [112.270034, 39.494782, 150],
        [112.270878, 39.490007, 150],
        [112.270609, 39.489881, 150],
        [112.271758, 39.487208, 150],
        [112.275477, 39.480651, 150],
        [112.275477, 39.478869, 150],
        [112.277202, 39.47575, 150],
        [112.279502, 39.474859, 120],
        [112.285826, 39.469957, 120],
        [112.286976, 39.467283, 120],
        [112.290425, 39.465501, 120],
        [112.297899, 39.45525, 120],
        [112.299049, 39.450347, 120],
        [112.296174, 39.440986, 150],
        [112.29445, 39.436528, 150],
        [112.295599, 39.433853, 150],
        [112.295599, 39.428057, 150],
        [112.296749, 39.425827, 150]
      ]
      this.lines = this.lines.map((item) => {
        return {
          point: new BMap.Point(item[0], item[1]),
          rotation: item[2]
        }
      })
      const polyline = new BMap.Polyline(
        this.lines.map(item => {
          return item.point
        }), // 所有的GPS坐标点
        {
          strokeColor: 'rgb(0, 238, 0)', // 线路颜色
          strokeWeight: 6, // 线路大小
          strokeOpacity: '0.9'
        })
      // 绘制线路
      this.map.addOverlay(polyline)
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <svg-icon icon-class={data.icon}/>
          <span style='margin-left:5px;'>{data.label}</span>
        </span>
      )
    },
    handleNodeClick() {

    },
    toggleShowLeft() {
      this.showLeft = !this.showLeft
    },
    playLines(index) {
      this.marker.setPosition(this.lines[index].point)
      this.marker.setRotation(this.lines[index].rotation)
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.play {
  &-device {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    &-tree {
      width:100%;
      height: 100%;
      background:white;
      border-radius: 4px;
      padding: 20px;
      &-title {
        height: 30px;
        width: 100%;
        text-align: center;
      }
    }
    &-show-hide {
      position: absolute;
      right: -18px;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      &-icon {
        width: 18px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  &-page{
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 300px;
    width: 100%;
    &-progress{
      height: 5px;
      width: 100%;
      background: #d7d0d0;
      &-line{
        width: 50px;
        height: 100%;
        background: red;
      }
    }
    &-btn {
      height: 50px;
      width: 100%;
      background: #2c2626;
    }
  }
}
.left-plan{
  width: 100%;
  height: 100%;
  padding: 20px;
  &-title{
    text-align: center;
    width: 100%;
    min-width: 120px;
  }
}
.el-main {
  padding: 0!important;
}
.el-footer{
  padding: 0!important;
}
.show-hide-left{
  cursor: pointer;
  background: #a92529;
  width: 15px;
  height: 50px;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

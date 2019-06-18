<style lang="scss">
</style>
<style lang="scss" scoped>
  .play-bcak {
    width: 100%;
    height: 100%;
    .play-slider{
      margin-top: -16px;
      position: absolute;
      width: 100%;
      display: block;
      overflow: hidden;
    }
    .align-center {
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .operate {
      padding-top: 16px;
      width: 100%;
      height: 100%;
      display: -webkit-inline-box;
      &-left {
        position: absolute;
        left:0;
        top: 13px;
        padding: 5px 10px;
      }
      &-center {
        width: 100%;
      }
      &-right {
        position: absolute;
        right:0;
        top: 10px;
        padding: 5px 10px;
      }
    }
    .text-bg{
      display: inline-block;
      color: #ffffff;
      background-color: #1715159c;
      border-radius: 10px;
      padding: 5px 10px;
    }
    .text-a-style {
      color: #00b7ee;
    }
    .speeds-option {
      cursor: pointer;
      color: #ffffff;
      background-color: #1715159c;
      padding: 3px 5px;
      border: 1px solid #1715159c;
    }
    .check-speed {
      color: #00b7ee;
      border: 1px solid #00b7ee;
    }
    .circle {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
    }
    .rewind {
      margin: 0 5px;
      background-color: black;
      color: #ffffff;
      width: 26px;
      height: 26px;
    }
    .play {
      margin: 0 5px;
      background-color: #a92529;
      color: #ffffff;
      width: 38px;
      height: 38px;
    }
    .fastforward {
      margin: 0 5px;
      background-color: black;
      color: #ffffff;
      width: 26px;
      height: 26px;
    }
    .disable-color {
      color: #747474
    }
  }
</style>
<template>
  <div class="play-bcak" style="background: #2c2626;">
    <el-slider v-model="index" :show-tooltip="false" :format-tooltip="tipFormat" :max="videoData.length - 1" class="play-slider" @change="changeIndex"/>
    <div class="operate">
      <div class="operate-left align-center">
        <div class="text-bg">
          <span class="text-a-style">{{ current }}</span> / <span>{{ total }}</span>
        </div>
        <!-- <div class="text-bg">
          <span class="text-a-style">{{ currentTip }}test</span>
        </div> -->
      </div>
      <div class="operate-center align-center">
        <div v-if="!isPlay" class="circle rewind align-center" @click="rewind()">
          <el-tooltip :open-delay="500" content="上一个轨迹点">
            <svg-icon icon-class="back"/>
          </el-tooltip>
        </div>
        <div class="circle play align-center" @click="channel()">
          <el-tooltip :content="isPlayStr" :open-delay="500">
            <svg-icon :icon-class="isPlayIcon"/>
          </el-tooltip>
        </div>
        <div v-if="!isPlay" class="circle fastforward align-center" @click="fastforward()">
          <el-tooltip :open-delay="500" content="下一个轨迹点">
            <svg-icon icon-class="forward"/>
          </el-tooltip>
        </div>
      </div>
      <div class="operate-right align-center">
        <!-- <div class="text-bg">
          <div><span>{{ endTip }}1</span></div>
        </div> -->
        <div class="text-bg">
          <div style="display: -webkit-inline-box">
            <div v-for="(item, i) in speedArray" :key="i" :class="{ 'check-speed': currentSpeed === item.value }" class="speeds-option" @click="changeSpeed(item.value)">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BMap from 'BMap'
/**
   * 经纬度转百度坐标点
   * @param p
   * @param type 纠偏类型
   * @returns {BMap.Point}
   */
const getPoint = (p) => {
  let coordinate = null
  coordinate = bdEncrypt(p.lng, p.lat)
  const point = new BMap.Point(coordinate.lng, coordinate.lat)
  return point
}
/**
   * 火星坐标转百度坐标
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
export default {
  name: 'HyPlayback',
  props: {
    map: {
      type: Object,
      default: () => {
        return {}
      }
    },
    videoData: {
      type: Array,
      default: () => {
        return []
      }
    },
    speedArray: {
      type: Array,
      default: () => [
        { value: 0.8, name: '慢速' },
        { value: 1, name: '正常' },
        { value: 4, name: '快速' },
        { value: 8, name: '极快' }
      ]
    },
    unit: {
      type: String,
      default: 'KM'
    }
  },
  data() {
    return {
      index: 0,
      isPlay: false,
      timeout: null,
      speed: 500,
      currentProgress: 0,
      totalProgress: 0,
      currentSpeed: 1
    }
  },
  computed: {
    isPlayStr() {
      return this.isPlay ? '暂停' : '播放'
    },
    isPlayIcon() {
      return this.isPlay ? 'timeout' : 'play'
    },
    isPlayStyle() {
      return this.isPlay ? {} : { marginLeft: '5px' }
    },
    total() {
      return (this.totalProgress / 1000).toFixed(2) + this.unit
    },
    current() {
      let cur = 0
      this.videoData.forEach((item, i) => {
        if (i < this.index) {
          if (item.distances) cur += item.distances
        }
      })
      return (cur / 1000).toFixed(2) + this.unit
    },
    currentTip() {
      return ''
      // return this.videoData[this.index] ? this._hyTool.DateFormat(new Date(this.videoData[this.index].time), 'yyyy-MM-dd hh:mm:ss') : ''
    },
    endTip() {
      return ''
      // return this.videoData[this.videoData.length - 1] ? this._hyTool.DateFormat(new Date(this.videoData[this.videoData.length - 1].time), 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  watch: {
    index: function(i) {
      this.init()
    },
    videoData: function() {
      this.init()
    }
  },
  created() {},
  mounted() {
  },
  // 销毁组件时 清除定时任务
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    init() {
      this.calcDistance()
    },
    // 改变播放速度
    changeSpeed(val) {
      this.currentSpeed = val
      if (this.isPlay) {
        this.timeOut()
      }
    },
    // 往前
    rewind() {
      this.isPlay = false
      if (this.index <= 0) return
      this.index--
      this.$emit('play', this.index)
    },
    // 播放
    channel() {
      this.isPlay = !this.isPlay
      if (this.index === this.videoData.length - 1) this.index = 0
      if (this.isPlay) {
        this.timeOut()
      } else {
        clearTimeout(this.timeout)
      }
    },
    timeOut() {
      if (this.index > this.videoData.length - 1) {
        this.isPlay = false
        return
      }
      if (!this.isPlay) return
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.$emit('play', this.index)
        this.index++
        this.timeOut()
      }, this.speed / this.currentSpeed)
    },
    // 往后
    fastforward() {
      this.isPlay = false
      if (this.index >= this.videoData.length - 1) return
      this.index++
      this.$emit('play', this.index)
    },
    tipFormat() {
      return this.currentTip
    },
    // 计算总里程
    calcDistance() {
      this.totalProgress = 0
      for (let i = 0; i < this.videoData.length; i++) {
        if (i !== this.videoData.length - 1) {
          const point = getPoint(this.videoData[i])
          const nextPoint = getPoint(this.videoData[i + 1])
          const number = this.map.getDistance(point, nextPoint)
          this.$set(this.videoData[i + 1], 'distances', number)
          this.totalProgress += number
        }
      }
      return this.totalProgress
    },
    // 拖动滑条事件
    changeIndex(val) {
      this.index = val
      this.$emit('play', this.index)
    }
  }
}
</script>

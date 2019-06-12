<template>
  <div id="deviceReport" class="device-report">
    <div style="width:100%;position:relative">
      <el-button type="text" style="position:absolute; right: 20px; top: 10px;font-size: .7vw" @click="screenfull">
        {{ !isScreenfull ? $t('app.fullScreen') : '' }}
      </el-button>
      <div class="title">
        <span>设备健康监控大屏</span>
      </div>
      <div class="body">
        <div class="total">
          <div class="total-title">
            设备统计
          </div>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="total-child">
                <div class="split-line"/>
                <countTo :start-val="0" :end-val="120" :duration="2000"/>
                <div class="total-child-title">监控设备总数</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="total-child">
                <div class="split-line"/>
                <countTo :start-val="0" :end-val="12" :duration="2000"/>
                <div class="total-child-title">在线设备数</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="total-child">
                <div class="split-line"/>
                <div :style="{width: getWidth() + 'px',opacity: popOpacity1}" class="popover-body">
                  <el-scrollbar wrap-class="scrollbar-wrapper" style="width:100%;height:100%">
                    <ul>
                      <li>
                        <div class="title">
                          <div v-for="(t, i) in titles" :key="i">{{ t }}</div>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li v-for="(device, i) in deviceErrorList" :key="i">
                        <div class="title">
                          <div>{{ device.deviceNo }}</div>
                          <div>{{ device.type }}</div>
                          <div>{{ device.time }}</div>
                        </div>
                      </li>
                    </ul>
                  </el-scrollbar>
                </div>
                <countTo slot="reference" :start-val="0" :end-val="3" :duration="2000"/>
                <div class="total-child-title" @mouseover="popOver1" @mouseout="popOut1">亚健康设备数</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="total-child">
                <div :style="{width: getWidth() + 'px',opacity: popOpacity2}" class="popover-body">
                  <el-scrollbar wrap-class="scrollbar-wrapper" style="width:100%;height:100%">
                    <ul>
                      <li>
                        <div class="title">
                          <div v-for="(t, i) in titles" :key="i">{{ t }}</div>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li v-for="(device, i) in deviceErrorList2" :key="i">
                        <div class="title">
                          <div>{{ device.deviceNo }}</div>
                          <div>{{ device.type }}</div>
                          <div>{{ device.time }}</div>
                        </div>
                      </li>
                    </ul>
                  </el-scrollbar>
                </div>
                <countTo slot="reference" :start-val="0" :end-val="1" :duration="2000"/>
                <div class="total-child-title" @mouseover="popOver2" @mouseout="popOut2">问题设备数</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="device">
          <el-carousel indicator-position="none" height="40vw" loop>
            <el-carousel-item :key="1">
              <div class="device-list">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SE21392</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg1.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SE21291</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg2.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SE20597</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg3.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">AC11302</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg4.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SU25298</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg5.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: red">AD20577</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg6.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-carousel-item>
            <el-carousel-item :key="2">
              <div class="device-list">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SE56468</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg7.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SE21881</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg8.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SE36541</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg9.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">AC98721</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg10.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">SU15248</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg11.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="device-info">
                      <div class="device-info-title">
                        <span>设备编号:</span> <span style="color: white">AD93157</span>
                      </div>
                      <div class="device-info-body">
                        <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg12.png') no-repeat;background-size: 100% 100%"/>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-carousel-item>
          <!-- <el-carousel-item :key="3">
            <div class="device-list">
              <el-row :gutter="10">
                <el-col :span="8">
                  <div class="device-info">
                    <div class="device-info-title">
                      <span>设备编号:</span> <span style="color: white">SE56468</span>
                    </div>
                    <div class="device-info-body">
                      <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg7.png') no-repeat;background-size: 100% 100%"/>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="device-info">
                    <div class="device-info-title">
                      <span>设备编号:</span> <span style="color: white">SE21881</span>
                    </div>
                    <div class="device-info-body">
                      <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg8.png') no-repeat;background-size: 100% 100%"/>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="device-info">
                    <div class="device-info-title">
                      <span>设备编号:</span> <span style="color: white">SE36541</span>
                    </div>
                    <div class="device-info-body">
                      <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg9.png') no-repeat;background-size: 100% 100%"/>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="device-info">
                    <div class="device-info-title">
                      <span>设备编号:</span> <span style="color: white">AC98721</span>
                    </div>
                    <div class="device-info-body">
                      <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg10.png') no-repeat;background-size: 100% 100%"/>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="device-info">
                    <div class="device-info-title">
                      <span>设备编号:</span> <span style="color: white">SU15248</span>
                    </div>
                    <div class="device-info-body">
                      <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg11.png') no-repeat;background-size: 100% 100%"/>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="device-info">
                    <div class="device-info-title">
                      <span>设备编号:</span> <span style="color: white">AD93157</span>
                    </div>
                    <div class="device-info-body">
                      <div style="height: 100%; width: 100%;background:url('/static/images/deviceReport/rbg12.png') no-repeat;background-size: 100% 100%"/>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-carousel-item> -->
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import countTo from 'vue-count-to'
import screenfull from 'screenfull'
export default {
  components: { countTo },
  data() {
    return {
      pageName: this.$t('route.' + this.$route.meta.title),
      isScreenfull: false,
      titles: ['设备编号', '故障类型', '故障时间'],
      deviceErrorList: [
        { deviceNo: '91376494', type: '燃油不足', time: '2019-05-28 14:15' },
        { deviceNo: '91232187', type: '胎压不足', time: '2019-05-28 11:33' },
        { deviceNo: '41108559', type: '温度过高', time: '2019-05-28 13:26' }
      ],
      deviceErrorList2: [
        { deviceNo: '91270313', type: '发动机停车', time: '2019-05-28 13:26' }
      ],
      popOpacity2: 0,
      popOpacity1: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  mounted() {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isScreenfull = false
      }
    }
    if (this.sidebar.opened) {
      this.$store.dispatch('ToggleSideBar')
    }
  },
  methods: {
    // 弹框的长度
    getWidth() {
      const winWidth = document.documentElement.clientWidth
      return winWidth / 1082 * 200
    },
    popOver1() {
      this.popOpacity1 = 1
    },
    popOut1() {
      this.popOpacity1 = 0
    },
    popOver2() {
      this.popOpacity2 = 1
    },
    popOut2() {
      this.popOpacity2 = 0
    },
    /**
     * 全屏事件
     */
    screenfull() {
      const deviceReport = document.getElementById('deviceReport')
      if (screenfull.enabled) {
        screenfull.request(deviceReport)
        this.isScreenfull = !this.isScreenfull
      }
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    }
  }
}
</script>
<style lang="scss" scoped>
  $image-url:'/static/images/deviceReport';
  .device-report{
    color: beige;
    width: 100%;
    height: calc(100vh - 50px);
    background: url('#{$image-url}/bg.png') no-repeat;
    background-size: 100% 100%;
    overflow: auto;
    .title {
      height: 3vw;
      background: url('#{$image-url}/top.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: aqua;
      padding-top: 0.3vw;
      font-size: 1.8vw;
    }
    .body {
      padding: 2vw;
      .total {
        position: relative;
        padding: 2.3vw 10px 8px 10px;
        background: url('#{$image-url}/total.png') no-repeat;
        background-size: 100% 100%;
        height: 8vw;
        .total-child{
          position: relative;
          width: 100%;
          height: 5.2vw;
          text-align: center;
          display: -webkit-box;
          -webkit-box-pack:center;
          -webkit-box-orient:vertical;
          span {
            font-size: 2vw;
            padding: 0.3vw;
            display: block;
          }
          .total-child-title {
            color: aqua;
            font-size: 1.3vw;
          }
          .split-line {
            position: absolute;
            top: 50%;
            right: 0;
            width: 1px;
            height: 2.5vw;
            transform: translateY(-50%);
            background-color: #1e57d685;
          }
        }
        &-title {
          width: 100%;
          height: 2.3vw;
          position: absolute;
          top: 0px;
          left: 0px;
          padding: 0.5vw 0 0.5vw 1vw;
          font-size: 1.2vw;
          color: aqua;
        }
      }
      .device{
        &-list{
          height: 36vw;
          padding-top: 2vw;
        }
        &-info {
          height: 18vw;
          background: url('#{$image-url}/info.png') no-repeat;
          background-size: 100% 100%;
          margin-bottom: 2vw;
          &-title {
            width: 100%;
            height: 2.3vw;
            padding: 0.5vw 0 0.5vw 1vw;
            font-size: 1.2vw;
            color: aqua;
          }
          &-body {
            height:15.7vw;
            background-size: 100% 100%;
            padding: 2.5vw 3.5vw;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .popover-body{
    color: white;
    overflow: hidden;
    min-height: 15vh;
    border-radius: 8px;
    font-size: 13px!important;
    position: absolute;
    top: 5.5vw;
    left: 2.6vw;
    z-index: 999;
    ul {
      padding-left: 0;
    }
    ul li {
      list-style: none;
      .title{
        display: -webkit-box;
        width: 100%;
        font-size: .7vw!important;
        color: #fff!important;
        height: 2.5vh!important;
        div {
          width: 30%;
          text-align: center;
        }
        div:last-child {
          width: 40%
        }
      }
    }
    background: #1e57d6db!important;
    border: 1px solid #1e57d6db;
    .popper__arrow{
      border-bottom-color: #1e57d6db!important;
    }
    .popper__arrow::after{
      border-bottom-color: #1e57d6db!important;
    }
    .el-scrollbar__wrap{
      overflow-x: hidden
    }
  }
</style>


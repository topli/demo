<style lang="scss" scoped>
  .screen-main {
    width:100%;
    height:100%;
  }
  .screen-video {
    .close {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      z-index: 99;
      line-height: 26px;
      margin-right: 5px;
      background-color: transparent;
      cursor: pointer;
    }
    .expand {
      position: absolute;
      top: 0;
      right: 26px;
      color: #fff;
      z-index: 99;
      line-height: 26px;
      margin-right: 5px;
      background-color: transparent;
      cursor: pointer;
    }
    .video-col {
      border: 1px solid gray;
      cursor: pointer;
      background-image: url("../../../../static/images/videoBackground.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      -o-background-size: 100% 100%;
      -webkit-background-size: 100% 100%;
    }
  }
  .screen-tool {
    height: 40px;
    width: calc(100% - 2px);
    background-color: #f0f0f0;;
    position: absolute;
    bottom: 1px;
    left: 1px;
    right: 1px;
    .screen-tool-bar {
      margin-top: 4px;
      margin-left: 4px;
      button.ivu-btn {
        background-color: #fff;
      }
    }
  }
  .active {
    border: 1px solid greenyellow !important;
    background-color: #f5f5f5;
  }
  .button-active {
    background-color: #2686eb !important;
    color: #fff;
  }
</style>
<template>
  <div class="screen-main" style="height: calc(100%)">
    <fullscreen ref="fullscreen" @change="fullscreenChange">
      <div class="screen-video">
        <el-row id="row">
          <div style="height: calc(100%);width: calc(100%);position: absolute" @click="clickCol($event)">
            <el-col v-for="(item, index) in playList" :span="item.span" :key="index" :id="index" :style="{height: item.height + 'px'}" class="video-col">
              <fullscreen :ref="'fullscreen_' + index" style="background-color: #b5d3e8;" @change="fullscreenItemChange($event, item, index)">
                <div v-if="!videoItemShow" style="width: 100%;height: 100%">
                  <Icon v-if="item.show" type="close" size="16" class="close" @click.native.stop="closeVideo(item, index)"/>
                  <Icon v-if="item.show" :type="expand ? 'arrow-shrink' : 'arrow-expand'" size="26" class="expand" @click.native.stop="toggleItem(index)"/>
                  <!-- <hy-video-flv v-if="item.show" :ref="'video_' + index" :options="item.data" :ratio="ratio" :video-height="item.height"/> -->
                  <video v-show="index<3" id="video1" :ref="'video' + index" muted="false" class="video" autoplay="autoplay" loop="loop" style="opacity:0;width: 100%;height:100%;object-fit: fill;">
                    <source :src="videoList[index]">
                  </video>
                </div>
              </fullscreen>
            </el-col>
          </div>
        </el-row>
      </div>
    </fullscreen>
    <div class="screen-tool">
      <div class="screen-tool-bar">
        <el-button-group>
          <el-button v-for="item in splitArray" :key="item" :class="{'button-active': splitNum === item}" @click="split(item)">{{ item }}</el-button>
        </el-button-group>
        <el-button type="ghost" @click="closeVideoAll">全部关闭</el-button>
        <el-button type="ghost" @click="toggle">全屏</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import hyVideoFlv from './videoFlv'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SplitScreenVideo',
  components: {
    // hyVideoFlv
  },
  props: {
    fleetTreeRef: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      splitNum: 4,
      divNum: 0,
      curDivNum: null, // 当前选择的div
      splitArray: [1, 4, 6, 9, 10, 16],
      //
      isFull: false, // 全屏标识符
      expand: false, // 单个全屏
      videoItemShow: false,
      //
      playList: [
        { label: 0, span: 12, height: 325, show: false, data: {}},
        { label: 1, span: 12, height: 325, show: false, data: {}},
        { label: 2, span: 12, height: 325, show: false, data: {}},
        { label: 3, span: 12, height: 325, show: false, data: {}}
      ], // 视频数组
      videoList: [
        '../../../../static/video/2A7DC1AD96A9D5D4FD7C368F6733E395.mp4',
        '../../../../static/video/1E0B934AEE85D41DDA9E6F9477C1C9AD.mp4',
        '../../../../static/video/2A7DC1AD96A9D5D4FD7C368F6733E395.mp4'
      ],
      screenHeight: 0,
      originHeight: 0,
      videoShow: true,
      videoDataList: [], // 播放视频列表
      videoObj: {},
      ratio: 'all',
      ratioList: [{ label: '满屏幕', value: 'all' }, { label: '4:3显示', value: '4:3' }, { label: '16:9显示', value: '16:9' }],
      dataBackup: []
    }
  },
  computed: {
    ...mapState([
      'isFullScreen'
    ]),
    ...mapGetters(['videoSrc'])
    // videoList() {
    //   console.log(this.videoSrc)
    //   return this.videoSrc
    // }
  },
  watch: {
    isFullScreen: function(newValue, oldValue) {
      setTimeout(() => {
        if (!this.isFull) {
          // 单个全屏
          this.expand = !!newValue
          if (newValue) this.screenHeight = document.getElementsByClassName('screen-video')[0].offsetHeight - 41
          // else this.screenHeight = this._hyTool.deepCopy(this.originHeight)
          this.split(this.splitNum)
        }
      }, 300)
    }
  },
  created() {

  },
  mounted() {
    this.screenHeight = document.getElementsByClassName('screen-video')[0].offsetHeight - 41
    // this.originHeight = this._hyTool.deepCopy(this.screenHeight)
    console.log(this.screenHeight)
    // 默认4个分屏
    // this.playList = [
    //   { label: 0, span: 12, height: this.screenHeight / 2, show: false, data: {}},
    //   { label: 1, span: 12, height: this.screenHeight / 2, show: false, data: {}},
    //   { label: 2, span: 12, height: this.screenHeight / 2, show: false, data: {}},
    //   { label: 3, span: 12, height: this.screenHeight / 2, show: false, data: {}}
    // ]
    // this.playList.push([
    //   { label: 0, span: 12, height: 360, show: false, data: {}},
    //   { label: 1, span: 12, height: this.screenHeight / 2, show: false, data: {}},
    //   { label: 2, span: 12, height: this.screenHeight / 2, show: false, data: {}},
    //   { label: 3, span: 12, height: this.screenHeight / 2, show: false, data: {}}
    // ])
    this.pageInte()
  },
  methods: {
    // 初始化
    pageInte() {
      const myvideo1 = document.getElementById('video1')
      myvideo1.muted = true
    },
    // 视频宽度
    spanSize(length) {
      if (length === 1) {
        return 24
      } else if (length === 4 || length === 6) {
        return 12
      } else if (length === 9) {
        return 8
      } else if (length === 10 || length === 16) {
        return 6
      }
    },
    // 视频高度
    videoHeight(length) {
      const screenHeight = this.screenHeight
      if (length === 1) {
        return [screenHeight]
      } else if (length === 4) {
        return [screenHeight / 2]
      } else if (length === 6 || length === 9) {
        return [screenHeight / 3]
      } else if (length === 10) {
        return [screenHeight / 4, screenHeight / 2]
      } else if (length === 16) {
        return [screenHeight / 4]
      }
    },
    // 分屏
    split(flag, data, mark) {
      console.log(flag, data, mark)
      this.curDivNum = null // 默认不选择div
      this.splitNum = flag
      const span = this.spanSize(flag)
      const height = this.videoHeight(flag)
      if (this.playList.length > flag) this.playList = this.playList.slice(0, flag)
      for (let i = 0; i < flag; i++) {
        if (flag === 10 && (i === 0 || i === 1)) {
          if (this.playList[i]) {
            this.playList[i].span = 12
            this.playList[i].height = height[1]
            this.playList[i].show = false
          } else {
            this.playList.push({ label: i, span: 12, height: height[1], show: false, data: {}})
          }
        } else {
          if (this.playList[i]) {
            this.playList[i].span = span
            this.playList[i].height = height[0]
            this.playList[i].show = false
          } else {
            this.playList.push({ label: i, span: span, height: height[0], show: false, data: {}})
          }
        }
      }
      if (data) { // 添加 / 关闭  视频
        if (mark === '+') {
          this.videoObj[this.divNum] = data
          // div的编号 是页面中上存在的
        } else if (mark === '-') {
          delete this.videoObj[data.label]
        } else {
          this.videoObj = {}
          this.divNum = 0 // 默认打开第一个框打开视频
        }
        for (let key in this.videoObj) {
          key = Number(key)
          for (const item of this.playList) {
            if (key === item.label) {
              item.show = true
              item.data = this.videoObj[key]
            }
          }
        }
      } else {
        if (Object.keys(this.videoObj).length > 0) { // 切换分屏保留可现实的视频
          for (let key in this.videoObj) {
            key = Number(key)
            for (const item of this.playList) {
              if (key === item.label) {
                item.show = true
                item.data = this.videoObj[key]
              }
            }
          }
        }
      }
    },
    // 选中要播放的框
    clickCol(event) {
      this.curDivNum = Number(event.target.id)
      window.$(event.target).addClass('active').siblings().removeClass('active')
    },
    // 关闭视频
    closeVideo(item, index) {
      this.$refs['video_' + index][0].closed()
      this.split(this.splitNum, item, '-')
    },
    // 添加视频
    addVideoData(data) {
      // 设置默打开窗口
      const len = data.length
      // 打开窗口数
      const openNum = this.splitArray.filter(item => item >= len)[0]
      this.split(openNum)
      // 当前的播放的列表
      const pl = this.playList.map(item => item.show ? item.data.plateNum + item.data.passageway : null)
      let list = []
      for (const li of data) {
        // 获取没有在播放的视频列表
        if (pl.indexOf(li.plateNum + li.passageway) === -1) list.push(li)
      }
      // 默认分屏
      list = list.slice(0, this.splitNum) // 符合当前分屏数的列表
      for (let i = 0; i < list.length; i++) {
        if (this.divNum < this.splitNum) { // div的编号 在当前分屏的div中
          if (!this.curDivNum) this.divNum = pl.indexOf(null) // 当前没有选择div,默认为第一个空白的视频框
          else {
            this.divNum = this.curDivNum
            this.curDivNum = null
            window.$('.video-col').removeClass('active')
          }
          pl[this.divNum] = list[i].plateNum + list[i].passageway
          this.split(this.splitNum, list[i], '+')
        } else {
          this.divNum = pl.indexOf(null)
          this.split(this.splitNum, list[i], '+')
        }
      }
    },
    // 关闭全部视频
    closeVideoAll() {
      // if (Object.keys(this.fleetTreeRef).length === 0) return;
      this.split(this.splitNum, 'all', '--')
      for (let i = 0; i < this.splitNum; i++) {
        if (this.$refs['video_' + i] && this.$refs['video_' + i].length > 0) {
          this.$refs['video_' + i][0].closed()
        }
      }
    },
    // 选择视频比例
    ratioChange(value) {
      this.ratio = ''
      this.ratio = value
    },
    // 全屏
    toggle() {
      this.$refs['fullscreen'].toggle() // recommended
    },
    fullscreenChange(fullscreen) {
      // this.videoShow = false;
      if (fullscreen) {
        setTimeout(() => {
          this.isFull = true
          // this.videoShow = true;
          this.expand = true // 单个全屏
          this.screenHeight = this.$refs['fullscreen'].$el.clientHeight
          this.split(this.splitNum)
        }, 100)
      } else {
        this.isFull = false
        this.expand = false // 单个全屏
        // this.screenHeight = this._hyTool.deepCopy(this.originHeight)
        this.split(this.splitNum)
      }
    },
    // 单个全屏
    toggleItem(index) {
      this.$refs['fullscreen_' + index][0].toggle()
    },
    // 单个变换
    fullscreenItemChange(fullscreen, item, index) {
      // this.$refs['video_' + index].closed();
      // this.videoItemShow = true;
      if (fullscreen) {
        setTimeout(() => {
          this.isFull = true
          this.expand = true // 单个全屏
          setTimeout(() => {
            // this.videoItemShow = false;
            this.fullscreenItem(index)
          }, 100)
        }, 100)
      } else {
        // this.videoItemShow = false;
        this.isFull = false
        this.expand = false // 单个全屏
        // this.screenHeight = this._hyTool.deepCopy(this.originHeight)
        this.split(this.splitNum)
      }
    },
    // 单个全屏数据处理
    fullscreenItem(index) {
      this.screenHeight = this.$refs['fullscreen_' + index][0].$el.clientHeight
      const span = this.spanSize(1)
      const height = this.videoHeight(1)
      this.playList[index].label = index
      this.playList[index].span = span
      this.playList[index].height = height[0]
    }
  }
}
</script>

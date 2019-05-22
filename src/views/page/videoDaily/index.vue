<style lang="scss" scoped>
  .lrj-realvideo {
    height: calc(100%);
    position: absolute;
    width: calc(100%);
    .main-group {
      height: 100%;
    }
  }
  .button-group {
    position: absolute;
    width: 100%;
    display: block;
    top: 0;
    left: 0;
    background-color: #f1f1f1;
  }
  // 左侧内容
  .left-panel-content {
    position: relative;
    height: 100%;
    padding-bottom: 32px;
  }
  // 左侧内容 底部按钮
  .bottom-bar {
    position: absolute;
    width: 100%;
    display: block;
    bottom: 0;
    left: 0;
    background-color: #f1f1f1;
    padding: 10px 0;
    box-shadow: 0 -3px 3px #999;
    .search-form {
      margin-left: 10px;
    }
    .el-form-item{
      margin-bottom: 3px !important;
      vertical-align: top;
      zoom: 1;
      /deep/.el-form-item__label {
        font-size: 12px;
      }
    }
  }
  .button-active {
    background-color: #2686eb;
    color: #fff;
  }
  .right-top-panel-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .right-bottom-panel-content {
    position: relative;
    width: 100%;
    height: 100%;
    /deep/ .ivu-table {
      padding-bottom: 33px;
      .ivu-table-overflowX,.ivu-table-tip {
        height: 100%;
      }
      .ivu-table-fixed,.ivu-table-fixed-right {
        height: calc(100% - 10px);
        .ivu-table-fixed-body {
          height: calc(100% - 33px);
        }
      }
    }
  }
  .video-col {
    background-image: url("../../../../static/images/videoBackground.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
  }
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
  .el-table--border {
    height: 100%!important;
  }
</style>
<template>
  <div id="realvideo" class="tem-div lrj-realvideo">
    <panel-ext :layout="layout" class="realvideochild" @click="clickPanel">
      <div slot="left-panel" class="left-panel-content">
        <el-button-group class="button-group">
          <el-button :class="{'button-active': fleetType === 'video1'}" type="ghost" style="width: 50%;" @click="changeView(false)">实时视频</el-button>
          <el-button :class="{'button-active': fleetType === 'video2'}" type="ghost" style="width: 50%;" @click="changeView(true)">录像回放</el-button>
        </el-button-group>
        <fleet-tree-video
          v-if="fleetTreeShow"
          ref="fleetTree"
          :class="[fleetType === 'video2' ? 'realvideostyle' : '']"
          :type="fleetType"
          :show-checkbox="false"
          :padding-top="32"
          :padding-bottom="paddingBottom"
          @closeAllVideo="closeAllVideo"
          @getPassagewayData="getPassagewayData"/>
        <div v-if="searchShow" class="bottom-bar">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <el-form :model="searchData" label-position="right" class="search-form">
                <el-form-item label="视频类型">
                  <el-select v-model="searchData.flag" placeholder="视频类型" style="width: 250px;">
                    <el-option v-for="item in flagList" :key="item.value" :value="item.value" :label="item.label"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker v-model="searchData.startTime" :editable="false" :clearable="false" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" style="width: 250px;"/>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="searchData.endTime" :editable="false" :clearable="false" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" style="width: 250px;"/>
                </el-form-item>
                <el-button :disabled="videoData.length === 0" :loading="loading" icon="search" type="primary" style="width: 310px;margin-top: 3px;" @click="_getList">查询</el-button>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="!searchShow" slot="right-top-panel">
        <Spin v-show="loadingSpin" fix style="z-index: 100;"/>
        <split-screen-video ref="splitScreen" :fleet-tree-ref="$refs.fleetTree"/>
      </div>
      <div v-else slot="right-top-panel" class="right-top-panel-content video-col">
        <fullscreen ref="fullscreen" style="background-color: #b5d3e8;" @change="fullscreenChange">
          <Icon v-if="videoShow" type="close" size="16" class="close" @click.native.stop="closeVideo('video')"/>
          <Icon v-if="videoShow" :type="expand ? 'arrow-shrink' : 'arrow-expand'" size="26" class="expand" @click.native.stop="toggle"/>
          <hy-video-flv v-if="videoShow" ref="video" :options="replayData" :radio="all" :video-height="rightTopHeight"/>
        </fullscreen>
      </div>
      <div slot="right-bottom-panel" class="right-bottom-panel-content">
        <!-- <Table ref="table" :highlight-row="true" :columns="columnsTitle" :loading="loading" :data="list" size="small" border style="height: 100%"/> -->
        <div class="table" style="height: 100%">
          <t-for-col
            :data="list"
            :sort-change="sortChange"
            :columns-title="columnsTitle"
            :loading="loading"
            selection
            index
            @select-change="handleSelectionChange"/>
        </div>
      </div>
    </panel-ext>
  </div>
</template>
<script>
import panelExt from './panelExt'
import splitScreenVideo from './splitScreenVideo.vue'
// import hyVideoFlv from './videoFlv'
import fleetTreeVideo from './fleetTreeVideo'
// import { mapState } from 'vuex'
// import { queryHistoryVideo } from '@/service/video'

export default {
  components: {
    panelExt,
    splitScreenVideo,
    // hyVideoFlv,
    fleetTreeVideo
  },
  mixins: [],
  data() {
    return {
      loadingSpin: false,
      layout: 2,
      searchData: {},
      videoData: [],
      fleetType: 'video1', // video1 实时视频  video2 录像回放
      fleetTreeShow: true,
      paddingBottom: 0,
      //
      searchShow: false,
      searchData1: {},
      //
      flagList: [{ value: 0, label: '正常' }, { value: 1, label: '报警' }],
      columnsTitle: [
        { type: 'index', width: 70, title: '序号', align: 'center' },
        {
          key: 'plateNum',
          title: '车牌号',
          minWidth: 120,
          align: 'center'
        },
        {
          key: 'channelNo',
          title: '通道号',
          minWidth: 120,
          align: 'center'
        },
        {
          key: 'startTime',
          title: '开始时间',
          minWidth: 150,
          align: 'center'
        },
        {
          key: 'endTime',
          title: '结束时间',
          minWidth: 150,
          align: 'center'
        },
        {
          key: 'time',
          title: '录像时长',
          minWidth: 180,
          align: 'center'
        },
        {
          key: 'size',
          title: '录像大小(BYTE)',
          minWidth: 150,
          align: 'center'
        },
        {
          key: 'source',
          title: '视频来源',
          minWidth: 120,
          align: 'center'
        },
        {
          key: 'alarmName',
          title: '报警标志',
          minWidth: 120,
          align: 'center'
        },
        {
          key: 'action',
          title: '操作',
          minWidth: 120,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'primary', size: 'small' },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.play(params.row)
                  }
                }
              }, '播放')
            ])
          }
        }
      ],
      loading: false,
      rightTopHeight: 0,
      list: [],
      videoShow: false,
      replayData: null,
      screenHeight: 0,
      originHeight: 0,
      expand: false,
      isFull: false
    }
  },
  computed: {
    // ...mapState([
    //   'isFullScreen'
    // ])
  },
  watch: {
    isFullScreen: function(newValue) {
      setTimeout(() => {
        if (!this.isFull) {
          // 单个全屏
          this.expand = !!newValue
          if (this.replayData) {
            setTimeout(() => {
              this.rightTopHeight = document.getElementsByClassName('right-top-panel')[0].offsetHeight
            }, 100)
          } else this.rightTopHeight = document.getElementsByClassName('tem-div')[0].offsetHeight * 0.7 - 25
        }
      }, 300)
    }
  },
  mounted() {
    this.screenHeight = document.getElementsByClassName('tem-div')[0].offsetHeight - 20
  },
  methods: {
    // 录像查询
    async getVPlaybackQuery(opt) {
      if (Number(opt.channel) > 8 || Number(opt.channel) < 1) {
        return []
      }
      // const params = {
      //   sim: opt.sim,
      //   channel: opt.channel, // 1-8
      //   fromTime: opt.timeFrom, // 时间范围应当介于 30-3600 秒
      //   toTime: opt.timeTo
      // }
      // const query = await queryHistoryVideo(params)
      // if (query.code === '0') {
      //   return query.data
      // } else {
      //   let msg = query.message
      //   const channelStatus = '通道' + this._hyTool.sectionToChinese(Number(opt.channel))
      //   msg = `${channelStatus + '未查找到视频记录'}`
      //   this.$Notice.warning({ title: msg })
      //   return []
      // }
    },
    // ------------------左侧树形结构-----------------------------
    // 选择树 获取视频通道数据
    getPassagewayData(res) {
      // 关闭所有视频
      this.assembleArray(res)
    },
    // 关闭所有视频
    closeAllVideo() {
      this.$refs.splitScreen.closeVideoAll()
    },
    // 视频开启列表组装
    async assembleArray(array) {
      if (this.fleetType === 'video1') this.closeAllVideo()
      this.$nextTick(() => {
        // 拼接视频参数
        this.videoData = []
        array.forEach(item => {
          const vData = {
            plateNum: item.plateNo,
            title: item.name, // 显示标题
            terminalNumber: item.terminalNumber,
            src: item.FlvUrl,
            vehicleId: item.vehicleId,
            channelNo: item.ChannelNo,
            id: item.id,
            tId: item.tId
          }
          this.videoData.push(vData)
        })
        if (this.fleetType === 'video1') this.$refs['splitScreen'].addVideoData(this.videoData)
      })
    },
    // 实时视频 / 录像回放
    changeView(bool) {
      this.$refs['fleetTree'].videoCount = 0
      this.videoData = []
      this.searchShow = bool
      this.fleetTreeShow = false
      if (!bool) {
        this.fleetType = 'video1'
        this.layout = 2
        this.paddingBottom = 0
      } else {
        this.layout = 3
        this.paddingBottom = 165
        this.searchData = {
          flag: 0,
          startTime: new Date(+new Date() - (3600 * 1000)),
          endTime: new Date()
        }
        this.fleetType = 'video2'
        this.list = []
        this.replayData = null
        this.videoShow = false
        setTimeout(() => {
          this.rightTopHeight = document.getElementsByClassName('right-top-panel')[0].offsetHeight
          // this.originHeight = this._hyTool.deepCopy(this.rightTopHeight)
        }, 100)
      }
      setTimeout(() => {
        this.fleetTreeShow = true
      }, 100)
    },
    // -------录像回放-------------------------------------------------------------------------------------
    // 关闭视频
    closeVideo() {
      this.videoShow = false
      this.$refs['video'].closed()
      this.replayData = null
    },
    // 分屏触发 function
    clickPanel(data) {
      if (data.includes('chevron-up')) {
        // 有播放的视频
        if (this.replayData) {
          setTimeout(() => {
            this.rightTopHeight = document.getElementsByClassName('right-top-panel')[0].offsetHeight
          }, 100)
        } else this.rightTopHeight = document.getElementsByClassName('tem-div')[0].offsetHeight - 20
      } else {
        if (this.replayData) {
          setTimeout(() => {
            this.rightTopHeight = document.getElementsByClassName('right-top-panel')[0].offsetHeight
          }, 100)
        } else this.rightTopHeight = document.getElementsByClassName('tem-div')[0].offsetHeight * 0.7 - 25
      }
    },
    // 录像回放查询
    // 获取列表
    async _getList() {
      this.rightTopHeight = document.getElementsByClassName('right-top-panel')[0].offsetHeight
      const endTime = new Date(this._hyTool.DateFormat(this.searchData.endTime, 'yyyy-MM-dd hh:mm:ss')).getTime()
      const startTime = new Date(this._hyTool.DateFormat(this.searchData.startTime, 'yyyy-MM-dd hh:mm:ss')).getTime()
      if (startTime === '' || endTime === '') {
        this.$Notice.warning({ title: '请选择查询时间' })
        return
      }
      if (startTime > endTime) {
        this.$Notice.warning({
          title: '开始时间不能大于结束时间'
        })
        return
      }
      if ((endTime - startTime) > 3600000 && (endTime - startTime) > 30000) {
        this.$Notice.warning({ title: '选择的时间跨度为30秒到1个小时' })
        return
      }
      const channelNo = []
      if (this.videoData.length > 0) {
        for (const it of this.videoData) {
          channelNo.push(it.channelNo)
        }
      } else return
      this.loading = true
      let list = []
      this.list = []
      for (const no of channelNo) {
        const opt = {
          sim: this.videoData[0].terminalNumber,
          channel: no,
          timeFrom: this._hyTool.DateFormat(startTime, 'yyyyMMddhhmmss'),
          timeTo: this._hyTool.DateFormat(endTime, 'yyyyMMddhhmmss')
        }
        list = await this.getVPlaybackQuery(opt)
        this.list = this.list.concat(list)
      }
      this.list.forEach(item => {
        item.plateNum = this.videoData[0].plateNum
        item.channelNo = '通道' + this._hyTool.sectionToChinese(Number(item['channel_no']))
        item.src = item['flv_url']
        item.startTime = item['time_from']
        item.endTime = item['time_to']
        item.vehicleId = this.videoData[0].vehicleId
        item.size = item['file_size']
        //
        item.time = 0 // 录像时长
        item.mediaType = '1' // 资源类型
        item.streamType = '1' // 码流类型
        item.storageType = '1' // 存储类型
        item.source = '设备' // 视频来源
        if (!item.alarmName) item.alarmName = '无' // 报警标志
      })
      this.loading = false
    },
    // 播放
    async play(videoData) {
      this.videoShow = false
      // 关闭视频
      if (this.replayData) {
        this.$refs['video'].closed()
      }
      // 添加播放视频
      if (videoData) {
        this.replayData = videoData
      }
      setTimeout(() => {
        this.rightTopHeight = document.getElementsByClassName('right-top-panel')[0].offsetHeight
        this.videoShow = true
      }, 300)
    },
    // 全屏
    toggle() {
      this.$refs['fullscreen'].toggle() // recommended
    },
    fullscreenChange(fullscreen) {
      if (fullscreen) {
        setTimeout(() => {
          this.isFull = true
          this.expand = true // 单个全屏
          this.rightTopHeight = this.$refs['fullscreen'].$el.clientHeight
        }, 100)
      } else {
        this.isFull = false
        this.expand = false // 单个全屏
        this.rightTopHeight = this._hyTool.deepCopy(this.originHeight)
      }
    }
  }
}
</script>

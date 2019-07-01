<style lang="scss" scoped>
#taskProgress {
  font-family: PingFang-SC-Medium;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 10px;
  background: #010810 url("../../../../static/images/taskProgress/bg2.png") top center no-repeat;
  background-size: 100%;
  overflow: hidden;
  // 头部
  .task-header {
    height: 12.06%;
    background: url("../../../../static/images/taskProgress/header_bg.png") top center no-repeat;
    background-size: 100%;
    overflow: hidden;
    .task-nav {
      font-size: 0;
      margin: 0.6% 0 0 49%;
      overflow: hidden;
      float: left;
      a {
        line-height: 4vh;
        color: #0febff;
        text-align: center;
        font-weight: 700;
        width: 100%;
        font-size: 0.8vw;
        cursor: default;
      }
    }
    .shortcut-bar {
      float: right;
      display: flex;
      font-size: 0;
      margin-top: 1vw;
      margin-right: 1vw;
      align-items: center;
      li {
        float: left;
        margin-right: 12px;
        list-style: none;
        cursor: pointer;
        &:first-child {
          margin-right: 6px;
        }
        &:nth-child(2){
          margin-right: 2vw;
        }
        img {
          width: 16px;
          height: 16px;
        }
      }
      .user-name {
        color: #0febff;
        font-size: .8vw;
      }
      .avator img {
        display: block;
        border: 0;
        width: 1vw;
        height: 80%;
      }
    }
  }
  // 主体
  .main-wapper {
    position: relative;
    height: 87.94%;
    // 左侧面板
    .left-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 27.8%;
      height: 100%;
      justify-content: space-between;
      z-index: 2;
      .left-panel-item {
        background: top center no-repeat;
        background-image: url("../../../../static/images/taskProgress/left-panel-b-1.png");
        background-size: 100% 100%;
        // height: 32%;
      }
    }
  }
}
</style>

<template>
  <div id="taskProgress">
    <!-- 头部 -->
    <div class="task-header clearfix">
      <!-- 菜单 -->
      <div class="task-nav fl clearfix">
        <a v-for="item in sysList" :key="item.id" href="javascript:void(0);">{{ item.menu }}</a>
      </div>
      <!-- 快捷栏 -->
      <ul class="shortcut-bar fr">
        <li class="user-name">root</li>
        <li class="avator"><img src="../../../../static/images/taskProgress/avator.png"></li>
        <el-button type="text" style="position:absolute; right: 1.2vw; top: 1.2vw;font-size: .7vw;color:#0febff" @click="screenfull">
          {{ !isFullscreen ? '全屏' : '' }}
        </el-button>
        <!-- <li class="logout" @click="modalShow = true"><img src="../../../../static/images/taskProgress/logout.png"></li> -->
      </ul>
    </div>
    <div class="main-wapper">
      <!-- 左侧板块 -->
      <div class="left-panel">
        <!-- 数据看板 -->
        <dataBoard/>
        <!-- 车辆能耗排行 -->
        <carModelEnergyChart/>
        <!-- 近24小时车辆在线率 -->
        <carOnlineRateChart/>
      </div>
      <!-- 右侧板块 -->
      <rightPanel/>
    </div>
  </div>
</template>

<script>
// 左侧模块
import dataBoard from './leftPanel/dataBoard'
import carModelEnergyChart from './leftPanel/carModelEnergyChart'
import carOnlineRateChart from './leftPanel/carOnlineRateChart'
// 右侧模块
import rightPanel from './rightPanel/rightPanel'
import { mapGetters } from 'vuex'
import { screenfullEl } from '@/libs/utils/dom'

export default {
  components: {
    dataBoard,
    carModelEnergyChart,
    carOnlineRateChart,
    rightPanel
  },
  data() {
    return {
      modalShow: false,
      user: {},
      isFullscreen: false,
      navHum: null,
      sysList: [
        { home: 'a', menu: '设备分布监控统计' }
      ]
    }
  },
  computed: {
    // ...mapGetters(['sysList', 'getCurrentUser'])
    ...mapGetters([
      'sidebar'
    ])
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.navHum = document.getElementsByName('html')
    })
    if (this.sidebar.opened) {
      this.$store.dispatch('ToggleSideBar')
    }
  },
  methods: {
    /**
     * 全屏事件
     */
    screenfull() {
      screenfullEl.call(this, 'taskProgress')
    },
    rem() {
      const doc = document
      const win = window
      const docEl = doc.documentElement
      const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      const recalc = function() {
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return
        var fontSize = 20 * (clientWidth / 320) + 'px'
        docEl.style.fontSize = fontSize
      }
      recalc()
      if (!doc.addEventListener) return
      win.addEventListener(resizeEvt, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    },
    // 注销
    logOutFuc() {
      this.logout()
      this.$store.commit('clearOpenedSubmenu')
      localStorage.clear()
      document.body.removeAttribute('class')
      this.$router.replace('/login')
    }
  }
}
</script>

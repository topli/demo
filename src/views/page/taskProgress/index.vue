<style lang="scss" scoped>
.taskProgress {
  font-family: PingFang-SC-Medium;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 0.1rem;
  background: #010810 url("../../../../static/images/taskProgress/bg2.png") top center no-repeat;
  background-size: 100%;
  overflow: hidden;
  // 头部
  .task-header {
    height: 0.82rem;
    background: url("../../../../static/images/taskProgress/header_bg.png") top center no-repeat;
    background-size: 100%;
    .task-nav {
      font-size: 0;
      margin: 0.15rem 0 0 7.5rem;
      overflow: hidden;
      float: left;
      a {
        position: relative;
        float: left;
        font-size: 0.13rem;
        margin-right: 0.55rem;
        width: 0.88rem;
        height: 0.3rem;
        line-height: 0.3rem;
        color: #0febff;
        text-align: center;
        font-weight: 700;
        width: 100%;
        font-size: 16px;
        cursor: pointer;
        // transition: all 0.3s;
        &:hover {
          &:after {
            top: 0;
          }
        }
        &:after {
          position: absolute;
          display: block;
          content: "";
          height: 100%;
          width: 100%;
          top: 100%;
          left: 0;
          background: url("../../../../static/images/taskProgress/nav_btn_bg.png") center bottom
            no-repeat;
          background-size: cover;
          transition: all 0.5s;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .shortcut-bar {
      float: right;
      display: flex;
      font-size: 0;
      margin-top: 0.1rem;
      margin-right: 0.19rem;
      align-items: center;
      li {
        float: left;
        margin-right: 0.13rem;
        list-style: none;
        cursor: pointer;
        &:first-child {
          margin-right: 0.06rem;
        }
        &:last-child {
          margin-right: 0;
        }
        img {
          width: 0.18rem;
          height: 0.18rem;
        }
      }
      .user-name {
        color: #0febff;
        font-size: 0.12rem;
      }
      .avator img {
        display: block;
        border: 0;
        width: 0.26rem;
        height: 0.26rem;
      }
    }
  }
  // 主体
  .main-wapper {
    position: relative;
    height: calc(100% - 0.82rem);
    // 左侧面板
    .left-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 4.18rem;
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
<style>
/* .hamburger-container {
  height: 0.52rem!important;
  line-height: 0.04rem!important;
}
.el-breadcrumb  {
  float: left;
} */
</style>

<template>
  <div class="taskProgress">
    <!-- 头部 -->
    <div class="task-header clearfix">
      <!-- 菜单 -->
      <div class="task-nav fl clearfix">
        <a v-for="item in sysList" :key="item.id" @click="link(item.home)">{{ item.menu }}</a>
      </div>
      <!-- 快捷栏 -->
      <ul class="shortcut-bar fr">
        <li class="user-name">root</li>
        <li class="avator"><img src="../../../../static/images/taskProgress/avator.png"></li>
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
      console.log(this.navHum)
    })

    // this.navHum.style.fontSize = '14px'
    if (this.sidebar.opened) {
      this.$store.dispatch('ToggleSideBar')
    }
    this.rem()
  },
  methods: {

    link(home) {
      this.$router.push({ name: home })
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
        // const hamCont = document.getElementsByClassName('hamburger-container')[0]
        // const ham = document.getElementsByClassName('el-breadcrumb')[0]
        // ham.style.float = 'left'
        // hamCont.style.fontSize = '16px'
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

<style lang="scss">
/* 自定义窗口 */
  .infoBox{
    position: relative;
    width:320px;
    height:auto;
    background-color: rgb(255, 255, 255);
    font-family: 微软雅黑;
    color: rgb(50, 50, 50);
    font-size: 12px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    user-select: text;
    border-radius: 10px;

  }
  .infoBox > img{
    width: 16px;
    z-index: 2;
    top:10px;
    right: 10px!important;
  }
  .info-content{
    background-color: rgb(255, 255, 255);
    color: #323232;
    border-radius: 10px;
  }
  .info-hd{
    height: 50px;
    background: #96a1a7;
    border-radius: 10px 10px 0 0;
    color: #fff;
    margin-bottom: 10px;
    padding-left: 50px;
    font-size: 12px;
    position: relative;
  }
  .car_icon{
    position: absolute;
    top: 12px;
    left: 12px;
    opacity: 0.4;
    width: 32px;
  }
  .info-content .inner-font{
    border-left: 1px solid #c0c0c0;
    height: 100%;
    margin-left: 6px;
    padding-left: 12px;
  }
  .info-content .inner-font p{
    padding-top: 9px;
  }
  .info-content table{
    margin: 0 0 10px 0;
    cursor: text;
    width: 100%;
  }
  .info-content table tr td{
    height: 20px;
    line-height: 20px;
  }
  .info-content table tr td:nth-child(1){
    width: 100px;
    padding-left: 10px;
    text-align: right;
    vertical-align: top;
    white-space: nowrap;
  }
  .info-content table tr td:nth-child(2){
    padding-left: 8px;
    padding-right: 10px;
    word-break: break-all;
  }
  /* 信息框底部 */
  .infoBox .fn{
    background-color: #f6f6f6;
    list-style: none;
    padding: 0;
    margin: 0;
    padding-top: 10px;
    border-radius: 0 0 10px 10px;
  }
  .infoBox .fn > li {
    float: left;
    width: 25%;
    margin-bottom: 10px;
  }
  .infoBox .fn > li a{
    display: block;
    height: 16px;
    border-right: 1px solid #aaa;
    line-height: 16px;
    text-align: center;
    font-weight: bold;
    color: #323232;
    text-decoration: none;
  }
  .infoBox .fn > li a:hover{
    color: #337ab7;
    text-decoration: none;
  }
  .infoBox .ivu-icon{
    font-size: 16px;
    margin-right: 5px;
    font-weight: normal;
    vertical-align: -3px;
  }
  .infoBox .fn li:last-child a{
    border: none;
  }
  .little-corner {
    width: 0;
    height: 0;
    position: absolute;
    z-index: 2222;
    left: 50%;
    margin-left: -7px;
    border: 7px solid transparent;
    border-top: 8px solid #ddd;
  }
  .little-corner .inner {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    overflow: hidden;
    border-top: 6px solid #f6f6f6;
    display: block;
    margin: -8px 0 0 -6px;
  }
  /* 运行中 */
  .status4{
    background: rgb(22, 145, 68);
  }
  /* 静止 */
  .status3{
    background: rgb(36, 142, 228);
  }
</style>
<template>
  <div class="info-content">
    <div class="info-hd status">
      <img v-if="infoBoxData.deviceType === '矿车'" class="car_icon" src="/static/images/harvesters1.png">
      <img v-if="infoBoxData.deviceType === '装载机'" class="car_icon" src="/static/images/loader1.png">
      <img v-if="infoBoxData.deviceType === '挖掘机'" class="car_icon" src="/static/images/excavator1.png">
      <div class="inner-font">
        <p style="margin:0px">
          <b class="pwCarnum">设备编号：{{ infoBoxData.deviceNum }}</b>
        </p>
        <p style="margin-top:0px;">设备类型：<span class="pwCurrentDriver">{{ infoBoxData.deviceType }}</span></p>
      </div>
    </div>
    <table>
      <tbody>
        <tr><td>实时状态 : </td><td>{{ infoBoxData.realTimeStatus }}</td></tr>
        <tr><td>所属组织 : </td><td>{{ infoBoxData.organisation }}</td></tr>
        <tr><td>设备地址 : </td><td>{{ infoBoxData.deviceInfoAddress }}</td></tr>
        <tr><td>工作模式 : </td><td>{{ infoBoxData.workingMode }}</td></tr>
        <tr><td>发动机转速 : </td><td>{{ infoBoxData.engineSpeed }}</td></tr>
        <tr><td>实时油耗 : </td><td>{{ infoBoxData.realTimeFuelConsumption }}</td></tr>
        <tr><td>GPS号 : </td><td>{{ infoBoxData.gpsNum }}</td></tr>
      </tbody>
    </table>
    <ul class="fn clearfix" style="height:30px;">
      <!--  <li class="track"><a href="javascript:;" @click="clickTrack()"><i class="el-icon-caret-right"/><span class="text">跟踪</span></a></li>
      <li class="replay"><a href="javascript:;" @click="clickReplay()"><i class="el-icon-caret-right"/><span class="text">回放</span></a></li>
      <li class="marker"><a href="javascript:;"><Icon type="location"></Icon><span class="text">标注</span></a></li> -->
    </ul>
    <div class="little-corner"><span class="inner"/></div>
  </div>
</template>
<script>
export default {
  name: 'InfoBox',
  props: {
    infoBoxData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 跟踪
    clickTrack() {
      // this.$router.push({ path: '/carCenter/fullChartMonitoring/realTime', query: { plateNum: this.infoBoxData.carNumber, gpsno: this.infoBoxData.gpsno }})
    },
    // 回放
    clickReplay() {
      // this.$router.push({ path: '/carCenter/historyTrack', query: { plateNum: this.infoBoxData.carNumber, gpsno: this.infoBoxData.gpsno }})
    },
    renderComplete() {
      return new Promise((resolve, reject) => {
        try {
          this.$nextTick(() => {
            resolve(this.$el)
          })
        } catch (e) {
          reject(e)
        }
      })
    },
    // acc状态
    accStatus(val) {
      let strInfo = ''
      switch (val) {
        case -1:
          strInfo = '无此数据'
          break
        case 0:
          strInfo = 'ACC关'
          break
        case 1:
          strInfo = 'ACC开'
          break
      }
      return strInfo
    }
  }
}
</script>

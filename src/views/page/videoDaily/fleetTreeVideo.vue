<style>
</style>
<style lang="scss" scoped>
    .fleet-tree-panel {
        width: 100%;
        height: 100%;
        // 搜索栏
        .search-bar {
            /deep/ .ivu-btn, /deep/ .ivu-select-selection {
                border-radius: 0;
                outline: none;
            }
        }
        // 车辆树
        .tree-panel{
            width: 100%;
            height: 100%;
            padding: 0 0 32px 0;
            overflow: auto;
        }
        .tree-panel.no-data {
            padding: 20px 0 32px 20px;
        }
    }
    .search-bar /deep/ .ivu-select-input {
        width: 100%;
    }
</style>
<template>
  <div :style="style" class="fleet-tree-panel">
    <!-- <Spin v-if="spinShow" size="large" fix/> -->
    <div class="search-bar">
      <el-row type="flex">
        <el-col :span="21">
          <el-select
            v-model="keyword"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="placeholder"
            filterable
            remote
            clearable
            style="width:100%"
            not-found-text=""
            @on-change="selectSearch">
            <el-option v-for="(item, index) in searchCarList" :value="item.guid" :key="index">
              <!-- <template v-if="item.fleetName && !item.plateNo && pathName === 'realTime'">
                <svg-icon icon-class="fleet"/> {{ item.fleetName }}
              </template> -->
              <!-- <template v-if="item.plateNo">
                <svg-icon icon-class="car_offline"/> {{ item.plateNo }} [卡号:{{ item.terminalPhone }} 终端:{{ item.terminalNumber }}]
              </template> -->
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button title="刷新车队" long style="padding: 9px 13px" @click="refreshData">
            <!-- <icon type="refresh" size="14"/> -->
            <svg-icon icon-class="refresh"/>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div :class="fleetGradeList.length ? '' : 'no-data' " class="tree-panel ">
      <div>
        <el-tree
          :default-expanded-keys="['1', '1-1']"
          :data="treeData"
          :props="defaultProps"
          :render-content="renderContent"
          node-key="id"
          @node-click="handleNodeClick">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>
              <i :class="node.icon"/>{{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
// import { gradeList } from '@/service/equipmentManage/vehicleService'
// import { queryRealVideo } from '@/service/video'

export default {
  name: 'FleetTreeVideoVideo',
  props: {
    // vehicle video1(视频监控实时) video2(视频监控录像)
    type: {
      type: String,
      default: 'vehicle'
    },
    showCheckbox: {
      type: Boolean,
      default: true
    }, // 默认显示勾选框
    paddingTop: {
      type: Number,
      default: 0
    }, // 树形结构与顶部的padding
    paddingBottom: {
      type: Number,
      default: 40
    } // 树形结构与底部的padding
  },
  data() {
    return {
      spinShow: false,
      loading: false,
      // 树节点配置
      goAsync: false,
      curStatus: 'init',
      curAsyncCount: 0,
      keyword: '',
      videoSrc1: '../../../../static/video/2A7DC1AD96A9D5D4FD7C368F6733E395.mp4',
      videoSrc2: '../../../../static/video/1E0B934AEE85D41DDA9E6F9477C1C9AD.mp4',
      treeData: [
        {
          label: '视频监控中心',
          icon: 'deviceHome',
          id: '1',
          falge: 'noTip',
          children: [
            {
              label: '0819BA2F',
              icon: 'deviceNum',
              id: '1-1',
              falge: 'noTip',
              children: [
                {
                  icon: 'device',
                  video: 'video1',
                  label: '通道一'
                },
                {
                  icon: 'device',
                  video: 'video2',
                  label: '通道二'
                },
                {
                  icon: 'device',
                  label: '通道三'
                },
                {
                  icon: 'device',
                  label: '通道四'
                }
              ]
            },
            {
              label: '0819333F',
              icon: 'deviceNum',
              falge: 'noTip',
              children: [
                {
                  icon: 'device',
                  video: 'video1',
                  label: '通道一'
                },
                {
                  icon: 'device',
                  video: 'video2',
                  label: '通道二'
                },
                {
                  icon: 'device',
                  label: '通道三'
                },
                {
                  icon: 'device',
                  label: '通道四'
                }
              ]
            },
            {
              label: '08143A2F',
              icon: 'deviceNum',
              falge: 'noTip',
              children: [
                {
                  icon: 'device',
                  video: 'video1',
                  label: '通道一'
                },
                {
                  icon: 'device',
                  video: 'video2',
                  label: '通道二'
                },
                {
                  icon: 'device',
                  label: '通道三'
                },
                {
                  icon: 'device',
                  label: '通道四'
                }
              ]
            },
            {
              label: '0219BA2F',
              icon: 'deviceNum',
              falge: 'noTip',
              children: [
                {
                  icon: 'device',
                  video: 'video1',
                  label: '通道一'
                },
                {
                  icon: 'device',
                  video: 'video2',
                  label: '通道二'
                },
                {
                  icon: 'device',
                  label: '通道三'
                },
                {
                  icon: 'device',
                  label: '通道四'
                }
              ]
            },
            {
              label: '0329BA2F',
              icon: 'deviceNum',
              falge: 'noTip',
              children: [
                {
                  icon: 'device',
                  video: 'video1',
                  label: '通道一'
                },
                {
                  icon: 'device',
                  video: 'video2',
                  label: '通道二'
                },
                {
                  icon: 'device',
                  label: '通道三'
                },
                {
                  icon: 'device',
                  label: '通道四'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentCheckNode: {}, // 当前选中节点
      checkNodeList: [], // 获取已选中的点击
      searchCarList: [], // 搜索列表
      allNodes: [], // 所有节点数据
      spanStyle: {
        backgroundColor: '#d5e8fc',
        borderRadius: '5px',
        cursor: 'pointer'
      }, // 公共样式
      gprscode: '', // 页面传递gprscode
      pathName: '', // 当前页面名称
      placeholder: '搜索、车牌、SIM卡、终端号', // 搜索框提示内容
      setPassagewayList: [], // 变为播放图标的通道号
      fleetGradeList: [],
      videoCount: 0
    }
  },
  computed: {
    style() {
      return {
        paddingTop: this.paddingTop + 'px',
        paddingBottom: this.paddingBottom + 'px'
      }
    }
  },
  created() {
    // 获取页面传值的gprscode
    this.gprscode = this.$route.query.gprscode
    // 获取当前页面名称
    this.pathName = this.$route.name
    this.initData()
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <svg-icon icon-class={node.icon}/>
          <span style='margin-left:5px;'>{node.label}</span>
        </span>
      )
    },
    // 页面初始化
    pageInte() {

    },
    handleNodeClick(params) {
      console.log(params.$treeNodeId, this.videoCount)
      const videos = document.getElementsByClassName('video')
      if (params.video === 'video1' && this.videoCount < 3) {
        videos[this.videoCount].style.opacity = 1
        this.videoCount++
      } else if (params.video === 'video2' && this.videoCount < 3) {
        videos[this.videoCount].style.opacity = 1
        this.videoCount++
      } else if (params.falge === 'noTip') {
        console.log('noTip')
      } else {
        this.$notify({ title: '设备离线，无法查看视频', type: 'warning' })
      }
    },
    // 刷新树获取实时数据
    refreshData() {
      // 1 刷新车队树数据
      this.initData(1)
      this.$emit('refreshTrackData')
    },
    // 初始化数据
    async initData(action) {
      this.spinShow = true
      // 获取车队车辆树形结构
      try {
        // const res = await gradeList({ state: 1 })
        // if (res.data) {
        //   this.fleetGradeList = res.data
        //   // 展开顶级节点
        //   this.fleetGradeList[0].open = true
        //   // 处理成树数据
        //   await this.handleData(this.fleetGradeList)
        //   // 填充树数据
        //   this.treeData = this.fleetGradeList
        //   // 初始化树
        //   this.initTree()
        // }
        // this.spinShow = false
      } catch (error) {
        this.spinShow = false
        console.log('车队树查询异常', error)
      }
    },
    // 将车队数据处理成树数据
    handleData(data, isHandCollect) {
      // 在线、离线、总数
      let online = 0; let offline = 0; let total = 0
      // 获取当前页面名称
      // let pageName = this.$route.name;
      data.forEach((item, index) => {
        // 生成唯一标示
        online = +Number(item.childrenOnlineCount) || 0
        offline = +Number(item.childrenTotalCount) - Number(item.childrenOnlineCount) || 0
        total = item.childrenTotalCount
        item.guid = Math.random().toString(36).substr(2)
        // 设置树title
        if (!item.type) {
          // 授权企业
          item.icon = '/static/images/au_enterprise_icon.png'
          item.name = item.name + ` [在:${online}  离:${offline}  总:${total}]`
        } else if (item.type === '2') {
          // 监管平台
          item.icon = '/static/images/monitor_icon.png'
          item.name = item.name + ` [在:${online}  离:${offline}  总:${total}]`
        } else if (item.type + '' === '3') { // 企业名称
          // 图标
          item.icon = '/static/images/home_icon.png'
          item.name = item.name + ` [在:${online}  离:${offline}  总:${total}]`
        } else if (item.fleetName && !item.plateNo) { // 车队名称
          item.icon = '/static/images/fleet_icon.png'
          item.name = item.fleetName + ` [在:${online}  离:${offline}  总:${total}]`
          // 如果是角色管理页面
        } else if (item.type + '' === '10') {
          // 设置车辆为父节点属性
          item.isParent = true
          // 现实有视频播放能力的车辆 (有1-8号的通道车辆)
          item.isHidden = true
          const passagewayArr = item.passageway ? item.passageway.split(',') : []
          for (const index of passagewayArr) {
            if (Number(index) > 0 && Number(index) < 9) {
              item.isHidden = false
              break
            }
          }
          // 车辆在线状态
          switch (Number(item.currOnlineCount)) {
            case 0:
              item.icon = '/static/images/car_offline_icon.png'
              break
            case 1:
              item.icon = '/static/images/car_online_icon.png'
              break
          }
          // 设置提示title
          item.title = item.name
        }
        // 编辑子数组  新的接口无车队
        if (item.children) {
          this.handleData(item.children, isHandCollect)
        }
      })
    },
    // 初始化树
    initTree() {
      // 树形结构
      // this.treeObj = $.fn.zTree.init($('#fleetTreeVideo'), this.setting, this.treeData)
      // 如果有多选框，当刷新时，显示之前已选中节点
      this.refreshDataChecked()
      // 获取节点json转换成数组
      this.allNodes = this.treeObj.transformToArray(this.treeData)
      this.$emit('result', this.treeObj)
    },
    // 当刷新时，显示之前已选中节点 因为guid是动态生成，树节点初始化自动生成tId作为唯一标示
    refreshDataChecked() {
      if (this.checkNodeList.length) {
        this.checkNodeList.forEach(item => {
          const node = this.treeObj.getNodeByParam('tId', item.tId, null)
          this.treeObj.selectNode(node)
        })
      }
      // 如果页面传递gprscode,默认选中节点
      if (this.gprscode) {
        const nodes = this.treeObj.getNodeByParam('terminalNumber', this.gprscode, null)
        this.treeObj.selectNode(nodes)
      }
    },
    // 搜索车队
    remoteMethod(val) {
      this.loading = true
      this.searchCarList = []
      if (val) {
        this.allNodes.forEach(item => {
          if (item.plateNo) {
            let boolean1 = false
            let boolean2 = false
            if (item.terminalNumber) boolean1 = item.terminalNumber.includes(val)
            if (item.terminalPhone) boolean2 = item.terminalPhone.includes(val)
            if (item.plateNo.includes(val) || boolean1 || boolean2) {
              if (this.searchCarList.length) {
                // 如果已存在对象就不添加到数组
                this.searchCarList.some(item2 => item2.id === item.id) || this.searchCarList.push(item)
              } else {
                this.searchCarList.push(item)
              }
            }
          }
        })
      }
      this.loading = false
    },
    // 选择搜索出来的车牌
    selectSearch(guid) {
      if (guid) {
        // 获取选中下拉列的节点
        const node = this.treeObj.getNodesByParam('guid', guid, null)
        this.treeObj.selectNode(node[0])
        this.onClickTree('', '', node[0])
      }
    },
    // 选中节点名称
    async onClickTree(event, treeId, treeNode) {
      treeNode.children = treeNode.children || []
      // 双击车辆节点打开视频
      if (treeNode.terminalNumber && treeNode.children.length) {
        const res = await this.getVCamQuery(treeNode.terminalNumber)
        this.handlePassagewayData(res, treeNode)
      } else {
        // 点击通道节点
        if (treeNode.src) {
          this.$emit('getPassagewayData', [treeNode])
        } else {
          this.treeObj.expandNode(treeNode)
        }
      }
    },
    // 摄像机查询
    async getVCamQuery(sim) {
      // if (!sim) return
      // const payload = {
      //   sim: sim
      // }
      // const query = await queryRealVideo(payload)
      // if (query.code === '0' && query.data.length > 0) {
      //   return query
      // } else {
      //   let msg = query.message
      //   if (msg === '' || msg === 'null') msg = '未查找到视频记录'
      //   this.$Notice.warning({ title: msg })
      //   return []
      // }
    },
    // 节点异步加载返回数据处理
    filter(treeId, parentNode, res) {
      return this.handlePassagewayData(res, parentNode)
    },
    // 处理通道数据
    handlePassagewayData(res, parentNode) {
      // 如果是实时视频关闭所有视频
      if (this.type === 'video1') this.$emit('closeAllVideo')
      res.data = res.data || []
      if (res.data.length) {
        res.data.forEach(item => {
          let name = ''
          if (item.ChannelName) name = item.ChannelName
          else name = '通道' + item.ChannelNo
          item.name = name
          item.icon = '/static/images/video_play_icon.png'
          // item.passageway = item.ChannelNo;
          item.terminalNumber = parentNode.terminalNumber
          item.vehicleId = parentNode.id
          item.plateNo = parentNode.plateNo
          item.channelNo = item.ChannelNo
          item.src = item.FlvUrl
        })
        setTimeout(() => {
          this.$emit('getPassagewayData', res.data)
        }, 300)
        // 如果未添加子节点，返回节点
        if (!parentNode.children.length) return res.data
      } else {
        this.$Notice.error({ title: '此车无视频通道' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .spin {
  background: transparent;
  .loader {
    text-align: center;
    img {
      width: 55%;
    }
  }
}
/deep/.digit {
  font-size: 125%;
}
.left-panel-item {
  position: relative;
  height: 35%;
  .hd {
    height: 18px;
    line-height: 18px;
    padding-left: 42px;
    font-size: 12px;
    font-weight: bold;
    color: #3de6b1;
    background: url("../../../../../static/images/taskProgress/hd_arrow.png") 18px center
      no-repeat;
    background-size: auto 9px;
  }
  .bd {
    position: relative;
    height: 90%;
    margin-top: 2.4%;
    // 数据看板
    .item-content {
      // width: 1.64rem;
      height: 50%;
      padding: 0 5% 8% 3%;
      line-height: 280%;
      .title {
        font-size: 2%;
        color: #fff;
        height: 19%;
        .icon {
          height: 100%;
          margin: 0;
        }
        ul.icon {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          li {
            width: 4px;
            height: 12px;
            list-style: none;
            margin-left: 4px;
            background-color: #71ffd5;
            transform: skewX(-22deg);
            &:last-child {
              margin-right: 0;
            }
          }
          h3 {
            margin: 0;
            margin-left: 4.5%;
            font-size: 12px;
          }
          &.icon2 li {
            background-color: #9eec2f;
          }
          &.icon3 li {
            background-color: #f2e738;
          }
          &.icon4 li {
            background-color: #ff7e00;
          }
        }
      }
      .content {
        .content-info {
          position: relative;
          display: flex;
          color: #0febff;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid #0febff;
          // margin: 0.06rem 0;
          padding-bottom: 3.3%;
          .value {
            height: 32px !important;
            font-size: 210%;
            /deep/ .ctnr:last-child {
              width: 0;
            }
          }
          .unit {
            font-size: 10px;
            line-height: 100%;
          }
        }
        .vice-info {
          font-size: 100%;
          // transform: scale(0.8);
          ul {
            padding-left: 0;
            margin: 2% 0;
          }
          ul li {
            color: #00d5e9;
            list-style: square;
            list-style-position: inside;
            text-align: left;
            line-height: 170%;
            width: 100%;
            &:last-child {
              color: rgba(83, 254, 192, 1);
              // 高亮内容
              .hl {
                color: rgba(83, 254, 192, 1);
              }
            }
            span {
              color: #fff;
            }
          }
        }
      }
    }
    // 车型能耗排行
    .car-type {
      text-align: right;
      margin: 0.06rem 0.16rem 0;
      // transform: scale(0.9);
      a {
        display: inline-block;
        width: 0.38rem;
        height: 0.22rem;
        line-height: 0.2rem;
        text-align: center;
        color: rgba(17, 237, 255, 1);
        border: 1px solid rgba(17, 237, 255, 1);
        &:first-child {
          margin-right: 0.08rem;
        }
        &.cur {
          color: #ffffff;
          border: 1px solid rgba(0, 189, 207, 1);
          background: rgba(0, 189, 207, 1);
        }
      }
    }
    .bd-chart {
      height: 1.58rem;
    }
  }
}
</style>
<template>
  <div class="left-panel-item">
    <div class="hd">数据看板</div>
    <div v-if="spinShow" fix class="spin">
      <div class="loader"><img src="../../../../../static/images/taskProgress/loading-black.gif"></div>
    </div>
    <el-row v-else class="bd">
      <el-col :span="12" class="item-content">
        <div class="title">
          <ul class="icon">
            <li/>
            <li/>
            <h3>累计总油耗</h3>
          </ul>
        </div>
        <div class="content">
          <div class="content-info">
            <span class="value"/>
            <span class="unit">万L</span>
          </div>
          <div class="vice-info">
            <ul>
              <li><span>所有设备累计总油耗</span></li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="item-content">
        <div class="title">
          <ul class="icon icon2">
            <li/>
            <li/>
            <h3>累计总里程</h3>
          </ul>
        </div>
        <div class="content">
          <div class="content-info">
            <span class="value"/>
            <span class="unit">万km</span>
          </div>
          <div class="vice-info">
            <ul>
              <li><span>累计设备行驶总里程</span></li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="item-content">
        <div class="title">
          <ul class="icon icon3">
            <li/>
            <li/>
            <h3>在线设备数</h3>
          </ul>
        </div>
        <div class="content">
          <div class="content-info">
            <span class="value"/>
            <span class="unit">万辆</span>
          </div>
          <div class="vice-info">
            <ul>
              <li><span>工作中的设备数量</span></li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="item-content">
        <div class="title">
          <ul class="icon icon4">
            <li/>
            <li/>
            <h3>累计开采总方量</h3>
          </ul>
        </div>
        <div class="content">
          <div class="content-info">
            <span class="value"/>
            <span class="unit">方量</span>
          </div>
          <div class="vice-info">
            <ul>
              <li><span>所有矿区累计开采总量</span></li>
              <!-- <li><span>相当于上海市<span class="hl">78%</span>的面积</span></li> -->
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Flip } from 'number-flip'
// import { on } from '@/libs/nav';
export default {
  name: 'DataBoard',
  data() {
    return {
      spinShow: true,
      flip1: null,
      flip2: null,
      flip3: null,
      flip4: null
    }
  },
  mounted() {},
  created() {
    setTimeout(() => {
      this.spinShow = false
      this.$nextTick(() => {
        this.animationNum()
        // on(window, 'resize', this.resize)
      })
    }, 1500)
  },
  methods: {
    // 获取数据
    animationNum() {
      const $JQ = document.querySelectorAll.bind(document)
      const valueArry = $JQ('.value')
      this.flip1 = new Flip({
        node: valueArry[0],
        from: 0,
        to: 31236,
        separator: '.',
        delay: 0.5,
        duration: 1.4
      })
      this.flip2 = new Flip({
        node: valueArry[1],
        from: 0,
        to: 48610,
        separator: '.',
        delay: 0.5,
        duration: 1.4
      })
      this.flip3 = new Flip({
        node: valueArry[2],
        from: 0,
        to: 13265,
        separator: '.',
        delay: 0.5,
        duration: 1.4
      })
      this.flip4 = new Flip({
        node: valueArry[3],
        from: 0,
        to: 34610,
        separator: '.',
        delay: 0.5,
        duration: 1.4
      })
    },
    // 窗口尺寸变化，重置flip内容
    resize() {
      this.flip1._initHTML(0, 31236)
      this.flip2._initHTML(0, 48610)
      this.flip3._initHTML(0, 12236)
      this.flip4._initHTML(0, 34610)
    }
  }
}
</script>

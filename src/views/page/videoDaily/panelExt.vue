<style lang="scss" scoped>
    // 结构样式
    .main-group {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .main-group.main-group1 {
        .left-panel, .left-right-ext {
            display: none;
        }
        .right-panel {
            margin-left: 0;
        }
    }
    .main-panel {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 10px;
        .left-panel {
            overflow: auto;
            float: left;
            width: 330px;
            height: 100%;
            border: 1px solid #ccc;
        }
        .left-right-ext {
            position: absolute;
            left: 340px;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 80px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 10px solid #8898a5;
            text-align: center;
            line-height: 68px;
            // transition: all .3s;
            z-index: 9;
            cursor: pointer;
            .ext-opt{
                color: #fff;
                margin-left: 0px;
            }
        }
        .right-panel {
            position: relative;
            margin-left: 340px;
            height: 100%;
            .right-top-panel {
                width:100%;
                height: calc(70% - 10px);
                border: 1px solid #ccc;
            }
            .right-bottom-panel {
                overflow: hidden;
                margin-top: 10px;
                width: 100%;
                height: 30%;
                // height: 50%;
                background-color: #fff;
                border: 1px solid #ccc;
            }
            .top-bottom-ext {
                position: absolute;
                width: 160px;
                bottom: 30%;
                font-size: 0;
                left: 10px;
                right: 10px;
                margin: 0 auto;
                text-align: center;
                z-index: 2;
                .bottom-ext {
                    display: inline-block;
                    width: 80px;
                    height: 10px;
                    vertical-align: middle;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 10px solid #8898a5;
                    color: #fff;
                    cursor: pointer;
                    .ext-opt {
                        margin-top: -12px;
                    }
                }
                .top-ext {
                    color: #fff;
                    display: inline-block;
                    width: 80px;
                    height: 10px;
                    // line-height: 10px;
                    vertical-align: middle;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 10px solid #8898a5;
                    cursor: pointer;
                    .ext-opt {
                        margin-top: 1px;
                    }
                }
            }
        }
        .right-panel.right-panel2 {
            .right-top-panel {
                height: 100%;
            }
            .top-bottom-ext {
                display: none;
            }
            .right-bottom-panel {
                display: none;
            }
        }
    }
  // 左侧面板关闭
  .main-panel.chevron-right {
    .left-panel {
      display: none;
    }
    .left-right-ext {
      left: 10px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 10px solid #8898a5;
      border-right: none;
      .ext-opt{
        color: #fff;
        margin-left: -10px;
        widows: 0.7em;
      }
    }
    .right-panel {
      margin-left: 0;
    }
  }
  // 下面面板关闭
  .main-panel.chevron-up {
    .right-panel {
      .right-bottom-panel {
        display: none;
      }
      .top-bottom-ext {
        bottom: 0;
        .bottom-ext {
          border-top: 10px solid  transparent;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #8898a5;
          .ext-opt {
            margin-top: 1px;
          }
        }
        .top-ext {
          display: none;
        }
      }
      .right-top-panel {
        height: 100%;
      }
    }
  }
  // 上面面板关闭
  .main-panel.chevron-down {
    .right-panel {
      .right-top-panel {
        display: none;
      }
      .top-bottom-ext {
        top: 0;
        .bottom-ext {
          display: none;
        }
        .top-ext {
          border-top: 10px solid #8898a5;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid transparent;
          .ext-opt {
            margin-top: -8px;
          }
        }
      }
      .right-bottom-panel {
        margin: 0;
        height: 100%;
      }
    }
  }
  .svg-icon {
    width: 0.8em;
  }
  .chevron-right {
    .svg-icon {
      margin-left: -11px;
    }
  }
</style>

<template>
  <div :class="'main-group' + layout" class="main-group">
    <div :class="active" class="main-panel clearfix">
      <div class="left-panel">
        <slot name="left-panel"/>
      </div>
      <div class="left-right-ext" @click="handleExt('chevron-right')">
        <!-- <Icon :type="horiIcon" class="ext-opt" /> -->
        <svg-icon :icon-class="horiIcon" class="ext-opt"/>
      </div>
      <div :class="'right-panel' + layout" class="right-panel">
        <div class="right-top-panel">
          <slot name="right-top-panel"/>
        </div>
        <div class="top-bottom-ext">
          <div class="bottom-ext" @click="handleExt('chevron-up')">
            <!-- <Icon :type="vertIcon1" size="10" class="ext-opt" /> -->
            <svg-icon :icon-class="vertIcon1" class="ext-opt"/>
          </div>
          <div class="top-ext" @click="handleExt('chevron-down')">
            <!-- <Icon :type="vertIcon2" size="10" class="ext-opt" /> -->
            <svg-icon :icon-class="vertIcon2" class="ext-opt"/>
          </div>
        </div>
        <div class="right-bottom-panel">
          <slot name="right-bottom-panel"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PanelExt',
  props: {
    layout: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      extActive: [],
      horiIcon: 'chevron-left',
      vertIcon1: 'chevron-down',
      vertIcon2: 'chevron-up'
    }
  },
  computed: {
    active() {
      return this.extActive.join(' ')
    }
  },
  methods: {
    handleExt(opt) {
      // 判断是否添加样式
      console.log(this.extActive, opt)
      if (this.extActive.includes(opt)) {
        this.extActive = []
      } else {
        this.extActive.push(opt)
      }
      this.$emit('click', this.extActive)
      // 切换对于按钮箭头
      switch (opt) {
        case 'chevron-right':
          this.horiIcon = this.horiIcon === 'chevron-left' ? 'chevron-right' : 'chevron-left'
          break
        case 'chevron-up':
          this.vertIcon1 = this.vertIcon1 === 'chevron-up' ? 'chevron-down' : 'chevron-up'
          break
        case 'chevron-down':
          this.vertIcon2 = this.vertIcon2 === 'chevron-down' ? 'chevron-up' : 'chevron-down'
          break
      }
    }
  }
}
</script>

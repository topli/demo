<template>
  <!-- IconBtn -->
  <transition name="">
    <div
      v-btn-auth="authCode"
      style="display: inline-block">
      <el-tooltip
        :content="content"
        :open-delay="500"
        placement="bottom">
        <div
          :class="classs"
          :style="styles"
          class="newIconBtn"
          @click="clickBtn($event)"
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave">
          <svg-icon :icon-class="icon" />
        </div>
      </el-tooltip>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '14'
    },
    color: {
      type: String,
      default: ''
    },
    authCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mouseSelect: false
    }
  },
  computed: {
    classs() {
      if (this.mouseSelect) return 'btn-is-focus'
      return ''
    },
    styles() {
      var style = { fontSize: this.size + 'px', background: this.color, color: this.color ? 'white' : '' }
      return style
    }
  },
  methods: {
    clickBtn($event) {
      this.$emit('click', $event)
    },
    mouseEnter() {
      this.mouseSelect = true
    },
    mouseLeave() {
      this.mouseSelect = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn-is-focus {
  color: #409eff !important;
  border: 1px solid #409eff !important;
}

.newIconBtn {
  background: #E8EAE8;
  margin-left: 5px;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid #f0f0f0;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0px 3px;
  font-size: 12px;
  border-radius: 4px;
  -webkit-transition: color 0.2s linear, border 0.2s linear,
    background-color 0.2s linear, border 0.2s linear,
    -webkit-box-shadow 0.2s linear;
  transition: color 0.2s linear, border 0.2s linear,
    background-color 0.2s linear, border 0.2s linear, box-shadow 0.2s linear,
    -webkit-box-shadow 0.2s linear;
  color: #495060;
}
</style>

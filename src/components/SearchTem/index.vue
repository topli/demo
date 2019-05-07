<template>
  <!-- list search template -->
  <div class="search-tem">
    <div :style="style" class="search-form">
      <slot/>
    </div>
    <div :style="btnStyle" class="search-btn">
      <slot name="btn">
        <div class="btn-box">
          <el-button v-if="showMore" :icon="toggleFromIcon" type="text" @click="openSearchFun">{{ text }}</el-button>
          <el-button class="sub-btn" type="primary" round @click="onSearch">
            <svg-icon icon-class="search"/>
            <span> {{ $t('app.search') }}</span>
          </el-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paddingRight: {
      type: String,
      default: '135'
    }
  },
  data() {
    return {
      formHeight: 0,
      toggleOpen: false
    }
  },
  computed: {
    showMore() {
      return this.formHeight > 60
    },
    style() {
      const defStyle = { paddingRight: this.paddingRight + 'px' }
      if (this.toggleOpen) {
        defStyle.height = this.formHeight + 'px'
      } else {
        defStyle.height = '50px'
      }
      return defStyle
    },
    btnStyle() {
      const defStyle = { width: this.paddingRight + 'px' }
      return defStyle
    },
    toggleFromIcon() {
      return this.toggleOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    text() {
      return this.toggleOpen ? '收起' : '更多'
    }
  },
  created() {
  },
  mounted() {
    this.getFormHeight()
    window.addEventListener('resize', this.getFormHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getFormHeight)
  },
  methods: {
    getFormHeight() {
      if (this.$slots.default && this.$slots.default[0]) {
        this.formHeight = this.$slots.default[0].elm.clientHeight
      } else {
        this.formHeight = 58
      }
    },
    openSearchFun() {
      this.toggleOpen = !this.toggleOpen
      this.$nextTick(() => {
        var myEvent = new Event('resize')
        window.dispatchEvent(myEvent)
      })
    },
    onSearch() {
      this.$emit('on-search')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .search-tem {
    position: relative;
    width: 100%;
  }
  .search-form {
    min-width: 135px;
    width: 100%;
    overflow: hidden;
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
  }

  .search-btn {
    position: absolute;
    top: 0;
    right: 10px;
    .btn-box {
      text-align: right;
    }
    .sub-btn {
      span {
        transition: width 0.6s ease, opacity 0.6s cubic-bezier(0.42, 0, 0, 1);
        -moz-transition: width 0.6s ease, opacity 0.6s cubic-bezier(0.42, 0, 0, 1); /* Firefox 4 */
        -webkit-transition: width 0.6s ease, opacity 0.6s cubic-bezier(0.42, 0, 0, 1); /* Safari 和 Chrome */
        -o-transition: width 0.6s ease, opacity 0.6s cubic-bezier(0.42, 0, 0, 1); /* Opera */
        display: inline-block;
        width: 0px;
        opacity: 0;
      }
    }
    .sub-btn:hover {
      span {
        width: 27px;
        opacity: 1;
      }
    }
  }
</style>

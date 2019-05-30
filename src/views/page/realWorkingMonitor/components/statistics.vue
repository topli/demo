<!--  -->
<template>
  <el-card class="statistics">
    <el-row :gutter="20">
      <el-col :span="24" style="text-align: center">
        <div :style="{color: color}" class="statistics-left">
          <svg-icon :icon-class="icon" class="statistics-icon"/>
        </div>
        <div class="statistics-right">
          <div class="statistics-number">
            <countTo :start-val="startVal" :end-val="endVal" :duration="2000" style="font-weight: 700;font-size:18px"/><span>{{ unit }}</span>
          </div>
          <div>
            {{ title }}
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import countTo from 'vue-count-to'
export default {
  components: { countTo },
  props: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      startVal: 0,
      endVal: 0
    }
  },
  computed: {
    style() {
      return {
        color: this.color
      }
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.endVal = this.number
    }, 500)
  },
  // 方法集合
  methods: {
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.statistics{
  cursor: pointer;
  min-width: 220px;
  overflow: hidden;
  &-left {
    display: inline-block;
    border: 2px solid;
    border-radius: 50%;
    margin-right: 10px;
  }
  &-icon{
    font-size: 2rem;
    margin: 10px;
  }
  &-right{
    display: inline-block;
    vertical-align: super;
    text-align: left;
    font-size: 16px;
  }
  &-number{
    margin-bottom: 3px;
  }
}
</style>

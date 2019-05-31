<!--  -->
<template>
  <el-card class="statistics">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align:center">
        <div :style="style" class="statistics-icon">
          <svg-icon :icon-class="icon"/>
          <slot/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="statistics-number">
          <div class="statistics-title">
            {{ title }}
          </div>
          <countTo :start-val="startVal" :end-val="endVal" :duration="2000"/>
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
  margin: 10px 0;
  &-icon{
    font-size: 55px;
    padding: 20px 10px;
    // display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  &-number{
    height: 100px;
    display: table-cell;
    vertical-align: middle;
  }
  &-title {
    padding: 10px 0;
    color: rgba(0,0,0,.45);
  }
}
.statistics:hover{
  .statistics-icon{
    padding: 15px 0px 16px 0px;
    font-size: 63px
  }
}
</style>

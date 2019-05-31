<!--  -->
<template>
  <el-card class="statistics">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align:center;margin-top: 10px;">
        <div :style="style" class="statistics-icon">
          <svg-icon :icon-class="icon"/>
          <slot/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="statistics-number">
          <countTo :start-val="startVal" :end-val="endVal" :duration="2000"/>
          <div class="statistics-title">
            {{ title }}
          </div>

          <!-- <ul>
            <li v-for="(item, index) in 2" :key="index">
              <span v-for="(num, index) in numArray" :key="index">{{ num }}</span>
            </li>
          </ul> -->
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
      endVal: 0,
      numArray: []
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
    initPage() {
      this.numArray = String(this.number).split('')
      this.numArray.map(item => {
        item = Number(item)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.el-card__body {
  padding: 12px 20px;
}
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
  ul {
    li {
      list-style: none;
    }
  }
  .statistics-number {
    div {
      font-size: 14px;
      color: #7e8b9d;
    }
    span {
      font-size: 28px;
      color: #0f1010;
    }
  }
}
.statistics {
  .statistics-icon{
    padding: 15px 0px 16px 0px;
    font-size: 40px
  }
}
.statistics:hover{
  .statistics-icon{
    padding: 15px 0px 16px 0px;
    font-size: 45px
  }
}
</style>

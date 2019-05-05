<template>
  <div class="export-template">
    <div class="export-body">
      <el-radio v-model="radio" label="1">当前页导出</el-radio>
      <el-radio v-model="radio" label="2">按条件导出</el-radio>
    </div>
    <div class="export-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button type="ghost" @click="onClose">取消</el-button> <!-- onClose 内置关闭弹出层方法 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      radio: '1'
    }
  },
  methods: {
    submit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.onSub()
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .export-template {
    .export-body{
      z-index:1
    }
    .export-footer{
      padding: 20px 0 0 0;
      text-align: right;
    }
  }
</style>

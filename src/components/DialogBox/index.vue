<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    :width="width"
    center
    @close="onClose">
    <div id="dialog-box"/>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      visible: true,
      title: '',
      width: '50%'
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      if (!this.components) {
        console.error('components are not in parameters')
        return
      }
      // 挂载内容
      const Components = Vue.extend(this.components)
      const vm = new Components({ propsData: this.props, data: { onSub: this.onSub, onClose: this.onClose }, store: this.$store, router: this.$router })
      vm.$mount('#dialog-box')
    })
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  methods: {}
}
</script>

<style scoped>

</style>

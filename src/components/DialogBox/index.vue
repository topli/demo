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
      width: '50%',
      doms: null
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
      this.doms = new Components({ propsData: this.props, data: { onSub: this.onSub, onClose: this.onClose }, parent: this })
      this.doms.$mount('#dialog-box')
    })
  },
  beforeDestroy() {
    // 销毁挂载的内容
    this.doms.$destroy()
  },
  methods: {}
}
</script>

<style scoped>

</style>

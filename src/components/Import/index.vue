<template>
  <div v-loading="actionLoading" class="import-template">
    <div class="import-body">
      <el-input
        v-model="file.name"
        type="text"
        clearable
        @blur="handleBlur"
        @clear="clearFile">
        <el-upload
          slot="append"
          ref="upload"
          :show-file-list="false"
          :on-change="handleChange"
          :auto-upload="false"
          :multiple="false"
          action="#">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-input>
    </div>
    <div class="import-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="onClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import loading from '@/libs/mixins/loading'

export default {
  mixins: [loading],
  props: {
    fileType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: {}
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    handleBlur() {
      if (!this.file.name) this.file = { name: '' }
    },
    clearFile() {
      this.file = {
        name: ''
      }
    },
    handleChange(file) {
      this.file = file || {}
    },
    // 提交按钮
    submit() {
      console.log(this.file)
      this.$store.dispatch('setAL', true)
      setTimeout(() => {
        this.$message.success('成功')
        setTimeout(() => {
          this.$store.dispatch('setAL', false)
          // 执行操作后隐藏弹出框
          this.onSub()
        }, 300)
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .import-template {
    .import-footer {
      padding: 20px 0 0 0;
      text-align: right;
    }
  }
</style>

<template>
  <div v-loading="loading" class="import-template">
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
          <el-button slot="trigger" size="small" type="primary">{{ $t('app.selectFile') }}</el-button>
        </el-upload>
      </el-input>
    </div>
    <div class="import-footer">
      <el-button type="primary" @click="submit">{{ $t('app.submit') }}</el-button>
      <el-button @click="onClose">{{ $t('app.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    fileType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: {},
      loading: false
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
      if (!this.file.uid) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.$message.success(this.$t('app.import') + this.$t('app.success'))
        setTimeout(() => {
          this.loading = false
          // 执行操作后隐藏弹出框
          this.onSub()
        }, 300)
      }, 2000)
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

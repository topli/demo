<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('dict.label')" prop="label">
          <el-input v-model="form.label"/>
        </el-form-item>
        <el-form-item :label="$t('dict.value')" prop="value">
          <el-input v-model.number="form.value"/>
        </el-form-item>
        <el-form-item :label="$t('dict.group')">
          <el-input v-model="form.group"/>
        </el-form-item>
        <el-form-item :label="$t('dict.color')">
          <el-color-picker v-model="form.color" show-alpha size="mini" style="width: 187px"/>
        </el-form-item>
        <!-- <el-form-item label="所属组织">
          <org-tree v-model="form.org"/>
        </el-form-item> -->
        <el-form-item label="启用/禁用">
          <el-switch v-model="form.status"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="aou-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="onClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { addData, editData } from './service'
export default {
  props: {
    data: { type: Object, default: null }
  },
  data() {
    return {
      form: this.data ? Object.assign({}, this.data) : {},
      loading: false,
      rules: {
        label: [
          { required: true, message: this.$t('dict.labelError') }
        ]
      }
    }
  },
  computed: {
  },
  methods: {
    // 提交按钮
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 验证通过
          if (this.form.id) {
            this.edit()
          } else {
            this.add()
          }
        }
      })
    },
    // 处理动作
    add() {
      this.loading = true
      this.form.createTime = new Date()
      this.form.id = Math.random() * 1000
      this.form.status = !!this.form.status
      this.form.color = this.form.color ? this.form.color : 'rgba(0, 123, 255, 1)'
      addData(this.form).then(() => {
        setTimeout(() => {
          this.loading = false
          this.$message.success(this.$t('app.add') + this.$t('app.success'))
          this.$store.dispatch('SetDictData')
          // 执行操作后隐藏弹出框
          this.onSub()
        }, 1000)
      }).catch(error => {
        setTimeout(() => {
          this.loading = false
          console.log(error)
        }, 300)
      })
    },
    edit() {
      this.loading = true
      editData(this.form).then(() => {
        setTimeout(() => {
          this.loading = false
          this.$message.success(this.$t('app.modify') + this.$t('app.success'))
          this.$store.dispatch('SetDictData')
          // 执行操作后隐藏弹出框
          this.onSub()
        }, 1000)
      }).catch(error => {
        setTimeout(() => {
          this.loading = false
          console.log(error)
        }, 300)
      })
    }
  }
}
</script>

<style scoped>

</style>

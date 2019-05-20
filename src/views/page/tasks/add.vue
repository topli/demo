<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('tasks.name')">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.org')">
          <org-tree v-model="form.org"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.level')">
          <select-remote v-model="form.level" filterable clearable data-type="taskLevel"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.enclosure')" prop="enclosure">
          <el-input v-model="form.enclosure"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.goods')" prop="goods">
          <el-input v-model="form.goods"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receiving')" prop="receiving">
          <el-input v-model="form.receiving"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receivingMode')" prop="receivingMode">
          <el-input v-model="form.receivingMode"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receivingPerson')" prop="receivingPerson">
          <el-input v-model="form.receivingPerson"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receivingPhone')" prop="receivingPhone">
          <el-input v-model="form.receivingPhone"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.expiryDate')" prop="expiryDate">
          <el-input v-model="form.expiryDate"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.number')" prop="number">
          <el-input v-model="form.number"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.isRemind')" prop="isRemind">
          <el-switch v-model="form.isRemind"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="aou-footer">
      <el-button type="primary" @click="submit">{{ $t('app.submit') }}</el-button>
      <el-button @click="onClose">{{ $t('app.cancel') }}</el-button>
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
      addData(this.form).then(() => {
        setTimeout(() => {
          this.loading = false
          this.$message.success(this.$t('app.add') + this.$t('app.success'))
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

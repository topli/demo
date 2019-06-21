<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('user.username')" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item :label="$t('user.age')" prop="age">
          <el-input v-model.number="form.age"/>
        </el-form-item>
        <el-form-item :label="$t('user.sex')">
          <select-remote v-model="form.sex" filterable clearable data-type="sex"/>
        </el-form-item>
        <el-form-item :label="$t('user.orgName')" prop="orgName">
          <el-input v-model="form.orgName"/>
        </el-form-item>
        <el-form-item :label="$t('user.roleName')" prop="roleName">
          <el-input v-model="form.roleName"/>
        </el-form-item>
        <el-form-item :label="$t('user.jobName')" prop="jobName">
          <el-input v-model="form.jobName"/>
        </el-form-item>
        <el-form-item :label="$t('user.jobLevel')" prop="jobLevel">
          <el-input v-model="form.jobLevel"/>
        </el-form-item>
        <el-form-item :label="$t('user.isWork')" prop="isWork">
          <el-switch v-model="form.isWork"/>
        </el-form-item>
        <!-- <el-form-item label="所属组织">
          <org-tree v-model="form.org"/>
        </el-form-item> -->
        <el-form-item :label="$t('user.status')">
          <el-switch v-model="form.status"/>
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
        username: [
          { required: true, message: this.$t('user.usernameError') }
        ],
        age: [
          { required: true, message: this.$t('user.ageError') },
          { type: 'number', min: 1, message: this.$t('user.ageNumberError') }
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

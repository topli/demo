<template>

  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="100px">
        <el-form-item :label="$t('org.orgName')" prop="orgName">
          <el-input v-model="form.orgName"/>
        </el-form-item>
        <el-form-item :label="$t('org.code')" prop="code">
          <el-input v-model="form.code"/>
        </el-form-item>
        <el-form-item :label="$t('org.linkman')" prop="linkman">
          <el-input v-model="form.linkman"/>
        </el-form-item>
        <el-form-item :label="$t('org.phone')" prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item :label="$t('org.parent')" prop="parentName">
          <el-input v-model="form.parentName" disabled/>
          <el-input v-show="false" v-model="form.parentId"/>
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
          { type: 'number', min: 0, max: 120, message: this.$t('user.ageNumberError') }
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

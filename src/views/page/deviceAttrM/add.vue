<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('device.number')" prop="number">
          <el-input v-model="form.number"/>
        </el-form-item>
        <el-form-item :label="$t('device.model')">
          <select-remote v-model="form.model" filterable clearable data-type="deviceType"/>
        </el-form-item>
        <el-form-item :label="$t('device.usePerson')" prop="usePerson">
          <el-input v-model="form.usePerson"/>
        </el-form-item>
        <el-form-item :label="$t('device.orgName')">
          <org-tree v-model="form.orgId" :label="form.orgName" clearable @getTreeNode="getTree"/>
        </el-form-item>
        <el-form-item :label="$t('device.useStatus')" prop="useStatus">
          <select-remote v-model="form.useStatus" filterable clearable data-type="isUse"/>
        </el-form-item>
        <el-form-item :label="$t('device.available')" prop="available">
          <select-remote v-model="form.available" filterable clearable data-type="available"/>
        </el-form-item>
        <el-form-item :label="$t('device.status')">
          <select-remote v-model="form.status" filterable clearable data-type="status"/>
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
        number: [
          { required: true, message: this.$t('device.numberRequiredError') }
        ]
      }
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
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
      console.log(this.form)
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
    },
    getTree(treeNode) {
      if (!treeNode.length) return
      this.$set(this.form, 'orgName', treeNode[0].orgName)
    }
  }
}
</script>

<style scoped>

</style>

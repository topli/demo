<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('menu.type')" prop="roleName" style="width: 100%">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('menu.name')">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item :label="$t('menu.level')">
          <el-input v-model="form.level"/>
        </el-form-item>
        <el-form-item :label="$t('menu.order')">
          <el-input v-model="form.order"/>
        </el-form-item>
        <el-form-item :label="$t('menu.path')">
          <el-input v-model="form.path" disabled/>
        </el-form-item>
        <el-form-item :label="$t('menu.identification')">
          <el-input v-model="form.identification" disabled/>
        </el-form-item>
        <el-form-item :label="$t('menu.status')">
          <el-switch
            v-model="form.status"/>
        </el-form-item>
        <el-form-item :label="$t('menu.linkType')">
          <!-- <el-input v-model="form.linkType"/> -->
          <select-remote v-model="form.linkType" filterable clearable data-type="linkType"/>
        </el-form-item>
        <el-form-item :label="$t('menu.remark')" style="width: 100%">
          <el-input v-model="form.remark" :autosize="{ minRows: 2}" type="textarea"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="aou-footer">
      <el-button type="primary" @click="submit"> {{ $t('app.submit') }}</el-button>
      <el-button @click="onClose"> {{ $t('app.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
import { addData, editData } from './service'
export default {
  props: {
    data: { type: Object, default: () => { return {} } }
  },
  data() {
    return {
      form: this.data ? Object.assign({}, this.data) : {},
      loading: false,
      rules: {
      },
      menuList: [
      ]
    }
  },
  computed: {
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
      delete this.form.child
      delete this.form.parent
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
  .form-tree {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 4px;
    width:200px;
    height: 200px;
    overflow: auto;
  }
</style>

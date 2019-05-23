<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('tasks.name')" style="width: 100%">
          <!-- <el-input v-model="form.name"/> -->
          {{ form.name }}
        </el-form-item>
        <el-form-item :label="$t('tasks.examine')">
          <select-remote v-model="form.examine" filterable clearable data-type="examineType"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.isRemind')">
          <select-remote v-model="form.isRemind" filterable clearable data-type="isRemindType"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.pushDate')">
          <select-remote v-model="form.pushDate" filterable clearable data-type="pushDateType"/>
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
import dispatch from './dispatch'
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
  mounted() {
    this.$set(this.form, 'examine', 1)
    this.$set(this.form, 'isRemind', 1)
    this.$set(this.form, 'pushDate', 1)
  },
  methods: {
    // 提交按钮
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 验证通过
          this.$message.success('审核通过')
          this.$dialogBox({
            title: this.$t('app.dispatch'),
            components: dispatch,
            width: 750,
            props: { data: this.form },
            onSub: (el) => {
              // 新增完成后执行操作
              // todo 刷新列表
              this.onSub()
            }
          })
          this.onSub()
          // if (this.form.id) {
          //   this.edit()
          // } else {
          //   this.add()
          // }
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

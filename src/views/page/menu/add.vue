<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex">
            <el-option :value="1" label="男"/>
            <el-option :value="2" label="女"/>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属组织">
          <org-tree v-model="form.org"/>
        </el-form-item> -->
        <el-form-item label="启用/禁用">
          <el-switch v-model="form.delivery"/>
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
        username: [
          { required: true, message: '姓名不能为空' }
        ],
        age: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
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
          this.$message.success('成功')
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
          this.$message.success('成功')
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

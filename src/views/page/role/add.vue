<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('role.roleName')" prop="roleName">
          <el-input v-model="form.roleName"/>
        </el-form-item>
        <el-form-item :label="$t('role.roles')" prop="roles">
          <el-tree ref="roles" :data="menuList" :default-checked-keys="form.rolesArray" node-key="id" class="form-tree" show-checkbox @check="treeChange"/>
          <el-input v-model="form.roles" style="display: none"/>
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
        roleName: [
          { required: true, message: this.$t('role.roleNameError') }
        ],
        roles: [
          { required: true, message: this.$t('role.rolesError') }
        ]
      },
      menuList: [
        { label: '用户中心', id: 1, children: [
          { label: '用户管理', id: 11 },
          { label: '组织管理', id: 12 },
          { label: '角色管理', id: 13 }
        ] }
      ]
    }
  },
  computed: {
  },
  mounted() {
    if (this.form.id) {
      this.$set(this.form, 'rolesArray', this.form.roles.split(','))
    }
  },
  methods: {
    treeChange(current, { checkedKeys }) {
      this.$set(this.form, 'roles', checkedKeys.toString())
    },
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
  .form-tree {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 4px;
    width:200px;
    height: 200px;
    overflow: auto;
  }
</style>

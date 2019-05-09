<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('role.roleName')">
          <!-- <el-input v-model="form.roleName"/> -->
          {{ form.roleName }}
        </el-form-item>
        <el-form-item :label="$t('role.userSelected')">
          <el-transfer
            v-model="form.users"
            :titles="[$t('role.dataSource'), $t('role.selected')]"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :filter-method="filterMethod"
            :render-content="renderContent"
            :data="data1"
            filterable
            @change="handleChange"/>
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
import { editData } from './service'
import { getList } from '@/views/page/user/service'
export default {
  props: {
    data: { type: Object, default: () => { return {} } }
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      data1: [],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>
      },
      form: this.data ? Object.assign({}, this.data) : {},
      loading: false,
      rules: {}
    }
  },
  computed: {
  },
  mounted() {
    this.getUsetList()
  },
  methods: {
    filterMethod(query, item) {
      return item.data.username.indexOf(query) > -1 || item.data.age.toString().indexOf(query) > -1
    },
    renderContent(h, option) {
      return <span> {option.data.username} -  {option.data.age} </span>
    },
    getUsetList() {
      getList().then((res) => {
        this.data1 = res.data.list.map((d) => {
          return { key: d.id, label: d.username, data: d }
        })
      })
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    treeChange(current, { checkedKeys }) {
      this.$set(this.form, 'roles', checkedKeys.toString())
    },
    // 提交按钮
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 验证通过
          this.edit()
        }
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
    width:187px;
    height: 200px;
    overflow: auto;
  }
</style>

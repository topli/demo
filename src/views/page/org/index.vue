<style rel="stylesheet/scss" lang="scss">
  @import './style.scss';
</style>
<template>
  <div class="menu-tree">
    <div class=" custom-tree-container">
      <div class="block">
        <p>{{ $t('org.title') }}</p>
        <el-tree
          :data="treeData"
          :show-checkbox="false"
          :expand-on-click-node="false"
          :render-content="renderContent"
          node-key="id"
          default-expand-all
          @node-contextmenu="showMenu"/>
      </div>
      <div class="block">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
          <el-form-item :label="$t('org.state')" prop="state">
            <el-switch v-model="form.state"/>
          </el-form-item>
          <el-form-item>
            <el-button v-if="form.id" type="primary" @click="submitForm('form')">{{ $t('app.modify') }}</el-button>
            <el-button v-else type="primary" @click="submitForm('form')">{{ $t('app.add') }}</el-button>
            <el-button @click="resetForm('form')">{{ $t('app.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { deepClone, confirm } from '@/libs/utils'
import { getList, editData } from './service'

export default {
  data() {
    return {
      dialogBox: false,
      iconsMap: [],
      treeData: [],
      form: {
        type: '1',
        name: '',
        parentName: '',
        parentId: '',
        parentType: '',
        show: true,
        code: '',
        icon: ''
      },
      rules: {
        orgName: [
          { required: true, message: this.$t('org.orgNameRequired'), trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: this.$t('org.parentNameRequired') }
        ]
      }
    }
  },
  computed: {
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getList().then((res) => {
        this.treeData = res.data.list
      })
    },
    handleClipboard(text, event) {
      this.form.icon = text
      this.handleClose()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const handle = (array, data) => {
            array && array.forEach((d, i) => {
              if (data.id) {
                if (d.id === data.id) {
                  Object.keys(data).forEach((k) => {
                    if (d[k] !== data[k] && k !== 'children') {
                      d[k] = data[k]
                    }
                  })
                } else {
                  handle(d.children, data)
                }
              } else {
                if (data.parentId === d.id) {
                  if (!d.children) {
                    this.$set(d, 'children', [])
                  }
                  d.children.push(data)
                } else {
                  handle(d.children, data)
                }
              }
            })
          }
          handle(this.treeData, this.form)
          editData({ list: this.treeData }).then((res) => {
            if (res.code === 200) {
              this.$message.success((this.form.id ? this.$t('app.modify') : this.$t('app.add')) + this.$t('app.success'))
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    append(item) {
      this.form = {}
      // todo 右侧显示新增页面
      this.form.parentName = item.data.orgName
      this.form.parentId = item.data.id
      this.form.state = true
    },
    edit(item) {
      // todo 右侧显示修改页面
      this.form = deepClone(item.data)
    },
    remove(item) {
      if (item.data && item.data.children && item.data.children.length > 0) {
        this.$message.error({ message: this.$t('org.deleteError') })
        return
      }
      const parent = item.node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === item.data.id)
      confirm.call(this, () => {
        // todo 调用后台删除菜单api
        children.splice(index, 1)
        this.treeData = Object.assign([], this.treeData)
        editData({ list: this.treeData }).then((res) => {
          if (res.code === 200) {
            this.$message.success(this.$t('app.delete') + this.$t('app.success'))
          }
        })
      })
    },
    renderIconBtn(h, data, props, fun, hide) {
      if (hide) return null
      return h('icon-btn', {
        props: props,
        on: {
          click: () => {
            fun && fun(data)
          }
        }
      })
    },
    renderContent(h, { node, data, store }) {
      return h('span', { class: { 'custom_content': true }},
        [
          h('span', { class: { 'title': true }}, data.orgName),
          h('span', [
            this.renderIconBtn(h, { node, data, store }, { icon: 'add', content: this.$t('app.add') }, this.append),
            this.renderIconBtn(h, { node, data, store }, { icon: 'edit', content: this.$t('app.modify') }, this.edit, data.type === 'org'),
            this.renderIconBtn(h, { node, data, store }, { icon: 'delete', content: this.$t('app.delete') }, this.remove, data.type === 'org')
          ])
        ])
    },
    handleClose() {
      this.dialogBox = false
    },
    getCurrentNode(node) {
      this.form = node
    },
    showMenu(e, d, n, c) {
      // 右键事件
    },
    changeType(val) {
      if (this.form.type === '2') {
        this.rules.code = { required: true, message: this.$t('resources.errorTip.code'), trigger: 'blur' }
      } else {
        this.rules.code = { required: false }
      }
    }
  }
}
</script>

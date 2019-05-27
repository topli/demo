<style rel="stylesheet/scss" lang="scss">
  @import './style.scss';
</style>
<template>
  <div class="org-tree">
    <div class="custom-tree-container">
      <div class="tree-block">
        <p>{{ $t('org.title') }}</p>
        <el-tree
          :data="treeData"
          :show-checkbox="false"
          :expand-on-click-node="false"
          :render-content="renderContent"
          node-key="id"
          default-expand-all
          @node-click="nodeClick"
          @node-contextmenu="showMenu"/>
      </div>
      <div class="table-block">
        <el-tabs v-model="showPage" style="padding: 20px 20px 0 20px">
          <el-tab-pane label="用户" name="userList"/>
          <el-tab-pane label="设备" name="deviceList"/>
          <el-tab-pane label="电子围栏" name="enclosureList"/>
        </el-tabs>
        <div class="showPage">
          <component :is="showPage"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deepClone, confirm } from '@/libs/utils'
import { getList, editData } from './service'
import userList from './userList.vue'
import deviceList from './deviceList.vue'
import enclosureList from './enclosureList.vue'
import addOrg from './addOrg.vue'
export default {
  components: { userList, deviceList, enclosureList },
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
      },
      showPage: 'userList',
      activeName: ''
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
    nodeClick(data) {
      // todo 右侧显示修改页面
      this.form = deepClone(data)
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
      const orgData = {}
      // todo 右侧显示新增页面
      orgData.parentName = item.data.orgName
      orgData.parentId = item.data.id
      this.$dialogBox({
        title: this.$t('app.add'),
        components: addOrg,
        width: 700,
        props: { data: orgData },
        onSub: (el) => {
          // 新增完成后执行操作
          // todo 刷新列表
          // this._getList()
        }
      })
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
            this.$message.success(this.$t('app.disables') + this.$t('app.success'))
          }
        })
      })
    },
    renderIconBtn(h, data, props, fun, hide) {
      if (hide) return null
      return h('icon-btn', {
        props: props,
        on: {
          click: (e) => {
            e.stopPropagation()
            fun && fun(data, e)
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
            this.renderIconBtn(h, { node, data, store }, { icon: 'disables', content: this.$t('app.disables') }, this.remove, data.type === 'org')
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

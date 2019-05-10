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
        <div>
          <el-form :model="form" inline label-width="100px">
            <el-form-item :label="$t('org.orgName')">
              {{ form.orgName }}
            </el-form-item>
            <el-form-item :label="$t('org.code')">
              {{ form.code }}
            </el-form-item>
            <el-form-item :label="$t('org.linkman')">
              {{ form.linkman }}
            </el-form-item>
            <el-form-item :label="$t('org.phone')">
              {{ form.phone }}
            </el-form-item>
            <el-form-item :label="$t('org.parent')">
              {{ form.parentName }}
            </el-form-item>
          </el-form>
        </div>
        <div class="list-template">
          <search-tem class="list-search" @on-search="onSearch">
            <el-form :inline="true" :model="searchFrom">
              <el-form-item>
                <el-input v-model="searchFrom.user" :placeholder="$t('user.username')" clearable/>
              </el-form-item>
            </el-form>
          </search-tem>
          <div class="btns">
            <icon-btn :content="$t('app.addUser')" auth-code="add" icon="add" @click="addData"/>
          </div>
          <div class="table">
            <t-for-col
              :data="list"
              :columns-title="columnsTitle"
              :loading="loading"
              height="500"
              selection
              index
              @select-change="handleSelectionChange"/>
          </div>
          <div class="pages">
            <el-pagination
              :current-page="searchData.pageNo"
              :page-sizes="pageSizeOpts"
              :page-size="searchData.pageSize"
              :total="totalElement"
              layout="total, sizes, prev, pager, next, jumper"
              style="padding-top: 10px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deepClone, confirm } from '@/libs/utils'
import { getList, editData } from './service'
import { getList as getUserList } from '@/views/page/user/service'
import addUser from './addUser.vue'
import addOrg from './addOrg.vue'
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'
export default {
  mixins: [list, dialog],
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
      columnsTitle: [
        {
          key: 'username',
          title: this.$t('user.username'),
          width: '100'
        },
        {
          key: 'orgName',
          title: this.$t('user.orgName')
        },
        {
          key: 'jobName',
          title: this.$t('user.jobName')
        },
        {
          key: 'jobLevel',
          title: this.$t('user.jobLevel'),
          width: '80'
        },
        {
          key: 'age',
          title: this.$t('user.age'),
          width: '80',
          unit: this.$t('user.ageUnit')
        },
        {
          key: 'sex',
          title: this.$t('user.sex'),
          dictType: 'sex',
          width: '80',
          render: (h, params) => {
            const f = params.row['_f_sex']
            if (!f) return
            return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
          }
        },
        {
          title: this.$t('app.buttons'),
          width: '60',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'delete', t: 'app.delete', handler: this.deleteItem, color: '#F24D5D' }
            ]))
          }
        }
      ]
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
    },
    _getList() {
      this.loading = true
      getUserList(this.searchData).then(res => {
        setTimeout(() => {
          this.loading = false
          this.list = res.data.list
          this.totalElement = res.data.total
        }, 1000)
      })
    },
    addData() {
      this.$dialogBox({
        title: this.$t('app.add'),
        components: addUser,
        width: 700,
        onSub: (el) => {
          // 新增完成后执行操作
          // todo 刷新列表
          this._getList()
        }
      })
    }
  }
}
</script>

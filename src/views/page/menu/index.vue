<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.name" :placeholder="$t('menu.name')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/>
      <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/>
    </div>
    <div class="table">
      <tree-table :data="data" :columns="columns" border/>
    </div>
    <!-- <div class="pages">
      <el-pagination
        :current-page="searchData.pageNo"
        :page-sizes="pageSizeOpts"
        :page-size="searchData.pageSize"
        :total="totalElement"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div> -->
  </div>
</template>

<script>
import add from './add'
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'
import { getList, delData } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columns: [
        {
          title: this.$t('menu.name'),
          key: 'name'
        },
        {
          title: this.$t('menu.level'),
          key: 'level'
        },
        {
          title: this.$t('menu.order'),
          key: 'order'
        },
        {
          title: this.$t('menu.type'),
          key: 'type',
          dictType: 'menuType',
          render: (h, params) => {
            const f = params.row['_f_type']
            if (!f) return
            return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
          }
        },
        {
          title: this.$t('menu.path'),
          key: 'path'
        },
        {
          title: this.$t('menu.identification'),
          key: 'identification'
        },
        {
          title: this.$t('menu.status'),
          key: 'status',
          dictType: 'menuStatus',
          render: (h, params) => {
            const f = params.row['_f_status']
            if (!f) return
            return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
          }
        },
        {
          title: this.$t('menu.linkType'),
          key: 'linkType',
          dictType: 'linkType',
          render: (h, params) => {
            const f = params.row['_f_linkType']
            if (!f) return
            return h('span', f.label)
          }
        },
        {
          title: this.$t('menu.remark'),
          key: 'remark'
        }
      ],
      data: [
        {
          id: 1,
          name: '系统管理',
          order: 1,
          type: 1,
          path: '',
          identification: '',
          status: true,
          linkType: 0,
          child: [
            {
              id: 2,
              name: '用户管理',
              order: 1,
              type: 2,
              path: 'userM/user',
              identification: 'user',
              status: true,
              linkType: 1,
              child: []
            },
            {
              id: 3,
              name: '组织架构',
              order: 1,
              type: 2,
              path: 'userM/org',
              identification: 'org',
              status: true,
              linkType: 2,
              child: [
                {
                  id: 4,
                  name: '新增',
                  order: 1,
                  linkType: 3,
                  type: 3
                },
                {
                  id: 5,
                  name: '编辑',
                  order: 2,
                  linkType: 3,
                  type: 3
                },
                {
                  id: 6,
                  name: '删除',
                  order: 3,
                  linkType: 3,
                  type: 3
                }
              ]
            }
          ]
        },
        {
          id: 7,
          name: '后台配置',
          order: 2,
          type: 1,
          child: [
            {
              id: 8,
              name: '菜单管理'
            },
            {
              id: 9,
              name: '页面管理',
              child: []
            }
          ]
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    _getList() {
      this.loading = true
      getList(this.searchData).then(res => {
        setTimeout(() => {
          this.loading = false
          this.list = res.data.list
          this.totalElement = res.data.total
        }, 1000)
      })
    },
    // 在编辑时获取当前数据
    getFormById(id) {
      setTimeout(() => {
        this.list.forEach((item) => {
          if (item.id === id) this.dialogData = item
        })
      }, 1000)
    },
    editData(row) {
      this.$dialogBox({
        title: this.$t('app.modify'),
        components: add,
        width: 650,
        props: { data: row },
        onSub: (el) => {
          // 新增完成后执行操作
          // todo 刷新列表
          this._getList()
        }
      })
    },
    addData() {
      this.$dialogBox({
        title: this.$t('app.add'),
        components: add,
        width: 650,
        onSub: (el) => {
          // 新增完成后执行操作
          // todo 刷新列表
          this._getList()
        }
      })
    },
    deleteItem(row) {
      this.confirm((success) => {
        delData(row).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: this.$t('app.delete') + this.$t('app.success')
            })
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
            return
          }
          this._getList()
        })
      })
    }
  }
}
</script>

<style scoped>
</style>

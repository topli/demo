<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.name" :placeholder="$t('menu.name')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/> -->
      <!-- <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/> -->
      <!-- <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/> -->
    </div>
    <div class="table">
      <t-for-col
        :data="data"
        :columns-title="columns"
        :loading="loading"
        :stripe="false"
        :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
        @select-change="handleSelectionChange"/>
        <!-- <tree-table :data="data" :columns="columns" border/> -->
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
import { delData, getData } from './service'

export default {
  mixins: [list],
  data() {
    return {
      columns: [
        {
          title: this.$t('menu.name'),
          width: '300',
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
          filters: 'menuType',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
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
          filters: 'menuStatus',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          title: this.$t('menu.linkType'),
          key: 'linkType',
          filters: 'linkType',
          render: (h, params, val) => {
            return h('span', val.label)
          }
        },
        {
          title: this.$t('menu.remark'),
          key: 'remark'
        },
        {
          title: this.$t('app.buttons'),
          width: '100',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'edit', t: 'app.modify', handler: this.editData, color: '#F6BD30' }
              // { icon: 'disables', t: 'app.disables', handler: this.deleteItem, color: '#F24D5D' }
            ]))
          }
        }
      ],
      data: [
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getData().then((res) => {
        this.loading = false
        this.data = res.data.list
      })
    },
    _getList() {
      // this.loading = true
      // getList(this.searchData).then(res => {
      //   setTimeout(() => {
      //     this.loading = false
      //     this.list = res.data.list
      //     this.totalElement = res.data.total
      //   }, 1000)
      // })
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
          this.getData()
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
      this.disablesConfirm((success) => {
        delData(row).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: this.$t('app.disables') + this.$t('app.success')
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

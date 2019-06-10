<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.no" :placeholder="$t('dispatch.no')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.name" :placeholder="$t('tasks.name')" clearable/>
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
        :data="list"
        :columns-title="columnsTitle"
        :loading="loading"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
// import add from './add'
// import review from './review'
// import push from './push'
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'
import { getList } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'dispatchNo',
          title: this.$t('dispatch.no'),
          width: '160'
        },
        {
          key: 'no',
          title: this.$t('tasks.no'),
          width: '160'
        },
        {
          key: 'name',
          title: this.$t('tasks.name')
        },
        {
          key: 'devices',
          title: this.$t('tasks.devices'),
          minWidth: 300
        },
        {
          key: 'progress',
          title: this.$t('tasks.progress'),
          minWidth: 160,
          render: (h, params) => {
            return h('el-progress', { props: { percentage: params.row.progress }})
          }
        },
        {
          key: 'status',
          title: this.$t('tasks.status'),
          render: (h) => {
            return h('span', '已调度')
          }
        },
        {
          key: 'executor',
          title: this.$t('tasks.executor')
        },
        {
          key: 'line',
          title: this.$t('tasks.line'),
          minWidth: 200
        },
        {
          key: 'describe',
          title: this.$t('tasks.describe')
        },
        {
          key: 'org',
          title: this.$t('tasks.org'),
          minWidth: 160
        }
        // {
        //   key: 'level',
        //   title: this.$t('tasks.level'),
        //   filters: 'taskLevel',
        //   render: (h, params) => {
        //     const f = params.row['_f_level']
        //     if (!f) return
        //     return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
        //   }
        // }
        // {
        //   title: this.$t('app.buttons'),
        //   width: '160',
        //   align: 'center',
        //   fixed: 'right',
        //   render: (h, params) => {
        //     return h('div', this.iconBtn(h, params, [
        //       { icon: 'review', t: 'app.review', handler: this.reviewData, color: '#3091f6' },
        //       // { icon: 'push', t: 'app.push', handler: this.pushData, color: '#64d9d6' },
        //       { icon: 'edit', t: 'app.modify', handler: this.editData, color: '#F6BD30' },
        //       { icon: 'disables', t: 'app.disables', handler: this.deleteItem, color: '#F24D5D' }
        //     ]))
        //   }
        // }
      ],
      fileType: 'tasksDispatch'
    }
  },
  methods: {
    _getList() {
      this.loading = true
      console.log(this.searchData)
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
    }
    // editData(row) {
    //   this.$dialogBox({
    //     title: this.$t('app.modify'),
    //     components: add,
    //     width: 750,
    //     props: { data: row },
    //     onSub: (el) => {
    //       // 新增完成后执行操作
    //       // todo 刷新列表
    //       this._getList()
    //     }
    //   })
    // },
    // addData() {
    //   this.$dialogBox({
    //     title: this.$t('app.add'),
    //     components: add,
    //     width: 750,
    //     onSub: (el) => {
    //       // 新增完成后执行操作
    //       // todo 刷新列表
    //       this._getList()
    //     }
    //   })
    // },
    // deleteItem(row) {
    //   this.confirm((success) => {
    //     delData(row).then((res) => {
    //       if (res.code === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: this.$t('app.disables') + this.$t('app.success')
    //         })
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: res.message
    //         })
    //         return
    //       }
    //       this._getList()
    //     })
    //   })
    // },
    // reviewData(row) {
    //   this.$dialogBox({
    //     title: this.$t('app.review'),
    //     components: review,
    //     width: 380,
    //     props: { data: row },
    //     onSub: (el) => {
    //       // 新增完成后执行操作
    //       // todo 刷新列表
    //       this._getList()
    //     }
    //   })
    // },
    // pushData(row) {
    //   this.$dialogBox({
    //     title: this.$t('app.push'),
    //     components: push,
    //     width: 380,
    //     props: { data: row },
    //     onSub: (el) => {
    //       // 新增完成后执行操作
    //       // todo 刷新列表
    //       this._getList()
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
</style>

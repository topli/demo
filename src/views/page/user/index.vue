<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.user" :placeholder="$t('user.username')" clearable/>
        </el-form-item>
        <el-form-item>
          <select-remote v-model="searchForm.sex" :placeholder="$t('user.sex')" filterable clearable data-type="sex"/>
        </el-form-item>
        <!-- <el-form-item>
          <select-remote v-model="searchForm.status" :placeholder="$t('user.status')" filterable clearable data-type="status"/>
        </el-form-item> -->
      </el-form>
    </search-tem>
    <div class="btns">
      <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/>
      <!-- <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/> -->
      <!-- <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/> -->
    </div>
    <div class="table">
      <t-for-col
        :data="list"
        :sort-change="sortChange"
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
import add from './add'
import list from '@/libs/mixins/list'
import { getList, editData } from './service'

export default {
  name: 'User',
  mixins: [list],
  data() {
    return {
      columnsTitle: [
        {
          key: 'username',
          title: this.$t('user.username'),
          width: '100'
        },
        {
          key: 'orgName',
          title: this.$t('user.orgName'),
          width: '120'
        },
        {
          key: 'roleName',
          title: this.$t('user.roleName'),
          width: '120'
        },
        {
          key: 'jobName',
          title: this.$t('user.jobName'),
          width: '100'
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
          // searchFilters: [
          //   { text: '> 20', value: 20 },
          //   { text: '> 50', value: 50 }
          // ],
          // sortable: 'custom' // 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
        },
        // renderHeader 用法
        // renderContent 用法
        // {
        //   key: 'age',
        //   title: 'test',
        //   width: '180',
        //   searchFilters: [
        //     { text: 'test1', value: 11 },
        //     { text: 'test2', value: 22 }
        //   ],
        //   renderHeader: (h, params) => {
        //     return h('span', [h('span', params.column.label), iconTooltip(h, '提示')]);
        //   },
        //   render: (h, params) => {
        //     return h('div', [
        //       h('el-input', {
        //         props: { value: params.row.age },
        //         on: {
        //           input: (val) => {
        //             // 通过index找到对应的值 并改变输入值
        //             this.$set(this.list[params.$index], 'age', val);
        //           }
        //         }
        //       })]);
        //   }
        // },
        {
          key: 'sex',
          title: this.$t('user.sex'),
          filters: 'sex',
          width: '80',
          render: (h, params, val) => {
            return h('span', val.label)
          }
        },
        {
          key: 'isWork',
          title: this.$t('user.isWork'),
          filters: 'isWork',
          width: '100',
          render: (h, params, val) => {
            return h('span', val.label)
          }
        },
        {
          key: 'createTime',
          title: this.$t('user.createTime'),
          filters: 'parseTime|{y}-{m}-{d} {h}:{i}:{s}',
          width: '180'
        },
        {
          key: 'status',
          title: this.$t('user.status'),
          minWidth: '100',
          filters: 'status',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          title: this.$t('app.buttons'),
          width: '100',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'edit', t: 'app.modify', handler: this.editData, color: '#F6BD30' },
              { icon: 'disables', t: 'app.disables', handler: this.disablesItem, color: '#F24D5D' }
            ]))
          }
        }
      ],
      fileType: 'user'
    }
  },
  methods: {
    sortChange(data) {
      console.log(data)
    },
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
    },
    editData(row) {
      this.$dialogBox({
        title: this.$t('app.modify'),
        components: add,
        width: 690,
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
        width: 690,
        onSub: (el) => {
          // 新增完成后执行操作
          // todo 刷新列表
          this._getList()
        }
      })
    },
    disablesItem(row) {
      this.disablesConfirm((success) => {
        row.status = false
        editData(row).then((res) => {
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

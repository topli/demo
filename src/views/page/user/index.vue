<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.user" :placeholder="$t('user.search.username')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchFrom.region" :placeholder="$t('user.search.region')" clearable>
            <el-option label="区域一" value="shanghai"/>
            <el-option label="区域二" value="beijing"/>
          </el-select>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <icon-btn :content="$t('table.add')" auth-code="add" icon="add" @click="addData"/>
      <icon-btn :content="$t('table.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('table.export')" auth-code="export" icon="export" @click="exportFun"/>
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
import dialog from '@/libs/mixins/dialog'
import { fetchList, delData } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'username',
          title: this.$t('user.table.username'),
          width: '180'
        },
        {
          key: 'age',
          title: this.$t('user.table.age'),
          width: '180',
          unit: this.$t('user.table.ageUnit')
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
          title: this.$t('user.table.sex'),
          filters: 'sex'
        },
        {
          key: 'createTime',
          title: this.$t('user.table.createTime'),
          filters: 'parseTime'
        },
        {
          key: 'delivery',
          title: this.$t('user.table.delivery'),
          filters: 'delivery', // 带过滤器的项 取值是时前面加上 _f_
          render: (h, params) => {
            return h('el-tag', {
              props: {
                type: params.row.delivery ? 'success' : 'danger'
              }
            },
            params.row['_f_delivery'])
          }
        },
        {
          title: this.$t('user.table.buttons'),
          width: '100',
          align: 'center',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'edit', t: 'table.edit', handler: this.editData, color: '#F6BD30' },
              { icon: 'delete', t: 'table.dele', handler: this.deleteItem, color: '#F24D5D' }
            ]))
          }
        }
      ],
      fileType: 'user'
    }
  },
  mounted() {
  },
  methods: {
    sortChange(data) {
      console.log(data)
    },
    _getList() {
      this.loading = true
      fetchList(this.searchData).then(res => {
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
        title: this.$t('user.dialog.edit'),
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
        title: this.$t('user.dialog.add'),
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
          console.log(res)
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

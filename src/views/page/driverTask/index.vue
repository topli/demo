<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.deviceNo" :placeholder="$t('driverTask.deviceNo')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/>
      <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/> -->
      <el-button-group style="float: right">
        <el-button size="mini" @click="showType = 'day'">{{ $t('app.day') }}</el-button>
        <el-button size="mini" @click="showType = 'week'">{{ $t('app.week') }}</el-button>
        <el-button size="mini" @click="showType = 'month'">{{ $t('app.month') }}</el-button>
      </el-button-group>
    </div>
    <div class="table">
      <t-for-col
        :data="list"
        :sort-change="sortChange"
        :columns-title="columnsTitle"
        :loading="loading"
        selection
        @row-dblclick="rowDblclick"
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
import { getList, delData } from './service'
import { parseTime } from '@/libs/utils'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'deviceNo',
          title: this.$t('driverTask.deviceNo'),
          minWidth: '120',
          fixed: 'left'
        }
        // {
        //   key: 'driverName',
        //   title: this.$t('driverTask.driverName'),
        //   minWidth: '120',
        //   fixed: 'left'
        // }
      ],
      showType: 'week', // day week month
      fileType: 'driverTask'
    }
  },
  watch: {
    showType: function() {
      this.getColumns()
    }
  },
  created() {
  },
  methods: {
    getColumns() {
      this.columnsTitle.splice(2, this.columnsTitle.length)
      let num = 0
      switch (this.showType) {
        case 'day':
          num = 1
          break
        case 'week':
          num = 7
          break
        case 'month':
          num = 30
          break
        default:
          break
      }
      for (let i = 0; i < num; i++) {
        const dateStr = parseTime(new Date().getTime() + 86400000 * i, '{y}-{m}-{d}')
        // this.columnsTitle.push({
        //   key: dateStr,
        //   title: dateStr,
        //   width: '120',
        //   dictType: 'taskType',
        //   render: (h, params) => {
        //     const f = params.row['_f_' + dateStr]
        //     if (!f) return
        //     return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
        //   }
        // })
        const dateCol = {
          key: dateStr,
          title: dateStr,
          minWidth: 200,
          render: (h, params) => {
            const list = [
              { driverName: '张三', taskType: 1, taskStatus: 2 },
              { driverName: '李四', taskType: 2, taskStatus: 2 },
              { driverName: '王五', taskType: 1, taskStatus: 1 }
            ]
            return h('div', list.map(item => {
              return h('task-col', { props: { dirverTaskInfo: item }})
            }))
          }
        }
        this.columnsTitle.push(dateCol)
        this.list.forEach((item) => {
          this.$set(item, dateStr, Math.ceil(Math.random() * 3))
        })
      }
    },
    sortChange(data) {
      console.log(data)
    },
    _getList() {
      this.loading = true
      getList(this.searchData).then(res => {
        setTimeout(() => {
          this.loading = false
          this.list = res.data.list
          this.totalElement = res.data.total
          this.getColumns()
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
    },
    rowDblclick(row, e, columns) {
      const editData = {
        deviceNo: row.deviceNo,
        driverName: row.driverName,
        time: columns.property,
        taskType: row[columns.property]
      }
      this.$dialogBox({
        title: this.$t('app.modify'),
        components: add,
        width: 650,
        props: { data: editData },
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

<style scoped>
</style>

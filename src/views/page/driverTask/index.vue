<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.deviceNo" :placeholder="$t('driverTask.deviceNo')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/>
      <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/> -->
      <el-button-group style="float: right">
        <el-button :type="primary1" size="mini" @click="showType = 'day'">{{ $t('app.day') }}</el-button>
        <el-button :type="primary2" size="mini" @click="showType = 'week'">{{ $t('app.week') }}</el-button>
        <el-button :type="primary3" size="mini" @click="showType = 'month'">{{ $t('app.month') }}</el-button>
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
import { getList, delData } from './service'
import { parseTime } from '@/libs/utils'
import Mock from 'mockjs'
export default {
  mixins: [list],
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
      fileType: 'driverTask',
      nameList: [],
      primary1: '',
      primary2: 'primary',
      primary3: ''
    }
  },
  watch: {
    showType: function() {
      this.getColumns()
    }
  },
  created() {
    var Random = Mock.Random
    let i = 0
    while (i < 200) {
      this.nameList.push(Random.cname())
      i++
    }
  },
  methods: {
    getColumns() {
      this.columnsTitle.splice(1, this.columnsTitle.length)
      let num = 0
      switch (this.showType) {
        case 'day':
          num = 1
          this.primary1 = 'primary'
          this.primary2 = ''
          this.primary3 = ''
          break
        case 'week':
          num = 7
          this.primary1 = ''
          this.primary2 = 'primary'
          this.primary3 = ''
          break
        case 'month':
          num = 30
          this.primary1 = ''
          this.primary2 = ''
          this.primary3 = 'primary'
          break
        default:
          break
      }
      for (let i = 0; i < num; i++) {
        const dateStr = parseTime(new Date().getTime() + 86400000 * i, '{y}-{m}-{d}')
        const dateCol = {
          key: dateStr,
          title: dateStr,
          minWidth: 220,
          render: (h, params) => {
            return h('div', params.row[dateStr].map(item => {
              return h('task-col', { props: { dirverTaskInfo: item }})
            }))
          }
        }
        this.columnsTitle.push(dateCol)
        this.list.forEach((item) => {
          this.$set(item, dateStr, [
            { id: Math.ceil(Math.random() * 10000), driverName: this.nameList[Math.ceil(Math.random() * 20)], taskType: Math.ceil(Math.random() * 2), taskStatus: Math.ceil(Math.random() * 2) },
            { id: Math.ceil(Math.random() * 10000), driverName: this.nameList[Math.ceil(Math.random() * 20)], taskType: Math.ceil(Math.random() * 2), taskStatus: Math.ceil(Math.random() * 2) },
            { id: Math.ceil(Math.random() * 10000), driverName: this.nameList[Math.ceil(Math.random() * 20)], taskType: Math.ceil(Math.random() * 3), taskStatus: Math.ceil(Math.random() * 2) }
          ])
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
      this.disablesConfirm((success) => {
        delData(row).then((res) => {
          console.log(res)
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

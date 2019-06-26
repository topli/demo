<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.equipmentNumber" :placeholder="$t('alarmSet.equipmentNumber')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.deviceType" :placeholder="$t('alarmSet.deviceType')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <icon-btn :content="$t('app.addValue')" auth-code="add" icon="add" @click="addData"/>
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
import { getList, delData } from './service'

export default {
  name: 'User',
  mixins: [list],
  data() {
    return {
      columnsTitle: [
        {
          key: 'equipmentNumber',
          title: this.$t('alarmSet.equipmentNumber'),
          width: '130',
          align: 'center'
        },
        {
          key: 'deviceType',
          title: this.$t('alarmSet.deviceType'),
          align: 'center',
          filters: 'deviceType',
          render: (h, params, val) => {
            return h('span', val.label)
          }
        },
        {
          key: 'status',
          title: this.$t('alarmSet.status'),
          align: 'center',
          filters: 'status',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          key: 'fuel',
          title: this.$t('alarmSet.fuel'),
          unit: 'L',
          align: 'center'
        },
        {
          key: 'temperature',
          title: this.$t('alarmSet.temperature'),
          unit: '°C',
          align: 'center'
        },
        {
          key: 'pressure',
          title: this.$t('alarmSet.pressure'),
          unit: 'Kpa',
          align: 'center'
        },
        {
          key: 'workingTime',
          title: this.$t('alarmSet.workingTime'),
          unit: '(h)',
          width: '100',
          align: 'center'
        },
        // {
        //   key: 'range',
        //   title: this.$t('alarmSet.range') + '(m)',
        //   width: '100',
        //   align: 'center'
        // },
        // {
        //   key: 'beyondRange',
        //   title: this.$t('alarmSet.beyondRange') + '(s)',
        //   width: '120',
        //   align: 'center'
        // },
        {
          key: 'loadingCapacity',
          title: this.$t('alarmSet.loadingCapacity'),
          unit: 'kg',
          align: 'center'
        },
        {
          key: 'speed',
          title: this.$t('alarmSet.speed'),
          unit: 'km/h',
          width: '100',
          align: 'center'
        },
        {
          key: 'beyondSpeed',
          title: this.$t('alarmSet.beyondSpeed'),
          unit: 's',
          width: '120',
          align: 'center'
        },
        {
          key: 'createTime',
          title: this.$t('alarmSet.createTime'),
          filters: 'parseTime',
          width: '180',
          align: 'center'
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
      fileType: 'user'
    }
  },
  methods: {
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
        title: this.$t('app.modifyValue'),
        components: add,
        width: 700,
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
        title: this.$t('app.addValue'),
        components: add,
        width: 700,
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
    }
  }
}
</script>

<style scoped>
</style>

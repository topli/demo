<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.model" :placeholder="$t('device.model')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.number" :placeholder="$t('device.number')" clearable/>
        </el-form-item>
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
import dialog from '@/libs/mixins/dialog'
import { getList, editData } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'status',
          title: this.$t('device.status'),
          width: '100',
          filters: 'status',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          key: 'model',
          title: this.$t('device.model'),
          width: '120',
          filters: 'deviceType',
          render: (h, params, val) => {
            return h('span', val.label)
          }
        },
        {
          key: 'number',
          title: this.$t('device.number'),
          width: '120'
        },
        {
          key: 'gpsNo',
          title: this.$t('device.gpsNo'),
          width: '120'
        },
        {
          key: 'createTime',
          title: this.$t('device.createTime'),
          filters: 'parseTime',
          width: '150'
        },
        {
          key: 'useStatus',
          title: this.$t('device.useStatus'),
          filters: 'isUse',
          width: '80',
          render: (h, params, filterVal) => {
            return h('span', filterVal.label)
          }
        },
        {
          key: 'usePerson',
          title: this.$t('device.usePerson')
        },
        {
          key: 'available',
          title: this.$t('device.available'),
          filters: 'available',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          key: 'orgName',
          title: this.$t('device.orgName')
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
      fileType: 'device'
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

<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.user" :placeholder="$t('deviceError.alarmType')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/> -->
      <!-- <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/> -->
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
import list from '@/libs/mixins/list'
import add from './add'
import dialog from '@/libs/mixins/dialog'
import { getList } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      doList: [
        '报警已处理',
        '预警已处理',
        '预警未处理',
        '预警已处理',
        '报警未处理'
      ],
      columnsTitle: [
        {
          key: 'status',
          title: this.$t('deviceError.status'),
          filters: 'status', // 带过滤器的项 取值是时前面加上 _f_
          width: '90',
          render: (h, params) => {
            return h('el-tag', {
              props: { color: params.row.status ? '#F4A460' : '#EE3B3B', type: 'text' },
              style: { color: 'white' }
            },
            params.row.status ? '预警' : '报警')
          }
        },
        {
          key: 'alarmType',
          title: this.$t('deviceError.alarmType'),
          minWidth: '120'
        },
        {
          key: 'deviceStatus',
          title: this.$t('deviceError.deviceStatus'),
          minWidth: '90',
          render: (h, params) => {
            return h('el-tag', {
              props: { color: params.row.deviceStatus ? '#409eff' : '#999', type: 'text' },
              style: { color: 'white' }
            },
            params.row.deviceStatus ? '在线' : '离线')
          }
        },
        {
          key: 'handleStatus',
          title: this.$t('deviceError.handleStatus'),
          minWidth: '120',
          render: (h, params) => {
            return h('span', {

            },
            params.row.handleStatus === 'true' ? '已处理' : '未处理')
          }
        },
        {
          key: 'deviceAddress',
          title: this.$t('deviceError.deviceAddress'),
          minWidth: '220'
        },
        {
          key: 'principal',
          title: this.$t('deviceError.principal'),
          minWidth: '120'
        },
        {
          key: 'createTime',
          title: this.$t('deviceError.createTime'),
          minWidth: '150',
          filters: 'parseTime'
        },
        {
          title: this.$t('app.buttons'),
          width: '100',
          align: 'center',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'alertError', t: 'deviceError.handleResult', handler: this.editData, color: '#F6BD30' }
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
      getList(this.searchData).then(res => {
        console.log(res)
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
      // this.$alert('<i style="margin-right: 6px" class="' + (this.doList[row.id].indexOf('已') > -1 ? 'el-icon-success' : 'el-icon-warning') + '"></i><h3 style="display: inline-block">' + this.doList[row.id] + '</h3>', '处理结果', {
      //   dangerouslyUseHTMLString: true
      // })
      this.$dialogBox({
        title: this.$t('app.dealWith'),
        components: add,
        width: 480,
        props: { data: row },
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

<style lang="scss" scoped>

</style>

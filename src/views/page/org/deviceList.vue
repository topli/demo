<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.number" :placeholder="$t('device.number')" clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/> -->
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
import list from '@/libs/mixins/list'
import { getList } from '@/views/page/deviceAttrM/service'

export default {
  mixins: [list],
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
          width: '80',
          filters: 'isUse',
          render: (h, params, val) => {
            return h('span', val.label)
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
          width: '60',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'unbind', t: 'app.unbind', handler: this.unbindItem, color: '#ff7c4a' }
            ]))
          }
        }
      ],
      fileType: 'device'
    }
  },
  mounted() {
    this.searchForm.status = null
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
    unbindItem(data) {
      this.unbindConfirm(() => {
        this.list = this.list.filter(item => {
          return item.id !== data.id
        })
        this.totalElement = this.list.length
        this.$Message(this.$t('app.unbind') + this.$t('app.success'))
      })
    }
  }
}
</script>

<style scoped>
</style>

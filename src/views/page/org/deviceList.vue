<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.status" :placeholder="$t('device.status')" clearable/>
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
          width: '100'
        },
        {
          key: 'model',
          title: this.$t('device.model'),
          width: '120'
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
          width: '80'
        },
        {
          key: 'usePerson',
          title: this.$t('device.usePerson')
        },
        {
          key: 'available',
          title: this.$t('device.available'),
          dictType: 'status',
          render: (h, params) => {
            const f = params.row['_f_available']
            if (!f) return
            return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
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
              { icon: 'unbind', t: 'app.unbind', handler: this.deleteItem, color: '#ff7c4a' }
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
    addData() {
      // this.$dialogBox({
      //   title: this.$t('app.add'),
      //   components: addDevice,
      //   width: 700,
      //   onSub: (el) => {
      //     // 新增完成后执行操作
      //     // todo 刷新列表
      //     this._getList()
      //   }
      // })
    }
  }
}
</script>

<style scoped>
</style>

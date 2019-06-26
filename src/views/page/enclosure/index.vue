<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.user" :placeholder="$t('enclosure.name')" clearable/>
        </el-form-item>
        <!-- <el-form-item>
          <select-remote v-model="searchForm.status" :placeholder="$t('user.status')" filterable clearable data-type="status"/>
        </el-form-item> -->
      </el-form>
    </search-tem>
    <div class="btns">
      <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="editData"/>
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
          title: this.$t('enclosure.status'),
          filters: 'status', // 带过滤器的项 取值是时前面加上 _f_
          width: '120',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          key: 'name',
          title: this.$t('enclosure.name'),
          width: '180'
        },
        {
          key: 'labelState',
          title: this.$t('enclosure.labelState'),
          width: '120',
          filters: 'labelState',
          render: (h, params, val) => {
            return h('span', val.label)
          }
        },
        {
          key: 'org',
          title: this.$t('enclosure.org'),
          width: '150'
        },
        {
          key: 'province',
          title: this.$t('enclosure.province'),
          width: '130'
        },
        {
          key: 'city',
          title: this.$t('enclosure.city'),
          width: '130'
        },
        {
          key: 'address',
          title: this.$t('enclosure.address'),
          minWidth: '250'
        },
        {
          key: 'scope',
          title: this.$t('enclosure.scope'),
          width: '100',
          unit: this.$t('enclosure.rangeUnit')
        },
        {
          key: 'createTime',
          title: this.$t('enclosure.createTime'),
          width: '150',
          filters: 'parseTime'
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
  mounted() {
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
      this.$router.push({ name: 'enclosureEdit', query: { name: row.adress, scope: row.enclosureRange, id: row.id }})
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

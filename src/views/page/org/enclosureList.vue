<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.name" :placeholder="$t('enclosure.name')" clearable/>
        </el-form-item>
        <el-form-item>
          <select-remote v-model="searchForm.status" :placeholder="$t('user.status')" filterable clearable data-type="status"/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="editData"/> -->
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
import { getList } from '@/views/page/enclosure/service'

export default {
  mixins: [list],
  data() {
    return {
      columnsTitle: [
        {
          key: 'status',
          title: this.$t('enclosure.status'),
          filters: 'status', // 带过滤器的项 取值是时前面加上 _f_
          width: '120',
          render: (h, params) => {
            return h('el-tag', {
              props: { color: params.row.status ? '#52c08e' : '#EE3B3B', type: 'text' },
              style: { color: 'white' }
            },
            params.row.status ? '启用' : '禁用')
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
          width: '120'
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
          width: '250'
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
          width: '60',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              // { icon: 'edit', t: 'app.modify', handler: this.editData, color: '#F6BD30' },
              { icon: 'unbind', t: 'app.unbind', handler: this.deleteItem, color: '#ff7c4a' }
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
    _getList() {
      this.loading = true
      getList(this.searchData).then(res => {
        setTimeout(() => {
          this.loading = false
          this.list.push(res.data.list[0])
          this.totalElement = 1
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
    }
    // editData(row) {
    //   console.log(row)
    //   this.$router.push({ name: 'enclosureEdit', query: { name: row.adress, scope: row.enclosureRange }})
    // },
    // addData() {
    //   this.$dialogBox({
    //     title: this.$t('app.add'),
    //     components: add,
    //     width: 650,
    //     onSub: (el) => {
    //       // 新增完成后执行操作
    //       // todo 刷新列表
    //       this._getList()
    //     }
    //   })
    // },
    // deleteItem(row) {
    //   this.confirm((success) => {
    //     delData(row).then((res) => {
    //       console.log(res)
    //       if (res.code === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: this.$t('app.disables') + this.$t('app.success')
    //         })
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: res.message
    //         })
    //         return
    //       }
    //       this._getList()
    //     })
    //   })
    // }
  }
}
</script>

<style scoped>
</style>

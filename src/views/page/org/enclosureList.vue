<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.name" :placeholder="$t('enclosure.name')" clearable/>
        </el-form-item>
        <!-- <el-form-item>
          <select-remote v-model="searchForm.status" :placeholder="$t('user.status')" filterable clearable data-type="status"/>
        </el-form-item> -->
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
          key: 'orgName',
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
              { icon: 'unbind', t: 'app.unbind', handler: this.unbindItem, color: '#ff7c4a' }
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

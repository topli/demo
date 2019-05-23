<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.user" :placeholder="$t('user.username')" clearable/>
        </el-form-item>
        <el-form-item>
          <select-remote v-model="searchForm.status" :placeholder="$t('user.status')" filterable clearable data-type="status"/>
        </el-form-item>
        <!-- <el-form-item>
          <el-select v-model="searchForm.region" :placeholder="$t('user.region')" clearable>
            <el-option label="区域一" value="shanghai"/>
            <el-option label="区域二" value="beijing"/>
          </el-select>
        </el-form-item> -->
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
import { getList, delData } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'label',
          title: this.$t('dict.label'),
          width: '180'
        },
        {
          key: 'value',
          title: this.$t('dict.value')
        },
        {
          key: 'group',
          title: this.$t('dict.group')
        },
        {
          key: 'color',
          title: this.$t('dict.color'),
          render: (h, params) => {
            return h('el-tag', {
              props: {
                color: params.row.color
              },
              style: {
                width: '30px'
              }
            })
          }
        },
        // {
        //   key: 'orgName',
        //   title: this.$t('dict.orgName')
        // },
        {
          key: 'status',
          title: this.$t('dict.status'),
          filters: 'status', // 带过滤器的项 取值是时前面加上 _f_
          render: (h, params) => {
            return h('el-tag', {
              props: {
                type: params.row.status ? 'success' : 'danger'
              }
            },
            params.row['_f_status'])
          }
        },
        {
          title: this.$t('app.buttons'),
          width: '100',
          align: 'center',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'edit', t: 'app.modify', handler: this.editData, color: '#F6BD30' },
              { icon: 'disables', t: 'app.disables', handler: this.deleteItem, color: '#F24D5D' }
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

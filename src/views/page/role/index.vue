<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.roleName" :placeholder="$t('role.roleName')" clearable/>
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
import addPerson from './addPerson'
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'
import { getList, delData } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'roleName',
          title: this.$t('role.roleName')
        },
        {
          title: this.$t('app.buttons'),
          width: '100',
          align: 'center',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'addperson', t: 'role.addPerson', handler: this.addPerson },
              { icon: 'edit', t: 'app.modify', handler: this.editData, color: '#F6BD30' },
              { icon: 'delete', t: 'app.delete', handler: this.deleteItem, color: '#F24D5D' }
            ]))
          }
        }
      ],
      fileType: 'role'
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
        width: 400,
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
        width: 400,
        onSub: (el) => {
          // 新增完成后执行操作
          // todo 刷新列表
          this._getList()
        }
      })
    },
    addPerson(row) {
      this.$dialogBox({
        title: this.$t('role.addPerson'),
        components: addPerson,
        width: 650,
        props: { data: row },
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
              message: this.$t('app.delete') + this.$t('app.success')
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

<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.user" :placeholder="$t('user.username')" clearable/>
        </el-form-item>
        <el-form-item>
          <select-remote v-model="searchFrom.sex" :placeholder="$t('user.sex')" filterable clearable data-type="sex"/>
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
import { getList } from '@/views/page/user/service'
import addUser from './addUser.vue'

export default {
  mixins: [list],
  data() {
    return {
      columnsTitle: [
        {
          key: 'username',
          title: this.$t('user.username'),
          width: '100'
        },
        {
          key: 'orgName',
          title: this.$t('user.orgName')
        },
        {
          key: 'jobName',
          title: this.$t('user.jobName')
        },
        {
          key: 'jobLevel',
          title: this.$t('user.jobLevel'),
          width: '80'
        },
        {
          key: 'age',
          title: this.$t('user.age'),
          width: '80',
          unit: this.$t('user.ageUnit')
        },
        {
          key: 'sex',
          title: this.$t('user.sex'),
          dictType: 'sex',
          width: '80',
          render: (h, params) => {
            const f = params.row['_f_sex']
            if (!f) return
            return h('el-tag', { props: { color: f.color }, style: { color: 'white' }}, f.label)
          }
        },
        {
          title: this.$t('app.buttons'),
          width: '60',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', this.iconBtn(h, params, [
              { icon: 'delete', t: 'app.delete', handler: this.deleteItem, color: '#F24D5D' }
            ]))
          }
        }
      ]
    }
  },
  methods: {
    _getList() {
      this.loading = true
      console.log(this.searchData)
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
      this.$dialogBox({
        title: this.$t('app.add'),
        components: addUser,
        width: 700,
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

<style scoped>
</style>

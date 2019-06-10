<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <div class="list-template">
        <search-tem class="list-search" @on-search="onSearch">
          <el-form :inline="true" :model="searchForm">
            <el-form-item>
              <el-input v-model="searchForm.user" :placeholder="$t('user.username')" clearable/>
            </el-form-item>
            <el-form-item>
              <select-remote v-model="searchForm.sex" :placeholder="$t('user.sex')" filterable clearable data-type="sex"/>
            </el-form-item>
            <el-form-item>
              <select-remote v-model="searchForm.status" :placeholder="$t('user.status')" filterable clearable data-type="status"/>
            </el-form-item>
          </el-form>
        </search-tem>
        <div class="table">
          <t-for-col
            :data="list"
            :columns-title="columnsTitle"
            :loading="loading"
            selection
            index
            @select-change="handleSelectionChange"/>
        </div>
        <div>
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
    </div>
    <div class="aou-footer">
      <el-button type="primary" @click="submit">{{ $t('app.submit') }}</el-button>
      <el-button @click="onClose">{{ $t('app.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
import list from '@/libs/mixins/list'
import { getList } from '@/views/page/user/service'

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
          title: this.$t('user.orgName'),
          width: '120'
        },
        {
          key: 'roleName',
          title: this.$t('user.roleName'),
          width: '120'
        },
        {
          key: 'jobName',
          title: this.$t('user.jobName'),
          width: '100'
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
          // searchFilters: [
          //   { text: '> 20', value: 20 },
          //   { text: '> 50', value: 50 }
          // ],
          // sortable: 'custom' // 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
        },
        // renderHeader 用法
        // renderContent 用法
        // {
        //   key: 'age',
        //   title: 'test',
        //   width: '180',
        //   searchFilters: [
        //     { text: 'test1', value: 11 },
        //     { text: 'test2', value: 22 }
        //   ],
        //   renderHeader: (h, params) => {
        //     return h('span', [h('span', params.column.label), iconTooltip(h, '提示')]);
        //   },
        //   render: (h, params) => {
        //     return h('div', [
        //       h('el-input', {
        //         props: { value: params.row.age },
        //         on: {
        //           input: (val) => {
        //             // 通过index找到对应的值 并改变输入值
        //             this.$set(this.list[params.$index], 'age', val);
        //           }
        //         }
        //       })]);
        //   }
        // },
        {
          key: 'sex',
          title: this.$t('user.sex'),
          filters: 'sex',
          width: '80',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
          }
        },
        {
          key: 'isWork',
          title: this.$t('user.isWork'),
          width: '100',
          render: (h, params) => {
            return h('span', params.row.isWork ? '否' : '是')
          }
        },
        {
          key: 'createTime',
          title: this.$t('user.createTime'),
          filters: 'parseTime',
          width: '180'
        },
        {
          key: 'status',
          title: this.$t('user.status'),
          filters: 'status',
          render: (h, params, val) => {
            return h('el-tag', { props: { color: val.color }, style: { color: 'white' }}, val.label)
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
    // 提交按钮
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 验证通过
          if (this.form.id) {
            this.edit()
          } else {
            this.add()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

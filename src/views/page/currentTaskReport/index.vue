<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchData">
        <el-form-item>
          <el-input v-model="searchData.name" :placeholder="$t('tasks.name')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchData.expiryDate"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            type="daterange"
            clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/> -->
      <!-- <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/> -->
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/>
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
import dialog from '@/libs/mixins/dialog'
import { getList } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'deviceNo',
          title: this.$t('currentTaskReport.deviceNo'),
          width: '160'
        },
        {
          key: 'currentDriver',
          title: this.$t('currentTaskReport.currentDriver')
        },
        {
          key: 'workTime',
          title: this.$t('currentTaskReport.workTime')
        },
        {
          key: 'workNum',
          title: this.$t('currentTaskReport.workNum')
        },
        {
          key: 'workAmount',
          title: this.$t('currentTaskReport.workAmount'),
          unit: this.$t('currentTaskReport.workAmountUnit')
        }
      ],
      fileType: 'currentTaskReport',
      fileName: this.$t('route.' + this.$route.name)
    }
  },
  methods: {
    _getList() {
      this.loading = true
      getList().then(res => {
        setTimeout(() => {
          this.loading = false
          this.list = res.data.list
          this.list = this.list.map(item => {
            this.$set(item, 'datetime', new Date().getTime())
            return item
          })
          console.log(this.list)
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
    }
  }
}
</script>

<style scoped>
</style>

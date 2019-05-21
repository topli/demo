<template>
  <div class="list-template">
    <!--{{ pageName }}-->
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom" label-position="right">
        <el-form-item prop="GpsID" label="设备GPS ID">
          <el-input v-model="ruleForm.gpsID" placeholder="GPS ID" clearable/>
        </el-form-item>
        <el-form-item prop="StartTime" label="起始时间">
          <el-date-picker v-model="ruleForm.StartTime" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
        <el-form-item prop="TargetResv" label="查询属性">
          <el-input v-model="ruleForm.TargetResv" placeholder="属性名称" clearable/>
        </el-form-item>
        <el-form-item prop="EndTime" label="结束时间">
          <el-date-picker v-model="ruleForm.EndTime" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/>
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
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'
import { getList } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      pageName: this.$t('route.' + this.$route.meta.title),
      gpsID: '',
      columnsTitle: [
        {
          key: 'gpsNo',
          title: this.$t('realWorking.gpsNo'),
          minWidth: '120'
        },
        {
          key: 'oilConsumption',
          title: this.$t('realWorking.oilConsumption'),
          minWidth: '180'
        },
        {
          key: 'timeCount',
          title: this.$t('realWorking.timeCount'),
          minWidth: '120'
        },
        {
          key: 'loadCount',
          title: this.$t('realWorking.loadCount'),
          minWidth: '150'
        },
        {
          key: 'maintenanceTime',
          title: this.$t('realWorking.maintenanceTime'),
          minWidth: '130'
        },
        {
          key: 'oilRate',
          title: this.$t('realWorking.oilRate'),
          wiminWidthdth: '130'
        },
        {
          key: 'createTime',
          title: this.$t('realWorking.createTime'),
          minWidth: '250'
        }
      ],
      ruleForm: {
        GpsID: '',
        StartTime: '',
        EndTime: '',
        TargetResv: ''
      }
    }
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
    }
  }
}
</script>

<style scoped>
</style>

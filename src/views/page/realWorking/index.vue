<template>
  <div class="list-template">
    <!--{{ pageName }}-->
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom" label-position="right">
        <el-form-item prop="GpsID" label="">
          <el-input v-model="ruleForm.gpsID" placeholder="GPS ID" clearable/>
        </el-form-item>
        <el-form-item prop="StartTime" label="">
          <el-date-picker v-model="ruleForm.StartTime" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
        <el-form-item prop="TargetResv" label="">
          <el-input v-model="ruleForm.TargetResv" placeholder="属性名称" clearable/>
        </el-form-item>
        <el-form-item prop="EndTime" label="">
          <el-date-picker v-model="ruleForm.EndTime" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-form-item>
      </el-form>
    </search-tem>
    <!-- <div class="btns">
      <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/>
    </div> -->
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
          key: 'mieNo',
          title: this.$t('realWorking.mieNo'),
          minWidth: '120'
        },
        {
          key: 'gpsNo',
          title: this.$t('realWorking.gpsNo'),
          minWidth: '120'
        },
        {
          key: 'mieIp',
          title: this.$t('realWorking.mieIp'),
          minWidth: '120'
        },
        {
          key: 'actionNo',
          title: this.$t('realWorking.actionNo'),
          minWidth: '120'
        },
        {
          key: 'gear',
          title: this.$t('realWorking.gear'),
          minWidth: '90'
        },
        {
          key: 'operatingMode',
          title: this.$t('realWorking.operatingMode'),
          minWidth: '90'
        },
        {
          key: 'address',
          title: this.$t('realWorking.address'),
          minWidth: '220'
        },
        {
          key: 'engineSpeed',
          title: this.$t('realWorking.engineSpeed'),
          minWidth: '90'
        },
        {
          key: 'oilLevel',
          title: this.$t('realWorking.oilLevel'),
          minWidth: '90'
        },
        {
          key: 'waterTemperature',
          title: this.$t('realWorking.waterTemperature'),
          minWidth: '120'
        },
        {
          key: 'hydraulicTemperature',
          title: this.$t('realWorking.hydraulicTemperature'),
          minWidth: '100'
        },
        {
          key: 'fuelconsumptionTime',
          title: this.$t('realWorking.fuelconsumptionTime'),
          minWidth: '120'
        },
        {
          key: 'fuelconsumptionAverage',
          title: this.$t('realWorking.fuelconsumptionAverage'),
          minWidth: '120'
        },
        {
          key: 'oilRate',
          title: this.$t('realWorking.oilRate'),
          minWidth: '130'
        },
        {
          key: 'batteryVoltage',
          title: this.$t('realWorking.batteryVoltage'),
          minWidth: '120'
        },
        {
          key: 'lockMachineTime',
          title: this.$t('realWorking.lockMachineTime'),
          minWidth: '120'
        },
        {
          key: 'Htime',
          title: this.$t('realWorking.Htime'),
          minWidth: '120'
        },
        {
          key: 'Hoil',
          title: this.$t('realWorking.Hoil'),
          minWidth: '120'
        },
        {
          key: 'Stime',
          title: this.$t('realWorking.Stime'),
          minWidth: '120'
        },
        {
          key: 'Soil',
          title: this.$t('realWorking.Soil'),
          minWidth: '120'
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

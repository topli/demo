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
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="Time"
        label="日期"
        width="180"/>
      <el-table-column
        prop="GpsID"
        label="GPS编号"
        width="180"/>
      <el-table-column
        prop="RD_FloatResv5"
        label="总油耗"/>
      <el-table-column
        prop="RD_TotalWKTime"
        label="总工作时间"/>
      <el-table-column
        prop="RD_FloatResv8"
        label="总装车次数"/>
      <el-table-column
        prop="RD_FloatResv28"
        label="保养确认时工作时间"/>
      <el-table-column
        prop="RD_FloatResv29"
        label="燃油利用率"/>

    </el-table>
  </div>
</template>

<script>
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'

export default {
  mixins: [list, dialog],
  data() {
    return {
      pageName: this.$t('route.' + this.$route.meta.title),
      gpsID: '',
      tableData: [{
        Time: '2016-05-02',
        GpsID: '0819BA2F',
        RD_FloatResv5: '18987L',
        RD_TotalWKTime: '815小时',
        RD_FloatResv8: '23',
        RD_FloatResv28: '80小时',
        RD_FloatResv29: '78%'
      }, {
        Time: '2016-05-02',
        GpsID: '0819BA2F',
        RD_FloatResv5: '18987L',
        RD_TotalWKTime: '815小时',
        RD_FloatResv8: '23',
        RD_FloatResv28: '80小时',
        RD_FloatResv29: '78%'
      }, {
        Time: '2016-05-02',
        GpsID: '0819BA2F',
        RD_FloatResv5: '18987L',
        RD_TotalWKTime: '815小时',
        RD_FloatResv8: '23',
        RD_FloatResv28: '80小时',
        RD_FloatResv29: '78%'
      }, {
        Time: '2016-05-02',
        GpsID: '0819BA2F',
        RD_FloatResv5: '18987L',
        RD_TotalWKTime: '815小时',
        RD_FloatResv8: '23',
        RD_FloatResv28: '80小时',
        RD_FloatResv29: '78%'
      }],
      ruleForm: {
        GpsID: '',
        StartTime: '',
        EndTime: '',
        TargetResv: ''
      }
    }
  }
}
</script>

<style scoped>
</style>

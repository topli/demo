<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.alarmType" :placeholder="$t('deviceError.alarmType')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.expiryDate"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            type="daterange"
            clearable/>
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
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/> -->
      <!-- <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/>
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/> -->
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
import add from './add'
import dialog from '@/libs/mixins/dialog'
import { getList } from './service'

export default {
  mixins: [list, dialog],
  data() {
    return {
      doList: [
        '报警已处理',
        '预警已处理',
        '预警未处理',
        '预警已处理',
        '报警未处理'
      ],
      columnsTitle: [
        {
          key: 'org',
          title: this.$t('deviceErrorReport.org'),
          minWidth: '120'
        },
        {
          key: 'errorNum',
          title: this.$t('deviceErrorReport.errorNum'),
          unit: this.$t('deviceErrorReport.errorNumUnit'),
          minWidth: '120'
        },
        {
          key: 'deviceNum',
          title: this.$t('deviceErrorReport.deviceNum'),
          unit: this.$t('deviceErrorReport.deviceNumUnit'),
          minWidth: '120'
        },
        {
          key: 'errorRate',
          title: this.$t('deviceErrorReport.errorRate'),
          unit: this.$t('deviceErrorReport.errorRateUnit'),
          minWidth: '120'
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
        console.log(res)
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
      // this.$alert('<i style="margin-right: 6px" class="' + (this.doList[row.id].indexOf('已') > -1 ? 'el-icon-success' : 'el-icon-warning') + '"></i><h3 style="display: inline-block">' + this.doList[row.id] + '</h3>', '处理结果', {
      //   dangerouslyUseHTMLString: true
      // })
      this.$dialogBox({
        title: this.$t('app.modify'),
        components: add,
        width: 700,
        props: { data: row },
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

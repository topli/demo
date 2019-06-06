<template>
  <div class="export-template">
    <div class="export-body">
      <el-radio v-model="radio" label="1">{{ $t('app.currentPageExport') }}</el-radio>
      <el-radio v-model="radio" label="2">{{ $t('app.conditionExport') }}</el-radio>
    </div>
    <div class="export-footer">
      <el-button type="primary" @click="submit">{{ $t('app.submit') }}</el-button>
      <el-button type="ghost" @click="onClose">{{ $t('app.cancel') }}</el-button> <!-- onClose 内置关闭弹出层方法 -->
    </div>
  </div>
</template>

<script>
import { getStorage, parseTime } from '@/libs/utils'
export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    propObject: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      radio: '1'
    }
  },
  methods: {
    submit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        this.handleDownload(this.propObject)
        loading.close()
        this.onSub()
      }, 2000)
    },
    handleDownload(propObject) {
      this.downloadLoading = true
      import('@/libs/utils/exportExcel').then(excel => {
        const [tHeader, filterVal] = [[], []]
        propObject.columnsTitle.forEach(item => {
          tHeader.push(item.title)
          filterVal.push(item.key)
        })
        const localData = JSON.parse(getStorage('localData'))
        let list = localData[propObject.fileType].list
        if (propObject.searchData.pageNo && propObject.searchData.pageSize) {
          list = list.slice((propObject.searchData.pageNo - 1) * propObject.searchData.pageSize, (propObject.searchData.pageNo * propObject.searchData.pageSize) > list.length ? list.length : propObject.searchData.pageNo * propObject.searchData.pageSize)
        }
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.propObject.fileName,
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
  .export-template {
    .export-body{
      z-index:1
    }
    .export-footer{
      padding: 20px 0 0 0;
      text-align: right;
    }
  }
</style>

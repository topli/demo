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
import { getStorage } from '@/libs/utils'
import Vue from 'vue'
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
    handleDownload(obj) {
      const propObject = JSON.parse(JSON.stringify(obj))
      this.downloadLoading = true
      import('@/libs/utils/exportExcel').then(excel => {
        const tHeader = []
        propObject.columnsTitle.forEach(item => {
          if (item.unit) item.title = item.title + '(' + item.unit + ')'
          tHeader.push(item.title)
        })
        const localData = JSON.parse(getStorage('localData'))
        let list = localData[propObject.fileType].list
        if (propObject.searchData.pageNo && propObject.searchData.pageSize) {
          list = list.slice((propObject.searchData.pageNo - 1) * propObject.searchData.pageSize, (propObject.searchData.pageNo * propObject.searchData.pageSize) > list.length ? list.length : propObject.searchData.pageNo * propObject.searchData.pageSize)
        }
        const data = this.formatJson(list)
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
    formatJson(list) {
      return list.map(l => {
        return this.propObject.columnsTitle.map(c => {
          if (c.filters) {
            let v = null
            const type = c.filters.split('|').slice(0, 1)
            const params = c.filters.split('|').slice(1, c.filters.length)
            const test = Vue.filter(type)
            if (test) {
              v = test(l[c.key], ...params)
            } else {
              const getDictDatas = Vue.filter('getDictDatas')
              if (!getDictDatas) {
                console.error('not define filters: ' + c.filters)
                return
              }
              v = getDictDatas(l[c.key], c.filters)
            }
            return typeof v === 'string' ? v : v.label
          }
          return l[c.key]
        })
      })
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

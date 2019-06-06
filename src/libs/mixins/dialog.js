/**
 *  混合列表模板
 */
import importTemplate from '@/components/Import/index'
import exportTemplate from '@/components/export/index'

export default {
  data() {
    return {
      fileType: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    importFun() {
      if (!this.fileType) {
        console.log(this.$t('app.fileTypeNullError'))
        this.$message.error(this.$t('app.fileTypeNullError'))
        return
      }
      this.$dialogBox({ components: importTemplate, title: '导入', width: '400px', propsData: { fileType: this.fileType }})
    },
    exportFun() {
      if (!this.fileType) {
        console.log(this.$t('app.fileTypeNullError'))
        this.$message.error(this.$t('app.fileTypeNullError'))
        return
      }
      this.$dialogBox({ components: exportTemplate, title: '导出', width: '400px', props: { propObject: { fileType: this.fileType, searchData: this.searchData, columnsTitle: this.columnsTitle, fileName: this.fileName }}})
    }
  },
  watch: {}
}

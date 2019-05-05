/**
 *  混合列表模板
 */
// import 'static/styles/aou.scss' // 新增弹窗样式
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
        console.log(this.$t('consoleError.fileTypeNullError'))
        this.$message.error(this.$t('consoleError.fileTypeNullError'))
        return
      }
      this.$dialogBox({ components: importTemplate, title: '导入', width: '400px', propsData: { fileType: this.fileType }})
    },
    exportFun() {
      this.$dialogBox({ components: exportTemplate, title: '导出', width: '400px', propsData: { fileType: this.fileType }})
    }
  },
  watch: {}
}

/**
 *  混合列表模板
 */
import { mapActions, mapGetters } from 'vuex'
import loading from './loading'
import { iconBtn } from '@/libs/utils/table'
import { confirm } from '@/libs/utils'
import '@/styles/list-tem.scss' // 列表样式

export default {
  mixins: [loading],
  data() {
    return {
      list: [],
      // 系统默认查询条件
      searchData: {
        pageNo: 1,
        pageSize: 20
      },
      loading: false,
      // 用户输入查询条件
      searchFrom: {},
      pageSizeOpts: [10, 20, 50, 100],
      multipleSelection: [],
      totalElement: 0
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this._getList()
  },
  mounted() {
  },
  methods: {
    ...mapActions([]),
    iconBtn, // 创建操作按钮方法
    confirm, // 删除提示框
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    onSearch() {
      if (!this.loading) return
      this.searchData = Object.assign(this.searchData, this.searchFrom)
      this.searchData.pageNo = 1
      // 删除查询条件中为空的值  包括值为0的
      for (const k in this.searchData) {
        if (!this.searchData[k]) {
          delete this.searchData[k]
        }
      }
      this._getList()
    },
    handleSizeChange(val) {
      this.searchData.pageSize = val
      this._getList()
    },
    handleCurrentChange(val) {
      this.searchData.pageNo = val
      this._getList()
    }
  },
  watch: {}
}

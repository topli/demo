<template>
  <transition name="fade">
    <el-table
      v-loading="tableLoading"
      :data="data"
      :height="tableHeight"
      :border="border"
      :stripe="stripe"
      :tree-props="treeProps"
      row-key="id"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @row-dblclick="rowDblclick">
      <el-table-column
        v-if="selection"
        fixed
        type="selection"
        align="center"
        width="55"/>
      <el-table-column
        v-if="index"
        type="index"
        align="center"
        width="70"/>
      <template v-for="col in columnsTitle">
        <el-table-column
          :key="col.key"
          :prop="col.key"
          :fixed="col.fixed || null"
          :align="col.align || 'left'"
          :label="label(col)"
          :width="col.width || null"
          :min-width="col.minWidth || null"
          :render-header="col.renderHeader"
          :filters="col.searchFilters"
          :filter-method="col.filterMethod"
          :sortable="col.sortable"
          :sort-method="col.sortMethod"
          filter-placement="bottom">
          <template slot-scope="scope">
            <render-column
              v-if="col.render || col.filters"
              :render-content="col.render"
              :scope="scope"
              :prop="col.key"
              :filters="col.filters"/>
            <span v-else>
              {{ scope.row[col.key] }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </transition>
</template>

<script>
import renderColumn from './render-column'
export default {
  components: { renderColumn },
  props: {
    selection: { type: Boolean, default: false },
    index: { type: Boolean, default: false },
    data: { type: Array, required: true },
    columnsTitle: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    sortChange: { type: Function, default: function() {} },
    border: { type: Boolean, default: true },
    stripe: { type: Boolean, default: true },
    height: { type: [String, Number], default: 0 },
    treeProps: { type: Object, default: function() {} }
  },
  data() {
    return {
      tableHeight: 0
    }
  },
  computed: {
    tableLoading() {
      return this.loading
    }
  },
  watch: {
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.setTableHeight)
    this.setTableHeight()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setTableHeight)
  },
  methods: {
    label(col) {
      return col.title + (col.unit ? '(' + col.unit + ')' : '')
    },
    handleSelectionChange(selection) {
      if (!this.selection) return
      this.$emit('select-change', selection)
    },
    rowDblclick() {
      this.$emit('row-dblclick', ...arguments)
    },
    setTableHeight() {
      // document.body.clientHeight 窗口大小
      // 50 右侧头部高度
      // this.$el.offsetTop 表格距离父级窗口的距离
      // 70 分页部分高度
      this.$nextTick(() => {
        this.tableHeight = this.height || document.body.clientHeight - 50 - this.$el.offsetTop - 70
      })
    }
  }
}
</script>

<style>
/*动画效果*/
@-webkit-keyframes fadeIn {
	0% {
    opacity: 1; /*初始状态 透明度为0*/
	}
	20%{
		opacity: .7;
	}
	50% {
		opacity: .5; /*中间状态 透明度为0.5*/
	}
	70%{
		opacity: .2;
	}
	100% {
		opacity: 0; /*结尾状态 透明度为1*/
	}
}
[class*="el-table__row--level"]{
  animation: fadeIn 1s ease
}
</style>

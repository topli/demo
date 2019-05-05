<template>
  <transition name="fade">
    <el-table
      v-loading="tableLoading"
      :data="data"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange">
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
          show-overflow-tooltip
          filter-placement="bottom">
          <template slot-scope="scope">
            <render-column
              :render-content="col.render"
              :scope="scope"
              :prop="col.key"
              :filters="col.filters"/>
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
    sortChange: { type: Function, default: function() {} }
  },
  data() {
    return {
      tableHeight: 0
    }
  },
  computed: {
    tableLoading() {
      return this.loading
    },
    height() {
      if (this.tableHeight < 220) {
        return 220
      }
      return this.tableHeight
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    label(col) {
      return col.title + (col.unit ? '(' + col.unit + ')' : '')
    },
    handleSelectionChange(selection) {
      if (!this.selection) return
      this.$emit('select-change', selection)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <!-- org-tree -->
  <div v-clickoutside="handleClickOutside" id="org-tree" class="org-tree" style="position: relative">
    <el-input slot="reference" :placeholder="placeholder" v-model="checkedStr" :clearable="clearable" type="text" @focus="togglePopover">
      <svg-icon slot="suffix" icon-class="file-tree"/>
    </el-input>
    <transition name="el-zoom-in-top"> <!-- el-zoom-in-top by element-ui transiton.scss-->
      <div v-show="visible" :style="{width: clientWidth}" style="position: fixed;z-index: 99999;">
        <el-scrollbar ref="scrollbar" class="tree-data">
          <el-input v-model="filterText" type="text" class="filter-tree-text" placeholder="过滤组织" clearable/>
          <el-tree
            ref="tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterTree"
            :default-checked-keys="checkedKeys"
            :check-strictly="checkStrictly"
            node-key="id"
            default-expand-all
            show-checkbox
            @check="getChecked"
          />
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { valueEquals } from 'element-ui/src/utils/util'
import { getStorage } from '@/libs/utils'
export default {
  directives: { Clickoutside },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Object, String, Array, Number],
      default: function() {}
    },
    label: {
      type: [String, Array],
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    clearable: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      data: [],
      visible: false,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      checkedKeys: [],
      checkedStr: '',
      clientWidth: '200px'
    }
  },
  computed: {
    checkStrictly() {
      return !this.multiple
    }
  },
  watch: {
    checkedStr(val) {
      if (!val) {
        this.$refs.tree.setCheckedNodes([])
      }
    },
    filterText(val) {
      this.$refs.tree && this.$refs.tree.filter(val)
    },
    visible(val) {
      if (!val) return
      this.filterText = ''
      this.setElScrollTop()
    },
    value(val, old) {
      // 判断是否改变
      if (valueEquals(val, old)) {
        return
      }
      this.checkedKeys = val
      this.$refs.tree.setCheckedNodes(val)
      this.$forceUpdate()
      this.$nextTick(() => {
        const inputStr = []
        const inputValue = []
        this.$refs.tree.getCheckedNodes().forEach((item) => {
          inputStr.push(item.orgName)
          inputValue.push(item.id)
        })
        this.checkedStr = inputStr.toString()
      })
    }
  },
  created() {
  },
  mounted() {
    if (this.value) {
      this.checkedKeys = [this.value]
    }
    if (this.label) {
      this.checkedStr = this.label.toString()
    }
    this.clientWidth = document.getElementById('org-tree').clientWidth + 'px'
    this.data = JSON.parse(getStorage('localData')).org.list
  },
  methods: {
    setElScrollTop() {
      const div = this.$refs['scrollbar'].$refs['wrap']
      this.$nextTick(() => {
        div.scrollTop = 0
      })
    },
    togglePopover() {
      this.visible = true
    },
    handleCheckChange() {
    },
    handleClickOutside() {
      if (!this.visible) return
      this.visible = false
      this.checkedKeys = this.$refs.tree.getCheckedKeys()
      const inputStr = []
      const inputValue = []
      this.$refs.tree.getCheckedNodes().forEach((item) => {
        inputStr.push(item.orgName)
        inputValue.push(item.id)
      })
      console.log(inputValue)
      this.$emit('input', inputValue)
      this.$emit('getTreeNode', this.$refs.tree.getCheckedNodes())
      this.checkedStr = inputStr.toString()
    },
    filterTree(value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    getChecked(data) {
      if (!this.multiple) {
        this.$refs.tree.setCheckedNodes([data])
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter {
    height: 0px;
  }
  .fade-enter-to {
    height: 200px;
    opacity: 1;
  }
  .fade-leave {
    height: 200px;
  }
  .fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    height: 0px;
    opacity: 0;
  }
  .org-tree {
    z-index: auto;
    .tree-data {
      background-color: white;
      overflow: hidden !important;
      /*position: absolute;*/
      width: 100%;
      height: 200px;
      margin-top: 6px;
      border: 1px solid #dcdfe6;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      .filter-tree-text{
        padding: 10px;
      }
     }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .org-tree {
  .tree-data {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-input__suffix {
      margin-right: 5px;
    }
   }
  }
</style>

<template>
  <!-- org-tree -->
  <div v-clickoutside="handleClickOutside" id="org-tree" class="org-tree" style="position: relative">
    <el-input slot="reference" :placeholder="placeholder" v-model="checkedStr" type="text" readonly @focus="togglePopover">
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
            node-key="id"
            default-expand-all
            show-checkbox
          />
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { valueEquals } from 'element-ui/src/utils/util'

export default {
  directives: { Clickoutside },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Array],
      default: () => []
    }
  },
  data() {
    const data = [
      {
        id: 9999,
        orgName: '北京总公司',
        type: 'org',
        children: [
          {
            id: 1,
            orgName: '山西分公司',
            state: true,
            code: 'BM1',
            linkman: '张三',
            phone: '13211111111',
            parentId: 9999,
            parentName: '顶级机构',
            parentType: 'org',
            children: [
              {
                id: 5,
                orgName: '财务部',
                state: true,
                code: 'ZBM1',
                linkman: '于敏',
                phone: '13345842125',
                parentId: 2,
                parentName: '山西分公司'
              }, {
                id: 6,
                orgName: '调度部',
                state: true,
                code: 'ZBM2',
                linkman: '吴磊',
                phone: '18621521782',
                parentId: 2,
                parentName: '山西分公司'
              }, {
                id: 6,
                orgName: '设备管理部',
                state: true,
                code: 'ZBM2',
                linkman: '潘奕',
                phone: '15156498213',
                parentId: 2,
                parentName: '山西分公司'
              }
            ]
          }
          // {
          //   id: 3,
          //   orgName: '分公司1',
          //   state: true,
          //   code: 'BM1',
          //   linkman: '张三',
          //   phone: '13211111111',
          //   parentId: 9999,
          //   parentName: '顶级机构',
          //   parentType: 'org'
          // },
          // {
          //   id: 2,
          //   orgName: '分公司2',
          //   state: true,
          //   code: 'BM2',
          //   linkman: '李四',
          //   phone: '1322222222',
          //   parentId: 9999,
          //   parentName: '顶级机构',
          //   parentType: 'org',
          //   children: [
          //     {
          //       id: 5,
          //       orgName: '财务',
          //       state: true,
          //       code: 'ZBM1',
          //       linkman: '王五',
          //       phone: '1313333333',
          //       parentId: 2,
          //       parentName: '部门2'
          //     }, {
          //       id: 6,
          //       orgName: '调度',
          //       state: true,
          //       code: 'ZBM2',
          //       linkman: '赵六',
          //       phone: '1511111111',
          //       parentId: 2,
          //       parentName: '部门2'
          //     }
          //   ]
          // }
        ]
      }]
    return {
      data: data,
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
  computed: {},
  watch: {
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
          inputStr.push(item.label)
          inputValue.push(item.id)
        })
        this.checkedStr = inputStr.toString()
      })
    }
  },
  created() {
  },
  mounted() {
    this.clientWidth = document.getElementById('org-tree').clientWidth + 'px'
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
        inputStr.push(item.label)
        inputValue.push(item.id)
      })
      this.$emit('input', inputValue)
      this.checkedStr = inputStr.toString()
    },
    filterTree(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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

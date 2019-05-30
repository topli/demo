<style lang="scss" scoped>
</style>
<template>
  <Input v-if="disabled" v-model="inStr" disabled>
  <Poptip v-else v-model="showPoptip" style="width: 100%;" placement="bottom-start">
    <Input ref="pId" v-model="inStr" :placeholder="placeholderStr" clearable @on-focus="handlerFocus" @on-blur="handlerBlur" @on-change="handlerChange">
    <div ref="tree" slot="content" class="api" style="text-align: left;">
      <Tree :data="treeCopy" @on-select-change="handleSelectTree"/>
    </div>
  </Poptip>
</template>
<script>
export default {
  name: 'HyOrgSelectCode',
  props: {
    value: [String, Number],
    data: {
      type: Array,
      default: []
    },
    label: String,
    code: String,
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPoptip: false,
      placeholderStr: '',
      inStr: '',
      tree: [],
      treeCopy: [],
      selectNode: {
        title: '',
        id: ''
      }
    }
  },
  watch: {
    data: function(oldData) {
      this.tree = oldData
      this.treeCopy = oldData
    },
    value: function(val) {
      if (val || (this.label && this.label !== '')) {
        const selectNode = this.updateOptions()
        if (selectNode) {
          this.selectNode = selectNode
          this.inStr = selectNode.title
          this.$emit('input', selectNode.code)
        } else if (this.label !== '') {
          this.selectNode = { code: val, title: this.label }
          this.inStr = this.label
          this.$emit('input', val)
        }
      } else {
        this.selectNode = {}
        this.inStr = ''
        this.$emit('input', '')
        //          this.$emit('code', '');
      }
    },
    label: function(val) {
      //          if (!this.inStr) this.label = '';
      this.inStr = val
    }
  },
  created() {
    this.tree = this.data
    this.treeCopy = this.data
    this.placeholderStr = this.placeholder
  },
  methods: {
    handlerBlur() {
      if (this.inStr) {
        if (this.selectNode.title && this.selectNode.title !== '') {
          this.inStr = this.selectNode.title
          this.$emit('input', this.selectNode.code)
        } else {
          this.inStr = ''
          this.$emit('input', '')
          this.$emit('code', '')
        }
      } else {
        this.selectNode = {}
        this.inStr = ''
        this.$emit('input', '')
        this.$emit('code', '')
      }
    },
    handlerFocus() {
      this.treeCopy = this._hyTool.deepCopy(this.tree)
      // 获取父级节点文本框宽度
      const inputWidth = this.$refs.pId.$el.offsetWidth
      // 设置树div宽度
      this.$refs.tree.style.width = inputWidth - 32 + 'px'
    },
    handleSelectTree(node) {
      this.inStr = node[0].title
      const value = node[0].code
      this.selectNode = node[0]
      this.$emit('input', value)
      this.$emit('code', node[0].code) // 20180712 change code
      if (this.$parent.prop) {
        this.$parent.form.validateField(this.$parent.prop)
      }
      this.$emit('get-selectNode', node[0])
      this.showPoptip = false
    },
    handlerChange() {
      // 过滤树节点
      if (this.inStr) {
        // 键盘输入重复执行问题解决
        this.debounce(500, () => {
          this.treeCopy = this._hyTool.deepCopy(this.tree)
          this.treeCopy = this._hyTool.filterTreeData(this, this.treeCopy, this.inStr)
        })
      } else {
        this.treeCopy = this._hyTool.deepCopy(this.tree)
        this.inStr = ''
        this.$emit('input', '')
        this.$emit('code', '')
        this.inStr = ''
        this.$emit('name', 'null') // clearOrgName 用于回传取出值之后，清除掉输入框时，name也清除掉
      }
    },
    debounce(time, action) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        action && action()
      }, time)
    },
    findChild(cb) {
      const _this = this
      const find = function(child) {
        if (child.code === _this.value || child.title === _this.label) {
          cb(child)
        }
        if (child.children.length) {
          child.children.forEach((innerChild) => {
            find(innerChild, cb)
          })
        }
      }
      if (this.treeCopy.length) {
        this.treeCopy.forEach((child) => {
          find(child)
        })
      }
    },
    updateOptions() {
      const options = []
      this.findChild((child) => {
        options.push(child)
      })
      return options[0]
    }
  }
}
</script>

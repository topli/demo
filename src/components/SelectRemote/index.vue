<template>
  <div class="select-remote">
    <el-select
      v-if="remote"
      v-model="selectValue"
      :loading="loading"
      :remote-method="remoteMethod"
      :placeholder="placeholder"
      :filterable="filterable"
      :clearable="clearable"
      :multiple="multiple"
      :collapse-tags="multiple"
      remote
      reserve-keyword
      @focus.once="getRemoteData">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-else
      v-model="selectValue"
      :loading="loading"
      :placeholder="placeholder"
      :filterable="filterable"
      :clearable="clearable"
      :multiple="multiple"
      :collapse-tags="multiple"
      reserve-keyword>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // 查询数据类型
    value: {
      type: [Object, String, Number, Array, Boolean],
      default: function() {}
    },
    dataType: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    remoteQuery: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    propsDefalut: {
      type: Object,
      default: () => {
        return { value: 'value', label: 'label' }
      }
    }
  },
  data() {
    return {
      options: [],
      selectValue: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['dictData'])
  },
  watch: {
    value: function(val) {
      if (!val) return
      this.selectValue = this.value
      this.$emit('input', val)
    },
    selectValue: function(val) {
      if (!val) return
      this.$emit('input', val)
    },
    dictData: function() {
      this.getOptions()
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      if (!this.remote) {
        this.getOptions()
      }
      if (this.multiple) {
        let value = []
        if (this.value) {
          if (typeof this.value === 'string') {
            value = this.value.split(',')
          } else {
            value = this.value
          }
        } else {
          value = []
        }
        this.selectValue = value || null
      } else {
        this.selectValue = this.value ? this.value + '' : null
      }
    },
    getOptions() {
      let data = []
      // 本地数据中查询字典值
      if (this.dictData && this.dictData[this.dataType]) {
        data = this.dictData[this.dataType]
      }
      this.options = data
    },
    remoteMethod(query) {
      if (query !== '') {
        this.getRemoteData(query)
      } else {
        this.options = []
      }
    },
    getRemoteData(query) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.remoteQuery(query).then((res) => {
          this.options = res.data.list && res.data.list.map(item => {
            return {
              value: item[this.propsDefalut.value],
              label: item[this.propsDefalut.label]
            }
          })
        }).catch(() => {
          this.options = []
        })
      }, 200)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.select-remote{
  width: 100%
}
</style>

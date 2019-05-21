<template>
  <div class="select-remote">
    <el-select
      v-if="remote"
      v-model="value"
      :loading="loading"
      :remote-method="remoteMethod"
      :placeholder="placeholder"
      :filterable="filterable"
      :clearable="clearable"
      :multiple="multiple"
      remote
      reserve-keyword>
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
    }
  },
  data() {
    return {
      options: [],
      selectValue: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['dictData'])
  },
  watch: {
    value: function(val) {
      this.selectValue = this.value
      this.$emit('input', val)
    },
    dictData: function() {
      this.getOptions()
    }
  },
  mounted() {
    this.getOptions()
    this.selectValue = this.value
  },
  methods: {
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
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.remoteQuery(query).then((res) => {})
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options4 = []
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.select-remote{
  width: 100%
}
</style>

<template>
  <div>
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
      v-model="value"
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
      value: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['dictData'])
  },
  watch: {
    value: function(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    let data = []
    // 先到本地数据中查询字典值
    if (this.dictData && this.dictData[this.dataType]) {
      data = this.dictData[this.dataType]
    }
    // 如果不存在查询公用字典方法
    if (!data.length) {
      // 调用字典方法
    }
    this.options = data
  },
  methods: {
    remoteMethod(query) {
      console.log(query)
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
</style>

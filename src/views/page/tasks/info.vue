<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.name')">
              <span>{{ form.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.org')">
              <span>{{ form.orgName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.level')">
              <span>{{ form.level === 1 ? '高' : (form.level === 2 ? '中' : '低') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.enclosure')" prop="enclosure">
              <span>{{ form.enclosure }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.goods')" prop="goods">
              <span>{{ form.goods }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.totalQuqntity')" prop="totalQuqntity">
              <span>{{ form.totalQuqntity + '吨' }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.receiving')" prop="receiving">
              <span>{{ form.receiving }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.receivingMode')" prop="receivingMode">
              <span>{{ form.receivingMode }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.receivingPerson')" prop="receivingPerson">
              <span>{{ form.receivingPerson }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.receivingPhone')" prop="receivingPhone">
              <span>{{ form.receivingPhone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.expiryDate')" prop="expiryDate">
              <span>{{ form.expiryDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.describe')" prop="expiryDate">
              <span>{{ form.describe }}</span>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.status')" prop="expiryDate">
              <span>{{ form.status }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tasks.line')" prop="deviceTypeNum">
              <span>{{ form.line }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('tasks.device')" prop="deviceTypeNum">
              <template v-for="(item, i) in form.deviceList">
                <div :key="i">
                  设备类型<span>{{ item.deviceType }}</span>
                  设备数量<span>{{ item.number }}</span>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: null }
  },
  data() {
    return {
      form: this.data ? Object.assign({}, this.data) : {},
      loading: false,
      rules: {
      },
      deviceList: [
        { deviceType: 1, number: 3 }
      ]
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.form.expiryDate = this.form.expiryDate[0].slice(0, 10) + ' 至 ' + this.form.expiryDate[1].slice(0, 10)
      // this.form.newDevice = this.form.deviceTypeNum.slice(0, 3)
    }
  }
}
</script>

<style lang="scss" scoped>
.device-list{
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 534px;
  padding: 10px 20px;
  .el-row{
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('alarmSet.status')">
          <el-switch v-model="form.status"/>
        </el-form-item>
        <br>
        <el-form-item :label="$t('alarmSet.equipmentNumber')" prop="equipmentNumber">
          <el-input :disabled="!!form.id" v-model="form.equipmentNumber" />
        </el-form-item>
        <el-form-item :label="$t('alarmSet.deviceType')">
          <select-remote v-model="form.deviceType" filterable clearable disabled data-type="deviceType"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.fuel') + '(L)'" prop="fuel">
          <el-input v-model.number="form.fuel"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.temperature') + '(°C)'" prop="temperature">
          <el-input v-model="form.temperature"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.pressure') + '(Kpa)'" prop="pressure">
          <el-input v-model="form.pressure"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('alarmSet.range') + '(m)'" prop="range">
          <el-input v-model="form.range"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.beyondRange') + '(s)'" prop="beyondRange">
          <el-input v-model="form.beyondRange"/>
        </el-form-item> -->
        <el-form-item :label="$t('alarmSet.workingTime') + '(h)'" prop="workingTime">
          <el-input v-model="form.workingTime"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.loadingCapacity') + '(kg)'" prop="loadingCapacity">
          <el-input v-model="form.loadingCapacity"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.speed') + '(km/h)'" prop="speed">
          <el-input v-model="form.speed"/>
        </el-form-item>
        <el-form-item :label="$t('alarmSet.beyondSpeed') + '(s)'">
          <el-input v-model="form.beyondSpeed"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="aou-footer">
      <el-button type="primary" @click="submit">{{ $t('app.submit') }}</el-button>
      <el-button @click="onClose">{{ $t('app.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
import { addData, editData } from './service'
export default {
  props: {
    data: { type: Object, default: null }
  },
  data() {
    return {
      form: this.data ? Object.assign({}, this.data) : {},
      loading: false,
      deviceType: [
        {
          label: this.$t('alarmSet.excavator'), value: this.$t('alarmSet.excavator')
        },
        {
          label: this.$t('alarmSet.harvesters'), value: this.$t('alarmSet.harvesters')
        },
        {
          label: this.$t('alarmSet.loader'), value: this.$t('alarmSet.loader')
        }
      ],
      rules: {
        fuel: [
          { required: true, message: this.$t('alarmSet.fuelError') }
        ],
        temperature: [
          { required: true, message: this.$t('alarmSet.temperatureError') }
        ]
      }
    }
  },
  computed: {
  },
  created() {
    if (!this.form.id) {
      this.form.status = false
    }
  },
  methods: {
    // 提交按钮
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 验证通过
          if (this.form.id) {
            this.edit()
          } else {
            this.add()
          }
        }
      })
    },
    // 处理动作
    add() {
      this.loading = true
      console.log(this.numDisabled)
      this.form.createTime = new Date()
      this.form.id = Math.random() * 1000
      addData(this.form).then(() => {
        setTimeout(() => {
          this.loading = false
          this.$message.success(this.$t('app.add') + this.$t('app.success'))
          // 执行操作后隐藏弹出框
          this.onSub()
        }, 1000)
      }).catch(error => {
        setTimeout(() => {
          this.loading = false
          console.log(error)
        }, 300)
      })
    },
    edit() {
      this.loading = true
      console.log(this.numDisabled)
      editData(this.form).then(() => {
        setTimeout(() => {
          this.loading = false
          this.$message.success(this.$t('app.modify') + this.$t('app.success'))
          // 执行操作后隐藏弹出框
          this.onSub()
        }, 1000)
      }).catch(error => {
        setTimeout(() => {
          this.loading = false
          console.log(error)
        }, 300)
      })
    }
  }
}
</script>

<style scoped>

</style>

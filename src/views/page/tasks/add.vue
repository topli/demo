<template>
  <div v-loading="loading" class="aou-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('tasks.name')">
          <el-input v-model="form.name" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.org')">
          <org-tree v-model="form.org" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.level')">
          <select-remote v-model="form.level" filterable clearable data-type="taskLevel"/>
        </el-form-item>
        <el-form-item :label="$t('tasks.enclosure')" prop="enclosure">
          <el-input v-model="form.enclosure" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.goods')" prop="goods">
          <el-input v-model="form.goods" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receiving')" prop="receiving">
          <el-input v-model="form.receiving" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receivingMode')" prop="receivingMode">
          <el-input v-model="form.receivingMode" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receivingPerson')" prop="receivingPerson">
          <el-input v-model="form.receivingPerson" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.receivingPhone')" prop="receivingPhone">
          <el-input v-model="form.receivingPhone" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.isRemind')" prop="isRemind">
          <el-switch v-model="form.isRemind" clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.expiryDate')" prop="expiryDate">
          <el-date-picker
            v-model="form.expiryDate"
            type="daterange"
            clearable/>
        </el-form-item>
        <el-form-item :label="$t('tasks.selectDevice')">
          <div class="device-list">
            <template v-for="(item, index) in deviceList" class="device-info">
              <el-row :gutter="10" :key="index">
                <el-col :span="10">
                  <select-remote :placeholder="$t('tasks.deviceType')" v-model="item.deviceType" filterable clearable data-type="deviceType"/>
                </el-col>
                <el-col :span="10">
                  <el-input-number :placeholder="$t('tasks.number')" v-model.number="item.number"/>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" @click="addDevice">新增</el-button>
                  <el-button type="text" style="color:#f24d5d" @click="delDevice(item, index)">删除</el-button>
                </el-col>
              </el-row>
            </template>
          </div>
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
      rules: {
      },
      deviceList: [
        { deviceType: 1, number: 1 }
      ]
    }
  },
  computed: {
  },
  mounted() {
    // console.log(this.data)
    // if (this.data.no) {
    //   this.deviceList = this.form.deviceList || []
    // }
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
    },
    addDevice() {
      this.deviceList.push(
        { deviceType: 1, number: 1 }
      )
    },
    delDevice(item, index) {
      if (this.deviceList.length === 1) {
        return
      }
      this.deviceList.splice(index, 1)
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

<template>
  <div v-loading="loading" class="aou-template detail-template">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item :label="$t('tasks.no')">
          <!-- <el-input v-model="form.name"/> -->
          {{ form.no }}
        </el-form-item>
        <el-form-item :label="$t('tasks.name')">
          {{ form.name }}
        </el-form-item>
        <el-form-item :label="$t('tasks.status')">
          {{ form.status }}
        </el-form-item>
        <el-form-item :label="$t('tasks.executor')">
          {{ form.executor }}
        </el-form-item>
        <el-form-item :label="$t('tasks.line')">
          {{ form.line }}
        </el-form-item>
        <el-form-item :label="$t('tasks.describe')">
          {{ form.describe }}
        </el-form-item>
        <el-form-item :label="$t('tasks.org')">
          {{ form.org }}
        </el-form-item>
      </el-form>
      <div class="dispatch-wait">
        <div class="dispatch-title">
          <div style="display:inline-block">智能匹配设备</div>
          <div class="pulse-container">
            <div class="pulse-bubble pulse-bubble-1"/>
            <div class="pulse-bubble pulse-bubble-2"/>
            <div class="pulse-bubble pulse-bubble-3"/>
          </div>
        </div>
        <div class="device-list">
          <template v-for="(item, i) in deviceList">
            <div :key="i" style="text-align:center;padding: 5px 20px">
              <div style="display: inline-block;margin-right:10px;"><b style="margin-right: 10px">{{ $t('device.number') }}:</b><span>{{ item.number }}</span></div>
              <div style="display: inline-block;margin-right:10px;"><b style="margin-right: 10px">{{ $t('device.model') }}:</b><span>{{ item.model }}</span></div>
              <div style="display: inline-block;margin-right:10px;"><b style="margin-right: 10px">{{ $t('device.usePerson') }}:</b><span>{{ item.usePerson }}</span></div>
            </div>
          </template>
        </div>
        <div v-if="!deviceLoading" class="dispatch-reslut">
          <el-alert
            v-if="dispatchReslut"
            :closable="false"
            title="调度成功, 3秒后关闭此页面！"
            type="success"
            center
            show-icon/>
          <el-alert
            v-else
            :closable="false"
            title="调度失败,设备资源不足！"
            type="error"
            center
            show-icon/>
        </div>
      </div>
    </div>
    <div class="aou-footer">
      <!-- <el-button :loading="deviceLoading" type="primary" @click="submit">{{ $t('app.push') }}</el-button> -->
      <!-- <el-button @click="onClose">{{ $t('app.cancel') }}</el-button> -->
    </div>
  </div>
</template>

<script>
const data = [
  { id: 1, useStatus: '使用中', orgName: '总公司', model: '运输车', number: 'NO1', status: '可用', usePerson: '张三', createTime: new Date(), available: true }
  // { id: 2, useStatus: '使用中', orgName: '分公司', model: '起重机', number: 'NO2', status: '可用', usePerson: '李四', createTime: new Date(), available: true },
  // { id: 3, useStatus: '闲置中', orgName: '分公司', model: '运输车', number: 'NO3', status: '可用', usePerson: '王五', createTime: new Date(), available: true },
  // { id: 4, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO4', status: '可用', usePerson: '二麻子', createTime: new Date(), available: true },
  // { id: 2, useStatus: '使用中', orgName: '分公司', model: '起重机', number: 'NO5', status: '可用', usePerson: '三毛', createTime: new Date(), available: true },
  // { id: 3, useStatus: '闲置中', orgName: '分公司', model: '挖掘机', number: 'NO6', status: '可用', usePerson: '张三', createTime: new Date(), available: true },
  // { id: 4, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO7', status: '可用', usePerson: '王五', createTime: new Date(), available: true }
]
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
      deviceList: [],
      deviceLoading: false,
      dispatchReslut: true
    }
  },
  computed: {
  },
  mounted() {
    console.log(this.data)
    this.deviceLoading = true
    let index = 0
    if (this.data.no === 'BJ201905231531') {
      this.dispatchReslut = false
    }
    const interval = setInterval(() => {
      if (!this.dispatchReslut) {
        this.deviceLoading = false
        clearInterval(interval)
        return
      }
      if (index >= data.length - 1) {
        this.deviceLoading = false
        setTimeout(() => {
          this.onSub()
        }, 3000)
        clearInterval(interval)
      }
      this.deviceList.push(data[index])
      index++
    }, 3000)
  },
  methods: {
    // 提交按钮
    submit() {
      this.$message.success(this.$t('app.push') + this.$t('app.success'))
      this.onSub()
    }
  }
}
</script>
<style lang="scss">
.dispatch-wait {
  .el-alert {
    background-color: white!important
  }
}
</style>
<style lang="scss" scoped>
.detail-template{
  .el-form--inline{
    .el-form-item{
      width: 30%;
      margin-bottom: 3px;
    }
  }
}
.dispatch-wait{
  width: 100%;
  .dispatch-title {
    text-align: center;
    font: 18px bold;
    padding: 5px 0;
    .pulse-container {
      width: 20px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .pulse-bubble-1 {
        animation: pulse .4s ease 0s infinite alternate;
      }
      .pulse-bubble-2 {
        animation: pulse .4s ease .2s infinite alternate;
      }
      .pulse-bubble-3 {
        animation: pulse .4s ease .4s infinite alternate;
      }
      .pulse-bubble {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: black;
      }
    }
  }
}
@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
      opacity: .25;
      transform: scale(.75);
  }
}
</style>

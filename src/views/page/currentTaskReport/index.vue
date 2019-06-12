<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchData">
        <el-form-item>
          <el-input v-model="searchData.name" :placeholder="$t('tasks.name')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchData.expiryDate"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            type="daterange"
            clearable/>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="btns">
      <!-- <icon-btn :content="$t('app.add')" auth-code="add" icon="add" @click="addData"/> -->
      <!-- <icon-btn :content="$t('app.import')" auth-code="import" icon="import" @click="importFun"/> -->
      <icon-btn :content="$t('app.export')" auth-code="export" icon="export" @click="exportFun"/>
      <el-button-group style="float: right">
        <el-button :type="primary1" size="mini" @click="showType('day')">{{ $t('currentTaskReport.day') }}</el-button>
        <el-button :type="primary2" size="mini" @click="showType('month')">{{ $t('currentTaskReport.month') }}</el-button>
        <el-button :type="primary3" size="mini" @click="showType('years')">{{ $t('currentTaskReport.years') }}</el-button>
      </el-button-group>
    </div>
    <div class="table">
      <t-for-col
        :data="list"
        :columns-title="columnsTitle"
        :loading="loading"
        selection
        index
        @select-change="handleSelectionChange"/>
    </div>
    <div class="pages">
      <el-pagination
        :current-page="searchData.pageNo"
        :page-sizes="pageSizeOpts"
        :page-size="searchData.pageSize"
        :total="totalElement"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import list from '@/libs/mixins/list'
import dialog from '@/libs/mixins/dialog'
import { getList } from './service'
import { setStorage, getStorage } from '@/libs/utils'

export default {
  mixins: [list, dialog],
  data() {
    return {
      columnsTitle: [
        {
          key: 'deviceNo',
          title: this.$t('currentTaskReport.deviceNo'),
          width: '160'
        },
        {
          key: 'currentDriver',
          title: this.$t('currentTaskReport.currentDriver')
        },
        {
          key: 'workTime',
          title: this.$t('currentTaskReport.workTime')
        },
        {
          key: 'workNum',
          title: this.$t('currentTaskReport.workNum')
        },
        {
          key: 'workAmount',
          title: this.$t('currentTaskReport.workAmount'),
          unit: this.$t('currentTaskReport.workAmountUnit')
        }
      ],
      fileType: 'currentTaskReport',
      primary1: 'primary',
      primary2: '',
      primary3: '',
      fileName: this.$t('route.' + this.$route.name),
      dayList: [
        { deviceNo: '91376494', workTime: '124H', currentDriver: '张秀英', workNum: '2', workAmount: '65421', status: true },
        { deviceNo: '41055218', workTime: '621H', currentDriver: '余平', workNum: '10', workAmount: '451245', status: true },
        { deviceNo: '91232187', workTime: '454H', currentDriver: '贾刚', workNum: '8', workAmount: '37744', status: true },
        { deviceNo: '91270313', workTime: '312H', currentDriver: '石敏', workNum: '5', workAmount: '12773', status: true },
        { deviceNo: '41080622', workTime: '754H', currentDriver: '吕勇', workNum: '5', workAmount: '456457', status: true },
        { deviceNo: '41086687', workTime: '271H', currentDriver: '高涛', workNum: '6', workAmount: '45112', status: true },
        { deviceNo: '91207390', workTime: '254H', currentDriver: '沈明', workNum: '1', workAmount: '89454', status: false },
        { deviceNo: '41234559', workTime: '341H', currentDriver: '方静', workNum: '5', workAmount: '44561', status: true },
        { deviceNo: '41108584', workTime: '85H', currentDriver: '石洋', workNum: '2', workAmount: '2783', status: false },
        { deviceNo: '41086595', workTime: '544H', currentDriver: '孙军', workNum: '7', workAmount: '12345', status: true },
        { deviceNo: '34537390', workTime: '254H', currentDriver: '力达林', workNum: '1', workAmount: '34454', status: false },
        { deviceNo: '41212559', workTime: '3551H', currentDriver: '程志杰', workNum: '5', workAmount: '42261', status: false },
        { deviceNo: '41121584', workTime: '35H', currentDriver: '何志强', workNum: '2', workAmount: '12383', status: true },
        { deviceNo: '12386595', workTime: '614H', currentDriver: '刘静', workNum: '7', workAmount: '85645', status: true }
      ],
      monthList: [
        { deviceNo: '91376494', workTime: '600H', currentDriver: '张秀英', workNum: '30', workAmount: '165421', status: true },
        { deviceNo: '41055218', workTime: '1200H', currentDriver: '余平', workNum: '40', workAmount: '4151245', status: true },
        { deviceNo: '91232187', workTime: '1400H', currentDriver: '贾刚', workNum: '20', workAmount: '371744', status: true },
        { deviceNo: '91270313', workTime: '900H', currentDriver: '石敏', workNum: '60', workAmount: '127713', status: true },
        { deviceNo: '41080622', workTime: '2100H', currentDriver: '吕勇', workNum: '44', workAmount: '4546457', status: true },
        { deviceNo: '41086687', workTime: '5000H', currentDriver: '高涛', workNum: '56', workAmount: '245112', status: true },
        { deviceNo: '91207390', workTime: '765H', currentDriver: '沈明', workNum: '100', workAmount: '389454', status: false },
        { deviceNo: '41234559', workTime: '981H', currentDriver: '方静', workNum: '45', workAmount: '844561', status: true },
        { deviceNo: '41108584', workTime: '420H', currentDriver: '石洋', workNum: '50', workAmount: '72783', status: false },
        { deviceNo: '41086595', workTime: '1500H', currentDriver: '孙军', workNum: '47', workAmount: '312345', status: true },
        { deviceNo: '34537390', workTime: '900H', currentDriver: '力达林', workNum: '56', workAmount: '234454', status: false },
        { deviceNo: '41212559', workTime: '6001H', currentDriver: '程志杰', workNum: '88', workAmount: '542261', status: false },
        { deviceNo: '41121584', workTime: '750H', currentDriver: '何志强', workNum: '98', workAmount: '612383', status: true },
        { deviceNo: '12386595', workTime: '950H', currentDriver: '刘静', workNum: '79', workAmount: '485645', status: true }
      ],
      yearsList: [
        { deviceNo: '91376494', workTime: '33600H', currentDriver: '张秀英', workNum: '358', workAmount: '3665421', status: true },
        { deviceNo: '41055218', workTime: '11200H', currentDriver: '余平', workNum: '265', workAmount: '4215125', status: true },
        { deviceNo: '91232187', workTime: '29000H', currentDriver: '贾刚', workNum: '365', workAmount: '3571744', status: true },
        { deviceNo: '91270313', workTime: '90000H', currentDriver: '石敏', workNum: '452', workAmount: '2127713', status: true },
        { deviceNo: '41080622', workTime: '25000H', currentDriver: '吕勇', workNum: '281', workAmount: '14546457', status: true },
        { deviceNo: '41086687', workTime: '65800H', currentDriver: '高涛', workNum: '275', workAmount: '1245112', status: true },
        { deviceNo: '91207390', workTime: '86508H', currentDriver: '沈明', workNum: '300', workAmount: '5389454', status: false },
        { deviceNo: '41234559', workTime: '95410H', currentDriver: '方静', workNum: '320', workAmount: '3844561', status: true },
        { deviceNo: '41108584', workTime: '89541H', currentDriver: '石洋', workNum: '315', workAmount: '472783', status: false },
        { deviceNo: '41086595', workTime: '26547H', currentDriver: '孙军', workNum: '345', workAmount: '3312345', status: true },
        { deviceNo: '34537390', workTime: '25412H', currentDriver: '力达林', workNum: '200', workAmount: '2234454', status: false },
        { deviceNo: '41212559', workTime: '12354H', currentDriver: '程志杰', workNum: '165', workAmount: '2542261', status: false },
        { deviceNo: '41121584', workTime: '85412H', currentDriver: '何志强', workNum: '261', workAmount: '3612383', status: true },
        { deviceNo: '12386595', workTime: '12578H', currentDriver: '刘静', workNum: '354', workAmount: '1485645', status: true }
      ]
    }
  },
  methods: {
    _getList() {
      this.loading = true
      getList().then(res => {
        setTimeout(() => {
          this.loading = false
          this.list = res.data.list
          this.totalElement = res.data.total
        }, 1000)
      })
    },
    // 在编辑时获取当前数据
    getFormById(id) {
      setTimeout(() => {
        this.list.forEach((item) => {
          if (item.id === id) this.dialogData = item
        })
      }, 1000)
    },
    // 按年月日查询
    showType(item) {
      this.loading = true
      if (item === 'day') {
        this.primary1 = 'primary'
        this.primary2 = ''
        this.primary3 = ''
        const localData = JSON.parse(getStorage('localData', localData))
        localData.currentTaskReport.list = this.dayList
        setStorage('localData', localData)
        this._getList()
      } else if (item === 'month') {
        this.primary2 = 'primary'
        this.primary1 = ''
        this.primary3 = ''
        setTimeout(() => {
          this.loading = false
          this.list = this.monthList
          this.setStorage(this.monthList)
        }, 1000)
      } else {
        this.primary3 = 'primary'
        this.primary1 = ''
        this.primary2 = ''
        setTimeout(() => {
          this.loading = false
          this.list = this.yearsList
          this.setStorage(this.yearsList)
        }, 1000)
      }
    },
    setStorage(list) {
      const localData = JSON.parse(getStorage('localData', localData))
      localData.currentTaskReport.list = this.list
      setStorage('localData', localData)
    }
  }
}
</script>

<style scoped>
</style>

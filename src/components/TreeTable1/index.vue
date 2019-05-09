<template>
  <div class="statistics common-content">
    <el-table :data="statisticDatas" :row-class-name="rowClassNameHandler" border style="width: 100%;" size="medium">
      <el-table-column label="分类名称" width="460" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
          <i v-if="scope.row.showChildren" :class="{'el-icon-minus':scope.row.showChildren, 'el-icon-tickets':!scope.row.hasChildren}" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}" @click="onExpand(scope.row)"/>
          <i v-else :class="{'el-icon-plus':scope.row.hasChildren, 'el-icon-tickets':!scope.row.hasChildren}" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}" @click="onExpand(scope.row)"/>
          <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryid" label="分类ID" width="80" align="center"/>
      <el-table-column prop="parentcategoryid" label="父类ID" width="80" align="center"/>
      <el-table-column prop="undeployed" label="模板（未发布）" align="left"/>
      <el-table-column prop="deployed" label="模板（已发布）" align="left"/>
      <el-table-column prop="edit" label="合同实例（编辑中）" align="left"/>
      <el-table-column prop="completed" label="合同实例（完成）" align="left"/>
    </el-table>
  </div>
</template>

<script src="./eval.js">
export default {
  name: 'ContractStatistic',
  data() {
    return {
      statisticDatas: [],
      pastDays: 0
    }
  },

  mounted() {
    const self = this
    self.loadStatisticData()
  },

  methods: {
    _processLevelStatisticData(dataArray) {
      const self = this

      const resultArray = [] // 一级栏目
      const level = 1
      for (let i = 0; i < dataArray.length; i++) {
        const item = dataArray[i]
        // 查找一级分类
        if (item.parentcategoryid === 0) {
          item['level'] = level
          resultArray.push(item)
          self._loadChildrenData(resultArray, dataArray, item, level + 1)
        }
      }
      return resultArray
    },

    _loadChildrenData(resultArray, originArray, item, level) {
      const self = this

      let deployed = 0
      let undeployed = 0
      let edit = 0
      let completed = 0

      for (let i = 0; i < originArray.length; i++) {
        const originItem = originArray[i]
        // 判断是否是item项的子项
        if (originItem.parentcategoryid === item.categoryid) {
          this.$set(item, 'hasChildren', true)
          this.$set(item, 'showChildren', true)
          item['hasChildren'] = true
          item['showChildren'] = false

          this.$set(originItem, 'level', level)
          this.$set(originItem, 'levvisibleel', false)
          this.$set(originItem, 'hiddenByCategory', false)
          originItem['level'] = level
          originItem['visible'] = false // 子项默认隐藏
          originItem['hiddenByCategory'] = false

          resultArray.push(originItem)
          self._loadChildrenData(
            resultArray,
            originArray,
            originItem,
            level + 1
          )

          // 应该放在统计完子类数据之后
          deployed += originItem.deployed
          undeployed += originItem.undeployed
          edit += originItem.edit
          completed += originItem.completed
        }
      }
      // 计算子栏目统计合计
      item.deployed += deployed
      item.undeployed += undeployed
      item.edit += edit
      item.completed += completed
    },

    search() {
      this.loadStatisticData()
    },

    loadStatisticData() {
      const self = this
      // const params = {
      //   pastDays: self.pastDays
      // }
      self.statisticDatas = [{
        'parentcategoryid': 0,
        'edit': 0,
        'undeployed': 1,
        'deployed': 0,
        'completed': 0,
        'categoryName': '商业管理类',
        'categoryid': 1105
      }, {
        'parentcategoryid': 0,
        'edit': 0,
        'undeployed': 0,
        'deployed': 1,
        'completed': 0,
        'categoryName': '研发设计类',
        'categoryid': 1117
      }, {
        'parentcategoryid': 0,
        'edit': 0,
        'undeployed': 3,
        'deployed': 0,
        'completed': 0,
        'categoryName': '行政管理类',
        'categoryid': 1901
      }, {
        'parentcategoryid': 0,
        'edit': 0,
        'undeployed': 6,
        'deployed': 0,
        'completed': 0,
        'categoryName': '哈哈',
        'categoryid': 2402
      }, {
        'parentcategoryid': 0,
        'edit': 10,
        'undeployed': 2,
        'deployed': 21,
        'completed': 5,
        'categoryName': '测试分类',
        'categoryid': 3201
      }, {
        'parentcategoryid': 0,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '临时创建',
        'categoryid': 4901
      }, {
        'parentcategoryid': 1,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '哈哈2',
        'categoryid': 3403
      }, {
        'parentcategoryid': 1,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'lzk',
        'categoryid': 3739
      }, {
        'parentcategoryid': 1,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test',
        'categoryid': 3740
      }, {
        'parentcategoryid': 1,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '122',
        'categoryid': 4201
      }, {
        'parentcategoryid': 1,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '招标材设类（模板包）',
        'categoryid': 4602
      }, {
        'parentcategoryid': 1101,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '111',
        'categoryid': 1102
      }, {
        'parentcategoryid': 1101,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '11',
        'categoryid': 1103
      }, {
        'parentcategoryid': 1103,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '111',
        'categoryid': 1104
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '财务',
        'categoryid': 1106
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '销售',
        'categoryid': 1109
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '信息',
        'categoryid': 1110
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '运营',
        'categoryid': 1111
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '合同',
        'categoryid': 1112
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '重庆',
        'categoryid': 1114
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '长沙',
        'categoryid': 1115
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '成都',
        'categoryid': 1121
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '武汉',
        'categoryid': 1122
      }, {
        'parentcategoryid': 1105,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '合同模板管理',
        'categoryid': 1902
      }, {
        'parentcategoryid': 1106,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '税务',
        'categoryid': 1107
      }, {
        'parentcategoryid': 1114,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '222',
        'categoryid': 2801
      }, {
        'parentcategoryid': 1114,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '555',
        'categoryid': 2902
      }, {
        'parentcategoryid': 1114,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '111',
        'categoryid': 2903
      }, {
        'parentcategoryid': 1114,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '不能没有名称啊',
        'categoryid': 2904
      }, {
        'parentcategoryid': 1117,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '解决哈哈啥哈',
        'categoryid': 1601
      }, {
        'parentcategoryid': 1117,
        'edit': 0,
        'undeployed': 0,
        'deployed': 1,
        'completed': 2,
        'categoryName': '主合同',
        'categoryid': 2701
      }, {
        'parentcategoryid': 1601,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '测试',
        'categoryid': 2601
      }, {
        'parentcategoryid': 1902,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '商业管理类',
        'categoryid': 1903
      }, {
        'parentcategoryid': 1902,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '研发设计类',
        'categoryid': 1904
      }, {
        'parentcategoryid': 1902,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '招标材设类',
        'categoryid': 1905
      }, {
        'parentcategoryid': 2402,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '总包',
        'categoryid': 2403
      }, {
        'parentcategoryid': 2403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '主合同',
        'categoryid': 2404
      }, {
        'parentcategoryid': 2403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '合同附件',
        'categoryid': 2405
      }, {
        'parentcategoryid': 2403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '工程标准',
        'categoryid': 2406
      }, {
        'parentcategoryid': 2601,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '测试技术框架是否是',
        'categoryid': 3001
      }, {
        'parentcategoryid': 2801,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '55555555555',
        'categoryid': 2802
      }, {
        'parentcategoryid': 2801,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '222',
        'categoryid': 2901
      }, {
        'parentcategoryid': 2802,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '6666666666',
        'categoryid': 2803
      }, {
        'parentcategoryid': 3201,
        'edit': 7,
        'undeployed': 0,
        'deployed': 3,
        'completed': 3,
        'categoryName': '222',
        'categoryid': 3906
      }, {
        'parentcategoryid': 3201,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '5',
        'categoryid': 3907
      }, {
        'parentcategoryid': 3201,
        'edit': 0,
        'undeployed': 6,
        'deployed': 0,
        'completed': 0,
        'categoryName': '6',
        'categoryid': 3908
      }, {
        'parentcategoryid': 3201,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '附件迁移测试',
        'categoryid': 4501
      }, {
        'parentcategoryid': 3201,
        'edit': 6,
        'undeployed': 0,
        'deployed': 2,
        'completed': 1,
        'categoryName': '模板测试',
        'categoryid': 4601
      }, {
        'parentcategoryid': 3201,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '11',
        'categoryid': 4702
      }, {
        'parentcategoryid': 3201,
        'edit': 0,
        'undeployed': 1,
        'deployed': 0,
        'completed': 0,
        'categoryName': '测试1',
        'categoryid': 4802
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '11111',
        'categoryid': 3708
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '11113',
        'categoryid': 3711
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test2',
        'categoryid': 3721
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test2',
        'categoryid': 3732
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test2',
        'categoryid': 3733
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test2',
        'categoryid': 3734
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test2',
        'categoryid': 3735
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '1',
        'categoryid': 3743
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test99',
        'categoryid': 3747
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test98',
        'categoryid': 3748
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test97',
        'categoryid': 3749
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': 'test01',
        'categoryid': 3802
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '88',
        'categoryid': 3909
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '999',
        'categoryid': 4002
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '2',
        'categoryid': 4202
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '3',
        'categoryid': 4203
      }, {
        'parentcategoryid': 3403,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '上升',
        'categoryid': 4701
      }, {
        'parentcategoryid': 3740,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '222',
        'categoryid': 3746
      }, {
        'parentcategoryid': 3743,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '1',
        'categoryid': 3744
      }, {
        'parentcategoryid': 4201,
        'edit': 0,
        'undeployed': 0,
        'deployed': 0,
        'completed': 0,
        'categoryName': '77777',
        'categoryid': 4404
      }]
      const resultArray = self._processLevelStatisticData(self.statisticDatas)
      self.statisticDatas = resultArray
      // commonService.getGeneralStatistics(params).then(function(response) {
      //   const result = response.data
      //   const resultArray = self._processLevelStatisticData(result)
      //   self.statisticDatas = resultArray
      // })
    },

    rowClassNameHandler({ row, rowIndex }) {
      // console.log(row['visible'])
      let className = 'pid-' + row.parentcategoryid
      if (
        row.parentcategoryid !== 0 &&
        (row['visible'] !== true || row['hiddenByCategory'] === true)
      ) {
        className += ' hiddenRow'
      }
      return className
    },

    onExpand(row) {
      const self = this
      const isShowChildren = !row['showChildren']
      row['showChildren'] = isShowChildren
      self._loadAllSubItems(row, true, isShowChildren)
    },

    _loadAllSubItems(item, isFirstLevlChildren, isShowChilren) {
      const self = this
      const dataArray = []
      for (let i = 0; i < self.statisticDatas.length; i++) {
        const tempItem = self.statisticDatas[i]
        if (tempItem.parentcategoryid === item.categoryid) {
          if (isFirstLevlChildren) {
            tempItem['visible'] = !tempItem['visible']
          }
          tempItem['hiddenByCategory'] = !isShowChilren

          // dataArray.push(tempItem)
          self._loadAllSubItems(
            tempItem,
            false,
            isShowChilren
          )
          // dataArray = dataArray.concat(subItemArray)
        }
      }
      return dataArray
    }
  }
}

</script>

<style lang="scss">
.statistics {
  .hiddenRow {
      display: none;
  }
  .searchForm{
      padding: 10px;
      span.label{
          margin-right: 10px;
      }
      span.attention{
          color: #e50021;
      }
  }
}
</style>

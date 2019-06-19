import { setStorage } from '@/libs/utils'
const data = {
  user: {
    list: [
      { id: 1, username: '余平', orgName: '北京总公司', roleName: '管理员', jobName: '管理员', isWork: false, jobLevel: '普通', sex: 1, age: 20, createTime: new Date(), status: true },
      { id: 2, username: '陈超', orgName: '北京总公司', roleName: '管理员', jobName: '管理员', isWork: false, jobLevel: '普通', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 3, username: '萧杰', orgName: '北京总公司', roleName: '管理员', jobName: '管理员', isWork: false, jobLevel: '普通', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: '秦敏', orgName: '北京总公司', roleName: '调度员', jobName: '业务员', isWork: false, jobLevel: '普通', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 5, username: '高涛', orgName: '山西分公司', roleName: '调度员', jobName: '业务员', isWork: false, jobLevel: '普通', sex: 2, age: 25, createTime: new Date(), status: true },
      { id: 6, username: '吕勇', orgName: '北京总公司', roleName: '调度员', jobName: '业务员', isWork: false, jobLevel: '普通', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 7, username: '熊静', orgName: '北京总公司', roleName: '财务', jobName: '业务员', isWork: false, jobLevel: '普通', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 8, username: '王丽', orgName: '山西分公司', roleName: '财务', jobName: '业务员', isWork: false, jobLevel: '普通', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 9, username: '马强', orgName: '山西分公司', roleName: '财务', jobName: '业务员', isWork: false, jobLevel: '普通', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 10, username: '易磊', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: true, jobLevel: '普通', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 11, username: '石涛', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: false, jobLevel: '普通', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 12, username: '白杰', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: false, jobLevel: '普通', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 13, username: '苏刚', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: true, jobLevel: '普通', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 14, username: '李秀英', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: false, jobLevel: '普通', sex: 2, age: 25, createTime: new Date(), status: true },
      { id: 15, username: '赵强', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: false, jobLevel: '普通', sex: 2, age: 21, createTime: new Date(), status: true },
      { id: 16, username: '于娟', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: true, jobLevel: '普通', sex: 1, age: 23, createTime: new Date(), status: true },
      { id: 17, username: '金霞', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: false, jobLevel: '普通', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 18, username: '余秀兰', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: false, jobLevel: '普通', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 19, username: '林洋', orgName: '山西分公司', roleName: '司机', jobName: '工作人员', isWork: true, jobLevel: '普通', sex: 2, age: 23, createTime: new Date(), status: true }
    ]
  },
  org: {
    list: [
      {
        id: 9999,
        orgName: '北京总公司',
        type: 'org',
        children: [
          {
            id: 1,
            orgName: '山西分公司',
            state: true,
            code: 'BM1',
            linkman: '张三',
            phone: '13211111111',
            parentId: 9999,
            parentName: '顶级机构',
            parentType: 'org',
            children: [
              {
                id: 5,
                orgName: '财务部',
                state: true,
                code: 'ZBM1',
                linkman: '于敏',
                phone: '13345842125',
                parentId: 2,
                parentName: '山西分公司'
              }, {
                id: 6,
                orgName: '调度部',
                state: true,
                code: 'ZBM2',
                linkman: '吴磊',
                phone: '18621521782',
                parentId: 2,
                parentName: '山西分公司'
              }, {
                id: 7,
                orgName: '设备管理部',
                state: true,
                code: 'ZBM2',
                linkman: '潘奕',
                phone: '15156498213',
                parentId: 2,
                parentName: '山西分公司'
              }
            ]
          }
        ]
      }]
  },
  role: {
    list: [
      { id: 1, roleName: '系统管理员', roles: '11,12,13', users: [1, 2] },
      { id: 2, roleName: '财务', roles: '', users: [] },
      { id: 3, roleName: '设备管理员', roles: '', users: [] },
      { id: 4, roleName: '调度员', roles: '', users: [] }
    ]
  },
  dict: {
    list: [
      { id: 2, value: '2', label: '目录', group: 'menuType', color: '#409EFF', orgName: '系统管理', status: true },
      { id: 3, value: '3', label: '菜单', group: 'menuType', color: '#67C23A', orgName: '系统管理', status: true },
      { id: 4, value: '3', label: '按钮', group: 'menuType', color: '#E6A23C', orgName: '系统管理', status: true },
      { id: 6, value: 'true', label: '可见', group: 'menuStatus', color: '#67C23A', orgName: '系统管理', status: true },
      { id: 7, value: 'false', label: '不可见', group: 'menuStatus', color: '#F56C6C', orgName: '系统管理', status: true },
      { id: 8, value: '1', label: '男', group: 'sex', color: '#409EFF', orgName: '系统管理', status: true },
      { id: 9, value: '2', label: '女', group: 'sex', color: '#67C23A', orgName: '系统管理', status: true },
      { id: 10, value: 'true', label: '启用', group: 'status', color: '#67C23A', orgName: '系统管理', status: true },
      { id: 11, value: 'false', label: '禁用', group: 'status', color: '#F56C6C', orgName: '系统管理', status: true },
      { id: 12, value: 1, label: '早班', group: 'taskType', color: '#04b669', orgName: '系统管理', status: true },
      { id: 13, value: 2, label: '晚班', group: 'taskType', color: '#6b89aa', orgName: '系统管理', status: true },
      { id: 14, value: 3, label: '休息', group: 'taskType', color: '#a8a8a8', orgName: '系统管理', status: true }
    ],
    data: {
      menuType: [
        { id: 2, value: '1', label: '目录', color: '#409EFF' },
        { id: 3, value: '2', label: '菜单', color: '#67C23A' },
        { id: 4, value: '3', label: '按钮', color: '#E6A23C' }
      ],
      menuStatus: [
        { id: 6, value: 'true', label: '可见', color: '#67C23A' },
        { id: 7, value: 'false', label: '不可见', color: '#F56C6C' }
      ],
      linkType: [
        { id: 8, value: '1', label: '当前窗口' },
        { id: 9, value: '2', label: '弹出窗口' },
        { id: 10, value: '3', label: '弹出浏览器' },
        { id: 11, value: '4', label: '新窗口/新标签' }
      ],
      sex: [
        { id: 8, value: '1', label: '男', color: '#409EFF' },
        { id: 9, value: '2', label: '女', color: '#67C23A' }
      ],
      status: [
        { id: 10, value: 'true', label: '启用', color: '#67C23A' },
        { id: 11, value: 'false', label: '禁用', color: '#F56C6C' }
      ],
      userType: [
        { id: 12, value: '1', label: '司机', color: '#67C23A' },
        { id: 13, value: '2', label: '管理员', color: '#F56C6C' },
        { id: 13, value: '3', label: '任务调度员', color: '#F56C6C' },
        { id: 13, value: '4', label: '统计专员', color: '#F56C6C' }
      ],
      taskType: [
        { id: 14, value: '1', label: '早班', color: '#04b669' },
        { id: 15, value: '2', label: '晚班', color: '#6b89aa' },
        { id: 16, value: '3', label: '休息', color: '#a8a8a8' }
      ],
      taskStatus: [
        { id: 17, value: '3', label: '待审核', color: '#b03e32' },
        { id: 18, value: '1', label: '已调度', color: '#409EFF' },
        { id: 33, value: '2', label: '未调度', color: '#b03e32' }
      ],
      taskLevel: [
        { id: 19, value: '1', label: '高', color: '#b03e32' },
        { id: 20, value: '2', label: '中', color: '#409EFF' },
        { id: 20, value: '3', label: '低', color: '#409EFF' }
      ],
      deviceType: [
        { id: 21, value: '1', label: '装载机', color: '#b03e32' },
        { id: 22, value: '2', label: '运输车', color: '#409EFF' },
        { id: 23, value: '3', label: '挖掘机', color: '#409EFF' }
      ],
      examineType: [
        { id: 24, value: '1', label: '通过', color: '#b03e32' },
        { id: 25, value: '2', label: '拒绝', color: '#409EFF' }
      ],
      isRemindType: [
        { id: 27, value: '1', label: '短信和APP提醒', color: '#b03e32' },
        { id: 28, value: '2', label: '短信提醒', color: '#409EFF' },
        { id: 29, value: '3', label: 'APP提醒', color: '#409EFF' },
        { id: 29, value: '4', label: '不提醒', color: '#409EFF' }
      ],
      pushDateType: [
        { id: 30, value: '1', label: '立即', color: '#b03e32' },
        { id: 37, value: '2', label: '不处理', color: '#409EFF' },
        { id: 31, value: '3', label: '1小时后', color: '#409EFF' },
        { id: 32, value: '4', label: '2小时后', color: '#409EFF' },
        { id: 34, value: '5', label: '3小时后', color: '#409EFF' },
        { id: 35, value: '6', label: '1天后', color: '#409EFF' },
        { id: 36, value: '7', label: '2天后', color: '#409EFF' }
      ],
      handleStatus: [
        { id: 33, value: 'true', label: '已处理', color: '#409EFF' },
        { id: 34, value: 'false', label: '未处理', color: '#67C23A' }
      ],
      available: [
        { id: 38, value: 'true', label: '可用', color: '#67C23A' },
        { id: 39, value: 'false', label: '不可用', color: '#F56C6C' }
      ],
      isWork: [
        { id: 40, value: 'true', label: '是', color: '#67C23A' },
        { id: 41, value: 'false', label: '否', color: '#F56C6C' }
      ]
    }
  },
  enclosure: {
    list: [
      { id: 1, status: true, name: '北京通州区运力围栏', labelState: '进出围栏', createTime: new Date(), org: '北京总公司', province: '北京市', city: '通州区', address: '北京市通州区潮白河大堤路,阳光百曌重庆汽车服务有限公司西北263米', scope: '100' },
      { id: 2, status: true, name: '北京通州区运力围栏', labelState: '进出围栏', createTime: new Date(), org: '北京总公司', province: '北京市', city: '通州区', address: '北京市通州区X201(任港路)', scope: '300' },
      { id: 3, status: true, name: '北京海淀区运力围栏', labelState: '进出围栏', createTime: new Date(), org: '北京昌平分公司', province: '北京市', city: '海淀区', address: '北京市海淀区S50(北五环路)', scope: '300' },
      { id: 4, status: true, name: '北京市门头沟区运力围栏', labelState: '进出围栏', createTime: new Date(), org: '北京昌平分公司', province: '北京市', city: '头沟区', address: '北京市门头沟区大峪南路15号楼', scope: '200' },
      { id: 5, status: false, name: '北京市房山区运力围栏', labelState: '进出围栏', createTime: new Date(), org: '北京总公司', province: '北京市', city: '房山区', address: '北京市房山区凯旋大街', scope: '200' }
    ]
  },
  deviceError: {
    list: [
      { id: 1, status: 0, alarmType: '燃油不足', deviceStatus: false, handleStatus: 'true', deviceAddress: '北京市昌平区二拔子工业区东路三一重工三一产业园', principal: '刘明', createTime: new Date() },
      { id: 2, status: 1, alarmType: '胎压不足', deviceStatus: true, handleStatus: 'true', deviceAddress: '北京市昌平区北清路二号', principal: '韩雪', createTime: new Date() },
      { id: 3, status: 1, alarmType: '温度过高', deviceStatus: true, handleStatus: 'true', deviceAddress: '北京市昌平区北清路二号', principal: '陈启', createTime: new Date() },
      { id: 4, status: 1, alarmType: '胎压不足', deviceStatus: true, handleStatus: 'true', deviceAddress: '北京市昌平区三一重工三一产业园', principal: '王志', createTime: new Date() },
      { id: 5, status: 0, alarmType: '燃油不足', deviceStatus: true, handleStatus: 'false', deviceAddress: '北京市昌平区二拔子工业区东路三一重工，三一产业园', principal: '张红', createTime: new Date() }
    ]
  },
  realWorking: {
    list: [
      { id: 1, mieNo: '120301070001A', gpsNo: '0819BA2F', mieIp: '118.112.177.102', actionNo: '130908099A', gear: '档位1', operatingMode: 'H', address: '北京市昌平区北清路二号', engineSpeed: '2200r/min', oilLevel: '1/4', waterTemperature: '19℃', hydraulicTemperature: '20℃', fuelconsumptionTime: '3.2L/KM', fuelconsumptionAverage: '2.9L/KM', oilRate: '92%', batteryVoltage: '220V', lockMachineTime: '2h', Htime: '1820h', Hoil: '3200L', Stime: '2490h', Soil: '4200L' },
      { id: 1, mieNo: '120301070002A', gpsNo: '0819545F', mieIp: '118.112.177.102', actionNo: '130908012A', gear: '档位1', operatingMode: 'H', address: '北京市昌平区北清路二号', engineSpeed: '2550r/min', oilLevel: '3/4', waterTemperature: '19℃', hydraulicTemperature: '20℃', fuelconsumptionTime: '3.2L/KM', fuelconsumptionAverage: '2.9L/KM', oilRate: '92%', batteryVoltage: '220V', lockMachineTime: '2h', Htime: '1820h', Hoil: '3200L', Stime: '2490h', Soil: '4200L' },
      { id: 1, mieNo: '120301070003A', gpsNo: '08434A2F', mieIp: '118.112.177.102', actionNo: '130908011A', gear: '档位2', operatingMode: 'S', address: '北京市昌平区三一重工三一产业园', engineSpeed: '2250r/min', oilLevel: '1/4', waterTemperature: '19℃', hydraulicTemperature: '20℃', fuelconsumptionTime: '3.2L/KM', fuelconsumptionAverage: '2.9L/KM', oilRate: '92%', batteryVoltage: '220V', lockMachineTime: '2h', Htime: '1820h', Hoil: '3200L', Stime: '2490h', Soil: '4200L' },
      { id: 1, mieNo: '120301070004A', gpsNo: '2124BA2F', mieIp: '118.112.177.102', actionNo: '130908007A', gear: '档位1', operatingMode: 'S', address: '北京市昌平区三一重工三一产业园', engineSpeed: '2200r/min', oilLevel: '3/4', waterTemperature: '19℃', hydraulicTemperature: '20℃', fuelconsumptionTime: '3.2L/KM', fuelconsumptionAverage: '2.9L/KM', oilRate: '92%', batteryVoltage: '220V', lockMachineTime: '2h', Htime: '1820h', Hoil: '3200L', Stime: '2490h', Soil: '4200L' },
      { id: 1, mieNo: '120301070005A', gpsNo: '0655BA2F', mieIp: '118.112.177.102', actionNo: '130908005A', gear: '档位3', operatingMode: 'H', address: '北京市昌平区北清路二号', engineSpeed: '2250r/min', oilLevel: '3/4', waterTemperature: '19℃', hydraulicTemperature: '20℃', fuelconsumptionTime: '3.2L/KM', fuelconsumptionAverage: '2.9L/KM', oilRate: '92%', batteryVoltage: '220V', lockMachineTime: '2h', Htime: '1820h', Hoil: '3200L', Stime: '2490h', Soil: '4200L' }
    ]
  },
  menu: {
    data: [
      {
        id: 10,
        name: '监控平台',
        order: 2,
        type: 1,
        status: true,
        child: [
          {
            id: 11,
            name: '设备监控',
            order: 1,
            type: 1,
            status: true,
            child: [
              {
                id: 12,
                name: '实时状态查询',
                order: 1,
                type: 2,
                identification: 'realWorking',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 13,
                name: '实时地图监控',
                order: 2,
                type: 2,
                identification: 'realWorkingMap',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 50,
                name: '轨迹回放',
                order: 2,
                type: 2,
                identification: 'playback',
                status: true,
                linkType: 1,
                child: []
              }
            ]
          },
          {
            id: 14,
            name: '日常监控',
            order: 2,
            type: 2,
            status: true,
            identification: 'videoDaily',
            linkType: 1,
            child: []
          },
          {
            id: 15,
            name: '设备故障报警',
            order: 3,
            type: 2,
            status: true,
            identification: 'deviceError',
            linkType: 1,
            child: []
          },
          {
            id: 51,
            name: '设备报警设置',
            order: 3,
            type: 2,
            status: true,
            identification: 'deviceErrorSet',
            linkType: 1,
            child: []
          },
          {
            id: 16,
            name: '电子围栏',
            order: 4,
            type: 2,
            status: true,
            identification: 'enclosure',
            linkType: 1,
            child: []
          }
        ]
      },
      {
        id: 17,
        name: '任务管理',
        order: 3,
        type: 1,
        status: true,
        child: [
          {
            id: 18,
            name: '任务列表',
            order: 1,
            type: 2,
            status: true,
            identification: 'tasks',
            linkType: 1,
            child: []
          },
          {
            id: 19,
            name: '历史调度',
            order: 2,
            type: 2,
            status: true,
            identification: 'tasksDispatch',
            linkType: 1,
            child: []
          },
          {
            id: 6,
            name: '司机排班',
            order: 4,
            type: 2,
            identification: 'driverTask',
            status: true,
            linkType: 1,
            child: []
          }
        ]
      },
      {
        id: 22,
        name: '统计中心',
        order: 4,
        type: 1,
        status: true,
        child: [
          {
            id: 61,
            name: '当前任务进度统计',
            order: 1,
            type: 2,
            status: true,
            identification: 'currentTaskReport',
            linkType: 1,
            child: []
          },
          {
            id: 23,
            name: '设备故障统计表',
            order: 1,
            type: 2,
            status: true,
            identification: 'deviceErrorReport',
            linkType: 1,
            child: []
          },
          {
            id: 52,
            name: '设备分布监控统计',
            order: 1,
            type: 2,
            status: true,
            identification: 'taskProgress',
            linkType: 1,
            child: []
          },
          {
            id: 53,
            name: '挖机开采量趋势分析',
            order: 1,
            type: 2,
            status: true,
            identification: 'excavatorMiningTrend',
            linkType: 1,
            child: []
          },
          {
            id: 54,
            name: '实时状态统计',
            order: 1,
            type: 2,
            status: true,
            identification: 'realWorking',
            linkType: 1,
            child: []
          }
        ]
      },
      {
        id: 1,
        name: '基础信息管理',
        order: 1,
        type: 1,
        path: 'sys',
        identification: '',
        status: true,
        linkType: 0,
        child: [
          {
            id: 2,
            name: '用户中心',
            order: 1,
            type: 1,
            status: true,

            child: [
              {
                id: 3,
                name: '用户管理',
                order: 1,
                type: 2,
                identification: 'user',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 4,
                name: '组织部门',
                order: 2,
                type: 2,
                identification: 'org',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 5,
                name: '角色权限',
                order: 3,
                type: 2,
                identification: 'role',
                status: true,
                linkType: 1,
                child: []
              }
            ]
          },
          {
            id: 7,
            name: '设备管理',
            order: 2,
            type: 1,
            status: true,

            child: [
              {
                id: 8,
                name: '设备属性管理',
                order: 1,
                linkType: 3,
                type: 2,
                identification: 'deviceAttrM',
                status: true,
                child: []
              },
              {
                id: 9,
                name: '设备健康监控',
                order: 2,
                linkType: 3,
                type: 2,
                identification: 'deviceReport',
                status: true,
                child: []
              }
            ]
          }
        ]
      },
      {
        id: 28,
        name: '系统设置',
        order: 5,
        type: 1,
        status: true,
        child: [
          {
            id: 20,
            name: '菜单管理',
            order: 1,
            type: 2,
            status: true,
            identification: 'menu',
            linkType: 1,
            child: []
          },
          // {
          //   id: 20,
          //   name: '页面管理',
          //   order: 1,
          //   type: 2,
          //   status: true,
          //   identification: 'pages',
          //   linkType: 1,
          //   child: []
          // },
          {
            id: 21,
            name: '字典管理',
            order: 2,
            type: 2,
            status: true,
            identification: 'dict',
            linkType: 1,
            child: []
          }
        ]
      }
    ]
  },
  device: {
    list: [
      { id: 1, gpsNo: '91376494', useStatus: '使用中', orgName: '北京总公司', model: '挖掘机', number: '120301070001A', status: true, usePerson: '张秀英', createTime: new Date(), available: true },
      { id: 2, gpsNo: '41055218', useStatus: '使用中', orgName: '北京总公司', model: '装载机', number: '120301070002A', status: true, usePerson: '余平', createTime: new Date(), available: true },
      { id: 3, gpsNo: '91232187', useStatus: '闲置中', orgName: '北京总公司', model: '运输车', number: '120301070003A', status: true, usePerson: '贾刚', createTime: new Date(), available: true },
      { id: 4, gpsNo: '41108585', useStatus: '使用中', orgName: '北京总公司', model: '运输车', number: '120301070004A', status: true, usePerson: '陈超', createTime: new Date(), available: true },
      { id: 5, gpsNo: '91376514', useStatus: '使用中', orgName: '山西分公司', model: '装载机', number: '120301070005A', status: true, usePerson: '黄伟', createTime: new Date(), available: true },
      { id: 6, gpsNo: '41086687', useStatus: '闲置中', orgName: '山西分公司', model: '挖掘机', number: '120301070006A', status: true, usePerson: '萧杰', createTime: new Date(), available: true },
      { id: 7, gpsNo: '41086686', useStatus: '使用中', orgName: '北京总公司', model: '运输车', number: '120301070007A', status: true, usePerson: '白杰', createTime: new Date(), available: true },
      { id: 8, gpsNo: '91297925', useStatus: '使用中', orgName: '北京总公司', model: '运输车', number: '120301070008A', status: true, usePerson: '顾勇', createTime: new Date(), available: true },
      { id: 9, gpsNo: '41086595', useStatus: '闲置中', orgName: '山西分公司', model: '运输车', number: '120301070009A', status: true, usePerson: '孙军', createTime: new Date(), available: true },
      { id: 10, gpsNo: '41080622', useStatus: '使用中', orgName: '山西分公司', model: '挖掘机', number: '120301070010A', status: true, usePerson: '秦敏', createTime: new Date(), available: true },
      { id: 11, gpsNo: '41086687', useStatus: '使用中', orgName: '山西分公司', model: '装载机', number: '120301070011A', status: true, usePerson: '高涛', createTime: new Date(), available: true },
      { id: 12, gpsNo: '41080622', useStatus: '闲置中', orgName: '山西分公司', model: '运输车', number: '120301070012A', status: true, usePerson: '吕勇', createTime: new Date(), available: true },
      { id: 13, gpsNo: '41086595', useStatus: '报废', orgName: '山西分公司', model: '运输车', number: '120301070013A', status: false, usePerson: '梁磊', createTime: new Date(), available: false },
      { id: 14, gpsNo: '91270313', useStatus: '使用中', orgName: '山西分公司', model: '装载机', number: '120301070014A', status: true, usePerson: '石敏', createTime: new Date(), available: true },
      { id: 15, gpsNo: '41086679', useStatus: '使用中', orgName: '山西分公司', model: '运输车', number: '120301070015A', status: true, usePerson: '熊静', createTime: new Date(), available: true },
      { id: 16, gpsNo: '91207317', useStatus: '使用中', orgName: '山西分公司', model: '运输车', number: '120301070016A', status: true, usePerson: '吕平', createTime: new Date(), available: true },
      { id: 17, gpsNo: '41108584', useStatus: '报废', orgName: '山西分公司', model: '装载机', number: '120301070017A', status: false, usePerson: '石洋', createTime: new Date(), available: false },
      { id: 18, gpsNo: '41108559', useStatus: '闲置中', orgName: '山西分公司', model: '运输车', number: '120301070018A', status: true, usePerson: '方静', createTime: new Date(), available: true },
      { id: 19, gpsNo: '91207390', useStatus: '使用中', orgName: '山西分公司', model: '装载机', number: '1120301070019A', status: true, usePerson: '沈明', createTime: new Date(), available: true }
    ]
  },
  driverTask: {
    list: [
      { deviceNo: '120301070007A', driverName: '程磊' },
      { deviceNo: '120301070008A', driverName: '侯洋' },
      { deviceNo: '120301070009A', driverName: '苏军' },
      { deviceNo: '120301070010A', driverName: '谢军' },
      { deviceNo: '120301070011A', driverName: '程磊' },
      { deviceNo: '120301070012A', driverName: '尹涛' },
      { deviceNo: '120301070013A', driverName: '李明' },
      { deviceNo: '120301070014A', driverName: '何乐' },
      { deviceNo: '120301070015A', driverName: '张扬' },
      { deviceNo: '120301070016A', driverName: '王利桃' }
    ]
  },
  tasks: {
    list: [
      { no: 'BJ201905231529', goods: '碎石', totalQuqntity: '1.5', dispatchNo: 'ZGBJLT012019060601', devices: '91376494(张秀英),41055218(余平),91232187(贾刚)', workTime: '24H', progress: 60, name: '工程1', status: '待审核', executor: '石洋', line: '光谷-江夏', describe: '挖掘', org: '北京总公司', enclosure: '朝阳区附近', level: 1, receiving: '武汉分公司', receivingMode: '货运', receivingPerson: '盛志平', receivingPhone: '13298903465', isRemind: 1, expiryDate: ['2019-06-03T16:00:00.000Z', '2019-06-04T16:00:00.000Z'], deviceTypeNum: '挖掘机（3台）' },
      { no: 'BJ201905231530', goods: '煤矿', totalQuqntity: '1.0', dispatchNo: 'ZGBJLT022019060602', devices: '91270313(石敏),41080622(吕勇),41086687(高涛)', workTime: '35H', progress: 80, name: '工程2', status: '已调度', executor: '白杰', line: '天安门-中关村', describe: '运输', org: '山西分公司', enclosure: '中关村附近', level: 2, receiving: '武汉分公司', receivingMode: '货运', receivingPerson: '宋春梅', receivingPhone: '13344554565', isRemind: 2, expiryDate: ['2019-06-09T16:00:00.000Z', '2019-06-12T16:00:00.000Z'], deviceTypeNum: '运输车（3台）' },
      { no: 'BJ201905231531', goods: '渣土', totalQuqntity: '2.0', dispatchNo: 'ZGBJLT032019060603', devices: '91207390(沈明),41108559(方静),41108584(石洋)', workTime: '31H', progress: 89, name: '工程3', status: '未调度', executor: '贾刚', line: '朝阳区-中关村', describe: '运输', org: '山西分公司', enclosure: '中关村附近', level: 3, receiving: '武汉分公司', receivingMode: '货运', receivingPerson: '李世杰', receivingPhone: '13232903465', isRemind: 1, expiryDate: ['2019-06-11T16:00:00.000Z', '2019-06-15T16:00:00.000Z'], deviceTypeNum: '运输车（3台）' }
    ]
  },
  currentTaskReport: {
    list: [
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
    ]
  },
  alarmSet: {
    list: [
      { id: 1, equipmentNumber: '120301070001A', deviceType: '装载机', fuel: '20', temperature: '70', pressure: '140', range: '1000', beyondRange: '60', workingTime: 10, loadingCapacity: '2000', speed: 80, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 2, equipmentNumber: '120301070002A', deviceType: '装载机', fuel: '20', temperature: '70', pressure: '140', range: '1000', beyondRange: '60', workingTime: 10, loadingCapacity: '2000', speed: 80, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 3, equipmentNumber: '120301070003A', deviceType: '装载机', fuel: '20', temperature: '70', pressure: '140', range: '1000', beyondRange: '60', workingTime: 10, loadingCapacity: '2000', speed: 80, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 4, equipmentNumber: '120301070004A', deviceType: '矿车', fuel: '10', temperature: '80', pressure: '200', range: '1000', beyondRange: '60', workingTime: 15, loadingCapacity: '1500', speed: 60, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 5, equipmentNumber: '120301070005A', deviceType: '矿车', fuel: '10', temperature: '80', pressure: '200', range: '1000', beyondRange: '60', workingTime: 15, loadingCapacity: '1500', speed: 60, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 6, equipmentNumber: '120301070006A', deviceType: '矿车', fuel: '10', temperature: '90', pressure: '200', range: '1000', beyondRange: '60', workingTime: 15, loadingCapacity: '1500', speed: 60, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 7, equipmentNumber: '120301070007A', deviceType: '挖掘机', fuel: '30', temperature: '90', pressure: '230', range: '1000', beyondRange: '60', workingTime: 12, loadingCapacity: '2200', speed: 70, beyondSpeed: 60, createTime: new Date(), status: true },
      { id: 8, equipmentNumber: '120301070008A', deviceType: '挖掘机', fuel: '30', temperature: '90', pressure: '230', range: '1000', beyondRange: '60', workingTime: 12, loadingCapacity: '2200', speed: 70, beyondSpeed: 60, createTime: new Date(), status: true }
    ]
  },
  deviceErrorReport: {
    list: [
      { org: '北京总公司', errorNum: '654', deviceNum: '11', errorRate: '1.6' },
      { org: '山西分公司', errorNum: '121564', deviceNum: '11349', errorRate: '9.3' },
      { org: '武汉分公司', errorNum: '65124', deviceNum: '635', errorRate: '0.9' },
      { org: '河南分公司', errorNum: '91243', deviceNum: '1847', errorRate: '2.0' }
    ]
  }
}
setStorage('localData', data)

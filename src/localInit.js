import { setStorage } from '@/libs/utils'
const data = {
  user: {
    list: [
      { id: 1, username: 'Tony', orgName: '总公司', roleName: '管理员', jobName: '管理员', isWork: false, jobLevel: '0', sex: 1, age: 20, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', isWork: false, jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', isWork: false, jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', isWork: true, jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 5, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', isWork: false, jobLevel: '1', sex: 2, age: 25, createTime: new Date(), status: true },
      { id: 6, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 7, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', isWork: true, jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 8, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', isWork: false, jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 9, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', isWork: false, jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 10, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', isWork: true, jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 11, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', isWork: false, jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 12, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', isWork: false, jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 13, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', isWork: true, jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 14, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', isWork: false, jobLevel: '1', sex: 2, age: 25, createTime: new Date(), status: true },
      { id: 15, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', isWork: false, jobLevel: '1', sex: 2, age: 21, createTime: new Date(), status: true },
      { id: 16, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', isWork: true, jobLevel: '2', sex: 1, age: 23, createTime: new Date(), status: true },
      { id: 17, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', isWork: false, jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 18, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', isWork: false, jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 19, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', isWork: true, jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true }
    ]
  },
  org: {
    list: [
      {
        id: 9999,
        orgName: '总公司',
        type: 'org',
        children: [
          {
            id: 1,
            orgName: '分公司',
            state: true,
            code: 'BM1',
            linkman: '张三',
            phone: '13211111111',
            parentId: 9999,
            parentName: '顶级机构',
            parentType: 'org'
          },
          {
            id: 3,
            orgName: '分公司1',
            state: true,
            code: 'BM1',
            linkman: '张三',
            phone: '13211111111',
            parentId: 9999,
            parentName: '顶级机构',
            parentType: 'org'
          },
          {
            id: 2,
            orgName: '分公司2',
            state: true,
            code: 'BM2',
            linkman: '李四',
            phone: '1322222222',
            parentId: 9999,
            parentName: '顶级机构',
            parentType: 'org',
            children: [
              {
                id: 5,
                orgName: '财务',
                state: true,
                code: 'ZBM1',
                linkman: '王五',
                phone: '1313333333',
                parentId: 2,
                parentName: '部门2'
              }, {
                id: 6,
                orgName: '调度',
                state: true,
                code: 'ZBM2',
                linkman: '赵六',
                phone: '1511111111',
                parentId: 2,
                parentName: '部门2'
              }
            ]
          }]
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
        { id: 2, value: 1, label: '目录', color: '#409EFF' },
        { id: 3, value: 2, label: '菜单', color: '#67C23A' },
        { id: 4, value: 3, label: '按钮', color: '#E6A23C' }
      ],
      menuStatus: [
        { id: 6, value: true, label: '可见', color: '#67C23A' },
        { id: 7, value: false, label: '不可见', color: '#F56C6C' }
      ],
      linkType: [
        { id: 8, value: 1, label: '当前窗口' },
        { id: 9, value: 2, label: '弹出窗口' },
        { id: 10, value: 3, label: '弹出浏览器' },
        { id: 11, value: 4, label: '新窗口/新标签' }
      ],
      sex: [
        { id: 8, value: 1, label: '男', color: '#409EFF' },
        { id: 9, value: 2, label: '女', color: '#67C23A' }
      ],
      status: [
        { id: 10, value: true, label: '启用', color: '#67C23A' },
        { id: 11, value: false, label: '禁用', color: '#F56C6C' }
      ],
      userType: [
        { id: 12, value: 1, label: '司机', color: '#67C23A' },
        { id: 13, value: 2, label: '管理员', color: '#F56C6C' },
        { id: 13, value: 3, label: '任务调度员', color: '#F56C6C' },
        { id: 13, value: 4, label: '统计专员', color: '#F56C6C' }
      ],
      taskType: [
        { id: 14, value: 1, label: '早班', color: '#04b669' },
        { id: 15, value: 2, label: '晚班', color: '#6b89aa' },
        { id: 16, value: 3, label: '休息', color: '#a8a8a8' }
      ],
      taskStatus: [
        { id: 17, value: 3, label: '待审核', color: '#b03e32' },
        { id: 18, value: 1, label: '已调度', color: '#409EFF' },
        { id: 33, value: 2, label: '未调度', color: '#b03e32' }
      ],
      taskLevel: [
        { id: 19, value: 1, label: '高', color: '#b03e32' },
        { id: 20, value: 2, label: '中', color: '#409EFF' },
        { id: 20, value: 3, label: '低', color: '#409EFF' }
      ],
      deviceType: [
        { id: 21, value: 1, label: '运输车', color: '#b03e32' },
        { id: 22, value: 2, label: '起重机', color: '#409EFF' },
        { id: 23, value: 3, label: '挖掘机', color: '#409EFF' }
      ],
      examineType: [
        { id: 24, value: 1, label: '通过', color: '#b03e32' },
        { id: 25, value: 2, label: '拒绝', color: '#409EFF' }
      ],
      isRemindType: [
        { id: 27, value: 1, label: '短信和APP提醒', color: '#b03e32' },
        { id: 28, value: 2, label: '短信提醒', color: '#409EFF' },
        { id: 29, value: 3, label: 'APP提醒', color: '#409EFF' }
      ],
      pushDateType: [
        { id: 30, value: 1, label: '立即', color: '#b03e32' },
        { id: 31, value: 2, label: '1小时后', color: '#409EFF' },
        { id: 32, value: 3, label: '2小时后', color: '#409EFF' },
        { id: 34, value: 4, label: '3小时后', color: '#409EFF' },
        { id: 35, value: 5, label: '1天后', color: '#409EFF' },
        { id: 36, value: 6, label: '2天后', color: '#409EFF' }
      ]
    }
  },
  enclosure: {
    list: [
      { id: 1, status: true, enclosureName: '循环取货测试渝北工厂', enclosureType: '中转站', createTime: new Date(), org: '整车事业部', province: '重庆市', city: '重庆市', adress: '重庆市渝北区创新路长安汽车渝北工厂内,阳光百曌重庆汽车服务有限公司西北263米', enclosureRange: '100' },
      { id: 2, status: true, enclosureName: '哈尔滨基地运力电子围栏', enclosureType: '仓库', createTime: new Date(), org: '整车事业部', province: '重庆市', city: '重庆市', adress: '重庆市渝北区创新路长安汽车渝北工厂内,阳光百曌重庆汽车服务有限公司西北263米', enclosureRange: '300' },
      { id: 3, status: true, enclosureName: '46686民生二中储', enclosureType: '仓库', createTime: new Date(), org: '整车事业部', province: '黑龙江省', city: '哈尔滨市', adress: '黑龙江省哈尔滨市香坊区新疆东路东安汽车发动机制造公司北568米', enclosureRange: '300' },
      { id: 4, status: true, enclosureName: '昆明中转站运力围栏', enclosureType: '仓库', createTime: new Date(), org: '零部件事业部', province: '云南省', city: '昆明市', adress: '云南省昆明市西山区明河碧波苑东521米', enclosureRange: '200' },
      { id: 4, status: false, enclosureName: '广州中转站运力围栏', enclosureType: '仓库', createTime: new Date(), org: '零部件事业部', province: '广东省', city: '广州市', adress: '广东省广州市花都区竹洞村南568米', enclosureRange: '200' }
    ]
  },
  deviceError: {
    list: [
      { id: 1, status: 0, alarmType: '燃油不足', principal: '刘明', createTime: new Date() },
      { id: 2, status: 1, alarmType: '胎压不足', principal: '韩雪', createTime: new Date() },
      { id: 3, status: 1, alarmType: '温度过高', principal: '陈启', createTime: new Date() },
      { id: 4, status: 1, alarmType: '胎压不足', principal: '王志', createTime: new Date() },
      { id: 4, status: 0, alarmType: '燃油不足', principal: '张红', createTime: new Date() }
    ]
  },
  realWorking: {
    list: [
      { id: 1, gpsNo: '0819BA2F', oilConsumption: '1828L', timeCount: '821小时', loadCount: '34', maintenanceTime: '56小时', oilRate: '78%', createTime: new Date() },
      { id: 2, gpsNo: '0819333F', oilConsumption: '1927L', timeCount: '825小时', loadCount: '23', maintenanceTime: '55小时', oilRate: '43%', createTime: new Date() },
      { id: 3, gpsNo: '0329BA2F', oilConsumption: '1887L', timeCount: '315小时', loadCount: '45', maintenanceTime: '44小时', oilRate: '44%', createTime: new Date() },
      { id: 4, gpsNo: '08143A2F', oilConsumption: '1298L', timeCount: '515小时', loadCount: '55', maintenanceTime: '35小时', oilRate: '79%', createTime: new Date() },
      { id: 4, gpsNo: '0219BA2F', oilConsumption: '1398L', timeCount: '715小时', loadCount: '28', maintenanceTime: '85小时', oilRate: '91%', createTime: new Date() }
    ]
  },
  menu: {
    data: [
      {
        id: 1,
        name: '系统信息管理',
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
                order: 1,
                type: 2,
                identification: 'org',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 5,
                name: '角色权限',
                order: 1,
                type: 2,
                identification: 'role',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 6,
                name: '司机排班',
                order: 1,
                type: 2,
                identification: 'driverTask',
                status: true,
                linkType: 1,
                child: []
              }
            ]
          },
          {
            id: 7,
            name: '设备管理',
            order: 1,
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
                name: '图形化显示设备健康信息',
                order: 1,
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
        id: 10,
        name: '监控平台',
        order: 1,
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
                name: '实时工作状态查询',
                order: 1,
                type: 2,
                identification: 'realWorking',
                status: true,
                linkType: 1,
                child: []
              },
              {
                id: 13,
                name: '实时工作范围+地图',
                order: 1,
                type: 2,
                identification: 'realWorkingMap',
                status: true,
                linkType: 1,
                child: []
              }
            ]
          },
          {
            id: 14,
            name: '日常监控',
            order: 1,
            type: 2,
            status: true,
            identification: 'videoDaily',
            linkType: 1,
            child: []
          },
          {
            id: 15,
            name: '设备故障报警',
            order: 1,
            type: 2,
            status: true,
            identification: 'deviceError',
            linkType: 1,
            child: []
          },
          {
            id: 16,
            name: '电子围栏',
            order: 1,
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
        order: 1,
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
            name: '调度任务',
            order: 1,
            type: 2,
            status: true,
            identification: 'tasksDispatch',
            linkType: 1,
            child: []
          },
          {
            id: 20,
            name: '当前任务进度统计',
            order: 1,
            type: 2,
            status: true,
            identification: 'currentTaskReport',
            linkType: 1,
            child: []
          }
        ]
      },
      {
        id: 7,
        name: '后台配置',
        order: 2,
        type: 1,
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
          {
            id: 20,
            name: '页面管理',
            order: 1,
            type: 2,
            status: true,
            identification: 'pages',
            linkType: 1,
            child: []
          },
          {
            id: 20,
            name: '字典管理',
            order: 1,
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
      { id: 1, useStatus: '使用中', orgName: '总公司', model: '运输车', number: 'NO1', status: '可用', usePerson: '张秀英', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '起重机', number: 'NO2', status: '可用', usePerson: '余平', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '运输车', number: 'NO3', status: '可用', usePerson: '贾刚', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO4', status: '可用', usePerson: '陈超', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '起重机', number: 'NO5', status: '可用', usePerson: '黄伟', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '挖掘机', number: 'NO6', status: '可用', usePerson: '萧杰', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO7', status: '可用', usePerson: '白杰', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO8', status: '可用', usePerson: '顾勇', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '挖掘机', number: 'NO9', status: '可用', usePerson: '孙军', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '挖掘机', number: 'NO10', status: '可用', usePerson: '秦敏', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO11', status: '可用', usePerson: '高涛', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '推土机', number: 'NO12', status: '可用', usePerson: '吕勇', createTime: new Date(), available: true },
      { id: 4, useStatus: '报废', orgName: '分公司', model: '运输车', number: 'NO13', status: '可用', usePerson: '梁磊', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO14', status: '可用', usePerson: '石敏', createTime: new Date(), available: true },
      { id: 3, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO15', status: '可用', usePerson: '熊静', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO16', status: '可用', usePerson: '吕平', createTime: new Date(), available: true },
      { id: 2, useStatus: '报废', orgName: '分公司', model: '推土机', number: 'NO17', status: '可用', usePerson: '石洋', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '调度员', number: 'NO18', status: '可用', usePerson: '方静', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO19', status: '可用', usePerson: '沈明', createTime: new Date(), available: true }
    ]
  },
  driverTask: {
    list: [
      { deviceNo: '京ASF218', driverName: '程磊' },
      { deviceNo: '京AVS923', driverName: '侯洋' },
      { deviceNo: '京A1S921', driverName: '苏军' },
      { deviceNo: '京ABT159', driverName: '谢军' },
      { deviceNo: '京A25S51', driverName: '程磊' },
      { deviceNo: '京AWE564', driverName: '尹涛' }
    ]
  },
  tasks: {
    list: [
      { no: 'NO1', name: '工程1', status: '待审核', executor: '石洋', line: '光谷-江夏', describe: '挖掘', org: '分公司1', enclosure: '朝阳区附近', level: 1 },
      { no: 'NO2', name: '工程2', status: '已调度', executor: '白杰', line: '天安门-中关村', describe: '运输', org: '分公司2', enclosure: '中关村附近', level: 2 },
      { no: 'NO3', name: '工程3', status: '未调度', executor: '贾刚', line: '朝阳区-中关村', describe: '运输', org: '分公司3', enclosure: '中关村附近', level: 3 }
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
      { id: 1, equipmentNumber: '120301070008A', deviceType: '挖掘机', fuel: '30', temperature: '90', pressure: '230', range: '1000', beyondRange: '60', workingTime: 12, loadingCapacity: '2200', speed: 70, beyondSpeed: 60, createTime: new Date(), status: true }
    ]
  }
}
setStorage('localData', data)

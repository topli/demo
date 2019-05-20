import { setStorage } from '@/libs/utils'
const data = {
  user: {
    list: [
      { id: 1, username: 'Tony', orgName: '总公司', roleName: '管理员', jobName: '管理员', jobLevel: '0', sex: 1, age: 20, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', jobLevel: '1', sex: 2, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', jobLevel: '1', sex: 2, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 2, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', jobLevel: '2', sex: 1, age: 23, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', orgName: '分公司', roleName: '财务', jobName: '财务', jobLevel: '1', sex: 1, age: 25, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', orgName: '分公司', roleName: '调度员', jobName: '调度员', jobLevel: '1', sex: 1, age: 21, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', orgName: '分公司', roleName: '司机', jobName: '司机', jobLevel: '2', sex: 2, age: 23, createTime: new Date(), status: true }
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
        { id: 17, value: 1, label: '未调度', color: '#b03e32' },
        { id: 18, value: 2, label: '已调度', color: '#409EFF' }
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
      { id: 1, useStatus: '使用中', orgName: '总公司', model: '运输车', number: 'NO1', status: '可用', usePerson: '张三', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '起重机', number: 'NO2', status: '可用', usePerson: '李四', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '运输车', number: 'NO3', status: '可用', usePerson: '王五', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO4', status: '可用', usePerson: '二麻子', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '起重机', number: 'NO5', status: '可用', usePerson: '三毛', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '挖掘机', number: 'NO6', status: '可用', usePerson: '张三', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO7', status: '可用', usePerson: '王五', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO8', status: '可用', usePerson: '二麻子', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '挖掘机', number: 'NO9', status: '可用', usePerson: '三毛', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '挖掘机', number: 'NO10', status: '可用', usePerson: '张三', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO11', status: '可用', usePerson: '三毛', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '推土机', number: 'NO12', status: '可用', usePerson: '王五', createTime: new Date(), available: true },
      { id: 4, useStatus: '报废', orgName: '分公司', model: '运输车', number: 'NO13', status: '可用', usePerson: '张三', createTime: new Date(), available: true },
      { id: 2, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO14', status: '可用', usePerson: '王五', createTime: new Date(), available: true },
      { id: 3, useStatus: '使用中', orgName: '分公司', model: '运输车', number: 'NO15', status: '可用', usePerson: '三毛', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO16', status: '可用', usePerson: '二麻子', createTime: new Date(), available: true },
      { id: 2, useStatus: '报废', orgName: '分公司', model: '推土机', number: 'NO17', status: '可用', usePerson: '李四', createTime: new Date(), available: true },
      { id: 3, useStatus: '闲置中', orgName: '分公司', model: '调度员', number: 'NO18', status: '可用', usePerson: '张三', createTime: new Date(), available: true },
      { id: 4, useStatus: '使用中', orgName: '分公司', model: '推土机', number: 'NO19', status: '可用', usePerson: '张三', createTime: new Date(), available: true }
    ]
  },
  driverTask: {
    list: [
      { deviceNo: '鄂A12345', driverName: '张三' },
      { deviceNo: '鄂A12346', driverName: '李四' },
      { deviceNo: '鄂A12347', driverName: '王五' },
      { deviceNo: '鄂A12348', driverName: '张二毛' },
      { deviceNo: '鄂A12349', driverName: '李三毛' },
      { deviceNo: '鄂A12350', driverName: '王小胖' }
    ]
  }
}
setStorage('localData', data)

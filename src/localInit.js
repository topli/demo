import { setStorage } from '@/libs/utils'
const data = {
  user: {
    list: [
      { id: 1, username: 'Tony', age: 20, sex: 1, createTime: new Date(), status: true },
      { id: 2, username: 'Lisa', age: 25, sex: 2, createTime: new Date(), status: true },
      { id: 3, username: 'Dan', age: 21, sex: 1, createTime: new Date(), status: true },
      { id: 4, username: 'Kim', age: 23, sex: 2, createTime: new Date(), status: true }
    ]
  },
  org: {
    list: [
      {
        id: 9999,
        orgName: '顶级机构',
        type: 'org',
        children: [
          {
            id: 1,
            orgName: '部门1',
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
            orgName: '部门2',
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
                orgName: '子部门1',
                state: true,
                code: 'ZBM1',
                linkman: '王五',
                phone: '1313333333',
                parentId: 2,
                parentName: '部门2'
              }, {
                id: 6,
                orgName: '子部门2',
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
      { id: 7, value: 'false', label: '不可见', group: 'menuStatus', color: '#F56C6C', orgName: '系统管理', status: true }
    ],
    data: {
      menuType: [
        { id: 2, value: 1, label: '目录', color: '#409EFF' },
        { id: 3, value: 2, label: '菜单', color: '#67C23A' },
        { id: 4, value: 3, label: '按钮', color: '#E6A23C' }
      ],
      menuStatus: [
        { id: 6, value: true, label: '可见', color: '#67C23A', parentId: 5 },
        { id: 7, value: false, label: '不可见', color: '#F56C6C', parentId: 5 }
      ],
      linkType: [
        { id: 8, value: 1, label: '当前窗口', parentId: 5 },
        { id: 9, value: 2, label: '弹出窗口', parentId: 5 },
        { id: 10, value: 3, label: '弹出浏览器', parentId: 5 },
        { id: 11, value: 4, label: '新窗口/新标签', parentId: 5 }
      ]
    }
  }
}
setStorage('localData', data)

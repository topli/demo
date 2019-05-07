import { setStorage } from '@/libs/utils'
const data = {
  user: {
    list: [
      { id: 1, username: 'Tony', age: 20, sex: 1, createTime: new Date(), delivery: true },
      { id: 2, username: 'Lisa', age: 25, sex: 2, createTime: new Date(), delivery: true },
      { id: 3, username: 'Dan', age: 21, sex: 1, createTime: new Date(), delivery: true },
      { id: 4, username: 'Kim', age: 23, sex: 2, createTime: new Date(), delivery: true }
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
  }
}
setStorage('localData', data)

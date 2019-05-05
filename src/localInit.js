import { setStorage } from '@/libs/utils'
const data = {
  user: {
    list: [
      { id: 1, username: 'Tony', age: 20, sex: 1, createTime: new Date(), delivery: true },
      { id: 2, username: 'Lisa', age: 25, sex: 2, createTime: new Date(), delivery: true },
      { id: 3, username: 'Dan', age: 21, sex: 1, createTime: new Date(), delivery: true },
      { id: 4, username: 'Kim', age: 23, sex: 2, createTime: new Date(), delivery: true }
    ]
  }
}
setStorage('localData', data)

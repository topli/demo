import http from '@/libs/utils/http'

export const getList = (query) => http('get /alarmSet/list', { params: query })

export const addData = (data) => http('post /alarmSet/add', { data: data })

export const editData = (data) => http('put /alarmSet/edit', { data: data })

export const delData = (data) => http('delete /alarmSet/del', { data: data })

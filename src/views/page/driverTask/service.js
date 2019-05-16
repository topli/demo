import http from '@/libs/utils/http'

export const getList = (query) => http('get /driverTask/list', { params: query })

export const addData = (data) => http('post /driverTask/add', { data: data })

export const editData = (data) => http('put /driverTask/edit', { data: data })

export const delData = (data) => http('delete /driverTask/del', { data: data })

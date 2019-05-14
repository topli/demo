import http from '@/libs/utils/http'

export const getList = (query) => http('get /device/list', { params: query })

export const addData = (data) => http('post /device/add', { data: data })

export const editData = (data) => http('put /device/edit', { data: data })

export const delData = (data) => http('delete /device/del', { data: data })

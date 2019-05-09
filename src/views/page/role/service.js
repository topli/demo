import http from '@/libs/utils/http'

export const getList = (query) => http('get /role/list', { params: query })

export const addData = (data) => http('post /role/add', { data: data })

export const editData = (data) => http('put /role/edit', { data: data })

export const delData = (data) => http('delete /role/del', { data: data })

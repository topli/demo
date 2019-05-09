import http from '@/libs/utils/http'

export const getList = (query) => http('get /dict/list', { params: query })

export const addData = (data) => http('post /dict/add', { data: data })

export const editData = (data) => http('put /dict/edit', { data: data })

export const delData = (data) => http('delete /dict/del', { data: data })

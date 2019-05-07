import http from '@/libs/utils/http'

export const getList = (query) => http('get /org/list', { params: query })

export const addData = (data) => http('post /org/add', { data: data })

export const editData = (data) => http('put /org/edit', { data: data })

export const delData = (data) => http('delete /org/del', { data: data })

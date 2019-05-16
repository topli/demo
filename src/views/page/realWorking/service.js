import http from '@/libs/utils/http'

export const getList = (query) => http('get /user/list', { params: query })

export const addData = (data) => http('post /user/add', { data: data })

export const editData = (data) => http('put /user/edit', { data: data })

export const delData = (data) => http('delete /user/del', { data: data })

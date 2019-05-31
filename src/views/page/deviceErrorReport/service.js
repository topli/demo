import http from '@/libs/utils/http'

export const getList = (query) => http('get /deviceErrorReport/list', { params: query })

export const addData = (data) => http('post /deviceErrorReport/add', { data: data })

export const editData = (data) => http('put /deviceErrorReport/edit', { data: data })

export const delData = (data) => http('delete /deviceErrorReport/del', { data: data })

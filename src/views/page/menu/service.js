import http from '@/libs/utils/http'

export const getList = (query) => http('get /menu/list', { params: query })

export const getData = (query) => http('get /menu/data', { params: query })

export const addData = (data) => http('post /menu/add', { data: data })

export const editData = (data) => http('put /menu/edit', { data: data })

export const delData = (data) => http('delete /menu/del', { data: data })

import http from '@/libs/utils/http'

export const getList = (query) => http('get /currentTaskReport/list', { params: query })

export const addData = (data) => http('post /currentTaskReport/add', { data: data })

export const editData = (data) => http('put /currentTaskReport/edit', { data: data })

export const delData = (data) => http('delete /currentTaskReport/del', { data: data })

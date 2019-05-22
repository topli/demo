import http from '@/libs/utils/http'

export const getList = (query) => http('get /tasks/list', { params: query })

export const addData = (data) => http('post /tasks/add', { data: data })

export const editData = (data) => http('put /tasks/edit', { data: data })

export const delData = (data) => http('delete /tasks/del', { data: data })

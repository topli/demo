import http from '@/libs/utils/http'

export const getList = (query) => http('get /realWorking/list', { params: query })

export const addData = (data) => http('post /realWorking/add', { data: data })

export const editData = (data) => http('put /realWorking/edit', { data: data })

export const delData = (data) => http('delete /realWorking/del', { data: data })

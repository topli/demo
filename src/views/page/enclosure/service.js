import http from '@/libs/utils/http'

export const getList = (query) => http('get /enclosure/list', { params: query })

export const addData = (data) => http('post /enclosure/add', { data: data })

export const editData = (data) => http('put /enclosure/edit', { data: data })

export const delData = (data) => http('delete /enclosure/del', { data: data })

import http from '@/libs/utils/http'

export const fetchList = (query) => http('get /user/list', { params: query })

export const addData = (data) => http('post /user/add', { data: data })

export const editData = (data) => http('put /user/edit', { data: data })

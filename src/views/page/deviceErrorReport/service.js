import http from '@/libs/utils/http'

export const getList = (query) => http('get /deviceError/list', { params: query })

export const editData = (data) => http('put /deviceError/edit', { data: data })


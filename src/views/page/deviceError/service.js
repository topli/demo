import http from '@/libs/utils/http'

export const getList = (query) => http('get /deviceError/list', { params: query })


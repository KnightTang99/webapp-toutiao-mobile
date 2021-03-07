import request from '@/utiles/request.js'
export const getArticleSuggestion = keyword => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
export const getArticleResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
export const getHistoryList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
export const deleteAllHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}

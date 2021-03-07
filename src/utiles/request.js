import axios from 'axios'
import store from '@/store'
import JsonBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    function(data) {
      try {
        return JsonBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default request

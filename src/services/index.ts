import { MyRequest } from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const myReq = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 封装请求头携带token
      console.log('请求拦截成功')
      return config
    },
    requestInterceptorCatch(error) {
      console.log('请求拦截失败')
      return error
    },
    responseInterceptor(response) {
      console.log('响应拦截成功')
      return response
    },
    responseInterceptorCatch(error) {
      console.log('响应拦截失败')
      return error
    }
  }
})
// const MyReq2 = new MyRequest({})

export { myReq }

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestInterceptors, MyRequestConfig } from './types'

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截器')
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log('全局响应拦截器')
        const data = response.data
        if (data.retcode !== 0) {
          console.log('请求错误')
        } else {
          return data
        }
      },
      (error) => {
        // 服务报错
        if (error.response.status === 500) {
          console.log('服务端错误~')
        }
        return error
      }
    )

    // console.log(this.instance)
  }
  request(config: MyRequestConfig): void {
    // 1.单独处理请求的拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
      console.log('单独处理请求的拦截器')
    }

    // 2.处理是否显示loading

    // 3.处理响应
    this.instance.request(config).then((response) => {
      if (config.interceptors?.responseInterceptor) {
        response = config.interceptors.responseInterceptor(response)
        console.log('单独处理响应的拦截器')
      }
      console.log(response)
    })
  }
  // get() {
  //   console.log('get')
  // }
  // post() {
  //   console.log('post')
  // }
}

export { MyRequest, MyRequestInterceptors }

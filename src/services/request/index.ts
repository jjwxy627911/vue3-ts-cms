import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestInterceptors, MyRequestConfig } from './types'
import { ElLoading } from 'element-plus/lib/components/loading/index'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
// import 'element-plus/theme-chalk/el-loading.css'

// loading默认开启
const DEFAULT_LOADING = true

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance

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

        // 处理是否显示loading
        if (this.showLoading) {
          // setTimeout(() => {
          //   this.loading = ElLoading.service({
          //     lock: true,
          //     text: '正在加载中...',
          //     background: 'rgba(0,0,0,0.5)'
          //   })
          // }, 1000)
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log('全局响应拦截器')
        this.loading?.close()
        const data = response.data
        if (data.retcode !== 0) {
          console.log('请求错误')
        } else {
          return data
        }
      },
      (error) => {
        // 服务报错
        this.loading?.close()
        if (error.response.status === 500) {
          console.log('服务端错误~')
        }
        return error
      }
    )

    // console.log(this.instance)
  }
  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单独处理请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
        console.log('单独处理请求的拦截器')
      }

      // 2.判断是否显示loading
      this.showLoading = config.showLoading ?? DEFAULT_LOADING

      // 3.处理响应
      this.instance
        .request<any, T, any>(config)
        .then((response) => {
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response)
            console.log('单独处理响应的拦截器')
            // 将loading状态重置，不影响下一个请求
            this.showLoading = DEFAULT_LOADING
            resolve(response)
          }
        })
        .catch((error) => {
          // 将loading状态重置，不影响下一个请求
          this.showLoading = DEFAULT_LOADING
          console.log(error)
          reject(error)
          return error
        })
    })
  }
  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export { MyRequest, MyRequestInterceptors }

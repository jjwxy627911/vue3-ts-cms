import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 封装拦截器
export interface MyRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface MyRequestConfig extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors
}

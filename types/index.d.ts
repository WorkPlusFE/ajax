import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';

type PlainObject = {
  [name: string]: any
}

export interface AxiosOption extends AxiosRequestConfig {
  requestHandler: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<V>
  requestErrorHandler: (error: any) => any
  responseHandler: (config: AxiosResponse) => AxiosResponse | Promise<V>
  responseErrorHandler: (error: any) => any
}

interface AjaxInstance extends AxiosInstance {
  $get(url: string, data?: any, options?: PlainObject): AxiosPromise
  $post(url: string, data?: any, options?: PlainObject): AxiosPromise
  $delete(url: string, data?: any, options?: PlainObject): AxiosPromise
  $put(url: string, data?: any, options?: PlainObject): AxiosPromise
}

export interface $ajax {
  create: (options: AxiosOption) => AjaxInstance
  $get(url: string, data?: any, options?: PlainObject): AxiosPromise
  $post(url: string, data?: any, options?: PlainObject): AxiosPromise
  $delete(url: string, data?: any, options?: PlainObject): AxiosPromise
  $put(url: string, data?: any, options?: PlainObject): AxiosPromise
}

import Vue from 'vue'
import './vueAxiosMethods'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type PlainObject = {
  [name: string]: any
}

export interface installationOptions extends AxiosRequestConfig {
  reqHandle: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<V>
  reqError: (error: any) => any
  resHandle: (value: AxiosResponse) => AxiosResponse | Promise<V>
  resError: (error: any) => any
}

interface RequestMethods {
  get(url: string, data: any, options: PlainObject): AxiosInstance
  post(url: string, data: any, options: PlainObject): AxiosInstance
  delete(url: string, data: any, options: PlainObject): AxiosInstance
  put(url: string, data: any, options: PlainObject): AxiosInstance
}

export function install(vue: typeof Vue, options: installationOptions): void
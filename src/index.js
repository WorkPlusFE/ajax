import axios from 'axios/dist/axios'

const WpAxiosPlugin = {}

function create(options) {
  if (Object.prototype.toString.call(options) !== '[object Object]') {
    options = {}
  }

  const defaultOptions = {
    // request interceptor handler
    requestHandler: (config) => config,
    requestErrorHandler: (error) => Promise.reject(error),
    // response interceptor handler
    responseHandler: (response) => response,
    responseErrorHandler: (error) => Promise.reject(error),
  }
  
  const axiosOption = {
    ...defaultOptions,
    ...options,
  }
  
  const service = axios.create(axiosOption)
  
  // 请求拦截器
  service.interceptors.request.use(
    (config) => axiosOption.requestHandler(config),
    (error) => axiosOption.requestErrorHandler(error)
  )
  // 响应拦截器
  service.interceptors.response.use(
    (response) => axiosOption.responseHandler(response),
    (error) => axiosOption.responseErrorHandler(error)
  )
  
  service.$get = function (url, data, options)  {
    const axiosOpt = {
      ...options,
      ...{
        method: 'get',
        url,
        params: data,
      },
    }
    return service(axiosOpt)
  }
  service.$post = function (url, data, options) {
    const axiosOpt = {
      ...options,
      ...{
        method: 'post',
        url,
        data,
      },
    }
    return service(axiosOpt)
  }
  service.$delete = function (url, data, options) {
    const axiosOpt = {
      ...options,
      ...{
        method: 'delete',
        url,
        data,
      },
    }
    return service(axiosOpt)
  }
  service.$put = function (url, data, options) {
    const axiosOpt = {
      ...options,
      ...{
        method: 'put',
        url,
        data,
      },
    }
    return service(axiosOpt)
  }

  return service
}

WpAxiosPlugin.install = (Vue, options) => {
  const service = create(options)

  Vue.prototype.$axios = service
  Vue.prototype.$get = function (url, data, options)  {
    const axiosOpt = {
      ...options,
      ...{
        method: 'get',
        url,
        params: data,
      },
    }
    return service(axiosOpt)
  }
  Vue.prototype.$post = function (url, data, options) {
    const axiosOpt = {
      ...options,
      ...{
        method: 'post',
        url,
        data,
      },
    }
    return service(axiosOpt)
  }
  Vue.prototype.$delete = function (url, data, options) {
    const axiosOpt = {
      ...options,
      ...{
        method: 'delete',
        url,
        data,
      },
    }
    return service(axiosOpt)
  }
  Vue.prototype.$put = function (url, data, options) {
    const axiosOpt = {
      ...options,
      ...{
        method: 'put',
        url,
        data,
      },
    }
    return service(axiosOpt)
  }

  let GlobalVue = null
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
  }
  if (GlobalVue) {
    GlobalVue.use(WpAxiosPlugin)
  }

}

WpAxiosPlugin.create = create

export default WpAxiosPlugin

import axios from 'axios'

const WpAxiosPlugin = {}

WpAxiosPlugin.install = (Vue, options) => {
  const defaultOptions = {
    // request interceptor handler
    reqHandle: (config) => config,
    reqError: (error) => Promise.reject(error),
    // response interceptor handler
    resHandle: (response) => response,
    resError: (error) => Promise.reject(error),
  }

  const initOptions = {
    ...defaultOptions,
    ...options,
  }

  const service = axios.create(initOptions)

  // Add a request interceptor
  service.interceptors.request.use(
    (config) => initOptions.reqHandle(config),
    (error) => initOptions.reqError(error)
  )
  // Add a response interceptor
  service.interceptors.response.use(
    (response) => initOptions.resHandle(response),
    (error) => initOptions.resError(error)
  )

  Vue.prototype.$axios = service
  Vue.prototype.$http = {
    get: (url, data, options) => {
      const axiosOpt = {
        ...options,
        ...{
          method: 'get',
          url,
          params: data,
        },
      }
      return service(axiosOpt)
    },
    post: (url, data, options) => {
      const axiosOpt = {
        ...options,
        ...{
          method: 'post',
          url,
          data,
        },
      }
      return service(axiosOpt)
    },
    delete: (url, data, options) => {
      const axiosOpt = {
        ...options,
        ...{
          method: 'delete',
          url,
          data,
        },
      }
      return service(axiosOpt)
    },
    put: (url, data, options) => {
      const axiosOpt = {
        ...options,
        ...{
          method: 'put',
          url,
          data,
        },
      }
      return service(axiosOpt)
    },
  }
}

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(WpAxiosPlugin)
} else {
  throw Error('Vue实例未注入')
}

export default WpAxiosPlugin

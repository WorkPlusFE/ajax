import axios from 'axios/dist/axios'

const VueAxiosPlugin = {}

VueAxiosPlugin.install = (Vue, options) => {
  const defaultOptions = {
    // request interceptor handler
    reqHandleFunc: (config) => config,
    reqErrorFunc: (error) => Promise.reject(error),
    // response interceptor handler
    resHandleFunc: (response) => response,
    resErrorFunc: (error) => Promise.reject(error),
  }

  const initOptions = {
    ...defaultOptions,
    ...options,
  }

  const service = axios.create(initOptions)

  // Add a request interceptor
  service.interceptors.request.use(
    (config) => initOptions.reqHandleFunc(config),
    (error) => initOptions.reqErrorFunc(error),
  )
  // Add a response interceptor
  service.interceptors.response.use(
    (response) => initOptions.resHandleFunc(response),
    (error) => initOptions.resErrorFunc(error),
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
  GlobalVue.use(VueAxiosPlugin)
}

export default VueAxiosPlugin

import axios from 'axios'

module.exports = function create(options) {
  if (Object.prototype.toString.call(option) !== '[object Object]') {
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
  
  const httpMethod = {
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

  return service
}

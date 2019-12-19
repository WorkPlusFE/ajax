import axios from 'axios/dist/axios'

const $ajax = {}

/**
 * 请求接口传参处理
 * @param params 请求接口的传参
 */
function handleData(params) {
  if (!params) {
    return
  }
  const data = Object.create(null);
  // 过滤掉空传参 (undefined || null)
  Object.keys(params).forEach((k) => {
    if (params[k] !== undefined || params[k] !== null) {
      data[k] = params[k];
    }
  });
  return data;
}

function httpGet (url, data, options, instance) {
  if (!instance) {
    instance = axios
  }
  const params = handleData(data)
  const axiosOption = {
    ...options,
    ...{
      method: 'get',
      url,
      params,
    },
  }
  return instance(axiosOption)
}

function httpPost (url, data, options, instance) {
  if (!instance) {
    instance = axios
  }
  const params = handleData(data)
  const axiosOption = {
    ...options,
    ...{
      method: 'post',
      url,
      data: params,
    },
  }
  return instance(axiosOption)
}

function httpDelete (url, data, options, instance) {
  if (!instance) {
    instance = axios
  }
  const params = handleData(data)
  const axiosOption = {
    ...options,
    ...{
      method: 'delete',
      url,
      params,
    },
  }
  return instance(axiosOption)
}

function httpPut (url, data, options, instance) {
  if (!instance) {
    instance = axios
  }
  const params = handleData(data)
  const axiosOption = {
    ...options,
    ...{
      method: 'put',
      url,
      data: params,
    },
  }
  return instance(axiosOption)
}

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

  service.$get = function (url, data, options) {
    return httpGet(url, data, options, service)
  }
  service.$post = function (url, data, options) {
    return httpPost(url, data, options, service)
  }
  service.$delete = function (url, data, options) {
    return httpDelete(url, data, options, service)
  }
  service.$put = function (url, data, options) {
    return httpPut(url, data, options, service)
  }

  return service
}

$ajax.create = create

$ajax.$get = function (url, data, options) {
  return httpGet(url, data, options)
}

$ajax.$post = function (url, data, options) {
  return httpPost(url, data, options)
}

$ajax.$delete = function (url, data, options) {
  return httpDelete(url, data, options)
}

$ajax.$put = function (url, data, options) {
  return httpPut(url, data, options)
}

export default $ajax

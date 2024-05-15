import axios from "axios";

const httpRequest = axios.create({
  baseURL: '/',
  timeout: 10 * 1000,
  headers: {}
})

// 添加请求拦截器
httpRequest.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
httpRequest.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const streamTypes = ['blob', 'arraybuffer', 'stream']
  if (streamTypes.includes(response.headers['content-type'])) {
    return response;
  } else {
    return response.data
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
})

export function get(url, params, config ) {
  return httpRequest({
    url,
    params,
    ...config,
    method: 'get',
  })
}

export function post(url, data, config) {
  return httpRequest({
    url,
    data,
    ...config,
    method: 'post',
  })
}

export function del(url, config) {
  return httpRequest({
    url,
    ...config,
    method: 'delete',

  })
}

export function put(url, data, config) {
  return httpRequest({
    url,
    data,
    ...config,
    method: 'put',
  })
}


export default httpRequest
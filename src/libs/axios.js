import axios from 'axios'
import store from '@/store'
import { Message, Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      setTimeout(() => {
        Spin.hide()
      }, 500)
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      console.log('store.state.user.token', store.state.user.token)
      if (store.state.user.token) {
        config.headers.Authorization = 'Bearer ' + store.state.user.token
      }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true

      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (data.code === 200) {
        return { data, status }
      } else {
        Message.error(data.info)
        throw (res)
        // return Promise.reject(res)
      }
    }, error => {
      console.log('响应拦截失败', error)
      this.destroy(url)
      let errorInfo = error.response
      console.log('errorInfo', errorInfo)
      Message.error(errorInfo.data.info)
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    // axios.defaults.withCredentials = true;
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest

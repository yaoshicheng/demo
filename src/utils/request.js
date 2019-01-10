import axios from 'axios'
// import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API +"/api/v2", // api 的 base_url
  // baseURL: process.env.BASE_API,
  timeout: 15000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  error => {
    return Promise.reject(error)
  }
)

export default service

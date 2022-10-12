import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url,nginx的listen端口
  timeout: 20000 // 请求超时时间
})

//第三步 创建拦截器 http request拦截器
service.interceptors.request.use(
  config => {
    //判断cookie中是否有名称是“guli_token”的数据
    if (cookie.get('guli_token')) {
      //将获取的cookie值放到header中
      config.headers['token'] = cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)

//http response 拦截器

export default service

// 导入http模块
import http from 'wechat-http'

// 配置接口
http.baseURL = 'https://live-api.itheima.net'

// 配置向印尼拦截器
http.intercept.response = (res) => {
  // 过滤接口返回的数据
  return res.data
}

// 挂载到全局
wx.http = http

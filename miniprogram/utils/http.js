// 导入http模块
import http from 'wechat-http'

// 配置接口
http.baseURL = 'https://live-api.itheima.net'

// 挂载到全局
wx.http = http
// 导入http模块
import http from 'wechat-http'

// 配置接口
http.baseURL = 'https://live-api.itheima.net'

// 配置请求拦截器
http.intercept.request = (params) => {
	// 获取全局实例中的token
	const { token } = getApp()

	// 指定一个公共的头信息,初始值为空对象，后续可以扩展
	const defaultHeader = {}
	// 追加 token 头信息
	if (token) defaultHeader.Authorization = token
	// 合并自定义头信息和公共头信息
	params.header = Object.assign({}, defaultHeader, params.header)
	// 返回处理过后的token
	return params
}

// 配置响应拦截器
http.intercept.response = (res) => {
	// 过滤接口返回的数据
	return res.data
}

// 挂载到全局
wx.http = http

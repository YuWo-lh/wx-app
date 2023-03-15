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
http.intercept.response = async (res) => {
	// console.log(res)
	const { statusCode, data, config } = res
	// console.log(statusCode, data)
	// 判断是不是401报错
	if (statusCode === 401) {
		// 再判断请求的地址是否包含（/refreshToken）
		// 包含则是使用refresh_token更新token的请求，发生401，即refresh_token也过期了
		if (config.url.includes('/refreshToken')) {
			// console.log('refresh_token请求更新token失败')
			// refresh_token也过期了就跳转到登录页

			// 获取当前历史栈
			const pageStack = getCurrentPages()
			// console.log(pageStack)
			// 获取当前页面的实例，内有一个route，是当前页面的路径
			const currentPage = pageStack[pageStack.length - 1]
			// console.log(currentPage)
			// 获取当前页面的路径
			const redirectURL = currentPage.route
			// console.log(redirectURL)
			wx.redirectTo({
				url: `/pages/login/index?redirectURL=/${redirectURL}`
			})
		}

		// 获取全局应用实例
		const app = getApp()
		// 使用refresh_token 更新token
		const { code, data: newToken } = await http({
			url: '/refreshToken',
			method: 'post',
			header: {
				Authorization: app.refresh_token
			}
		})
		if (code !== 10000) return wx.utils.toast('获取数据失败，请稍后重试')
		app.setToken(newToken.token, newToken.refreshToken) // 更新新的token 和 refresh_token
	}
	// 返回的过滤后的数据
	return data
}

// 挂载到全局
wx.http = http

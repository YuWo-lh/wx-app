// 全局挂载
import './utils/utils'
import './utils/http'
App({
	data: {
		token: '',
		refresh_token: ''
	},
	// 小程序启动时执行,仅执行一次
	onLaunch() {
		// 读取token
		this.getToken('token')
		this.getToken('refresh_token')
	},
	// 获取token的方法
	getToken(key) {
		wx.getStorage({
			key, // 由调用的实参决定时 token 还是 refresh_token
			// 获取成功执行的函数
			success: ({ data }) => {
				// console.log(data) // 获取到的token
				// this指向应用实例
				this[key] = data
			}
		})
	},
	// 存入token的方法
	setToken(token, refresh_token) {
		token = 'Bearer ' + token
		refresh_token = 'Bearer ' + refresh_token
		wx.setStorageSync('token', token)
		wx.setStorageSync('refresh_token', refresh_token)
		this.token = token
		this.refresh_token = refresh_token
	}
})

// 全局挂载
import './utils/utils'
import './utils/http'
App({
	data: {
		token: ''
	},
	// 小程序启动时执行,仅执行一次
	onLaunch() {
		// 读取token
		this.getToken('token')
	},
	// 获取token的方法
	getToken(key) {
		wx.getStorage({
			key,
			// 获取成功执行的函数
			success: ({ data }) => {
				// console.log(data) // 获取到的token
				this.token = data
			}
		})
	},
	// 存入token的方法
	setToken(token) {
		token = 'Bener ' + token
		wx.setStorageSync('token', token)
		this.token = token
	}
})

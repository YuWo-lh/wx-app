// 全局挂载
import './utils/utils'
import './utils/http'
App({
	data: {
		token: ''
	},
	// 小程序启动时执行,仅执行一次
	onLaunch() {
		console.log('小程序启动')
		// 读取token
		this.getToken('token')
	},
	// 获取token的方法
	getToken(key) {
		wx.getStorage({
			key,
			// 获取成功执行的函数
			success: ({ data }) => {
				console.log(data)
				this.token = data
			}
			// 获取失败执行的函数
			// fail: (err) => {
			// 	console.log(err, '~~~获取token失败')
			// }
		})
	}
})

Component({
	data: {
		isLogin: true // 是否登陆
	},
	// 生命周期函数
	lifetimes: {
		attached() {
			// getApp就是app
			// console.log(getApp())
			const isLogin = !!getApp().token
			this.setData({ isLogin }) // 设置登陆状态
			if (!isLogin) {
				// 如果没有登录,跳转到登录页面
				wx.redirectTo({
					url: '/pages/login/index'
				})
			}
		}
	}
})

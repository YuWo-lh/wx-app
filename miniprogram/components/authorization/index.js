Component({
	data: {
		isLogin: false // 是否登陆
	},
	// 生命周期函数
	lifetimes: {
		attached() {
			// 获取当前历史栈（历史记录）
			const pageStack = getCurrentPages()
			// console.log(pageStack)
			// 获取当前页面实例
			const currentPage = pageStack[pageStack.length - 1]
			// 获取当前页面的路径（route就是路径的字符串）
			const redirectURL = currentPage.route
			// console.log(redirectURL)

			// getApp就是app
			// console.log(getApp())
			const isLogin = !!getApp().token
			// console.log(isLogin)
			this.setData({ isLogin }) // 设置登陆状态
			if (!isLogin) {
				// 如果没有登录,跳转到登录页面
				wx.utils.toast('您还没有登录，请先登录')
				wx.redirectTo({
					// url: '/pages/login/index'
					// 跳转到登录页,并将当前页面的路径传递过去,登录完成可以跳回来
					url: `/pages/login/index?redirectURL=/${redirectURL}`
				})
			}
		}
	}
})

const app = getApp()
Page({
	data: {
		mobile: '15656565656', // 表单数据-手机号
		code: '', // 表单数据-验证码
		countDownVisible: false // 控制是否显示倒计时
	},
	onLoad({ redirectURL }) {
		this.setData({
			redirectURL
		})
	},

	// 倒计时变化执行的函数
	countDownChange(ev) {
		// console.log(ev)
		this.setData({
			timeData: ev.detail, // 倒计时的数据（倒计时的时间：时分秒等）
			// 当倒计时分钟数等于1（起始时间1分钟） 或者 秒数大于0 ，显示倒计时，不满足条件则为关闭倒计时
			countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0
		})
	},

	// 点击 <获取验证码> 按钮执行的函数
	async getCode() {
		if (!this.verifyMobile()) return // 验证手机号
		this.setData({
			countDownVisible: true // 显示倒计时
		})
		const { code, data } = await wx.http.get('/code', { mobile: this.data.mobile.trim() })
		if (code !== 10000) return wx.utils.toast('获取验证码失败，请稍后重试')
		wx.utils.toast('验证码已发送，请注意查看')
		this.setData({ code: data.code }) // 数据绑定，验证码直接填入输入框
	},

	// 验证手机号
	verifyMobile() {
		const reg = /^[1][3-8][0-9]{9}$/
		const valid = reg.test(this.data.mobile.trim())
		if (!valid) wx.utils.toast('请输入正确的手机号码')
		return valid
	},
	// 验证验证码
	verifyCode() {
		const reg = /^\d{6}$/
		const valid = reg.test(this.data.code.trim())
		if (!valid) wx.utils.toast('您输入的验证码格式不正确')
		return valid
	},
	// 确认登录按钮
	async submitLogin() {
		if (!this.verifyMobile() || !this.verifyCode()) return
		const mobile = this.data.mobile.trim()
		const code = this.data.code.trim()
		const { code: resultCode, data } = await wx.http.post('/login', { mobile, code })
		if (resultCode !== 10000) return wx.utils.toast('登录失败，请检查验证码是否正确')
		app.setToken(data.token)

		// 重定向至登录前的页面
		// console.log(this.data.redirectURL)
		wx.redirectTo({
			url: this.data.redirectURL
		})
	}
})

Page({
	data: {
		countDownVisible: false // 控制是否显示倒计时
	},

	// 倒计时变化执行的函数
	countDownChange(ev) {
		console.log(ev)
		this.setData({
			timeData: ev.detail, // 倒计时的数据（倒计时的时间：时分秒等）
			// 当倒计时分钟数等于1（起始时间1分钟） 或者 秒数大于0 ，显示倒计时，不满足条件则为关闭倒计时
			countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0
		})
	},

	// 点击 <获取验证码> 按钮执行的函数
	getCode() {
		this.setData({
			countDownVisible: true // 显示倒计时
		})
	}
})

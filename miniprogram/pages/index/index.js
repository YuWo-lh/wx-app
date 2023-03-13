Page({
	data: {
		afficheList: ''
	},
	async onLoad() {
		const { code, data } = await wx.http.get('/announcement')
		if (code !== 10000) return wx.utils.toast('获取数据失败，请稍后重试')
		// console.log(data)
		this.setData({ afficheList: data })
	}
})

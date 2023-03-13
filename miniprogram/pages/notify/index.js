Page({
	data: {
		afficheDetail: {}
	},
	onLoad(params) {
		// console.log(params) // 上一个页面传过来的值
		// 获取公告详情数据
		this.getAfficheDetail(params.id)
	},
	async getAfficheDetail(id) {
		const { code, data } = await wx.http.get('/announcement/' + id)
		// console.log(code, data)
		if (code !== 10000) return wx.utils.toast('获取数据失败,请稍后重试')
		this.setData({ afficheDetail: data })
	}
})

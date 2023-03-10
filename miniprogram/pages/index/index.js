Page({
  async onLoad() {
    wx.utils.toast('Hello')
    const { code, data } = await wx.http.get('/announcement')
    // console.log(code, data)
    if (code !== 10000) return wx.utils.toast()
    // console.log(data)
  },
})

Page({
  async onLoad() {
    wx.utils.toast('Hello')
    const res = await wx.http.get('/announcement')
    console.log(res)
  }
})

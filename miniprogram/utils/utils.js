// 工具方法
const utils = {
  toast(title = "数据加载失败...") {
    wx.showToast({
      title,
      icon: 'none',
      mask: true // 遮罩
    })
  }
}

// 将utils挂载到wx上，在在全局都可以直接使用
wx.utils = utils
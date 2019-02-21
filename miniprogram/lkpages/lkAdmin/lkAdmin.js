// miniprogram/lkpages/lkAdmin/lkAdmin.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    bGetUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            bGetUserInfo:true,
          })
        }
      }
    })
  },

  onGotUserInfo: function (e) {
    
    console.log("e.detail.errMsg ",e.detail.errMsg)
    console.log("e.detail.userInfo ",e.detail.userInfo)
    console.log("e.detail.rawData ",e.detail.rawData)

    if (!this.data.bGetUserInfo) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        this.setData({
            bGetUserInfo:true
        })
      }
    }
  }

})
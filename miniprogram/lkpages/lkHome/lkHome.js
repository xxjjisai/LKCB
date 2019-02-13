// miniprogram/lkpages/lkHome/lkHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户点击搜索框，打开搜索页面
   */
  fClickSearchBar:function (){
    wx.navigateTo({
      url: '../lkSearch/lkSearch',
    })
  },

  /**
   * 用户点击定位城市，打开选择位置页面
   */
  fClickLocation:function (){
    wx.navigateTo({
      url: '../lkLocation/lkLocation',
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo:function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting",JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("getUserInfo",JSON.stringify(res))
            }
          })
        }
      }
    })
  }


})
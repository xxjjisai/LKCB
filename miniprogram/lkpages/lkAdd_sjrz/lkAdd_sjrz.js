// miniprogram/lkpages/lkAdd_sjrz/lkAdd_sjrz.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    zkShopName: "老马家牛肉面",
    zkIcon: "icon_nav_special",
    zkShopInfo: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    zkisAgree: false,
  },

  showTopTips: function () {
    var zkShopName = this.data.zkShopName;
    var zkShopInfo = this.data.zkShopInfo;
    var zkIcon = this.data.zkIcon;
    var timestamp = Date.parse(new Date());

    const db = wx.cloud.database()
    db.collection('lk_sjrz').add({
      data: {
        zkShopName: zkShopName,
        zkIcon: zkIcon,
        zkShopInfo: zkShopInfo,
        timestamp: timestamp
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 res: ', res)
        wx.switchTab({
          url: '/lkpages/lkHome/lkHome',
          success: (res) => { },
          fail: (err) => { },
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  zkOnShopName: function (e) {
    this.setData({
      zkShopName: e.detail.value
    });
  },
  zkOnShopInfo: function (e) {
    this.setData({
      zkShopInfo: e.detail.value
    });
  }
})
// miniprogram/lkpages/lkAdmin/lkAdmin.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: './user-unlogin.png',
        nickName:'点击头像登录',
        userInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {  
        if (!wx.cloud) {
            console.log("No wx.cloud !!!!!!!!!!!!!!!!!")
            // wx.redirectTo({
            //     url: '../chooseLib/chooseLib',
            // })
            return
        }

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框")
                    wx.getUserInfo({
                        success: res => {
                            console.log(res.userInfo)
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                nickName:res.userInfo.nickName,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
                else 
                {
                    console.log("还没授权用户信息呢")
                }
            }
        })

    },

    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },
 
    onGetOpenid: function () {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
                wx.navigateTo({
                    url: '../lkHome/lkHome',
                })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                    url: '../deployFunctions/deployFunctions',
                })
            }
        })
    },

})
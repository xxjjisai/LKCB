// miniprogram/lkpages/lkHome/lkHome.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"全国",
    bGetUserInfo:false,
    tabs: ["旺铺转让", "门面求租", "门面出租"],
    zktbWPZR:[],
    zktbMMQZ:[],
    zktbMMCZ:[],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    zk_limit:10, 
    zk_ZhuanRang_Page:0,
    zk_MMQZ_Page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            bGetUserInfo:true,
          })
        }
      }
    })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    this.pageBottomConcat(); 
    this.onQueryListInfo();
  },

    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.pageUpdateConcat();
    this.onQueryListInfo();
  },

  tabClick: function (e) {
    this.pageBottomConcat();
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.onQueryListInfo();
  },

  onQueryListInfo:function(){
    var type = this.data.activeIndex;
    if (type == 0 ){
      this.onQueryZhuanRangList();
    }else if (type == 1 ){
      this.onQueryMMQZList();
    }else if(type == 2){
      this.onQueryMMCZList();
    }
  },

  onQueryZhuanRangList:function(){
    var old_zktbWPZR = this.data.zktbWPZR;
    var page = this.data.zk_ZhuanRang_Page;
    var zk_limit = this.data.zk_limit;
    const db = wx.cloud.database()
    const _ = db.command
    // 查询当前用户所有的 lk_add_zhuanrang
    db.collection('lk_wpzr')
    .where({
      // _openid: this.data.openid
      // zkIcon: _.eq("con_nav_special")
    })
    .orderBy('timestamp', 'desc')
    .skip(page)
    .limit(zk_limit)
    .get({
      success: res => {
        var tbList = old_zktbWPZR.concat(res.data);
        this.setData({
          zktbWPZR: tbList,
        })
        // console.log('[数据库] [查询记录] 餐饮信息 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  onQueryMMQZList:function(){
    const db = wx.cloud.database()
    var old_zktbMMQZ = this.data.zktbMMQZ;
    var page = this.data.zk_MMQZ_Page;
    var zk_limit = this.data.zk_limit;
    // 查询当前用户所有的 lk_add_zhuanrang
    db.collection('lk_mmqz').where({
      // _openid: this.data.openid
    })
    .orderBy('timestamp', 'desc')
    .skip(page)
    .limit(zk_limit)
    .get({
      success: res => { 
        var tbList = old_zktbMMQZ.concat(res.data);
        this.setData({
          zktbMMQZ: tbList
        })
        // console.log('[数据库] [查询记录] 招聘信息 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  onQueryMMCZList:function(){
    const db = wx.cloud.database()
    var old_zktbMMCZ = this.data.zktbMMCZ;
    var page = this.data.zk_MMQZ_Page;
    var zk_limit = this.data.zk_limit;
    // 查询当前用户所有的 lk_add_zhuanrang
    db.collection('lk_mmcz').where({
      // _openid: this.data.openid
    })
    .orderBy('timestamp', 'desc')
    .skip(page)
    .limit(zk_limit)
    .get({
      success: res => { 
        var tbList = old_zktbMMCZ.concat(res.data);
        this.setData({
          zktbMMCZ: tbList
        })
        // console.log('[数据库] [查询记录] 招聘信息 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  pageBottomConcat:function(){
    this.setData({
      zk_ZhuanRang_Page:0,
      zktbWPZR: [],
      zk_MMQZ_Page:0,
      zktbMMQZ: []
    });
  },

  // 上拉列表加载更多的列表项
  pageUpdateConcat:function(){
    var zk_ZhuanRang_Page = this.data.zk_ZhuanRang_Page;
    var zk_MMQZ_Page = this.data.zk_MMQZ_Page;
    var zk_limit = this.data.zk_limit;
    this.setData({
      zk_ZhuanRang_Page:zk_ZhuanRang_Page+zk_limit,
      zk_MMQZ_Page:zk_MMQZ_Page+zk_limit
    });
  },

  fClickSearchBar:function(){
    wx.navigateTo({
      url: '../lkSearch/lkSearch',
    })
  },

  fClickLocation:function(){
    wx.navigateTo({
      url: '../lkLocation/lkLocation',
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
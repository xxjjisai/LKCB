// miniprogram/pages/lkAdmin/lkAdmin.js

const app = getApp();
import QQMapWX from '../../libs/qqmap-wx-jssdk.min.js';
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    province:'',
    latitude:'',
    longitude:'',
    inputShowed: false,
    inputVal: "",
    tabs: ["餐饮", "招聘", "健康"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },

  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key:'NREBZ-CPGWQ-ASU5P-GBICN-JUAKO-ZYFPY'
    });
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
  },

  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
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
    this.getUserLocation();
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

  //----------------------------------
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  },
  //----------------------------------

  getLocation:function (){
    wx.getLocation({
      type:'wgs84',
      success:(res)=>{
        console.log('success x ' + JSON.stringify(res))
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        this.getLocal(latitude,longitude);
      },
      fail:(res)=>{
        console.log('fail' + JSON.stringify(res))
      }
    })
  },

  getLocal:function (latitude,longitude){
    qqmapsdk.reverseGeocoder({
      location:{
        latitude:latitude,
        longitude:longitude
      },
      success:(res)=>{
        console.log('getLocal success' + JSON.stringify(res))
        let province = res.result.ad_info.province;
        let city = res.result.ad_info.city;
        this.setData({
          city:city,
        })
      },
      fail:(res)=>{
        console.log('getLocal fail' + JSON.stringify(res))
      }
      // complete:(res)=>{
      //   console.log('getLocal complete' + JSON.stringify(res))
      // }
    })
  },

  getUserLocation:function(){
    wx.getSetting({
      success:(res)=>{
        console.log(JSON.stringify(res))

        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权

        if(res.authSetting["scope.userLocation"] != undefined && 
           res.authSetting["scope.userLocation"] != true)
        {
          wx.showModal({
            title:'请求授权当前位置',
            content:'需要获取您的地理位置，请确认授权',
            success:(res)=>{
              if(res.cancel)
              {
                wx.showToast({
                  title:'拒绝授权',
                  icon:'none',
                  duration:1000
                })
              }
              else if(res.confirm)
              {
                wx.openSetting({
                  success:(dataAu)=>{
                    console.log('openSetting success' + JSON.stringify(dataAu))
                    if(dataAu.authSetting["scope.userLocation"] == true)
                    {
                      wx.showToast({
                        title:'授权成功',
                        icon:'none',
                        duration:1000
                      })
                      this.getLocation();
                    }
                    else 
                    {
                      wx.showToast({
                        title:'授权失败',
                        icon:'none',
                        duration:1000
                      })
                    }
                  },
                  // fail:(dataAu)=>{
                  //   console.log('openSetting fail' + JSON.stringify(dataAu))
                  // },
                })
              }
            },
            fail:(res)=>{
              console.log('getUserLocation fail' + JSON.stringify(res))
            },
          });
        }
        else if (res.authSetting["scope.userLocation"] == undefined)
        {
          this.getLocation();
        }
        else
        {
          this.getLocation();
        }
      },
      fail:(res)=>{
        console.log('getUserLocation fail' + JSON.stringify(res))
      },
    })
  }
})
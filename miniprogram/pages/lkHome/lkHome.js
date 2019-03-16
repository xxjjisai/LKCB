// miniprogram/lkpages/lkHome/lkHome.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: ["转让", "出租", "求租"],
		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
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
	}
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let vm = this
    // 登录
    wx.login({
      success: res => {
        console.log('code:'+res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://carshop.manmanh.com/api/wx/openid/'+ res.code,
          data: {},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            let openid = res.header.openid //返回openid
            vm.setData({
              url: 'https://carshop.manmanh.com/#/?openid='+openid
            })
            app.globalData.openId = openid
          }
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

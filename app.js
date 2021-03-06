//app.js
let { WeToast } = require('src/wetoast.js')    // 返回构造函数，变量名可自定义

App({
  WeToast ,
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var date = Date.now()
    
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    // imageURL: 'https://jptest2.xuechebu.com',
    // webURL: 'https://jptest4.xuechebu.com',
    // schoolURL: 'https://xzzstest1.xuechebu.com',
    // webDetail: 'https://jptest5.xuechebu.com',

    webDetail:'https://m.xuechebu.com',
    imageURL: 'https://api.xuechebu.com',
    webURL: 'https://xcbapi.xuechebu.com',
    schoolURL: 'https://xzzstest1.xuechebu.com'
  }
})

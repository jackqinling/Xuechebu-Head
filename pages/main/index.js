//获取应用实例
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: true  // loading

    },

    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },
    moreClick: function(e) {
      
    },
    onNaviTo: function(e) {
      var pathArray = ['../stuDetail/student',
        '../theory/theory',
        '../training/train',
        '../exam/exam',
        '../finance/finance',
        '../developing/dev',
        '../stuDetail/student',
        '../stuDetail/student'];
        wx.navigateTo({
          url: pathArray[e.currentTarget.dataset.id],
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
    },
  onImageClick:function(e){
    if (e.currentTarget.dataset.url != '#' && e.currentTarget.dataset.url != '') {
      wx.navigateTo({
        url: '../web/web?id=' + e.currentTarget.dataset.id + '&type=2',
      })
    }
  },
  onLoad: function() {
      console.log('onLoad')
      var that = this
          //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo) {
          //更新数据
          that.setData({
              userInfo: userInfo
          })
      })

      // sliderList
      wx.request({
        url: getApp().globalData.imageURL +'/ad/GetPageAdview_jucheyou',
          method: 'GET',
          data: { adtype: 'xcblb_xiaozhang'},
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              that.setData({
                  images: res.data.data
              })
              //存储新闻数组
              wx.setStorageSync('ScrollData', res.data.data);
          }
      })
      // var scrollArray = [];
      // scrollArray.push({ picurl:'http://jptest5.xuechebu.com/upload/201710/17/201710171810562866.png'})
      // scrollArray.push({ picurl: 'http://jptest5.xuechebu.com/upload/201710/17/201710171810562866.png'})
      // that.setData({images: scrollArray})


      var menuArray = [];

      for (var i = 0; i < 6; i++) {
        menuArray.push({ smallpic: "/image/xzd_"+i+".png",
        menuName:i})
      }
      that.setData({venuesItems : menuArray})

      //choiceList  新闻列表
      wx.request({
        url: getApp().globalData.webURL + '/api/Information/GetInformationList?pdCode=XZD_XWZX&pIndex=1&pSize=6',
          method: 'GET',
          data: {},
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              that.setData({
                  choiceItems: res.data.data.Result

              })
              setTimeout(function () {
                  that.setData({
                      loadingHidden: true
                  })
              }, 1500)
          }
      })
      // var newsArray = [];
      // for (var i = 0; i < 4; i++) {
      //   newsArray.push({ smallpic: 'http://jptest5.xuechebu.com/upload/201710/17/201710171810562866.png',
      //   title:'大兴公寓着火事件以来,北漂生活更不易',
      //   category: "实时要闻",
      //   date: '2017-11-30'})
      // }
      // that.setData({
      //   choiceItems: newsArray
      // })
  }
})

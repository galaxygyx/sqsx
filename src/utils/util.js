import CryptoJS from 'crypto-js'
/**
 *  工具函数
 *  */
export function formatTime (date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

export function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

// 加密方法
export function encryption (data) {
  let strs = []
  for (let i in data) {
    strs.push(i + '' + data[i])
  }
  //    数组排序
  strs.sort()
  //    数组变字符串
  strs = strs.join('')
  //    MD5加密
  let endData = CryptoJS.MD5(strs + '123456').toString()
  return endData
}

// 错误toast提示 避免真机提示闪现
export function setToast (msg, callback) {
  setTimeout(() => {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      success: function (params) {
        if (callback) {
          callback()
        }
      }
    })
  }, 200)
}

// 跳转其他小程序
export function navigateToMiniProgram (type, obj = {}) {
  if (typeof type === 'string') {
    if (type === 'ticket') {
      wx.navigateToMiniProgram({
        appId: 'wxcb277e65e43a87a3', // 机票小程序appid
        path: 'pages/index/main?channel_source=05000051',
        extarData: {
          open: 'auth'
        },
        envVersion: 'trial',
        success () {},
        ...obj
      })
    } else if (type === 'hotel') {
      wx.navigateToMiniProgram({
        appId: 'wx19e49bc0722d5c45', // 酒店小程序
        path: 'pages/index/main?channel_source=05000042',
        extarData: {
          open: 'auth'
        },
        envVersion: 'trial',
        success () {},
        ...obj
      })
    }
  }
}

/* eslint-disable */
// 获取当前页url
export function getCurrentPageUrl() {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  return url
}
// 获取上一页url
export function getPrePageUrl() {
  var pages = getCurrentPages() // 获取加载的页面
  var prePage = pages[pages.length - 2] // 获取上一页面的对象
  var url = prePage.route // 上一页面url
  return url
}
// switchTab后获取上一页url
export function getTabPrePageUrl() {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.__displayReporter.showReferpagepath.split('.')[0] // 当前上一页面url
  return url
}
// /*获取当前页带参数的url*/
export function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
/* eslint-enable */

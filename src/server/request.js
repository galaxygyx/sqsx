import Fly from 'flyio/dist/npm/wx'
import {
  setToast
} from '@/utils/util'

const request = new Fly()

// 设置请求基地址
request.config.baseURL = ''

request.interceptors.request.use((request) => {
  // 给所有请求添加自定义header，带上token信息让服务器验证用户登陆
  let params = {}
  let isLogin = request.isLogin || false
  let loadingType = request.loadingType || 1 // 默认1:屏中loading   2:头部loading 3.进度条loading(需页面中引入loading-modal组件)
  if (!isLogin) { // 登录接口调用不需要head入参
    params = {
      head: {
        token: wx.getStorageSync('login_token') || '',
        channel: wx.getStorageSync('channel') || '05000300',
        clientId: ''
      }
    }
  }
  if (loadingType === 1) { // 接口调用屏中loading框
    wx.showLoading({
      title: '加载中'
    })
  } else if (loadingType === 2) {
    wx.showNavigationBarLoading()
  }

  request.body = {
    ...request.body,
    ...params
  }
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.hideNavigationBarLoading()
    setToast(err.msg)
    return promise.resolve()
  }
)

export default request

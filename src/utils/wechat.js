/**
 *  微信登录，授权，支付
 */

export function getwxLoginCode () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.setStorageSync('code', res.code)
          resolve(res.code)
        } else {
          resolve(false)
        }
      },
      fail: function () {
        resolve(false)
      }
    })
  })
}

/**
 * 调用微信获取用户信息接口，需要button授权
 */
export async function getUserInfo () {
  return new Promise(function (resolve, reject) {
    // 查看button是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          })
        } else { // 没有授权
          resolve(false);
        }
      }
    })
  });
}

/**
 * 申请微信支付
 */
export function requestPayment (data) {
  return new Promise(function (resolve, reject) {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
      complete: (res) => {
        reject(res)
      }
    })
  })
}

// 获取access_token
export function getAccessToken () {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb5d92112a904b02e&secret=41cc78424161e957687010bf38e98e38',
      method: 'Get',
      // responseType: 'arraybuffer', // 设置响应类型
      success: (res) => {
        // console.log(res, 'access_token')
        if (res.data.access_token) {
          resolve(res.data.access_token)
        } else {
          resolve(false)
        }
      },
      fail: (e) => {
        console.log(e)
      }
    })
  })
}

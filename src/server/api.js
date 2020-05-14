/* global __LOGINAPIHOST__ */
import CryptoJS from 'crypto-js/crypto-js'
import fly from './request'
import {
  encryption,
  setToast
} from '@/utils/util'
import CONSTANT from '@/assets/js/constant'

import {
  CHECKTOKEN,
  LOGIN,
  USERSIGNIN,
  QUERYPRODUCTS,
  QUERYUNMOVIELIST,
  QUERYMOVIELIST,
  MOVIECOLLECT,
  QUERYCLUBMEMBER,
  ORDERCREATE,
  ORDERQUERYORDERSTATUS,
  PAYORDER,
  ORDERQUERYPAYSTATUS,
  PAYRESULT,
  MYCOUPONLIST,
  UNUSECOUPONNUM,
  TOHANDLE
} from './apiUrl.js'

/**
 *  APIHOST 请求另外一个服务的时候调用
 *  上例子：
 *  一般调用  fly.post('xxx')
 *  调另外一个服务 fly.post(APIHOST+'xxx')
 *  目前用在微信取openid
 */
const APIHOST = __LOGINAPIHOST__

// 检测 Token有效期
export async function checkToken () {
  let expdate = new Date().getTime()
  let param = {
    'appId': CONSTANT.REQUIST_APP_ID,
    'authType': CONSTANT.AUTH_TYPE,
    'coordinate': CONSTANT.COORDINATE,
    'custString': CONSTANT.CUST_STRING,
    'ip': CONSTANT.REQUIST_IP,
    'login_token': wx.getStorageSync('login_token'),
    'machineNo': CONSTANT.MACHINE_NO,
    'msgVersion': CONSTANT.MSG_VERSION,
    'platform': CONSTANT.PLATFORM,
    'reqTime': expdate.toString()
  }
  param.sign = encryption(param)
  let checkToken = await fly.post(APIHOST + CHECKTOKEN, param, {isLogin: true})
  if (checkToken.respCode === '0000') {
    return checkToken.data.validResult
  } else {
    setToast(checkToken.respMsg)
  }
}
// 登录拿openid
export async function login (data, type) {
  let tmpParam = {}
  if (type === 1) {
    tmpParam = {
      code: wx.getStorageSync('code'),
      iv: data.iv,
      encryptedData: data.encryptedData,
      rawData: data.rawData,
      signature: data.signature
    }
  } else {
    tmpParam = {
      code: wx.getStorageSync('cyCode'),
      iv: data.iv,
      encryptedData: data.encryptedData
    }
  }
  let expdate = new Date().getTime()
  // 风控需要传此字段,前期不走风控
  // tmpParam.fingerprint = wx.getStorageSync('fingerprint')
  let param = {
    ...tmpParam,
    'authType': CONSTANT.AUTH_TYPE,
    'msgVersion': CONSTANT.MSG_VERSION,
    'custString': CONSTANT.CUST_STRING,
    'platform': CONSTANT.PLATFORM,
    'appId': CONSTANT.REQUIST_APP_ID,
    'coordinate': CONSTANT.COORDINATE,
    'machineNo': CONSTANT.MACHINE_NO,
    'type': CONSTANT.REQUIST_TYPE,
    'channel_source': CONSTANT.CHANNEL_SOURCE,
    'reqTime': expdate.toString()
  }
  param.sign = encryption(param)
  let tmpData = await fly.post(APIHOST + LOGIN, param, {
    isLogin: true
  })
  if (tmpData.respCode === '0000') {
    // 登录成功则返回'0000'
    // 0000：登录成功
    // U006：未绑定账号
    // U007：该手机已被其他账号绑定
    // U011：code无效
    // 9999：系统异常
    if (tmpData.data.respCode === '0000') {
      let words = CryptoJS.enc.Base64.parse(tmpData.data.data.openId)
      let openid = words.toString(CryptoJS.enc.Utf8).slice(6)
      wx.setStorageSync('loginState', true)
      wx.setStorageSync('login_token', tmpData.data.data.token)
      wx.setStorageSync('openid', openid)
      wx.setStorageSync('cyCode', tmpData.data.data.cycode)
      return tmpData.data.respCode
    } else if (tmpData.data.respCode === 'U011' || tmpData.data.respCode === 'U006') {
      //  code 无效 && 没有绑定
      let words = CryptoJS.enc.Base64.parse(tmpData.data.data.openId)
      let openid = words.toString(CryptoJS.enc.Utf8).slice(6)
      wx.setStorageSync('loginSatus', 'U006')
      wx.setStorageSync('cyCode', tmpData.data.data.cycode)
      wx.setStorageSync('openid', openid)
      return tmpData.data.respCode
    } else if (tmpData.data.respCode === 'U007') {
      // 该手机已被其他账号绑定
      wx.showToast({
        title: '手机已绑定其他账号',
        icon: 'none',
        duration: 10000
      })
      return tmpData.data.respCode
    } else {
      setToast(tmpData.data.respMsg)
    }
  } else {
    wx.removeStorageSync('login_token')
    setToast('登录失败')
  }
}
export function signIn () {
  let params = {
    nikename: wx.getStorageSync('nickName'),
    imgUrl: wx.getStorageSync('imgUrl'),
    openId: wx.getStorageSync('openid')
  }
  let res = fly.post(USERSIGNIN, params)
  if (res.code === 0) {
    return res.code
  }
}

export async function getProducts () { // 查询会员产品
  let params = {}
  let res = await fly.post(QUERYPRODUCTS, params)
  return res
}

export async function getUnMovieList () { // 查询可领取电影票
  let params = {}
  let res = await fly.post(QUERYUNMOVIELIST, params)
  return res
}

export async function getMovieList () { // 查询已领取电影票
  let params = {}
  let res = await fly.post(QUERYMOVIELIST, params)
  return res
}

export async function getUnUseCouponNum () { // 查询未使用优惠券张数
  let params = {}
  let res = await fly.post(UNUSECOUPONNUM, params)
  if (res.code === 0) {
    return res.count
  } else {
    setToast(res.message)
  }
}

export async function getMovieCoupon (movieTicketId) { // 领取电影票
  let params = {
    movieTicketId: movieTicketId
  }
  let res = await fly.post(MOVIECOLLECT, params)
  return res
}

// 查询是否为会员
export async function queryClubMember () {
  let res = await fly.post(QUERYCLUBMEMBER)
  if (res.code === 0) {
    let memberInfo = {
      clubMemberDays: res.clubMember && res.clubMember.clubMemberDays,
      validEndDate: res.clubMember && res.clubMember.validEndDate,
      validStartDate: res.clubMember && res.clubMember.validStartDate
    }
    wx.setStorageSync('memberInfo', memberInfo)
    return res
  }
}

export async function creatOrder (data) { // 创建会员订单
  let params = {
    clubMemberProductId: data[0],
    payAmount: data[1]
  }
  let res = await fly.post(ORDERCREATE, params, {loadingType: 3})
  return res
}

export async function queryCreatStatus (orderNo) { // 轮询订单状态
  let params = {
    orderNo: orderNo
  }
  let res = await fly.post(ORDERQUERYORDERSTATUS, params, {loadingType: 3})
  return res
}

export async function getPayOrder (orderNo, openid) { // 获取支付参数
  let params = {
    orderNo: orderNo,
    openid: openid
  }
  let res = await fly.post(PAYORDER, params, {loadingType: 3})
  return res
}

export async function getPayStatus (orderNo) { // 查询支付状态
  let params = {
    orderNo: orderNo
  }
  let res = await fly.post(ORDERQUERYPAYSTATUS, params, {loadingType: 2})
  return res
}

export async function updataPayResult (orderNo, prepayId, status) { // 上传支付结果
  let params = {
    orderNo: orderNo,
    prepayId: prepayId,
    status: status
  }
  let res = await fly.post(PAYRESULT, params)
  return res
}

export async function getOrderHandle (orderNo, prepayId, status) { // 查询待处理订单
  let params = {
    orderNo: orderNo,
    prepayId: prepayId,
    status: status
  }
  let res = await fly.post(TOHANDLE, params)
  return res
}

export async function getMyCouponList () { // 查询我的优惠券列表
  let params = {
    businessLine: 1
  }
  let res = await fly.post(MYCOUPONLIST, params)
  if (res.code === 0) {
    return res.userCoupons
  } else {
    setToast(res.message)
  }
}

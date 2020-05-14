/***
 *  定义接口常量 原则上是大写的
 *  */
export const CHECKTOKEN = '/service/validate/loginToken' // 验证token
export const LOGIN = '/miniProgram/login' // 登录接口
export const USERSIGNIN = '/user/signin' // 用户登录信息存储
export const QUERYPRODUCTS = '/product/queryProducts' // 会员产品列表
export const QUERYUNMOVIELIST = '/movie/queryUnCollectTickets' // 查询可领取电影票
export const QUERYMOVIELIST = '/movie/queryCollectTickets' // 查询已领取电影票
export const MOVIECOLLECT = '/movie/collect' // 领取电影票
export const QUERYCLUBMEMBER = '/user/queryClubMember' // 查询是否为会员
export const ORDERCREATE = '/order/create' // 创建订单
export const PAYORDER = '/order/mp/payOrder' // 获取支付参数
export const ORDERQUERYORDERSTATUS = '/order/queryOrderStatus' // 轮询订单状态
export const ORDERQUERYPAYSTATUS = '/order/queryPayStatus' // 订单支付状态
export const PAYRESULT = '/order/payResult' // 订单支付结果
export const TOHANDLE = '/order/toHandle' // 查询待处理订单
export const MYCOUPONLIST = '/coupon/queryCoupons' // 我的优惠券列表
export const UNUSECOUPONNUM = 'coupon/countUnUse' // 未使用优惠券张数

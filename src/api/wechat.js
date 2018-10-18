/**
 * Created by TY-xie on 2018/9/3.
 */

export const login = () => new Promise(resolve => {
  wx.login({
	success (res) {
	  if (res.code) {
		resolve({success: true, res})
	  } else {
		resolve({success: false, res})
	  }
	},
  })
})

export const getUserInfo = () => new Promise(resolve => {
  wx.getUserInfo({
	success: (res) => {
	  console.log(res)
	  resolve({success: true, data: res.userInfo})
	},
	fail(err) {
	  console.log('get user info error', err)
	},
  })
})

export const wxPay = (params) => new Promise(resolve => {
  /* 微信参数
   timeStamp	String	是	时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
   nonceStr	String	是	随机字符串，长度为32个字符以下。
   package	String	是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
   signType	String	是	签名算法，暂支持 MD5
   paySign	String	是	签名,具体签名方案参见小程序支付接口文档;
   */
  wx.requestPayment({
	'timeStamp': params.timeStamp,
	'nonceStr': params.nonceStr,
	'package': params.packageStr,
	'signType': params.signType,
	'paySign': params.paySign,
	success: res => {
	  console.log('pay success response ', res)
	  resolve({
		success: true,
		data: res,
	  })
	},
	fail: res => {
	  console.log('pay fail response ', res)
	  resolve({
		success: false,
		data: res,
	  })
	},
  })
})
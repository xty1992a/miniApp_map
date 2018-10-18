/**
 * Created by TY-xie on 2018/9/4.
 */

export const getUserInfo = async () => {
  let setting = await getSetting()
  if (setting['scope.userInfo']) {
	wx.getUserInfo({
	  success: (res) => ({success: true, data: res}),
	  fail: err => ({success: false, data: err}),
	})
  } else {
	return {success: false, data: err}
  }
}

export const getPhoneNumber = async () => {
  let setting = await getSetting()
  if (setting['scope.phoneNumber']) {
	wx.getUserInfo({
	  success: (res) => ({success: true, data: res}),
	  fail: err => ({success: false, data: err}),
	})
  } else {
	return {success: false, data: err}
  }
}

export const getSetting = () => new Promise(resolve => {
  wx.getSetting({
	success: (res) => {
	  resolve({success: true, data: res.authSetting})
	},
	fail: err => {
	  resolve({success: false, data: err})
	},
  })
})
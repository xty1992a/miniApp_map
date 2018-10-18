/**
 * Created by TY-xie on 2018/9/4.
 */
export default {
  getItem: key => new Promise(resolve => {
	wx.getStorage({
	  key,
	  success: (res) => {
		resolve({success: true, data: res.data})
	  },
	  fail: e => resolve({success: false, data: e}),
	})
  }),
  setItem: (key, val) => new Promise(resolve => {
	wx.setStorage({
	  key,
	  data: val,
	  success() {
		resolve({success: true, data: val})
	  },
	  fail() {
		resolve({success: false, data: val})
	  },
	})
  }),

  setItemSync(key, val) {
	try {
	  // console.log(key, val)
	  wx.setStorageSync(key, val)
	  return true
	} catch (e) {
	  console.log(e)
	  return false
	}
  },
  getItemSync(key){
	try {
	  return wx.getStorageSync(key)
	} catch (e) {
	  console.log(e)
	  return false
	}
  },
}
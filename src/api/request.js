/**
 * Created by TY-xie on 2018/8/16.
 */
import {json2Form} from '@/utils/json2Form'
import dialog from '@/utils/dialog'

export default ({
				  url,
				  data = {},
				  header = {'content-type': 'application/x-www-form-urlencoded'},
				  method = 'GET',
				},
				loading = true,
				toast = true) => {
  if (method === 'POST') {
	data = json2Form(data)
  }
  return new Promise(resolve => {
	loading && wx.showLoading({title: '加载中...',})
	wx.request({
	  url,
	  data,
	  method,
	  header,
	  success(res) {
		resolve({
		  success: true,
		  data: res.data,
		  message: res.data.message || '请求成功!',
		  res,
		})
	  },
	  fail(err) {
		toast && dialog.fail('网络异常!')
		resolve({
		  success: false,
		  data: err,
		  message: err.message || '网络异常!',
		  res: err,
		})
	  },
	  complete() {
		loading && wx.hideLoading()
	  },
	})
  })
}

/**
 * Created by TY-xie on 2018/9/4.
 */
export default {
  toast: ({title, icon = '', duration = 1000, image = ''}) => {
	wx.showToast({title, icon, duration, image})
  },
  fail: (title, duration = 1000) => wx.showToast({title, duration, image: '/static/icons/warn.png'}),
  success: (title, duration = 1000) => wx.showToast({title, duration}),
  confirm: (content, title = '提示') => new Promise((resolve, reject) => {
	wx.showModal({
	  title,
	  content,
	  success: (res) => {
		if (res.confirm) {
		  resolve()
		} else if (res.cancel) {
		  reject()
		}
	  },
	})
  }),
}
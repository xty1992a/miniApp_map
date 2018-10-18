/**
 * Created by TY-xie on 2018/8/16.
 */
// 安卓无法使用gcj02坐标定位,使用默认wgs坐标系,再转换为gcj02坐标
import coordtransform from 'coordtransform'
// altitude是否精确定位
export const getLocation = (altitude = true) => new Promise(resolve => {
  wx.getLocation({
	altitude,
	success: res => {
	  console.log('[wx] getLocation: ', res)
	  let {longitude, latitude} = res
	  let location = coordtransform.wgs84togcj02(longitude, latitude)
	  resolve({success: true, data: {longitude: location[0], latitude: location[1]}})
	  // resolve({success: true, data: {longitude, latitude}})
	},
	fail: res => resolve({success: false, data: res}),
  })
})

export const getMapRegion = map => new Promise(resolve => {
  map.getRegion({
	success: res => {
	  if (res.errMsg === 'getMapRegion:ok') {
		console.log('[wx] getRegion: ', res)
		let {northeast, southwest} = res
		resolve({success: true, data: {northeast, southwest}})
	  } else {
		resolve({success: false, data: res})
	  }
	},
	fail: res => resolve({success: false, data: res}),
  })
})

export const getCenter = (map, gcj = true) => new Promise(resolve => {
  map.getCenterLocation({
	success: res => {
	  console.log('[wx] getCenterLocation: ', res)
	  if (res.errMsg === 'getMapCenterLocation:ok') {
		let {longitude, latitude} = res
		let location = [longitude, latitude]
		if (gcj) {
		  location = coordtransform.wgs84togcj02(longitude, latitude)
		}
		resolve({success: true, data: {longitude: location[0], latitude: location[1]}})
		// resolve({success: true, data: res})
	  } else {
		resolve({success: false, data: res})
	  }
	},
	fail: res => resolve({success: false, data: res}),
  })
})
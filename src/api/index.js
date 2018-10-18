/**
 * Created by TY-xie on 2018/8/16.
 */
import request from './request'

export const getCityName = ({lat, lng}) => request({url: `http://gc.ditu.aliyun.com/regeocoding?l=${lat},${lng}&type=010`})
export const getPoints = data => request({url: `https://restapi.amap.com/v3/assistant/inputtips?key=219a5525f5c7aaa833159a93afce1172`, data}, false)
<template>
  <div class="home-page page">
    <div class="map-container">
      <map id="map"
           :markers="markerList"
           :show-location="true"
           :circles="circles"
           @regionchange="regionChange"
           @begin="regionBegin"
           @end="regionEnd"
           style="width: 100%;height: 100%;"></map>
      <cover-view :style="btnStyle" class="center-btn" @click.stop="backUserLocation">
        <cover-image src="/static/icons/position.png"></cover-image>
      </cover-view>
    </div>
    <div class="map-setter">
      <ul class="menus">
        <li class="menu" v-for="(it, i) in distanceList" @click="menuTap(i)" :key="i">{{it}}km</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import AMap from '@/utils/amap-wx.js'
  import {getLocation, getCenter} from '@/utils/wechatMap.js'
  import {getCityName, getPoints} from '@/api'
  let regionTimeStamp = 0

  export default {
	name: 'home',
	components: {},
	data () {
	  return {
		mapCenter: null,
		userLocation: null,
		distanceList: [3, 5, 7, 9],
		markers: [],
		distanceIndex: 0
	  }
	},
	async onLoad() {
	  this.initMaps()
	  this.getUserLocation()
	  await  this.getMapCenter()
//	  this.searchMarkers('商场')
	  this.scaleTo(3000)
	},
	methods: {
	  initMaps() {
		this.map = wx.createMapContext('map')
		this.amap = new AMap.AMapWX({key: '8163e9bbbceb8ea20bf636d87e5e1ae1'});
	  },
	  async getUserLocation() {
		let res = await getLocation()
		if (res.success) {
		  this.userLocation = {...res.data}
		}
	  },
	  // region 事件回调
	  regionBegin({timeStamp}) {
		regionTimeStamp = timeStamp
	  },
	  async regionEnd({timeStamp}) {
		if (timeStamp - regionTimeStamp < 120) return
		this.regionChange()
	  },
	  // 地图变化(位移,缩放)
	  async regionChange() {
		console.log('[home] regionChange invoke')
		await this.getMapCenter()
		this.searchMarkers('商场')
	  },
	  // 回到用户位置
	  backUserLocation() {
		this.mapCenter = {...this.userLocation}
		this.map.moveToLocation()
		this.regionChange()
	  },
	  // 点选距离
	  menuTap(index) {
		this.distanceIndex = index
		this.scaleTo(this.currentDistance * 1000)
	  },
	  // endregion
	  // region 地图API
	  async getMapCenter() {
		let res = await getCenter(this.map, false)
		if (res.success) {
		  let {latitude, longitude} = res.data
		  this.mapCenter = {latitude, longitude}
		}
	  },
	  scaleTo(distance) {
		// 同一条经线上,每差1纬度跨111公里,据此计算南北两个点,调用地图api容纳,达到缩放地图的目的
		if (!this.mapCenter) return
		let {longitude: lng, latitude: lat} = this.mapCenter
		let north = {longitude: lng, latitude: lat + distance / 111000}
		let south = {longitude: lng, latitude: lat - distance / 111000}
		this.map.includePoints({
		  points: [north, south],
		  padding: [100, 0, 0, 0],
		  success: console.log,
		  fail: console.log
		})
		this.regionChange()
	  },
	  // endregion
	  async searchMarkers(keywords) {
		let {longitude: lng, latitude: lat} = this.mapCenter
		let res = await getPoints({keywords, location: `${lng},${lat}`})
		if (res.success && res.data.info === 'OK') {
		  this.markers = res.data.tips.filter(it => it.location.length)
		}
	  },
	},
	computed: {
	  circles() {
		if (!this.mapCenter) return []
		let {latitude, longitude} = this.mapCenter
		return [
		  {
			latitude,
			longitude,
			color: '#FFA31Daa',
			radius: this.currentDistance * 1000,
			fillColor: '#FFA31D33',
			strokeWidth: 1
		  },
		]
	  },
	  currentDistance() {
		return this.distanceList[this.distanceIndex]
	  },
	  markerList() {
		if (!this.markers.length) return
		return this.markers.map((it, index) => {
		  let {location} = it
		  let list = location.split(',')
		  return {
			id: index,
			iconPath: '/static/icons/device.png',
			width: 48,
			height: 48,
			latitude: +list[1],
			longitude: +list[0],
			callout: {
			  content: it.name,
			  padding: 5,
			  borderRadius: 13,
			  fontSize: 15,
			  display: 'BYCLICK',
			  color: '#333',
			  bgColor: '#f7f7f7',
			}
		  }
		})
	  },
	}
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .home-page {
    .map-container {
      height: 500px;
      position: relative;
      .center-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
        cover-image {
          width: 56px;
          height: 56px;
        }
      }
    }
    .map-setter {
      .menus {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .menu {
          width: 50px;
          line-height: 32px;
          text-align: center;
          border-radius: 4px;
          background-color: @sunC;
          color: #fff;
        }
      }
    }
  }
</style>

<template>
	<view class="container">
		 <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
        <swiper-item v-for="(item,index) in bannerList" :key="index">
        <view class="details" :data-id="item?item.id:''" hoverClass="none">
          <image mode='widthFix' :src="item?item.image:''" class="slide-image" width="355" height="150" />
          </view>
        </swiper-item>
    </swiper>
  <view class='dateItem' v-for="(item,index) in list" v-if="index<3" :key="index">
    <view class="details" :data-id="item?item.id:''" hoverClass="none" @click='NavGTodetails'>
      <view class='left'>
        <view class='title'>{{item?item.title:''}}</view>
        <view class='bottom'>
          <text class='time'>{{item?item.create_time:''}}</text>
        </view>
      </view>
      <view class='right'>
        <image :src="item?item.image:''"></image>
      </view>
    </view>
  </view>
	</view>
</template>
<script>
	import utils from '../../utils/utils.js'
	import globalData from '../../utils/globalData.js'
	import {
		formid,
		getUserOpenId,
		bindGetUserInfo
	} from "../../utils/common.js";
	export default {
		data() {
			return {
				list: [],
				arrList: [],
				bannerList:[],
				itemData: ["2018-12-20", "2018-12-21", "2019-2-22", "2019-1-24"]
			};
		},
		onShow() {
			
		},
		onLoad(e) {
			this.load()
		},
		computed: {

		},
		methods: {
			  // 跳转文章详情
			  NavGTodetails: function (e) {
				var id = e.currentTarget.dataset.id;
				  wx.navigateTo({
					url: '/pages/ArticleDetal/ArticleDetal?id='+id,
				  })

  },
			load() {
				var that = this;
				getUserOpenId().then((key) => {
					var datas = {
						sessionKey: key
					}
					utils.requst("xcxaudit/index", "POST", datas).then((res) => {
						uni.hideLoading();
						if (res.data.auditList) {
							for (let i = 0; i < res.data.auditList.length; i++) {
								that.arrList.push(res.data.auditList[i])
							}
							that.list = that.arrList;
							that.bannerList =res.data.bannerList;
							console.log(that.list)
						}
					})
				})
			}
		}
	};
</script>
<style>
	page {
		background-color: #fff;
	}

	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 50upx;
		position: relative;
	}

.loadingView{
  text-align: center;
  margin-top: 50%;
}
.dateItem{
  width: 100%;
  margin: 30rpx 0;
}
.details{
  display: flex;

}
.left{
flex: 5;
padding: 10rpx;
}
.right{
flex: 4;
box-sizing: border-box;
width: 340rpx;
height: 200rpx;
padding: 10rpx;
}
.right image{
 width: 300rpx;
height: 180rpx;
}
.title {
	word-break: break-all;
  width: 400rpx;
  height: 100rpx;
  font-size: 32rpx;
  color: #333;
}
.bottom{
  margin-top: 25rpx;
  padding-left: 20rpx;
}
.time{
  font-size: 28rpx;
  color: #666;
}
.swiper{
  width: 100%;
  height: 300rpx;
}
.swiper image{
  width: 100%;
  height: 300rpx;
}
	
</style>

<template>
	<view class="container">
		<image class="invitbgc" src="../../static/img/invitbgc.png" mode="widthFix"></image>
		<view class="invilist">
			<view class="listitem" v-for="(item,index) in list" :key='index'>
				<image class="heardimg" :src="item.headimg" mode=""></image>
				<view class="name">
					{{item.nickname}}
				</view>
				<view class="time">
					{{item.create_time}}邀请
				</view>
			</view>
			<view class="nomore" v-if="complete">
				已没有更多！
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
				page_number: 1,
				page_size: 10,
				list: [],
				arrList: [],
				count: 0,
				htmlShow: true,
				htcres: null,
				complete:false
			};
		},
		onShow() {
			this.list=[];
			this.arrList=[];
			this.page_number=1;
			this.load()
		},
		onLoad(e) {
			uni.showLoading({
						title: '加载中'
					});
		},
		computed: {

		},
		methods: {
			load() {
				var that = this;
				getUserOpenId().then((key) => {
					var datas = {
						sessionKey: key,
						page_number: this.page_number,
						page_size: this.page_size
					}
					utils.requst("user/invite", "POST", datas).then((res) => {
						uni.hideLoading();
						if (res.data.list) {
							for (let i = 0; i < res.data.list.length; i++) {
								that.arrList.push(res.data.list[i])
							}
							that.list = that.arrList;
							that.count = res.data.count;
							that.htmlShow = true;
							that.htcres = res.data;
							 if (that.arrList.length == that.count) {
									that.complete = true
							}
						}
					})
				})
			}
		},
		onReachBottom() {
			var that = this;
			var count = that.count,
				page_size = that.page_size,
				page_number = that.page_number;
			var num = Math.ceil(count / page_size) < 11 ? Math.ceil(count / page_size) : 10;
			if (page_number < num) {
				that.page_number = 1 + parseInt(page_number)
				that.load();
			} else {
				that.complete = true
			}
		},
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
		padding-top: 210upx;
		padding-bottom: 50upx;
		position: relative;
	}

	.invitbgc {
		z-index: -1;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}

	.invilist {
		box-sizing: border-box;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0px 0px;
		padding: 30upx;
	}

	.listitem {
		margin-top: 30upx;
		display: flex;
		align-items: center;
	}

	.listitem:first-child {
		margin-top: 0;
	}

	.heardimg {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.name {
		font-size: 28upx;
		color: #333333;
		margin-left: 25upx;
		flex: 1;
	}

	.time {
		color: #999999;
		font-size: 26upx;
	}

	.nomore {
		margin-top: 50upx;
		font-size: 24upx;
		color: #999;
		text-align: center;
	}
</style>

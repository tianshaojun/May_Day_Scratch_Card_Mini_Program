<template>
	<view class="container">
		<view class="goodList" v-for="(item,index) in list" :key="index">
			<image class="listBgc" src="../../static/img/listBgc.png" mode="widthFix"></image>
			<image class="goodpic" :src="item.prize_img"></image>
			<view class="goodinfo">
				<view class="goodname">
					{{item.prize_name}}
				</view>
				<view class="endtime">
					兑换时间：{{item.start_time}}-{{item.end_time}}
				</view>
			</view>
			<button class="godetilbtn" :data-id="item.id" @click="lookdetilfun">查看详情</button>
		</view>
		<view class="nomore" v-if="complete">
			没有更多奖品~
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
			this.page_number=1;
			this.list=[];
			this.arrList = [];
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
			lookdetilfun(e){
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
						url: '/pages/goodsdetil/goodsdetil?prize_id='+id,
						success: res => {},
						fail: () => {},
						complete: () => {}
				});
			},
			load(){
				var that = this;
				getUserOpenId().then((key) => {
					var datas = {
						sessionKey: key,
						page_number: this.page_number,
						page_size: this.page_size
					}
					utils.requst("user/userprize", "POST", datas).then((res) => {
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
	page{
		background-color:#933726;
	}
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 100upx;
	}
	.goodList{
		width:690upx;
		height: 165upx;
		border-radius:20upx;
		padding: 30upx;
		margin: 30upx auto 0;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
	}
	.listBgc{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 165upx;
		z-index: -1;
	}
	.goodpic{
		width: 128upx;
		height: 128upx;
		border-radius: 10upx;
	}
	.goodinfo{
		flex: 1;
		color: #fff;
		box-sizing: border-box;
		padding: 0 35upx 0 20upx;
	}
	.goodinfo .goodname{
		font-size: 26upx;
		color: #3A2120;
		height: 68upx;
		overflow:hidden;
	}
	.goodinfo .endtime{
		font-size: 22upx;
		color: #E2221B;
		margin-top: 16upx;
	}
	.godetilbtn{
		padding: 0;
		margin: 0;
		width:60upx;
		line-height: 36upx;
		font-size:22upx;
		color: #D67534;
		background-color:transparent;
	}
	.nomore{
		text-align: center;
		color: #999;
		font-size: 28upx;
		margin-top: 20upx;
		}
</style>

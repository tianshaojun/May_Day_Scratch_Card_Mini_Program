<template>
	<view class="container">
		<view class="rankinfo">
			<view class="titleimgconter">
				<image class="titleimg" mode="widthFix" src="../../static/img/ranktwoImg.png"></image>
			</view>
			<view class="rankList">
				<view class="beffour" v-if="htcres && htcres.userInfo.prize_status==1">
					<image class="beffourimg" mode="widthFix" :src="htcres.userInfo.prize_img"></image>
				</view>
				<view class="rankberfthree">
					<view class="list">
						<view class="center">
							<image class="centerImg"  :src="list[1]?list[1].headimg:'../../static/img/deftheard.png'" mode=""></image>
							<image src="../../static/img/ranktwo.png" mode="" class="hearcat"></image>
						</view>
						<view class="btmname">
							{{list[1]?list[1].nickname:'暂无'}}
						</view>
						<view class="poenum">
							已邀请{{list[1]?list[1].invite_num:'0'}}人
						</view>
					</view>
					<view class="list">
						<view class="center">
							<image class="centerImg" :src="list[0]?list[0].headimg:'../../static/img/deftheard.png'" mode=""></image>
							<image src="../../static/img/rankone.png" mode="" class="hearcat"></image>
						</view>
						<view class="btmname">
							{{list[0]?list[0].nickname:'暂无'}}
						</view>
						<view class="poenum">
							已邀请{{list[0]?list[0].invite_num:'0'}}人
						</view>
					</view>
					<view class="list">
						<view class="center">
							<image class="centerImg" :src="list[2]?list[2].headimg:'../../static/img/deftheard.png'" mode=""></image>
							<image src="../../static/img/rankthree.png" mode="" class="hearcat"></image>
						</view>
						<view class="btmname">
							{{list[2]?list[2].nickname:'暂无'}}
						</view>
						<view class="poenum">
							已邀请{{list[2]?list[2].invite_num:'0'}}人
						</view>
					</view>
				</view>
				<view class="ranklistall">
					<view class="listitem" v-if="index>2"  v-for="(item,index) in list" :key='index'>
						<view class="ranknum">
							{{index+1}}
						</view>
							<image :src="item.headimg" mode="" class="hearImg"></image>
						<view class="name">
							{{item.nickname}}
						</view>
						<view class="peoallnum">
							已邀请{{item.invite_num}}人
						</view>
					</view>
					<view class="shsuoming">
						每5分钟更新一次，只展示邀请榜前100名
					</view>
				</view>
			</view>
		</view>
		<view class="myrank">
				<image class="myheard" :src="htcres?htcres.userInfo.headimg:'../../static/img/deftheard.png'" mode="widthFix"></image>
			<view class="mynum">
				<view class="myname">
					我
				</view>
				<view class="num">
					{{invite_ranking}} (已邀请{{htcres?htcres.userInfo.user_num:'0'}}人)
				</view>
			</view>
			<view class="mybtn">
				<button class="mybtngo" open-type='share' form-type='submit'>去冲榜</button>
			</view>
		</view>
		<!-- <loading wx:if="{{htmlShow}}">加载中</loading> -->
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
				arrList:[],
				count: 0,
				htmlShow:true,
				htcres:null,
				invite_ranking:'暂无排名'
			};
		},
		onShow() {
			console.log('indexonshow')
		},
		onLoad() {
			uni.showLoading({
			title: '加载中'
		});
			this.load()
		},
		computed: {

		},
		onReachBottom(){
			var that = this;
			var count = that.count,
			  page_size = that.page_size,
			  page_number = that.page_number;
			var num = Math.ceil(count / page_size) < 11 ? Math.ceil(count / page_size) : 10;
			if (page_number < num) {
			  that.page_number = 1 + parseInt(page_number)
			  that.load();
			} else {
			  
			}
		},
		onShareAppMessage: function (res) {
			var that = this;
			console.log(globalData.getres.uid,'dddddddddddddd')
			return {
			  title: that.htcres.userInfo.share_title,
			  path: 'pages/index/index?fid=' + globalData.getres.uid,
			  imageUrl: that.htcres.userInfo.share_img,
			  success: function (res) {
				var param = {
				  share_type: 3,
				  sessionKey:globalData.sessionKey,
				}
				app.utils.requst("user/usershare", "POST", param).then((res) => {
				  console.log(res)
				})
			  },
			  fail: function (res) {
			  }
			}
		  },
		methods: {
			load(){
				var that = this;
				getUserOpenId().then((key) => {
					var datas = {
						sessionKey:key,
						page_number: this.page_number,
						page_size: this.page_size
					}
					utils.requst("index/ranking", "POST", datas).then((res) => {
						uni.hideLoading();
						 if (res.data.list) {
							for (let i = 0; i < res.data.list.length; i++) {
									that.arrList.push(res.data.list[i])
								  }
							that.list= that.arrList;
							that.count= res.data.count;
							that.htmlShow= true;
							that.htcres= res.data;
							that.page_number= that.page_number;
							that.invite_ranking = res.data.userInfo.invite_ranking=='暂无排名'?'暂无排名':'第'+res.data.userInfo.invite_ranking+'名'
						}
					})
			})
			}
		}
	};
</script>
<style>
	page{
		background-color:rgb(161,46,29);
	}
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 100upx;
	}
	.titleimgconter{
		text-align: center;
	}
	.titleimgconter .titleimg{
		width:100%;
		height: 94upx;
	}
	.beffour .beffourimg{
		width: 100%;
	}
	.rankinfo{
		padding-top: 30upx;
	}
	.rankList{
		width:670upx;
		background:#E5CBA5;
		border-radius:20upx;
		padding: 30upx 30upx 30upx 30upx;
		margin: 0 auto;
		box-sizing: border-box;
	}
	.rankberfthree{
		display: flex;
		justify-content: space-between;
		margin-top: 86upx;
	}
	.rankberfthree .list{
		flex: 1;
	}
	.rankberfthree .list .center{
		width:100%;
		text-align: center;
		position: relative;
	}
	.rankberfthree .list .center .hearcat{
		width: 64upx;
		height: 54upx;
		position: absolute;
		top: -40upx;
		left: 50%;
		margin-left: -32upx;
	}
	.rankberfthree .list{
		padding-top: 26upx;
	}
	.rankberfthree .list:nth-child(2){
		padding-top: 0;
	}
	.rankberfthree .list:nth-child(2) .center .hearcat{
		width: 80upx;
		height: 68upx;
		position: absolute;
		top: -50upx;
		left: 50%;
		margin-left: -40upx;
	}
	.rankberfthree .list .center .centerImg{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.rankberfthree .list:nth-child(2) .center .centerImg{
		width: 126upx;
		height: 126upx;
		border-radius: 50%;
	}
	.rankberfthree .list .btmname{
		font-size: 28upx;
		color: #6E0703;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 200upx;
		padding: 0 5upx;
	}
	.rankberfthree .list .poenum{
		font-size: 20upx;
		color: #6E0703;
		text-align: center;
		margin-top: 10upx;
		width: 200upx;
		padding: 0 5upx;
		 white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.listitem{
		display: flex;
		align-items: center;
		margin-top: 40upx;
	}
	.listitem .ranknum{
		margin-left: 20upx;
		width:46upx;
		height:46upx;
		line-height: 46upx;
		text-align: center;
		background:#E8557F;
		border-radius:50%;	
		color:#fff;
		font-size: 24upx;
	}
	.listitem .hearImg{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-left: 17upx;
	}
	.listitem .name{
		color: #6E0703;
		font-size: 28upx;
		margin-left: 24upx;
	}
	.peoallnum{
		font-size: 26upx;
		color: #6E0703;
		flex: 1;
		text-align: right;
	}
	.shsuoming{
		color: #6E0703;
		font-size: 20upx;
		text-align: center;
		margin-top: 40upx;
	}
	.myrank{
		position: fixed;
		bottom: 0;
		left: 0;
		width:100%;
		background:#F0DAC6;
		padding: 40upx;
		margin: 30upx auto 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		
	}
	.myrank .myheard{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.mynum{
		flex: 1;
		color: #6E0703;
		margin-left: 25upx;
	}
	.mynum .myname{
		font-size: 30upx;
	}
		.mynum .num{
		font-size: 26upx;
	}
	.mybtngo{
		width:138upx;
		height:50upx;
		line-height: 50upx;
		background:#AC3734;
		border-radius:10upx;
		padding: 0;
		margin: 0;
		font-size: 26upx;
		color: #fff;
	}
</style>

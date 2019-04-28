<template>
	<view class="container">
		<view class="goodstetil">
			<view class="goodspiconter">
				<image :src="prizeInfo?prizeInfo.prize_img:''" mode="widthFix" class="goodspic"></image>
			</view>
			<view class="goodname">
				{{prizeInfo?prizeInfo.prize_name:'无此商品'}}
			</view>
			<view class="endtime" v-if="prize_type != 1">
				兑换期限：{{prizeInfo?prizeInfo.start_time:'0-0-0'}}-{{prizeInfo?prizeInfo.end_time:'0-0-0'}}
			</view>
			<view class="codeinfo">
				<view class="code" v-if="prize_type != 1">
					<text class="codetxt">我的口令：</text><text class="codenum">{{prizeInfo?prizeInfo.goods_code:''}}</text>
					<button class="copybtn" :data-code="prizeInfo?prizeInfo.goods_code:'无此兑换码'" @click="copyfun">复制</button>
				</view>
				<view class="codeuse">
					点击“马上兑换”跳转到兑换界面
				</view>
			</view>
		</view>
		<view class="explain">
			<view class="explainlist" v-if="prize_type != 1">
				<view class="title">
					有效日期：
				</view>
				<view class="info">
					 {{prizeInfo?prizeInfo.start_time:'0-0-0'}}-{{prizeInfo?prizeInfo.end_time:'0-0-0'}}
				</view>
			</view>
			<view class="explainlist">
				<view class="title">
					可用时段：
				</view>
				<view class="info">
					周一至周日
				</view>
			</view>
			<view class="explainlist">
				<view class="title">
					兑换须知：
				</view>
				<view class="info">
					<view>
					1.用户获奖后点击复制口令，点击马上兑换，前往【魔力橙精选】进行兑换
					</view>
					<view>
					2.兑奖成功后发货时间为活动结束后的3-5个工作日之内
					</view>
					<view>
					3.活动最终解释权归魔力橙所有
					</view>
				</view>
			</view>
		</view>
		<view class="exchange">
			<button class="exBtn" data-appid='wx62442cceb6dba222' @click='goexchange'>马上兑换</button>
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
				prize_id:null,
				prizeInfo:null,
				prize_type:2
			};
		},
		onLoad(ops) {
			uni.showLoading({
						title: '加载中'
					});
			this.prize_id = ops.prize_id;
			getUserOpenId().then((key) => {
				var datas = {
					sessionKey: key,
					prize_id:this.prize_id
				}
				utils.requst("user/prizeinfo", "POST", datas).then((res) => {
					this.prizeInfo = res.data.prizeInfo;
					this.prize_type = res.data.prizeInfo.	prize_type
					uni.hideLoading();
				})
				})
		},
		computed: {

		},
		methods: {
			copyfun(e){
				var data = e.currentTarget.dataset.code;
				uni.setClipboardData({
				data: data,
				success: function () {
					console.log('success');
				}
});
			},
				goexchange(e){
				var that = this;
				var appId = e.currentTarget.dataset.appid;
				var path = this.prize_type==2?'/pages/word/word?mordShow=1':'/pages/index/index'
					getUserOpenId().then((key) => {
						utils.requst("user/exchange", "POST", { sessionKey: key }).then((res) => {
						var xyxSessionKey = res.data;
						uni.navigateToMiniProgram({
							appId: appId,
							path:path,
							envVersion: 'trial',
							extraData: { key: xyxSessionKey },
							success(res) {
								console.log(1)
							}
						})
					}).catch((res) => {
						console.log(res)
					})
				})
			},
		}
	};
</script>
<style>
	page{
		background-color:#F3F3F3;
	}
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 200upx;
	}
	.goodstetil{
		box-sizing: border-box;
		padding: 0 30upx;
		background: #FFFFFF;
	}
	.goodspiconter{
		text-align: center;
	}
	.goodspic{
		width: 500upx;
	}
	.goodname{
		color: #333;
		font-size: 34upx;
		margin-top: 30upx;
		font-weight: bold;
	}
	.endtime{
		font-size: 30upx;
		color: #666;
		margin-top: 20upx;
	}
	.codeinfo{
		margin-top: 30upx;
		border-top: 1upx solid #E0E0E0;
		padding: 30upx 0;
	}
	.code{
		font-size: 30upx;
		display: flex;
		align-items: center;
	}
	.code .codetxt{
		color: #333;
	}
	.code .codenum{
		color: #E8557F;
	}
	.copybtn{
		width:150upx;
		height:50upx;
		line-height: 50upx;
		border:1upx solid #AFAFAF;
		border-radius:25upx;
		background: #fff;
		color: #333;
		font-size: 24upx;
	}
	.codeuse{
		font-size: 26upx;
		color: #999;
		margin-top: 20upx;
	}
	.explain{
		margin-top: 20upx;
		padding: 10upx 40upx 30upx 30upx;
		background-color: #fff;
	}
	.explainlist{
		display: flex;
		font-size: 26upx;
		color: #999999;
		margin-top: 25upx;
	}
	.title{
		
	}
	.info{
		flex: 1;
	}
	.exchange{
		width:100%;
		height:128upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 1upx 0px rgba(0, 0, 0, 0.3);
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		padding-top: 19upx;
	}
	.exBtn{
		width:590upx;
		height:90upx;
		line-height: 90upx;
		background:#AC3734;
		border-radius:10upx;
		color: #fff;
		font-size:34upx ;
	}
</style>

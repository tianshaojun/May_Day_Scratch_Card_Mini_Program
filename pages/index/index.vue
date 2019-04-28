<template>
	<view class="container">
		<view v-if="htmlshow" class="htmlshow">
			加载中~
		</view>
		<view v-if="!htmlshow">
			<view class="lucky-wheel">
				<image class="topBgc" mode="widthFix" :src="alldata?alldata.activityInfo.background_img:''"></image>
				<button class="mygoods" @click="gomygoods">
					<image class="mygoodsbtnimg" src="../../static/img/wdjpbtn.png"></image>
				</button>
				<button class="paihangb" @click="goranking">
					<image class="paihangbbtnimg" src="../../static/img/phbbtn.png"></image>
				</button>
				<view class="lucky-title">
					<view class="lotterytime">
						活动时间:{{globalData?globalData.getres.start_time:'0-0-0'}}-{{globalData?globalData.getres.end_time:'0-0-0'}}
					</view>
				</view>
				<view class='swiper_'>
					<image class="swiper_bgc" src="../../static/img/swipbgc.png"></image>
					<swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000" v:if="openRed.length !=0">
						<swiper-item v-for="(item,index) in winnerList" :key="index">
							<view class="swiper_item">
								<text>恭喜用户</text>
								<text>{{item.nickname}}</text>
								<text>成功抽中</text>
								<text>{{item.prize_name}}</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view v-if="activity_endtime" id="lottery">
					<image class="lotteryBgc" src="../../static/img/cardbgc.png"></image>
					<view id='guagua'>
						<canvas v-show="!pristatu && !auther" canvas-id="guaguaCanvas"  disable-scroll="true" @touchstart='startCanvas' @touchmove='moveCanvas' @touchend='endCanvas'></canvas>
						<view class='guagua-re'>{{result_val}}</view>
					</view>
				</view>
				<view v-if="!activity_endtime" class="endtime">
					活动已结束
				</view>
				<view class="available_num">
					您今日还有 <text>{{available_num}}</text> 次抽奖机会
				</view>
			</view>
			<view class="exchange">
				<image class="exchangeBgc" src="../../static/img/exchangeBgc.png"></image>
				<view class="exchangeinfo">
					<view class="exchangeinfoleft">
						<view class="exchangetop">
							已获得积分：{{alldata?alldata.userInfo.income_gold:'0'}}
						</view>
						<view class="exchangebtm">
							可兑换积分：{{alldata?alldata.userInfo.surplus_gold:'0'}}
						</view>
					</view>
					<view class="exchangeinforight">
						<button class="Btn" data-appid='wx62442cceb6dba222' @click='goexchange'>去兑换</button>
					</view>
				</view>
			</view>
			<view class="Invitationtask">
				<view class="Invtaskinfo">
					<image class="InvBgc" src="../../static/img/InvBgc.png" mode=""></image>
					<view class="distitle">
						还差<text>{{round_count}}</text>人可抽一次
					</view>
					<view class="fivepeo">
						<view class="btmpeo" v-for="(item,index) in 5-round_count" :key='index'>
							<button class="fivebtn">
								<image class="btnpeoheard" :src="inviteList[inviteList.length-1-index]?inviteList[inviteList.length-1-index].headimg:'../../static/img/deftheard.png' "
								 mode=""></image>
							</button>
							<view class="fivename">
								{{inviteList[inviteList.length-1-index]?inviteList[inviteList.length-1-index].nickname:'无名'}}
							</view>
						</view>
						<view class="yaoqing" v-for="(item,index) in round_count" :key='index'>
							<button class="fivebtn" open-type='share' form-type='submit'>
								<image class="fivebtnimg" src="../../static/img/addbtn.png" mode=""></image>
							</button>
							<view class="fivebtname">
								待邀请
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="yaoqinall">
				<button class="lookall" @click="lookallfun" v-if="inviteList.length!=0">查看全部</button>
			</view>
			<view class="Invitationtask">
				<view class="openinfo">
					<image class="openBgc" src="../../static/img/openBgc.png" mode=""></image>
					<view class="openlist">
						<view class="openheard">
							<img class='heardimg' :src="alldata?alldata.activityInfo.jump_img:'../../static/img/deftheard.png'" alt="">
						</view>
						<view class="openbrie">
							<view class="opentop">
								每天打开一次小程序
							</view>
							<view class="openbtm">
								送 <text>{{1}}</text> 次抽奖机会
							</view>
						</view>
						<view class="openBtn">
							<button class="Btn" :data-appid="alldata?alldata.activityInfo.jump_appid:'' " @click='openxcx'>立即打开</button>
						</view>
					</view>
				</view>
			</view>
			<view class="Invitationtask">
				<view class="ruleinfo">
					<image class="ruleBgc" src="../../static/img/ruleBgc.png" mode=""></image>
					<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" >
			           <view class="rulelist" v-for="(item,index) in ruleList" :key="index">
			           	{{index+1}}.{{item.describe}}
			           </view>
			        </scroll-view>
					
				</view>
			</view>
			<view class="mask" catchtouchmove='true' v-if="pristatu" @click="closeprize">
				<view class="prizebox">
					<image class="pribgc" src="../../static/img/prizebgc.png" mode="widthFix"></image>
					<view class="priname">恭喜你！获得奖品：</view>
					<view class="priname">{{prize_info?prize_info.prize_name:'未中奖'}}</view>
					<image class="priimg" :src="prize_info?prize_info.prize_img:'../../static/img/autherfrid.png'" mode=""></image>
					<button class="lookdetilbtn" :data-id="prize_info?prize_info.id:''" @click="gogoodsfun">查看奖品</button>
				</view>
			</view>
			<view class="mask" catchtouchmove='true' v-if="auther" @click="closeauther">
				<view class="autherbox" v-if="fid==0">
					<image class="autherbgc" src="../../static/img/auther.png"></image>
					<button class="autherbtn" open-type='getUserInfo' lang="zh_CN" form-type='submit' @getuserinfo="onGotUserInfo">领取</button>
				</view>
				<view class="fridautherbox" v-if="fid!=0">
					<image class="autherbgc" src="../../static/img/autherfrid.png"></image>
					<view class="fridinfo">
						<image class="fridImg" :src="alldata?alldata.fUserInfo.headimg:''"></image>
						<view class="fridName">
							{{alldata?alldata.fUserInfo.nickname:''}}
						</view>
					</view>
					<button class="autherbtn" open-type='getUserInfo' lang="zh_CN" form-type='submit' @getuserinfo="onGotUserInfo">帮Ta助力</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var ctx = null
	//坐标容器
	var ctxbox = [];
	//擦拭坐标容器
	var ablebox = [];
	import utils from '../../utils/utils.js'
	import util from '../../utils/util.js'
	import globalData from '../../utils/globalData.js'
	import config from '../../config.js'
	import {
		formid,
		getUserOpenId,
		bindGetUserInfo
	} from "../../utils/common.js";
	export default {
		data() {
			return {
				fid: 0,
				qid: 0,
				pristatu: false,
				auther: false,
				alldata: null,
				globalData: null,
				ruleList: [],
				round_count: null,
				inviteList: [],
				available_num: 3, //可用抽奖的次数，可自定义设置或者接口返回
				winnerList: [],
				canvas_isdraw: false, //画布是否在绘制中
				canvas_width: 315, //画布宽度，可自定义设置
				canvas_height:138, //画布高度，可自定义设置
				canvas_clearw: 20, //橡皮咋宽，可自定义设置
				canvas_clearh: 20, //橡皮咋高，可自定义设置
				canvas_percent: 0.3, //自动提示获奖依据设置的参考比例(刮出比例占总大小多少提示)，可自定义设置(0-1)
				canvas_forPercent: false, //自动提示获奖是否已经提示，默认不提示，避免重复提示
				result_val: "未中奖", //实际奖项值
				prize_info:'',
				activity_endtime:false,
				htmlshow:true,
				reping:true
			};
		},
		onShow() {
			this.load();
			this.reset();
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: globalData.getres ? globalData.getres.box_name : config.vname,
			})
			if (options.scene) {
				var scene = decodeURIComponent(options.scene);
				if (scene.indexOf("&") != -1) {
					var theRequest = new Object();
					var strs = scene.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
					}
					options.qid = theRequest.qid;
					options.fid = theRequest.fid;
				} else {
					options.qid = scene.split('=')[1];
				}

			}
			this.fid = options.fid ? options.fid : 0
			this.qid = options.qid ? options.qid : 0
			// 使用 uni.createContext 获取绘图上下文 context
			ctx = uni.createCanvasContext('guaguaCanvas');
			//产生实际奖项值
			// this.getVal();
			//初始化画布
			this.initCanvas();
			//重置坐标容器
			this.resetbox();
			
		},
		computed: {

		},
		methods: {
			//重置坐标容器
			resetbox: function() {
				//坐标容器 重置
				ctxbox = [];
				//擦拭坐标容器 重置
				ablebox = [];
				//自动提示获奖是否已经提示，默认不提示，避免重复提示
				this.canvas_forPercent = false;
				//设置坐标容器 依据画布宽高按照1px分割，设置坐标，都设置为0，标识没有擦拭过
				for (var i = 0; i < this.canvas_width; i++) {
					ctxbox[i] = [];
					for (var j = 0; j < this.canvas_height; j++) {
						ctxbox[i][j] = 0;
					};
				};
				//console.log(ctxbox);
			},
			//自动提示获奖参考比例
			computerPercent: function() {
				var that = this;
				//依据擦拭坐标把擦拭过的位置和坐标容器位置重合的设置为1，标识擦拭过
				for (var i = 0; i < ablebox.length; i++) {
					for (var j = ablebox[i].ax; j <= ablebox[i].bx; j++) {
						for (var k = ablebox[i].ay; k <= ablebox[i].by; k++) {
							//坐标容器数组有范围，将溢出的设置排除
							//console.log(j,k)
							if (j >= 0 && j < that.canvas_width && k >= 0 && k < that.canvas_height) {
								ctxbox[j][k] = 1;
							}
						};
					};
				};
				//计算擦出的坐标在总坐标中的个数
				var count = 0;
				for (var i = 0; i < ctxbox.length; i++) {
					for (var j = 0; j < ctxbox[i].length; j++) {
						if (ctxbox[i][j] == 1) {
							count += 1;
						};
					};
				};
				//如果擦出的坐标在总坐标中的比例大于设置比例，提示中奖
				if (count / (this.canvas_width * this.canvas_height) > this.canvas_percent) {
					this.pristatu = true;
					this.canvas_isdraw = false;
					this.reset()
					if (that.canvas_forPercent) {
						return false;
					}
				} else {
					console.log("no")
				};
			},
			//产生实际奖项值
			//初始化画布
			initCanvas: function() {
		        var bili=util.getWindowSize().scale;
				ctx.drawImage('../../static/img/cardmask.png', 0, 0, (this.canvas_width*bili)*2, (this.canvas_height*bili)*2)
				ctx.draw();
			},
			//画布处理
			startCanvas: function(event) {
				//设置画布在绘制中
				if (this.available_num <= 0) {
					this.canvas_isdraw = false;
					uni.showModal({
						showCancel: false,
						title: '提示',
						content: '您没有抽奖机会!',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				} else if(!this.canvas_isdraw && this.reping) {
					this.reping = false;
					getUserOpenId().then((key) => {
					utils.requst("index/luckdraw", "POST", { sessionKey: key }).then((res) => {
						this.result_val = res.data.prize_info.prize_name;
						this.canvas_isdraw = true;
						this.prize_info = res.data.prize_info;
						this.reping = true;
					}).catch(res=>{
						this.reping = true;
							wx.showModal({
								showCancel: false,
								title: '提示',
								content: res,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定')
									} else if (res.cancel) {
										console.log('用户点击取消')
									}
								}
							})
					})
					})
				}

			},
			moveCanvas: function(event) {
				console.log(event)
				//如果画布在绘制中
				if (this.canvas_isdraw) {
					//获取事件坐标
					var x = event.x;
					var y = event.y;
					//console.log(x, y)
					//橡皮擦擦出
					ctx.clearRect(x - this.canvas_clearw / 2, y - this.canvas_clearh / 2, this.canvas_clearw, this.canvas_clearh)
					//擦出坐标存储
					ablebox.push({
						ax: Math.round(x - this.canvas_clearw / 2),
						ay: Math.round(y - this.canvas_clearh / 2),
						bx: Math.round(x + this.canvas_clearw / 2),
						by: Math.round(y + this.canvas_clearh / 2)
					});
					//绘制
					ctx.draw(true)
				};
			},
			endCanvas: function(event) {
				//如果画布在绘制中
				if (this.canvas_isdraw) {
					//设置画布不在绘制中
					// this.canvas_isdraw = false;
					//自动提示获奖依据设置的参考比例是否达到
					this.computerPercent();
				}
			},
			//重置抽奖
			reset: function() {
				//产生实际奖项值
				// this.getVal();
				//初始化画布
				this.canvas_isdraw = false;
				this.initCanvas();
				//重置坐标容器
				this.resetbox();
			},
			// 去我的奖品
			gomygoods() {
				uni.navigateTo({
					url: '/pages/goods/goods',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			load() {
				getUserOpenId(this.fid, this.qid).then((res) => {
					utils.requst("index/index", "POST", {
						sessionKey: res,
						fid: this.fid
					}).then((res) => {
						setTimeout(()=>{
							this.htmlshow = false
						},500)
						this.activity_endtime =new Date(globalData.getres.activity_endtime.replace(/-/g,"/")).getTime()>new Date().getTime();
						this.alldata = res.data;
						this.ruleList = res.data.ruleList;
						this.Jack_pots_val = res.data.activityPrize;
						this.globalData = globalData;
						this.available_num = res.data.userInfo.draw_num;
						this.round_count = res.data.userInfo.round_count;
						this.inviteList = res.data.inviteList;
						this.winnerList = res.data.winnerList;
						if (globalData.getres.authorize_status == 1) {
							this.auther = true;
						}
					})
				})
			},
			// 去排行榜
			goranking() {
				uni.navigateTo({
					url: '/pages/rank/rank',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			lookallfun() {
				var id = 4;
				uni.navigateTo({
					url: '/pages/Inviterall/Inviterall?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 商品详情
			gogoodsfun(e) {
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: '/pages/goodsdetil/goodsdetil?prize_id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 关弹窗
			closeprize() {
				this.pristatu = false;	
				this.load()
			},
			onGotUserInfo(e) {
				if (e.detail.errMsg == "getUserInfo:ok") {
					this.auther = false;
				}
				bindGetUserInfo(e).then((res) => {
					this.load()
				})
			},
			// 去兑换
			goexchange(e) {
				var that = this;
				var appId = e.currentTarget.dataset.appid;
				getUserOpenId().then((key) => {
					utils.requst("user/exchange", "POST", {
						sessionKey: key
					}).then((res) => {
						var xyxSessionKey = res.data;
						console.log(xyxSessionKey)
						uni.navigateToMiniProgram({
							appId: appId,
							path: 'pages/start/start',
							envVersion: 'trial',
							extraData: {
								key: xyxSessionKey
							},
							success(res) {
								console.log(1)
							}
						})
					}).catch((res) => {
						console.log(res)
					})
				})
			},
			openxcx(e) {
				var appId = e.currentTarget.dataset.appid;
				console.log(appId, '00')
				uni.navigateToMiniProgram({
					appId: appId,
					envVersion: 'trial',
					success(res) {
						getUserOpenId().then((key) => {
							utils.requst("index/opendate", "POST", {
								sessionKey: key
							}).then((res) => {
								console.log(3)
							})
						})
					}
				})

			}
		},
		onShareAppMessage: function(res) {
			var that = this;
			return {
				title: that.alldata.activityInfo.share_title,
				path: 'pages/index/index?fid=' + globalData.getres.uid,
				imageUrl: that.alldata.activityInfo.share_img,
				success: function(res) {
					var param = {
						share_type: 3,
						sessionKey: globalData.sessionKey,
					}
					app.utils.requst("user/usershare", "POST", param).then((res) => {
						console.log(res)
					})
				},
				fail: function(res) {

				}
			}
		}
	};
</script>
<style>
	page {
		background-color: rgb(161,45,29);
	}

	.container {
		width: 100%;
		height: 100%;
		padding-bottom: 100upx;
	}

	.lucky-wheel {
		position: relative;
	}

	/*无缝滚动  */
	.swiper_ {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		z-index: 66;
		padding: 30upx 60upx 0;
		height: 91upx;
	}
	.swiper_bgc{
		position: absolute;
		width: 719upx;
		top: 0;
		left: 30upx;
		height: 91upx;
	}
	.swiper_container {
		height: 60upx;
		width: 100%;
		line-height: 60upx;
		text-align: center;
		color: #666;
		/* background: rgba(255, 255, 255, 0.8); */
		border-radius: 33upx;
	}

	.swiper_item {
		width: 100%;
		font-size: 24upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		letter-spacing: 2upx;
		font-size: 24upx;
		color: #3A2120;
	}

	.Surplus-num {
		font-size: 24upx;
		text-align: center;
		color: #fff;
		margin: 40upx 0 30upx 0;
	}


	.topBgc {
		height: 456upx;
		width: 100%;
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
	}

	.mygoods {
		box-sizing: border-box;
		z-index: 66;
		position: absolute;
		right: 0upx;
		top: 30upx;
		width: 62upx;
		height: 159upx;
		padding: 0;
		font-size: 26upx;
		border-radius:20upx 0px 0px 20upx;
		color: #fff;
	}

	.mygoodsbtnimg {
		width: 100%;
		height: 100%;
	}

	.paihangb {
		box-sizing: border-box;
		z-index: 66;
		position: absolute;
		right: 0upx;
		top: 210upx;
		width: 62upx;
		height: 128upx;
		font-size: 26upx;
		color: #fff;
		border-radius:20upx 0px 0px 20upx;
		padding: 0;
	}

	.paihangbbtnimg {
		width: 100%;
		height: 100%;
	}

	#lottery {
		box-sizing: border-box;
		width: 690upx;
		height: 316upx;
		margin: 50upx auto 0;
		position: relative;
		padding: 20upx 30upx;
		z-index: 2;
	}
	.endtime{
		width: 690upx;
		height: 316upx;
		line-height: 316upx;
		text-align: center;
		color: #fff;
		font-size: 50upx;
	}
.lotterytime{
	color: #3A2120;
	font-size: 24upx;
	text-align: center;
}
.available_num{
	font-size: 24upx;
	color: #fff;
	text-align: center;
	margin-top:30upx;
	margin-bottom: 50upx;
}
.scroll-Y{
	height: 100%;
}
	/*刮刮卡抽奖  */
	#guagua {
		background: rgb(235,61,54);
		position: relative;
		width: 630upx;
		height: 276upx;
	}

	#guagua canvas {
		position: absolute;
		width: 630upx;
		height: 276upx;
		left: 0px;
		top: 0px;
		z-index: 9;
	}

	#guagua .guagua-re {
		position: absolute;
		width: 630upx;
		height: 276upx;
		line-height: 276upx;
		left: 0px;
		top: 0px;
		z-index: 5;
		color: #fff;
		text-align: center;
		font-size: 50upx;
	}

	/*刮刮卡抽奖  */
	.lotteryBgc {
		width: 690upx;
		height: 316upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -2;
	}

	.lucky-title {
		box-sizing: border-box;
		padding-top: 290upx;
		font-weight: block;
		height: 456upx;
		position: relative;
		z-index: 22;
	}

	.slogen {
		width: 100%;
		text-align: center;
		padding-top: 109upx;
	}

	.slogen .slogenimg {
		width: 542upx;
		max-height: 400upx;
	}

	.Invitationtask {
		margin-top: 40upx;
		position: relative;
	}
	.InvBgc{
		position: absolute;
		left: 0;
		top: 0;
	}
	.tasktitle {
		text-align: center;
	}

	.tasktitle .titleimg {
		width: 404upx;
		height: 96upx;
	}

	/* 去兑换 */
	.exchange {
		box-sizing: border-box;
		width: 690upx;
		padding: 25upx 25upx;
		border-radius: 10upx;
		margin: 10upx auto 0;
		color: #3A2120;
		font-size: 26upx;
		position: relative;
	}
		.exchangeBgc{
				width: 690upx;
				height: 128upx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -2;
		}
	.exchangeinfo {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.exchange .exchangebtm {
		margin-top: 10upx;
	}

	.exchange .Btn {
		width: 138upx;
		height: 50upx;
		line-height: 50upx;
		background: #AC3734;
		border-radius: 10upx;
		color: #fff;
		font-size: 26upx;
		padding: 0;
		margin: 0;
	}

	/* 邀请任务 */
	.Invtaskinfo {
		box-sizing: border-box;
		width:100%;
		height: 384upx;
		padding: 120upx 90upx 20upx;
		border-radius: 10upx;
		margin: 0 auto;
		position: relative;
	}
	.Invtaskinfo .InvBgc{
		position: absolute;
		width: 100%;
		height: 384upx;
		left: 0;
		top: 0;
		z-index: -2;
	}
	.distitle {
		font-size: 24upx;
		text-align: center;
		color: #6E0703;
	}

	.fivepeo {
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
	}

	.btmpeo {
		text-align: center;
	}

	.btmpeo .btnpeoheard {
		height: 80upx;
		width: 80upx;
		border-radius: 50%;
	}

	.fivename {
		font-size: 20upx;
		color: #fff;
		margin-top: 10upx;
		width: 80upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.yaoqing {
		text-align: center;
	}

	.fivebtn {
		height: 80upx;
		width: 80upx;
		border-radius: 50%;
		padding: 0;
		margin: 0;
		border: 0;
		background: rgba(0, 0, 0, 0);
	}

	.yaoqing .fivebtnimg {
		height: 80upx;
		width: 80upx;
		border-radius: 50%;
	}

	.fivebtname {
		font-size: 20upx;
		color: #6E0703;
		margin-top: 10upx;
	}

	.lookall {
		width:172upx;
		background-color: #F1D08F;
		height:48upx;
		line-height: 48upx;
		color: #AC3734;
		font-size: 24upx;
		font-weight: block;
		border:2upx solid rgba(172,55,52,1);
		box-shadow:0px 0px 4upx 4upx #F1D08F;
		margin-top: 10upx;
	}

	/* 打开任务 */
	.openinfo {
		box-sizing: border-box;
		width: 100%;
		height: 333upx;
		padding: 140upx 80upx 0;
		border-radius: 10upx;
		margin: 0 auto;
		position: relative;
	}
	.openinfo .openBgc{
		position: absolute;
		width: 100%;
		height: 333upx;
		left: 0;
		top: 0;
		z-index: -2;
	}
	.openlist {
		display: flex;
		align-items: center;
	}

	.openlist .openheard {
		flex: 1;
		margin-right: 15upx;
	}

	.openlist .openheard .heardimg {
		width: 112upx;
		height: 112upx;
		border-radius: 50%;
	}

	.openlist .openbrie {
		flex: 3;
	}

	.openbrie .opentop {
		font-size: 32upx;
		font-weight: block;
		color: #6E0703;
	}

	.openbrie .openbtm {
		color: #6E0703;
		font-size: 24upx;
		margin-top: 10upx;
	}
	.openlist .openBtn {
		flex: 1;
	}

	.openlist .openBtn .Btn {
		width: 138upx;
		height: 50upx;
		line-height: 50upx;
		background: #AC3734;
		border-radius: 10upx;
		color: #fff;
		font-size: 26upx;
		padding: 0;
		margin: 0;
	}

	/* 规则 */
	.ruleinfo {
		box-sizing: border-box;
		width: 100%;
		height: 483upx;
		padding: 138upx 80upx 70upx;
		border-radius: 10upx;
		margin: 0 auto;
		position: relative;
	}
	.ruleBgc{
		position: absolute;
		width: 100%;
		height: 483upx;
		left: 0;
		top: 0;
		z-index: -2;
	}
	.ruleinfo .rulelist {
		color: #6E0703;
		font-size: 22upx;
		line-height: 1.7;
	}

	/* prizemask */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		z-index: 300;
	}

	.prizebox {
		width: 580upx;
		height: 850upx;
		margin: 110upx auto 0;
		position: relative;
		padding-top: 60upx;
	}

	.pribgc {
		position: absolute;
		top: 0;
		top: 0;
		width: 100%;
		z-index: -1;
	}

	.priimg {
		width: 346upx;
		height: 346upx;
		display: block;
		margin: 70upx auto 0;
	}

	.priname {
		color: #810A06;
		text-align: center;
		font-size: 42upx;
		line-height: 60upx;
	}

	.lookdetilbtn {
		width: 520upx;
		height: 96upx;
		line-height: 96upx;
		background:#AC3734;
		border-radius: 10upx;
		font-size: 36upx;
		color: #fff;
		margin-top: 110upx;
	}

	.autherbox {
		width: 500upx;
		height: 700upx;
		margin: 170upx auto 0;
		position: relative;
		padding-top: 590upx;
	}

	.fridautherbox {
		width: 500upx;
		height: 700upx;
		margin: 170upx auto 0;
		position: relative;
		padding-top: 30upx;
	}

	.fridinfo {
		position: relative;
		display: flex;
		margin-bottom: 490upx;
		align-items: center;
		padding-left: 30upx;
	}

	.fridinfo .fridImg {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		border: 4upx solid #E8557F;
	}

	.fridinfo .fridName {
		font-weight: bold;
		margin-left: 20upx;
		font-size: 30upx;
		color: #E8557F;
	}

	.autherbgc {
		position: absolute;
		top: 0;
		left: 0;
		width: 500upx;
		height: 700upx;
	}

	.autherbtn {
		width: 360upx;
		height: 80upx;
		line-height: 80upx;
		background: #AC3734 ;
		border-radius: 10upx;
		color: #fff;
		font-size: 32upx;
	}
	.htmlshow{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: #AC3734;
		color: #fff;
		text-align: center;
		box-sizing: border-box;
		padding-top: 50%;
		font-size: 28upx;
		}
</style>

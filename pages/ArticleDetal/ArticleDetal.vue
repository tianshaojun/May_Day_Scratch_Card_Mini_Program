<template>
	<view class="container">
		 <image class="topGgcImg" mode='aspectFill' :src="image"></image>
		<view class='arttitle'>
		  <view class='title_top'>{{classify}}</view>
			<view class="title_btm">{{title}}</view>
		</view>
		<rich-text :nodes="content"></rich-text>
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
				id:0,
				content:'',
				image:'',
				title:'',
				classify:''
			};
		},
		onShow() {
			this.load()
		},
		onLoad(ops) {
			this.id = ops.id;
			console.log(this.id,'this.idthis.idthis.idthis.idthis.id')
		},
		computed: {

		},
		methods: {
			  load: function () {
					var that = this;
					getUserOpenId().then((key) => {
					  var param = {
						sessionKey: key,
						id: that.id
					  }
					  utils.requst("xcxaudit/content", "POST", param).then((res) => {
							this.content=res.data.content;
							this.image=res.data.image;
							this.title=res.data.title;
							this.classify = res.data.classify
						  })
					  })
				  },
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
		padding: 0 20upx;
	}

@import "/static/wxParse/wxParse.wxss";
.topGgc{
  width: 100%;
  height: 528upx;
}
.topGgcImg{
  width: 100%;
  height: 560upx;
}
.arttitle{
  padding: 0 40upx 0 0upx;
}
.title_top{
	font-size: 24upx;
	color: #333;
	margin-top: 50upx;
	margin-left: 40upx;
}
.title_btm{
	font-size: 40upx;
	color: #333;
	margin-top: 50upx;
	margin-bottom: 20upx;
}
.title_middle{
font-size: 48upx;
color: #333;
}
.articleCt{
  padding: 0 40upx;
}
.game {
  height: 150upx;
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 0 0 12upx 12upx;
  margin-top: 100upx;
}
 .game .logo {
  width: 110upx;
  height: 110upx;
  position: absolute;
  top: 30upx;
  left: 30upx;
  border-radius: 6upx;
}

 .game .title {
  width: calc(100% - 340upx);
  height: 40upx;
  line-height: 40upx;
  font-size: 32upx;
  position: absolute;
  top: 40upx;
  left: 170upx;
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border: none;
}

.game .type {
  width: calc(100% - 340upx);
  height: 30upx;
  line-height: 30upx;
  font-size: 24upx;
  position: absolute;
  top: 90upx;
  left: 170upx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border: none;
}
.game .area {
  height: 120upx;
  width: 400upx;
  position: absolute;
  top: 20upx;
  left: 20upx;
  background-color: #444a59;
  opacity: 0;
  transition: all 0.1s;
}
button::after{
  border: none;
}
.game .btn {
  height: 70upx;
  line-height: 70upx;
  text-align: center;
  width: 122upx;
  position: absolute;
  right: 40upx;
  top: 40upx;
  border-radius: 5upx;
  transition: all 0.1s;
  font-size: 28upx;
  background-color: #FFC341;
  color: #fff;
}
.game .btn .openApprout{
   height: 70upx;
  line-height: 70upx;
  text-align: center;
  width: 122upx;
  background-color: #FFC341;
   font-size: 28upx;
   color: #fff;
}
.bacgI{
  width: 100%;
  height: 50upx;
  padding: 100upx 0 50upx 0;
}
.bacgI .bacgIBtn{
   height: 50upx;
   line-height: 50upx;
   text-align: center;
   font-size: 24upx;
   color: #2B70FF;
}
</style>

<template>
	<view class="container">
		  <image src="../../static/img/statimg.png" class="loading" mode="widthFix"></image>
		  <!-- <image class="gifloding" src="../../static/img/str.gif" mode=""></image> -->
	</view>
</template>
<script>
	import utils from '../../utils/utils.js'
	import globalData from '../../utils/globalData.js'
	import config from '../../config.js'
	let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
	import {
		getUserOpenId
	} from "../../utils/common.js";
	export default {
		data() {
			return {
				fid:null,
				qid:null
			};
		},
		onLoad(options) {
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
			this.fid = options.fid ? options.fid : null;
			this.qid = options.qid ? options.qid : null
			getUserOpenId(this.fid, this.qid).then((key) => {
				setTimeout(function() {
					if (globalData.getres.audit_status == extConfig.xcx_audit_status ) {
						uni.redirectTo({
							url: '/pages/found/found',
						})
					}else {
						uni.redirectTo({
							url: '/pages/index/index',
						})
					}
				}, 500)
				uni.setNavigationBarTitle({
						title: globalData?globalData.getres.box_name:config.vname,
					})
				
			}).catch((res) => {
// 				wx.setNavigationBarTitle({
// 					title:config.vname,
// 				})
			})
		},
	computed: {

		},
		methods: {

		}
	};
</script>
<style>
	page {
		width: 100%;
		height: 100%;
		background-color: rgb(161,46,29);
		/* background: #fff; */
	}
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.loading{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.gifloding{
		width: 195rpx;
		height: 197rpx;
		display: block;
		margin: 280rpx auto 0;
	}
</style>

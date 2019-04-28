<template>
	<view>
		<view class="morePro">
  <image src="../../static/img/no.png" class="moreimg"></image>
  <view>程序员小哥跑偏了</view>
  <view class="log">解决办法：</view>
  <view class="log">1.联系客服</view>
  <view class="log">2.退出小程序,重新进入</view>
  <view class="log">3.在小程序列表里删除小程序后,重新搜索进入</view>
</view>
	</view>
</template>

<script>
</script>

<style>
	page {
  background: #fff;
}
.morePro {
  width: 100%;
  text-align: center;
  height: 360rpx;
  margin-top: -360rpx;
  position: absolute;
  top: 50%;
  font-size:30rpx;
  /* text-align: center; */
}
.moreimg{
  margin:auto;
  width:360rpx;
  height:260rpx;
  margin-bottom:50rpx;
}
.morePro .log {
  text-align: left;
  padding:0 15%;
  margin-top:15rpx;
}

</style>

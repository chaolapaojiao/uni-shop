<template>
	<view class="my-search" >
		<view class="search-box">
			<view class="search-input" @click="handleInput">
				<uni-icons type="search" size="17"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		methods:{
			// 点击input事件
			handleInput(){
				this.$emit('click')
			}
		}
	}
</script>
<style lang="scss">
	.my-search{
		position:sticky;
		top:-3rpx;
		transform: translateY(-3rpx);
		z-index: 9999;
		height: 100rpx;
		background-color: #c00000;
		.search-box{
			padding:20rpx;
			box-sizing: border-box;
			.search-input{
				height: 70rpx;
				background-color: #ffffff;
				text-align: center;
				line-height: 70rpx;
				border-radius: 36rpx;
				text{
					margin-left: 10rpx;
				}
			}
			
			
		}
	}
</style>

<template>
	<view class="container-box">
		<view class="top">
				<image :src="userinfo.avatarUrl" class="avatar"></image>
				<text class="txt">{{userinfo.nickName}}</text>
		</view>
		<view class="bottom">
			<view class="card-1">
				<view class="item">
					<text>8</text>
					<text>收藏店铺</text>
				</view>
				<view class="item">
					<text>9</text>
					<text>收藏的商品</text>
				</view>
				<view class="item">
					<text>23</text>
					<text>关注的商品</text>
				</view>
				<view class="item">
					<text>88</text>
					<text>足迹</text>
				</view>
			</view>
			<view class="card-2">
				<text class="title">我的订单</text>
				<view class="content">
					<view class="item">
						<image src="@/static/my-icons/icon1.png" mode=""></image>
						<text>待付款</text>
					</view>
					<view class="item">
						<image src="@/static/my-icons/icon2.png" mode=""></image>
						<text>待收货</text>
					</view>
					<view class="item">
						<image src="@/static/my-icons/icon3.png" mode=""></image>
						<text>退款/退货</text>
					</view>
					<view class="item">
						<image src="@/static/my-icons/icon4.png" mode=""></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="card-3">
				<view class="item">
					<text>收货地址</text>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
				<view class="item">
					<text>联系客服</text>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
				<view class="item"  @click="logOut">
					<text>退出登录</text>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		computed:{
			...mapState('my_address',['userinfo'])
		},
		methods:{
			async logOut(){
				const [err,success] = await uni.showModal({
					title:'提示',
					content:'确认退出吗'
				}).catch(err=>err)
				if(err !== null || success.errMsg !== 'showModal:ok') return uni.$showError('退出登录失败')
				if(success.cancel === true) return 
				if(success.confirm === true){
					this.$store.commit('my_address/logOut')
				}
				
			}
		}
	}
</script>
<style lang="scss">
	.container-box{
		height: 100%;
		background-color: #F4F4F4;
		.top{
			height: 35%;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 100rpx;
			box-sizing: border-box;
			.avatar{
				height: 180rpx;
				width: 180rpx;
				border:2px solid white;
				box-shadow: 0 1px 5px black;
				border-radius: 50%;
			}
		}
		.bottom{
			padding: 0 20rpx;
			.card-1{
				background-color: #FFF;
				height: 120rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 28rpx;
				transform: translateY(-16rpx);
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
			.card-2{
				height: 240rpx;
				background-color: #fff;
				.title{
					height: 90rpx;
					line-height: 90rpx;
					padding-left: 20rpx;
				}
				.content{
					display: flex;
					justify-content: space-around;
					align-items: center;
					.item{
						display: flex;
						flex-direction: column;
						align-items: center;
						image{
							height: 70rpx;
							width: 70rpx;
						}
					}
				}
			}
			.card-3{
				
				height: 250rpx;
				background-color: #FFF;
				margin-top: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 25rpx 15rpx;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>

<template>
	<view>
		<view v-if="cart.length">
			<view class="top" >
				<view class="address">
					<my-address></my-address>
				</view>
				<view class="splitBar">
					<image src="/static//cart_border@2x.png"  class="splitBar"></image>
				</view>
				<view class="title">
					<uni-icons type="cart" size="20"></uni-icons>
					<text>购物车</text>
				</view>
				
				<uni-swipe-action >
					<view class="cartList" v-for="(item,index) in cart" :key="index" >
							<uni-swipe-action-item :right-options="options" @click="deleteCart(item.goods_id)">
								<my-goods_list :good="item" :isShow="true"></my-goods_list>
							</uni-swipe-action-item>
					</view>
				</uni-swipe-action>
			</view>	
			
			<view class="bottom">
				<view class="rad">
						<radio color="#c00000" :checked="checkAll" @click="changeChecked"></radio>
						<text>全选</text>
				</view>
				<view class="count">
					合计<text>￥{{checkedAcount}}.00</text>
				</view>
				<view class="btn" @click="goToOrder">
					结算<text>({{checkedCount}})</text>
				</view>
			</view>
		</view>
		
		<!-- 空页面 -->
		<view class="empty" v-else>
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F83%2F46%2F5a58883bd1934_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666062150&t=baa579fd453c7f745dfe1928201abf0b"></image>
			<text>空空如也~</text>
		</view>
	</view>
</template>

<script>
	import{mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				time: 3,
				myTimer: null,
				options:[{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}],
				}
		},
		methods:{
			// 删除购物车
			deleteCart(id){
				this.$store.commit('my_cart/deleteGood',id)
			},
			changeChecked(){
				this.$store.commit('my_cart/changeCheckAll',!this.checkAll)
			},
			// 跳转结算页面
			goToOrder(){
				this.time = 3
				if(!this.checkedCount) return uni.$showError('请选择商品')
				if(!this.token) {
					this.showMessage(this.time)
					this.myTimer = setInterval(()=>{
						this.time--
						if(this.time <= 0){
							clearInterval(this.myTimer)
							uni.switchTab({
								url:'/pages/my/my',
							})
							this.$store.commit('my_address/getPathInfo',{
								type: 'switchTab',
								url: '/pages/cart/cart'
							})
							return 
						}
						this.showMessage(this.time)
					},1000)
					
					
				}
			},
			// 提示登录
			showMessage(n){
				uni.showToast({
					title: 	`请登录后在结算,还有${n}秒跳转到登录页面`,
					mask:true,
					duration:1500,
					icon:'none'
				})
			}
			
		},
		computed:{
			...mapState('my_cart',['cart']),
			...mapState('my_address',['token']),
			
			...mapGetters('my_cart', ['checkedCount','total','checkedAcount']),
			// 全选
			checkAll(){
				return this.checkedCount == this.total
			}
		},
		
	}
</script>
<style lang="scss">
	.top{
		padding-bottom: 100rpx;
		.title{
			display: flex;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid #efefef;
			padding-left: 10rpx;
			text{
				margin-left: 10rpx;
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.splitBar,{
			height: 12rpx;
			width: 100%;
			margin-bottom: 8rpx;
		}
	}
	.bottom{
		background-color: white;
		height: 100rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.rad{
			display: flex;
			align-items: center;
		}
		.count{
			text{
				color: #c00000;
				font-weight: bold;
			}
		}
		.btn{
			color: white;
			height: 100%;
			width: 33%;
			background-color: #c00000;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
	}
	.empty{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 400rpx;
		image{
			width: 180rpx;
			height: 180rpx;
		}
	}
</style>

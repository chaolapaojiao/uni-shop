<template>
	<view class="box">
		<!-- 选中按钮 -->
		<radio :checked="good.goods_state" color="#c00000" v-if="isShow" @click="radioHandle(good.goods_id)"></radio>
		<view class="good">
			<!-- 左侧图片 -->
			<view class="good-img">
				<image :src="good.goods_big_logo||imgurl"></image>
			</view>
			<!-- 右侧信息 -->
			<view class="good-info">
				<text class="name">{{good.goods_name}}</text>
				<text class="price">￥{{good.goods_price | twoZero}}</text>
			</view>
		</view>
		<!-- 添加减少数量 -->
		<view class="num">
			<uni-number-box :min="1" v-show="isShow" @change="changeGoodsCount" :value="good.goods_count"></uni-number-box>
		</view>
	</view>
</template>
<script>
	import {mapMutatins} from 'vuex'
	export default{
		props:{
			good:{
				type: Object,
				default: {}
			},
			isShow:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return{
				imgurl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F006APoFYly1g8mf9qe5udg30jz0jzjtr.gif&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665932301&t=cb6400adb09925f492aac191ba5c0df0',
				isChecked: true
			}
		},
		methods:{	
			radioHandle(id){
				this.$store.commit('my_cart/changeStatus',id)
			},
			changeGoodsCount(value){
				setTimeout(()=>{
					this.$store.commit('my_cart/updateGoodCount',{
						goods_id:this.good.goods_id,
						goods_count: value
					},500)
				})
			}
		},
		filters:{
			twoZero(num){
				return Number(num).toFixed(2)
			}
		},
	}
</script>
<style lang="scss">
	.box{
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.good{
			display: flex;
			padding: 8px;
			border-bottom: 1px solid #efefef;
			background-color: #ffffff;
			.good-img,
			image{
				height: 200rpx;
				width: 250rpx;
			}
			.good-info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 12rpx;
				font-size: 24rpx;
				.price{
					font-size: 34rpx;
					color: #c00000;
				}
			}
		}
		.num{
			position: absolute;
			bottom: 8rpx;
			right: 10rpx;
		}
	}
</style>

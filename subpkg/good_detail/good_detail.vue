<template>
	<view class="detail" v-show="goodInfo.goods_name">
		<!-- 轮播图 -->
		<view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper" circular>
				<swiper-item v-for="(item,index) in goodInfo.pics">
					<view class="swiper-item">
						<image :src="item.pics_big" @click="preview(index)"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 信息 -->
		<view class="info">
			<view class="price">
				<text>￥{{goodInfo.goods_price}}</text>
			</view>
			<view class="txt">
				<view class="name">
					<text>{{goodInfo.goods_name}}</text>
				</view>
				<view class="collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="express">
				<text>快递：免运费</text>
			</view>
		</view>
		<rich-text :nodes="goodInfo.goods_introduce"></rich-text>
		<view class="good_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: "",
				goodInfo: {},
				options: [{
							icon: 'headphones',
							text: '客服'
						}, {
							icon: 'shop',
							text: '店铺',
							info: 2,
							infoBackgroundColor:'#ff0000',
							infoColor:"white"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			}	
		},
		methods:{
			// 获取商品数据 
			 async getGoodInfo(){
				 let {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:this.goods_id})
				if(res.meta.status !== 200) return uni.$showError()
				res.message.goods_introduce = res.message.goods_introduce.replace('/<img /g', '<img style="displey:block;"').replace('/webp/g','jpg')
				this.goodInfo = res.message
			 },
			 // 图片预览
			 preview(index){
				 uni.previewImage({
				 	current:index,
					urls:this.goodInfo.pics.map(item=>item.pics_big)
				 })
			 },
			 // 点击事件
			 onClick(e){
					 
				 if(e.content.text === '购物车'){
					 uni.switchTab({
					 	url: '/pages/cart/cart'
					 })
				 }
			 }
		},
		onLoad(option){
			this.goods_id = option.goods_id
			this.getGoodInfo()
		}
	}
</script>

<style lang="scss">
	.detail{
		background-color: #FFFFFF;
		.swiper{
			height: 850rpx;
			.swiper-item,
			image{
				width: 100%;
				height: 100%;
			}
		}
		.info{
			.price{
				margin-top: 20rpx;
				font-size: 40rpx;
				color: #c00000;
			}
			.txt{
				display: flex;
				justify-content: space-between;
				padding:10rpx;
				font-size: 28rpx;
				.name{
					width: 80%;
				}
				.collect{
					width: 15%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: 1px soie #efefef;
					color: gray;
				}
			}
		}
		.express{
			font-size: 24rpx;
			padding-left: 10rpx;
			color: gray;
		}
		.good_nav{
			position: sticky;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>

<template>

	<view>
		<!-- 搜索 -->
		<my-search  @click="goSearch"></my-search>
		<!-- 轮播图模块 -->
		<swiper :indicator-dots="true" indicator-active-color="white" :autoplay="true" :interval="1500"  circular
		:duration="1000" class="swiper">
			<swiper-item v-for="(item,index) in swiperList" :key="index" class="swiper-item">
					<navigator class="swiper-item-con" :url="`/subpkg/good_detail/good_detail?goods_id=${item.goods_id}`">
						<image :src="item.image_src" class="swiper-img"></image>
					</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航栏模块 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navHandler(item.name)">
				<image :src="item.image_src" mode="heightFix" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层模块 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题 -->
				<view class="title">
						<image :src="item.floor_title.image_src" mode="" class="floor-title-img"></image>
				</view>
				<!-- 左侧大图 -->
				<view class="floor-bottom">
					<navigator class="left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧图片 -->
					<view class="right">
						<navigator class="right-item"  v-for="(img,index) in item.product_list" 
						:key="index" v-if="index!=0" :url="img.url">
							<image :src="img.image_src" mode=""  class="right-img" :style="{width:img.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList:[],
				floorList:[]
			};
		},
		methods:{
			// 获取轮播图片
			async getSwiperList(){
				let result = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(result.statusCode !== 200){
					uni.$showError('图片获取失败')
				}
				this.swiperList = result.data.message
			},
			// 获取导航栏图片
			async getNavList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!== 200) return uni.$showError()
				this.navList = res.message
			},
			// 获取楼层数据
			async getFloorList(){
				let {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showError()
				res.message.forEach(floor=>{
					floor.product_list.forEach(item=>{
						item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			// 导航栏跳转
			navHandler(name){
				if(name==="分类"){
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 跳转搜索页
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	// 轮播图模块
	.swiper{
		height: 330rpx;
		.swiper-item-con,
		.swiper-img{
			width: 100%;
			height: 100%;
		}
	}
	// 导航栏模块
	.nav-list{
		height: 180rpx;
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;
		.nav-item,
		.nav-img{
			width: 160rpx;
			height: 160rpx;
		}
	}
	// 楼层模块
	.floor-list{
		.title{
			.floor-title-img{
				width: 100%;
				height: 60rpx;
			}
		}
	.floor-bottom{
		display: flex;
		}
		.left{
			padding-left: 10rpx;
		}
		.right{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>

<template>
	<view class="cate-container">
		<!-- 左侧滚动条 -->
		<scroll-view scroll-y="true" class="left" :style="{height:wh+'px'}">
			<view v-for="(item1,index) in cateList" :key="index" @click="changeSelect(index)"
			:class="['left-item',current===index?'active':'']">{{item1.cat_name}}</view>
		</scroll-view>
		<!-- 右侧滚动条 -->
		<scroll-view scroll-y="true" class="right" :style="{height:wh+'px'}" :scroll-top="scrollTop">
			<view v-for="(item2,index) in cateList2" :key="index">
				<!-- 右侧标题 -->
				<view class="right-title">
					{{item2.cat_name}}
				</view>
				<view class="right-item">
				<!-- 右侧图片 -->
				<view v-for="(item3,index) in item2.children" :key="index" class="right-item-list" @click="goToGoods(item3)">
					<image :src="item3.cat_icon.replace('dev','web')" class="right-item-img"></image>
					<text>{{item3.cat_name}}</text>
				</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				cateList:[],
				cateList2:[],
				wh:0,
				scrollTop:0
			};
		},
		methods:{
			// 获取分类列表
			async getcateList(){
				let {data:res}= await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status1==200) return uni.$showError()
				this.cateList = res.message
				this.cateList2 = res.message[0].children
			},
			// 选择一级导航
			changeSelect(index){
				this.current= index
				this.cateList2 = this.cateList[index].children
				this.scrollTop = this.scrollTop===0?1:0
			},
			// 跳转商品详页
			goToGoods(item3){
				uni.navigateTo({
					url: '/subpkg/goods/goods?cid='+item3.cat_id
				})
			}
		},
		onLoad(){
			this.getcateList()
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
		}
	}
</script>

<style lang="scss">
	.cate-container{
		display: flex;
		.left{
			width: 240rpx;
			font-size: 24rpx;
			.left-item{
				position: relative;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				
				&.active{
					background-color:#ffffff;
					&::before{
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						content: '';
						display: block;
						height: 50rpx;
						width: 4rpx;
						background-color: #c00000;
					}
				}
				
			}
			
		}
		.right{
			background-color: #ffffff;
			.right-title{
				text-align: center;
				font-size: 36rpx;
			}
			.right-item{
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				.right-item-list{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width:33%;
					margin-bottom: 40rpx;
					.right-item-img{
						width:160rpx;
						height: 160rpx;
					}
				}
				
			}
		}
	}
</style>

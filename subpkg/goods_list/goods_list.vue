<template>
	<view>
		<block v-for="(good,index) in goodList" :key="index">
			<view class="good"  @click="goDetail(good.goods_id)">
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
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					query:'',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodList: [],
				total: 0,
				imgurl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F006APoFYly1g8mf9qe5udg30jz0jzjtr.gif&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665932301&t=cb6400adb09925f492aac191ba5c0df0',
				isLoading: false
			};
		},
		methods:{
			// 获取商品列表
			async getGoodList(stopR){
				this.isLoading = true
				let {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.params)
				this.isLoading = false
				stopR&&stopR()
				if(res.meta.status !== 200) return nui.showError()
				this.goodList = [...this.goodList,...res.message.goods]
				this.total = res.message.total
			},
			// 跳转详情页
			goDetail(id){
				uni.navigateTo({
					url: '/subpkg/good_detail/good_detail?good_id='+id
				})
			}
		},
		onLoad(e){
			this.params.query = e.query || ''
			this.params.cid = e.cid || ''
			this.getGoodList()
		},
		filters:{
			twoZero(num){
				return Number(num).toFixed(2)
			}
		},
		// 下拉到底
		onReachBottom(){
			if(this.isLoading) return 
			if(this.params.pagenum * this.params.pagesize >= this.total) return uni.$showError('到底了...')
			this.params.pagenum++
			this.getGoodList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.total = 0
			this.params.pagenum = 1
			this.goodList = []
			this.getGoodList(()=>uni.stopPullDownRefresh())
		}	
	}
</script>

<style lang="scss">
.good{
	display: flex;
	padding: 8px;
	border-bottom: 1px solid #efefef;
	background-color: #ffffff;
	.good-img,
	image{
		height: 200rpx;
		width: 200rpx;
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
</style>

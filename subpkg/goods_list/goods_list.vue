<template>
	<view>
		<view v-for="(good,index) in goodList" :key="index" @click="goDetail(good.goods_id)">
			<my-goods_list :good="good"></my-goods_list>
		</view>
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
				totals: 0,
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
				this.totals = res.message.total
			},
			// 跳转详情页
			goDetail(id){
				uni.navigateTo({
					url: '/subpkg/good_detail/good_detail?goods_id='+id
				})
			}
		},
		onLoad(e){
			this.params.query = e.query || ''
			this.params.cid = e.cid || ''
			this.getGoodList()
		},
		// 下拉到底
		onReachBottom(){
			if(this.isLoading) return 
			if(this.params.pagenum * this.params.pagesize >= this.totals) return uni.$showError('到底了...')
			this.params.pagenum++
			this.getGoodList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.totals = 0
			this.params.pagenum = 1
			this.goodList = []
			this.getGoodList(()=>uni.stopPullDownRefresh())
		}	
	}
</script>

<style lang="scss">

</style>

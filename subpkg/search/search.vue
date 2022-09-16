<template>
	<view class="search">
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar :focus="true" cancelButton="none" bgColor="#ffffff" radius="18" @input="inputKey"
			@confirm="confirmSearch"></uni-search-bar>
		</view>
		
		<!-- 搜索提示 -->
		<view v-if="recommendList.length!==0">
			<view class="search-list"  v-for="(item,index) in recommendList" :key="index" @click="goDetail(item.goods_id)">
				<text>{{item.goods_name}}</text>
				<uni-icons type="forward" size="17"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-else>
			<view class="title">
					<text>搜索历史</text>
					<uni-icons type="trash" size="20" @click="deleteHistory"></uni-icons>
			</view>
			<view class="tag">
				<uni-tag type="default" :text="tag" v-for="(tag,index) in history" :key="index"
				:inverted="true" custom-style="border:0;background-colr:#efefef;color:black"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord: '',
				timer: '',
				recommendList: [],
				historyList:[]
			};
		},
		methods:{
			// 用户输入事件
			inputKey(e){
				if(e.trim() == ''){
					this.recommendList = []
					return
				}
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.keyWord = e
					this.getRemList(this.keyWord)
				},500)
			},
			//确认搜索
			confirmSearch(e){
				this.addHistory(e.value)
			},
			// 获取建议查询列表
			async getRemList(value){
				
				let {data:res} =await uni.$http.get('/api/public/v1/goods/qsearch?query=' + value)
				if(res.meta.status !== 200) return uni.$showError()
				this.recommendList = res.message				
			},
			// 跳转详情页
			goDetail(id){
				uni.navigateTo({
					url:'/subpkg/detail/detail?goods_id=' + id
				})
			},
			// 添加搜索历史
			addHistory(){
				// this.historyList.push(kw)
				const set = new Set(this.historyList)
				set.delete(this.keyWord)
				set.add(this.keyWord)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			// 清除搜索历史
			deleteHistory(){
				this.historyList = []
				uni.setStorageSync('kw','')
			}
		},
		computed:{
			history(){
				// 以免修改原数组的数据
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]') 
		}
	}
</script>

<style lang="scss">
	.search{
		position: sticky;
		top:-3rpx;
		transform: translateY(-3rpx);
		.search-box{
			height: 100rpx;
			background-color: #c00000;
		}
		.search-list{
			display: flex;
			justify-content: space-between;
			padding: 10rpx;
			height: 80rpx;
			line-height: 80rpx;
			border:1px solid #efefef;
			text{
				white-space: nowarp;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	.search-history{
		.title{
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 26rpx;
			border-bottom: 1px solid #efefef;
			font-weight: 400;
			padding: 0 10rpx;
			margin-bottom: 16rpx;
		}
		.tag{
			padding:0 10rpx;
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin-right: 14rpx;
				font-size: 30rpx;
			}
		}
	}
	}
</style>

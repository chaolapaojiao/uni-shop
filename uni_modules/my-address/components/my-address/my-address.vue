<template>
	<view class="box">
		<!-- 添加按钮 -->
		<view class="add" v-if="JSON.stringify(address) === '{}'" @click="addAddress">
			<button type="primary" size="mini">点击添加地址+</button>
		</view>
		<!-- 地址信息 -->
		<view class="address-info" v-else>
			<!-- 收货人 -->
			<view class="consignee">
				<text>收货人{{address.name}}</text>
				<view class="phone">
					<text>电话：{{address.phone}}</text>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
			</view>
			<!-- 收货地址 -->
			<view class="addr">
				<text>收货地址： {{address.addr}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		methods:{
		addAddress(){
			let address={
				name: '张三',
				phone:18656615972,
				addr: '安徽省池州市贵池区'
			}
			this.$store.commit('my_address/getAddress',address)
		}
	},
		computed:{
			...mapState('my_address',['address'])
		},
	}
</script>
<style lang="scss">
	.add{
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info{
		font-size: 30rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.consignee{
			display: flex;
			justify-content: space-between;
		}
		.phone{
			display: flex;
			align-items: center;
		}
		
	}
	
</style>

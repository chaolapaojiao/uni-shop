<template>
	<view class="container-box">
		<view class="avatar">
			<uni-icons type="person-filled"  size="100" color="#ffffff"></uni-icons>
		</view>
		<button class="btn-login" @click="getUserProfile">一键登录</button>
		<text>登录后享受更多权益</text>
	</view>
</template>
<script>
	import {mapMutations,mapState} from 'vuex'
	export default{
		computed:{
			...mapState('my_address',['pathInfo'])
		},
		methods:{
			...mapMutations('my_address',['getUserInfo','getAddress','getUserToken']),
			// 获得用户授权
			async getUserProfile(){
				const [err,success] = await uni.getUserProfile({
					desc:"用于登录商城"
				}).catch(err=>err)
				if(err!== null) return uni.$showError('已取消授权')
				this.getUserInfo(success.userInfo)
				this.getToken(success)
			},
			// 调用登录接口，换取永久的token
			async getToken(info){
				const [err,res] = await uni.login().catch(err=>err)
				if(res.errMsg !== 'login:ok') return uni.$showError('登录失败')
				// 参数对象
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature,
				}
				// const {data:loginRsult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// console.log(loginRsult)
				// if(loginRsult.meta.status !== 200) return uni.$showError('登录失败')
				this.getUserToken('BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				uni.$showError('登录成功')
				if(this.pathInfo){
					if(this.pathInfo.type==="switchTab"){
						uni.switchTab({
							url: this.pathInfo.url
						})
					}
				}				
			}
		}
	}
</script>
<style lang="scss">
	.container-box{
		padding-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.avatar{
			height: 200rpx;
			width: 200rpx;
			line-height: 200rpx;
			background-color: #ccc;
			border-radius: 50%;
			margin-bottom: 40rpx;
		}
		.btn-login{
			width: 90%;
			height: 90rpx;
			line-height: 90rpx;
			background-color: #c00000;
			border-radius: 45rpx;
			color: #ffffff;	
			margin-bottom: 20rpx;
		}
		text{
			color: #cccccc;
			font-size: 24rpx;
		}
		
	}
</style>

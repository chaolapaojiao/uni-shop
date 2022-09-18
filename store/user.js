export default{
	namespaced:true,
	
	state:{
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		token:uni.getStorageSync('token') || '',
		pathInfo: null
	},
	
	mutations:{
		// 存储地址
		getAddress(state,address){
			state.address = address
			uni.setStorageSync('address',JSON.stringify(address))
		},
		// 储存用户信息
		getUserInfo(state,userinfo){
			console.log(state,userinfo)
			state.userinfo = userinfo
			this.commit('my_address/saveUserInfo',userinfo)
		},
		// 储存用户信息到本地存储
		saveUserInfo(state,userinfo){
		 uni.setStorageSync('userinfo',JSON.stringify(userinfo))
		},
		// 获取token
		getUserToken(state,token){
			state.token = token
			this.commit('my_address/saveToken',token)
		},
		// 储存token到本地
		saveToken(state,token){
			uni.setStorageSync('token',token)
		},
		// 退出登录
		logOut(state){
			state.userinfo = {}
			state.token = ''
			uni.clearStorageSync('userinfo')
			uni.clearStorageSync('token')
		},
		// 获取从购物车跳转来的信息
		getPathInfo(state,pathInfo){
			state.pathInfo = pathInfo
		}
	},
	
	getters:{}
}
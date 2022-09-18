export default{
	namespaced:true,
	
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	mutations:{
		// 存储地址
		getAddress(state,address){
			state.address = address
			uni.setStorageSync('address',JSON.stringify(address))
		}
	},
	
	getters:{}
}
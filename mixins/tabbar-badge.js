import {mapGetters} from 'vuex'
export default {
	methods:{
		// 设置购物车数字标签
		setTabbar(){
			uni.setTabBarBadge({
				index: 2,
				// text的值必须是字符串
				text:this.total + ''
			})
		}
	},
	watch:{
		total:{
			handler(newVal){
				this.setTabbar()
			},
		
		},
	},
	computed:{
		...mapGetters('my_cart',['total'])
	},
	onShow(){
		this.setTabbar()
	}
}
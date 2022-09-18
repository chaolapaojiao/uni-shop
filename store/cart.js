export default{
	namespaced: true,
	
	state:()=>({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),
	
	mutations:{
		addCart(state,goods){
			let goodResult = state.cart.find(x=>x.goods_id===goods.goods_id)
			console.log(goodResult)
			if(!goodResult){
				state.cart.push(goods)
			}else{
				goodResult.goods_count++
			}
			this.commit('my_cart/saveCartInfo')
		},
		// 保存数据
		saveCartInfo(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 改变选中状态
		changeStatus(state,id){
			let findResult = state.cart.find(x=>x.goods_id === id)
			if(findResult){
				findResult.goods_state = !findResult.goods_state
			}
			this.commit('my_cart/saveCartInfo')
		},
		// 更新商品数量
		updateGoodCount(state,good){
			let result = state.cart.find(x=>x.goods_id === good.goods_id)
			if(result){
				result.goods_count = good.goods_count
			}
			this.commit('my_cart/saveCartInfo')
		},
		// 删除商品
		deleteGood(state,id){
			console.log(state.cart,id)
			state.cart = state.cart.filter(x=>x.goods_id !== id)
			this.commit('my_cart/saveCartInfo')
		},
		changeCheckAll(state,statu){
			state.cart.forEach(item=>{
				item.goods_state = statu
			})
		}
	},
	
	getters:{
		total(state){
			return state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		checkedCount(state){
			return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count,0)
		},
		checkedAcount(state){
			return state.cart.reduce((total,item)=>{
				return total += item.goods_count * item.goods_price
			},0)
		}
	}
}
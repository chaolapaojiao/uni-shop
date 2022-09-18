<template>
	<view class="container">
		<my-login v-if="!token"></my-login>
		<my-info v-else></my-info>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		computed: {
			...mapState('my_address',['token','userinfo'])
		},
	}
</script>

<style lang="scss">
	page,.container{
	height: 100%;
}
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-plus/index.scss";
	@import "@/static/style/common.scss";
	@font-face {
	  font-family: 'DIN';
	  src: url('@/static/fonts/D-DINCondensed.ttf');
	}
	
	@font-face {
	  font-family: 'DINBOLD';
	  src: url('@/static/fonts/D-DINCondensed-Bold.ttf');
	}
</style>

<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {

		},
		onHide: function() {
		},
		
	}
	// 全局方法
	global.isLogin=function() {
		return 2222
	}
	// #ifndef APP-PLUS
	
	// #endif
</script>

<style lang="scss">
	@import  './styles/common.scss';
	@import  './styles/ui.scss';
	/*每个页面公共css */
	// 去除滚动条
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	.amap-logo,
	.amap-copyright { display:none !important; }
</style>

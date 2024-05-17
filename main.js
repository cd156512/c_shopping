import App from './App'

// #ifndef VUE3

import Vue from 'vue'

import './uni.promisify.adaptor'

Vue.config.productionTip = false
//直接使用Vue.config.globalProperties.自定义属性名
Vue.config.globalProperties.util = util;

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus , {setConfig} from '@/uni_modules/uview-plus'
//导入pinia
	import * as Pinia from  'pinia'
// 引入请求类
import util from './utils/util.js'
//--
//import uviewPlus, {setConfig} from 'uview-plus'
export function createApp() {
	const app = createSSRApp(App)
	// 创建Pinia实例  // 将pinia实例挂载到vue实例上 
	app.use(Pinia.createPinia());
	//app.config.globalProperties.util = util;//全局用不了，单独引用吧
	app.use(uviewPlus);
	// 需要在app.use(uview-plus)之后执行
	setConfig({
		// 修改$u.config对象的属性
		config: {
			// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
			//unit: 'rpx'
			
		},
		// 修改$u.props对象的属性
		props: {
			// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
			radio: {
				size: 15
			}
			// 其他组件属性配置
			// ......
		}
	})
	
	return {
		app,
		Pinia
	}
}
// #endif
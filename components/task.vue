<template>
	<up-popup :show="show" @close="close" @open="open" :round="10" >
		<view class="task-box">
			<up-text text="Total" size="12" bold color="#666666"></up-text>
			<view class="task-list">
				<view class="task-item">
					
				</view>
			</view>
		</view>
	</up-popup>
</template>

<script setup>
import { ref,defineProps } from 'vue';

const show = ref(true);  
function open() {  
  // 打开逻辑，比如设置 show 为 true  
  show.value = true;  
  // console.log('open');  
}  
function close() {  
  // 关闭逻辑，设置 show 为 false  
  show.value = false;  
  // console.log('close');  
}  

const porp = defineProps({
	listData:{
		type:[Array,Object,String,Number],
		default:()=>[]
	}
})

</script>

<style lang="scss" scoped>
	.task-box{
		height: 80vh;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
	}
</style>
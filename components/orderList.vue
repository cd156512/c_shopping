<template>
	<view class="list-box">
		<view class="list-item" v-for="(item,index) in listData" :key="index">
			<view class="flex-center mt20 width-100">
				<up-image :src="item.UpImage+index" width="180rpx" height="180rpx" radius="10"></up-image>
				<view class="desc flex-1 ml20">
					<view class="mt10 flex" >
						<up-text text="Total" size="12" bold color="#666666"></up-text>
						<text class="num-text mla">{{ item.total_profit }} Rs</text>
					</view>
					<view class="mt10 flex" >
						<up-text text="Cycle" size="12" bold color="#666666"></up-text>
						<text class="num-text  mla">{{ item.now_cycle }} days</text>
					</view>
					<view class="mt10 flex" >
						<up-text text="Have returned" size="12" bold color="#666666"></up-text>
						<text class="num-text  mla">{{ item.now_money }} Rs</text>
					</view>
					<view class="mt10 flex" >
						<up-text text="Daliy returned" size="12" bold color="#666666"></up-text>
						<text class="num-text  mla">{{ item.day_profit }} Rs</text>
					</view>
				</view>
			</view>
			
			<!-- <view class="mt20 flex">
				<view class="items-center flex-1" v-if="index%3!=0">
					<up-icon class="mr10" name="clock" color="var(--main-color)"></up-icon>
					<up-count-down :time="30 * 60 * 60 * 1000* (index+1)" format="HH:mm:ss"></up-count-down>
				</view>
				<view class="flex-1 btn-buy flex-center">View detail</view>
			</view> -->
		</view>
	</view>
</template>

<script setup>
import { ref,defineProps } from 'vue';
const proImg = ref('https://picsum.photos/400/600?');
const porp = defineProps({
	listData:{
		type:[Array,Object,String,Number],
		default:()=>[]
	}
})

</script>

<style lang="scss">
	.list-box{
		.list-item{
			position: relative;
			padding: 30rpx;
			margin-bottom: 20rpx;
			background: #ffffff;
			border-radius: 10rpx;
			.num-text{
				font-size: 36rpx;
				font-family: DINBOLD;
				color: #333333;
			}
			.plus{
				font-size: 32rpx;
				font-weight: 600;
				margin-right: 6rpx;
			}
			.color-red{
				color: #e45656;
			}
			:deep(.u-count-down__text){
				color:var(--main-color);
			}
			
			.btn-buy{
				height: 70rpx;
				background: linear-gradient(90deg, #4769FB, #5374F9);
				border-radius: 18px;
				color:#ffffff;
			}
			
		}
	}
	
</style>
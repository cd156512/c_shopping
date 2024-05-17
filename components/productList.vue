<template>
	<view class="list-box">
		<view class="list-item" :class="{'shadow':index%3==0}" v-for="(item,index) in listData" :key="index">
			<text class="tag-top" v-if="index%2==0">hot</text>
			<up-text :text="item.name" size="12" bold color="#333333"></up-text>
			<view class="flex mt20 width-100">
				<up-image :src="item.img" width="220rpx" height="220rpx" radius="10"></up-image>
				<view class="desc flex-1 ml20">
					<view class="tags flex">
						<view class="tag-item" v-for="(items) in 2">
							{{'Limit 6'}}
						</view>
					</view>
					<view class="mt10 flex" >
						<up-text text="Price" size="13" bold color="#333333"></up-text>
						<text class="num-text mla">Rs{{ item.money }}</text>
					</view>
					<view class="mt10 flex" >
						<up-text text="Daily dividend" size="13" bold color="#333333"></up-text>
						<text class="color-red plus">⊕≈</text>
						<text class="num-text color-red mla">Rs{{ item.day_profit }}</text>
					</view>
					<view class="mt10 flex" >
						<up-text text="total dividend" size="13" bold color="#333333"></up-text>
						<text class="color-red plus">⊕≈ </text>
						<text class="num-text color-red mla">Rs{{ item.total_profit }}</text>
					</view>
				</view>
			</view>
			<view class="mt20 flex">
				<view class="items-center flex-1" v-if="index%3!=0">
					<up-icon class="mr10" name="clock" color="var(--main-color)"></up-icon>
					<up-count-down :time="30 * 60 * 60 * 1000* (index+1)" format="HH:mm:ss"></up-count-down>
				</view>
				<view class="flex-1 btn-buy flex-center">Buy now</view>
			</view>
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
		.shadow{
			box-shadow: 10rpx 4rpx 12rpx #a0cfff;
		}
		.list-item{
			position: relative;
			padding: 50rpx 30rpx 30rpx;
			margin-bottom: 20rpx;
			background: #ffffff;
			border-radius: 10rpx;
			.tag-top{
				position: absolute;
				left: 0;
				top: 0;
				background: #F56C6C;
				color: #ffffff;
				padding: 4rpx 14rpx;
				border-radius: 10rpx 0 10rpx 0;
				font-size: 26rpx;
				font-weight: 600;
				font-style: italic;
			}
			.tag-item{
				padding: 4rpx 10rpx;
				background: #fdf6ec;
				color: #F9AE3D;
				margin-right: 10rpx;
				border-radius: 6rpx;
				font-size: 26rpx;
			}
			
			.num-text{
				font-size: 36rpx;
				font-family: DINBOLD;
				color: #333333;
				font-style: italic;
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
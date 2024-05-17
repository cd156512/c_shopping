<template>
	<view class="bg"></view>
	<view>
		<up-navbar leftIcon placeholder bgColor="var(--bg-page)" >
			<template #left>
				<up-icon @click="goBack()" name="< Back"  color="var(--main-color)"></up-icon>
			</template>
			<template #center >
				<view class="flex top">
					<view class="ml10">
						<up-text text="Retrieve password" color="var(--main-color)" size="30rpx" bold></up-text>
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="content">
			<up-text text="Amount" color="#333333" size="30rpx" bold></up-text>
			<view class="card-box bg-fff input-border">
				<up-input
					type="number"
					clearable
					v-model="total"
					placeholder="Please enter the amount"
				>
					<template #suffix>
						<up-text text="RS" color="#999999" size="30rpx"></up-text>
					</template>
				</up-input>
				<u-gap height="20"></u-gap>
				<view class="money-box">
					<view class="money-item flex-center"
						@click="total = item"
						v-for="(item,index) in moneyArr" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="card-box bg-fff">
				
				<up-radio-group
				    v-model="payChannel"
					placement
					@change="groupChange"
				    iconPlacement="right">
					<view class="mb30 flex items-center" v-for="(item,index) in radiolist" :key="index">
						<up-image src="../../../static/icon/pay-type.png" width="30rpx" height="30rpx"></up-image>
						<up-radio class="flex-1 ml10" :label="item.name" :name="item.name"></up-radio>
					</view>
				</up-radio-group>
			</view>
			<view class="btn-sign flex-center">Submit</view>
			<view class="tips">
				<text>
					Do not save (UPI account) to make multiple payments. 
					Please click to copy the latest (UPI account) for each payment
				</text>
				<text>
					Payment is successful, please fill in the 12-digit UTR reference number
				</text>
				<text>
					If you encounter problems during the recharge process, 
					please consult your dedicated wealth manager
				</text>
			</view>
			<u-gap height="20"></u-gap>
		</view>
	</view>
</template>

<script setup>
	import{ref,reactive,watch } from 'vue';
	const goBack = ()=>{
		uni.navigateBack(-1)
	}
	const total = ref('');
	const moneyArr =  ref([690,4900,9900,16900,33900,69900])
	const payChannel = ref('tp')
	const radiolist = reactive([
	  {
	    name: 'tp',
	  },
	  {
	    name: 'cash',
	  },
	  {
	    name: 'dei',
	  },
	  {
	    name: 'all',
	  },
	]);
	const groupChange = (n) => {
	  console.log('groupChange', n);
	};
	
</script>

<style lang="scss">
	.bg {
		background: var(--bg-page);
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}
	.card-box{
		width: 700rpx;
		margin: 20rpx auto 0;
		border-radius: 10rpx;
		padding: 40rpx 26rpx;
		box-sizing: border-box;
	}
	.bg-fff{
		background: #FFFFFF;
	}
	.content {
		box-sizing: border-box;
		width: 700rpx;
		margin: 0 auto;
		.money-box{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.money-item{
				width: 30%;
				height: 60rpx;
				background: var(--bg-page);
				border-radius: 6rpx;
				margin-bottom: 20rpx;
				color: #666666;
			}
		}
		.btn-sign{
			margin: 40rpx auto 0;
			height: 80rpx;
			background: linear-gradient(90deg, #4769FB, #5374F9);
			border-radius: 18px;
			color:#ffffff;
		}
		.tips{
			margin: 50rpx auto;
			padding: 30rpx 20rpx 0rpx;
			box-sizing: border-box;
			border-radius: 6rpx;
			border: dashed 1px #333333;
			color: #666666;
			font-size: 14px;
			text{
				display: block;
				margin-bottom: 20px;
			}
		}
	}
</style>
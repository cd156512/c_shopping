<template>
	<view class="bg"></view>
	<up-navbar leftIcon placeholder bgColor="#DBEAFF" >
		<template #center >
			<view class="flex top">
				<view class="ml10">
					<up-text text="orders" color="var(--main-color)" size="30rpx" bold></up-text>
				</view>
			</view>
		</template>
	</up-navbar>
	<view class="content">
		<up-sticky>
			<view class="count-box justify-around">
				<view class="count-item">
					<text>Total revenue</text>
					<view class="mt20">
						<text class="num-text">Rs</text>
						<up-count-to class="num-text" :startVal="0" :endVal="data.total_rebate" :decimals="2"></up-count-to>
					</view>
				</view>
				<view class="count-item">
					<text>Today revenue</text>
					<view class="mt20">
						<text class="num-text">Rs</text>
						<up-count-to class="num-text" :startVal="0" :endVal="data.today_rebate" :decimals="2"></up-count-to>
					</view>
					
				</view>
			</view>
		</up-sticky>
		
		<view class="card-box">
			<order-list :listData="orderListData" />
		</view>
		<up-loadmore status="nomore" nomore-text="--- no more ---"  />
	</view>
</template>

<script setup>
	import{ref,onMounted,reactive} from 'vue';
	import OrderList from "@/components/orderList.vue";
	import util from '@/utils/util.js';
	const data = reactive({
		today_rebate: 0,
		total_rebate: 0
	})
	onMounted(()=>{
		getOrderList();
	})
	//订单列表
	
	const orderListData = ref([]);

	async function getOrderList() {
  try {
    const res = await util.request('/profit/list', {}, 'GET');
    orderListData.value = res.data;
		data.total_rebate = res.total_rebate
		data.today_rebate = res.today_rebate
  } catch (error) {
    console.error('request err: ', error);
  }
}

	
	
</script>

<style lang="scss" scoped>
	.bg {
		background: #DBEAFF;
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}
	.card-box{
		width: 700rpx;
		margin: 30rpx auto 0;
		border-radius: 10rpx;
		box-sizing: border-box;
	}
	.bg-fff{
		background: #FFFFFF;
	}
	.content {
		margin-top: 20rpx;
		.count-box{
			width: 700rpx;
			margin: 20rpx auto;
			border-radius: 10rpx;
			padding: 40rpx 10rpx;
			box-sizing: border-box;
			background: #ffffff;//linear-gradient(270deg, #FFFFFF 0%, #EDF4FF 100%);
			color: #5374FD;
			.count-item{
				.num-text{
					font-size: 36rpx !important;
					color: #5374FD !important;
					margin-left: 10rpx;
					font-family: DINBOLD;
				}
			}
		}
		
	}

	
</style>

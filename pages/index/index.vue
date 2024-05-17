<template>
	<view class="bg"></view>
	<up-navbar leftIcon placeholder bgColor="var(--bg-page)" >
		<template #center >
			<view class="flex top">
				<view class="wind"></view>
				<view class="ml10">
					<up-text text="SSE-wind" color="var(--main-color)" size="30rpx" bold></up-text>
				</view>
			</view>
		</template>
		<template #right>
			<up-icon name="calendar" size="30px" color="var(--main-color)"></up-icon>
		</template>
	</up-navbar>
	<view class="content">
		<view class="count-box justify-around">
			<view class="count-item">
				<text>Total revenue</text>
				<view class="mt20">
					<text class="num-text">Rs</text>
					<up-count-to class="num-text" :startVal="0" :endVal="166.2586" :decimals="4"></up-count-to>
				</view>
			</view>
			<view class="count-item">
				<text>Can get earnings</text>
				<view class="mt20">
					<text class="num-text">Rs</text>
					<up-count-to class="num-text" :startVal="0" :endVal="88.2586" :decimals="4"></up-count-to>
				</view>
				
			</view>
		</view>
		
		<view class="action-box">
			<view class="action-item"  @click="util.toUrl('/pages/my/recharge/index')">
				<up-image :src="img+'charge.png'" width="60rpx" height="60rpx"></up-image>
				<text>Charge</text>
			</view>
			<view class="action-item">
				<up-image  :src="img+'product.png'" width="60rpx" height="60rpx"></up-image>
				<text>Products</text>
			</view>
			<view class="action-item">
				<up-image :src="img+'task.png'" width="60rpx" height="60rpx"></up-image>
				<text>Task</text>
			</view>
			<view class="action-item"  @click="util.toUrl('/pages/my/withdraws/index')">
				<up-image :src="img+'withdraw.png'" width="60rpx" height="60rpx"></up-image>
				<text>Withdraw</text>
			</view>
		</view>
		<view class="swiper-box mt30">
			<up-swiper
				indicator
				height="300rpx"
				indicatorMode="dot"
				radius="10"
				:list="swiperList"
				@change="change"
				@click="click"
			></up-swiper>
		</view>
		<view class="notice-box mt30" >
			<up-notice-bar
				class="radius-10"
				:text="tips"
				color="#333333"
				direction="column"
				@click="click"
			></up-notice-bar>
		</view>
		<view class="card-box">
			<product-list :listData="data.list" />
		</view>
		<up-loadmore status="nomore" nomore-text="--- no more ---"  />
	</view>
	<!-- <task ref="taskRef"/> -->
</template>


<script setup>
	import {
		ref,onMounted,reactive
	} from 'vue';
	import { onPullDownRefresh , onReachBottom } from "@dcloudio/uni-app";
	import util from '@/utils/util.js';
	import {userStore} from "../../stores/user.js";
	const uInfo = userStore();
	import ProductList from "@/components/productList.vue";
	import Task from "@/components/task.vue";
	const data = reactive({
		list: []
	})
	onMounted(()=>{
		getInvest();
		getPageData();
	})
	onPullDownRefresh(() => {
		console.log("下拉刷新");
		uni.showToast({
			title: 'Success',
			icon:"none",
			duration: 2000
		});
		setTimeout(()=>{
			uni.stopPullDownRefresh() //停止刷新
		},1500)
	})
	onReachBottom(() => {
		console.log("上拉加载更多")
	})
	
	
	const img = ref('../../static/icon/');
	const swiperList = ref([
		'https://picsum.photos/400/600?1',
		'https://picsum.photos/400/600?2',
		'https://picsum.photos/400/600?3',
		'https://picsum.photos/400/600?4',
		'https://picsum.photos/400/600?5'
	])
	const tips = ref([
		'https://picsum.photos/400/600?1',
		'https://picsum.photos/400/600?2',
		'https://picsum.photos/400/600?3',
		'https://picsum.photos/400/600?4',
		'https://picsum.photos/400/600?5'
	])
	
	//产品列表
	const proList = ref([]);

	async function getInvest (){
		await util.request('/invest/list', {
		},'GET').then((res)=>{
			data.list = res.data
		})
	}
	const indexData = ref(null)
	async function getPageData (){
		await util.request('/money_water', {
			page:1,
			page_size:50
		},'GET').then((res)=>{
			console.log('接口返回数据: ',res);
		})
	}
	
	const taskRef = ref(null)
</script>

<style lang="scss">
	.bg {
		background: var(--bg-page);
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}
	.top{
		.wind{
			width: 24px;
			height: 22px;
			background: url('../../static/icon/wind.png') no-repeat;
			background-size: cover;
		}
	}
	.card-box{
		width: 700rpx;
		margin: 30rpx auto 0;
	}
	.content {
		.count-box{
			width: 700rpx;
			margin: 20rpx auto;
			border-radius: 10rpx;
			padding: 40rpx 10rpx;
			box-sizing: border-box;
			background: #5374FD;//linear-gradient(270deg, #FFFFFF 0%, #EDF4FF 100%);
			
			.count-item{
				text{
					&:first-child{
						margin-bottom: 30rpx;
					}
					color: #FFFFFF;
				}
				.num-text{
					font-size: 36rpx !important;
					color: #FFFFFF !important;
					margin-left: 10rpx;
					font-family: DINBOLD;
				}
			}
		}
		.action-box{
			width: 700rpx;
			margin: 40rpx auto;
			padding: 0 20rpx;
			box-sizing: border-box;
			//display: grid;
			//grid-template-columns: repeat(4,1fr);
			display: flex;
			justify-content: space-between;
			.action-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				color:#333333;
				text{
					margin-top: 10px;
					font-size: 12px;
					font-weight: 600;
				}
			}
		}
		.swiper-box{
			width: 700rpx;
			margin: 30rpx auto 0;
		}
		.notice-box{
			width: 700rpx;
			margin: 20rpx auto 0;
		}

	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
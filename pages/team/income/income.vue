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
						<up-text text="My tesms" color="var(--main-color)" size="30rpx" bold></up-text>
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="content">
			<view class="card-box rule">
				<text>Promotion commission rule</text>
				<view class="mt20">
					<text class="num-text">{{data.top_share[0]}}% + {{data.top_share[1]}}% +{{data.top_share[2]}}%</text>
				</view>
			</view>
			<view class="card-box count-box">
				<up-tabs :list="tablist" @click="clickTab" :scrollable="false"></up-tabs>
				<up-gap height="20"></up-gap>	
				<view class="flex">
					<view class="count-item">
						<view class="title">{{'--'}}</view>
						<view class="mt30 title">All</view>
						<view class="mt30 title">Today</view>
					</view>
					<view class="count-item items-center">
						<view class="title">Eff/Inv</view>
						<view class="num-text mt30">{{data.report.valid_user_count}}/{{data.report.user_count}}</view>
						<view class="num-text mt30">{{data.today_report.valid_user_count}}/{{data.today_report.user_count}}</view>
					</view>
					<view class="count-item items-center">
						<view class="title">Total </view>
						<view class="num-text mt30">{{data.report.charge}}</view>
						<view class="num-text mt30">{{data.today_report.charge}}</view>
					</view>
					<view class="count-item items-center">
						<view class="title">Com</view>
						<view class="num-text mt30">{{data.report.rebate}}</view>
						<view class="num-text mt30">{{data.today_report.rebate}}</view>
					</view>
				</view>
			</view>
			<view class="table-box">
				<uni-table border stripe emptyText="no more" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th align="center">Id</uni-th>
						<uni-th align="center">Phone</uni-th>
						<uni-th align="center" width="80px">Tel</uni-th>
						<uni-th align="center" width="100px">Total</uni-th>
						<uni-th align="center" width="120px">Reg-time</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,index) in data.list" :key="index">
						<uni-td align="center">{{item.id}}</uni-td>
						<uni-td align="center">{{item.phone}}</uni-td>
						<uni-td align="center">{{item.all_money}}</uni-td>
						<uni-td align="center">{{item.all_rebate}}</uni-td>
						<uni-td align="center">{{item.create_date}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import{ref,reactive,onMounted} from 'vue';
	import util from '@/utils/util.js';
	const data = reactive({
		top_len: 1,
		top_share: [0,0,0],
		list: [],
		report: {
			user_count: 0,
			valid_user_count: 0,
			charge: 0,
			rebate: 0
		},
		today_report: {
			user_count: 0,
			valid_user_count: 0,
			charge: 0,
			rebate: 0
		}
	})
	onMounted(()=>{
		getTeams();
	})

	async function getTeams (){
		await util.request('/teams', {
			"top_len": data.top_len,
			"is_valid_data": 1
		},'GET').then((res)=>{
			data.top_share = res.top_share
			data.list = res.data
			data.report = res.report
			data.today_report = res.today_report
		})
	}
	const goBack = ()=>{
		uni.switchTab({
		    url: '/pages/team/index',
		    success: function () {
		        console.log('跳转成功');
		    },
		    fail: function () {
		        console.log('跳转失败');
		    }
		});
	}
	
	
	const tablist = reactive([  
	    { name: 'level-1', 'id': 1 },  
	    { name: 'level-2', 'id': 2},  
		{ name: 'level-3', 'id': 3}, 
	]);  
	  
	// 定义方法  
	function clickTab(item) {  
		data.top_len = item.id
		getTeams()
	    console.log('item', item);  
	}  
</script>

<style lang="scss" scoped>
	.bg {
		background: var(--bg-page);
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}
	.card-box{
		width: 700rpx;
		margin: 30rpx auto 0;
		border-radius: 10rpx;
		padding: 40rpx 26rpx;
		box-sizing: border-box;
	}
	.bg-fff{
		background: #FFFFFF;
	}
	.content {
		margin-top: 30rpx;
		.rule{
			box-sizing: border-box;
			background: #5374FD;
			color: #FFFFFF;
			.num-text{
				font-size: 50rpx;
				font-family: DINBOLD ;
			}
			.btn-copy{
				font-size: 32rpx;
				margin-left: 20rpx;
				padding: 6rpx 12rpx;
				box-sizing: border-box;
				background: #ecf5ff;
				color: #2979ff;
				border-radius: 10rpx;
				font-family: DINBOLD;
			}
		}
		.btn-team{
			width: 500rpx;
			margin: 0 auto;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: linear-gradient(90deg, #4769FB, #5374F9);
			border-radius: 20rpx;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
		}
		.count-box{
			background: #FFFFFF;
			//display: grid;
			//grid-template-columns: 1fr 1fr;
			//grid-gap: 60rpx 0;
			.count-item{
				flex: 1;
				display: flex;
				flex-direction: column;
				.title{
					font-size: 28rpx;
					color: #666666;
				}
				.num-text{
					font-size: 36rpx;
					color: #333333 !important;
					font-family: DINBOLD;
				}
			}
		}
	}
	.table-box{
		width: 700rpx;
		margin: 30rpx auto 0;
	}
</style>

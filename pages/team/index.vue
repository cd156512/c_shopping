<template>
	<view class="bg"></view>
	<up-navbar leftIcon placeholder bgColor="#DBEAFF" >
		<template #center >
			<view class="flex top">
				<view class="ml10">
					<up-text text="My team" color="var(--main-color)" size="30rpx" bold></up-text>
				</view>
			</view>
		</template>
	</up-navbar>
	<view class="content">
		<view class="card-box share">
			<text>Your exclusive promotional connection</text>
			<view class="mt20">
				<text class="num-text">{{data.shareUrl}}</text>
				<text class="btn-copy" @click="copyText">Copy</text>
			</view>
		</view>
		<view class="card-box bg-fff">
			<view class="btn-team" @click="toTeamIncome()">View team commissions</view>
		</view>
		<view class="card-box count-box">
			<view class="flex">
				<view class="count-item">
					<view class="title">Recharge wallet</view>
					<view class="">
						<up-count-to class="num-text" :startVal="0" :endVal="data.cion" :decimals="2"></up-count-to>
						<text class="num-text">Rs</text>
					</view>
				</view>
				<view class="count-item">
					<view class="title">Balance wallet</view>
					<view class="">
						<up-count-to class="num-text" :startVal="0" :endVal="data.money" :decimals="2"></up-count-to>
						<text class="num-text">Rs</text>
					</view>
				</view>
			</view>
			<view class="flex mt40">
				<view class="count-item">
					<view class="title">Total earnings</view>
					<up-count-to class="num-text" :startVal="0" :endVal="data.total_profit" :decimals="2"></up-count-to>
				</view>
				<view class="count-item">
					<view class="title">Team income</view>
					<up-count-to class="num-text" :startVal="0" :endVal="data.total_teams_profit" :decimals="2" ></up-count-to>
				</view>
			</view>
			<view class="flex mt40">
				<view class="count-item">
					<view class="title">Income today</view>
					<up-count-to class="num-text" :startVal="0" :endVal="data.today_profit" :decimals="2"></up-count-to>
				</view>
				<view class="count-item">
					<view class="title">Products</view>
					<up-count-to class="num-text" :startVal="0" :endVal="data.total_alipay_profit" :decimals="2"></up-count-to>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import{reactive, onMounted, ref} from 'vue';
	import util from '@/utils/util.js';
	const data = reactive({
		id: 0,
		phone: undefined,
  	cion: 0,
  	money: 0,
		shareUrl: undefined,
		total_profit: 0,
		total_teams_profit: 0,
		today_profit: 0,
		total_alipay_profit: 0,
	})
	onMounted(()=>{
		getUserInfo();
	})
	async function getUserInfo (){
		await util.request('/user/info', {
		},'GET').then((res)=>{
			//
			const currentDomain = window.location.origin;
			data.shareUrl = currentDomain + '/#/pages/my/register?code=' +  res.data.id
			data.cion = res.data.cion
			data.money = res.data.money
			data.total_profit = res.data.total_profit
			data.total_teams_profit = res.data.total_teams_profit
			data.today_profit = res.data.today_profit
			data.total_alipay_profit = res.data.total_alipay_profit
		})
	}
	const avatarUrl = ref('https://picsum.photos/400/400?');
	const img = ref('../../static/icon/');
	const toUrl = (url)=>{
		uni.navigateTo({
			url:url
		})
	}

	const copyText = ()=>{
	  uni.setClipboardData({
		data: data.shareUrl,
		success: function () {
		  uni.showToast({
			title: 'Success',
			icon: 'none',
			duration: 2000
		  });
		}
	  });
	}
	const toTeamIncome = ()=>{
		console.log('2424234: ',2424234);
		uni.navigateTo({
			url:"/pages/team/income/income"
		})
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
		.share{
			box-sizing: border-box;
			background: #5374FD;
			text{
				&:first-child{
					margin-bottom: 30rpx;
				}
				color: #FFFFFF;
			}
			.num-text{
				font-size: 32rpx;
				color: #FFFFFF;
				//margin-left: 10rpx;
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
				text-align: center;
				.title{
					color: #666666;
					margin-bottom: 20rpx;
				}
				.num-text{
					font-size: 36rpx;
					color: #333333 !important;
					font-family: DINBOLD;
				}
			}
		}
	}

	
</style>

<template>
	<view class="bg"></view>
	<up-navbar leftIcon placeholder bgColor="var(--bg-page)" >
		<template #center >
			<view class="flex top">
				<view class="ml10">
					<up-text text="Setting" color="var(--main-color)" size="30rpx" bold></up-text>
				</view>
			</view>
		</template>
	</up-navbar>
	<view class="card-box u-info flex items-center">
		<up-avatar :src="avatarUrl" size="120rpx"></up-avatar>
		<view class="ml30">
			<up-text :text="'ID:' + data.id" color="#666666" size="16"></up-text>
			<view class="mt10 flex items-center">
				<up-text :text='data.phone' color="#666666" size="16"></up-text>
				<up-image src="../../static/icon/phone.png" width="22px" height="22px"></up-image>
			</view>
		</view>
	</view>
	<view class="content">
		<view class="count-box justify-around">
			<view class="count-item">
				<text>Recharge balance</text>
				<view class="mt20">
					<up-count-to class="num-text" :startVal="0" :endVal="data.cion" :decimals="2"></up-count-to>
					<text class="num-text">Rs</text>
				</view>
				<view class="btn-item" @click="toUrl('/pages/my/recharge/index')">Charge</view>
			</view>
			<view class="count-item">
				<text>Balance</text>
				<view class="mt20">
					<up-count-to class="num-text" :startVal="0" :endVal="data.money" :decimals="2"></up-count-to>
					<text class="num-text">Rs</text>
				</view>
				<view class="btn-item" @click="toUrl('/pages/my/withdraws/index')" >Withdraw</view>
			</view>
		</view>
		
		<view class="card-box setting-box">
			<view class="flex justify-around">
				<view class="action-item">
					<up-image :src="img+'ticket.png'" width="60rpx" height="60rpx" ></up-image>
					<text>Buy tickets</text>
				</view>
				<view class="action-item">
					<up-image  :src="img+'/team.png'" width="60rpx" height="60rpx"></up-image>
					<text>Team</text>
				</view>
				<view class="action-item"  @click="toUrl('/pages/my/withdraws/index')">
					<up-image :src="img+'withdraw.png'" width="60rpx" height="60rpx"></up-image>
					<text>Withdraw</text>
				</view>
				<view class="action-item">
					<up-image :src="img+'orders.png'" width="60rpx" height="60rpx"></up-image>
					<text>Logs</text>
				</view>
			</view>
			<view class="flex justify-around mt70">
				<view class="action-item">
					<up-image :src="img+'command.png'" width="60rpx" height="60rpx"></up-image>
					<text>Command</text>
				</view>
				<view class="action-item">
					<up-image  :src="img+'msg.png'" width="60rpx" height="60rpx"></up-image>
					<text>Msg</text>
				</view>
				<view class="action-item">
					<up-image :src="img+'about.png'" width="60rpx" height="60rpx"></up-image>
					<text>About</text>
				</view>
				<view class="action-item" @click="toUrl('/pages/my/bindBankCard')">
					<up-image :src="img+'card.png'" width="60rpx" height="60rpx"></up-image>
					<text>Cards</text>
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
  	money: 0
	})
	onMounted(()=>{
		getUserInfo();
	})
	const avatarUrl = ref('https://picsum.photos/400/400?');
	const img = ref('../../static/icon/');
	const toUrl = (url)=>{
		uni.navigateTo({
			url:url
		})
	}
	async function getUserInfo (){
		await util.request('/user/info', {
		},'GET').then((res)=>{
			data.id = res.data.id
			data.phone = res.data.phone
			data.cion = res.data.cion
			data.money = res.data.money
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
		background: #FFFFFF;
	}
	.bg-fff{
		background: #FFFFFF;
	}
	.u-info{
		padding: 30rpx;
	}
	.content {
		margin-top: 40rpx;
		.count-box{
			width: 700rpx;
			margin: 20rpx auto;
			border-radius: 10rpx;
			padding: 40rpx 10rpx;
			box-sizing: border-box;
			background: #5374FD;//linear-gradient(270deg, #FFFFFF 0%, #EDF4FF 100%);
			.count-item{
				text-align: center;
				color: #FFFFFF;
				.num-text{
					font-size: 36rpx !important;
					color: #FFFFFF !important;
					margin-left: 10rpx;
					font-family: DINBOLD;
				}
				.btn-item{
					width: 200rpx;
					height: 70rpx;
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #FFFFFF;
					color: #4769FB;
					border-radius: 10rpx;
					
				}
			}
		}
		.setting-box{
			background: #FFFFFF;
			//display: grid;
			//grid-template-columns: repeat(4,1fr);
			//grid-gap: 60rpx 0;
			.action-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				color:#333333;
				text{
					margin-top: 10px;
					font-size: 12px;
				}
			}
		}
	}

	
</style>

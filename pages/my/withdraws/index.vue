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
						<up-text text="Withdraws" color="var(--main-color)" size="30rpx" bold></up-text>
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="content">
			<view class="card-box form-box">
				<view class="form-item">
					<text class="title">Realname</text>
					<up-input clearable placeholder="Please enter your name" v-model="bankInfo.realname" />
				</view>
				<u-gap height="20"></u-gap>
				<view class="form-item" style="height: 34px;">
					<text class="title">Bank</text>
					<picker class="flex-1" @change="pickBank($event)" range-key="name" :range="bankList">
						<view class="pick-bank">
							<text :class="{'is-pick':isPick}">{{bankInfo.bankName}}</text>
							<up-icon class="mla" name="arrow-right"></up-icon>
						</view>
					</picker>
				</view>
				<u-gap height="20"></u-gap>
				<view class="form-item">
					<text class="title">bankAccount</text>
					<up-input 
						clearable
						v-model="bankInfo.bankAccount"
						placeholder="Please enter the bank account number" 
						type="number" />
				</view>
				<u-gap height="20"></u-gap>
				<view class="form-item">
					<text class="title">IFSC</text>
					<up-input v-model="bankInfo.ifsc" clearable placeholder="Please enter the IFSC code" type="number" />
				</view>
				<u-gap height="20"></u-gap>
				<view class="form-item no-border">
					<text class="title">Balance</text>
					<text>{{bankInfo.balance}}</text>
					<view class="mla flex-center">
						<text>RS</text>
						<view class="btn-all flex-center" @click="formData.total = bankInfo.balance">All</view>
					</view>
				</view>
			</view>
			<view class="card-box bg-fff">
				<up-text text="Amount" color="#333333" size="30rpx" bold></up-text>
				<u-gap height="10"></u-gap>
				<up-input
					type="number"
					clearable
					v-model="formData.total"
					placeholder="Please enter the amount"
				>
					<template #suffix>
						<up-text text="RS" color="#999999" size="30rpx"></up-text>
					</template>
				</up-input>
				<u-gap height="20"></u-gap>
				<up-text text="Payment password" color="#333333" size="30rpx" bold></up-text>
				<u-gap height="10"></u-gap>
				<up-input
					type="password"
					clearable
					v-model="formData.pwd"
					placeholder="Please enter the payment password"
				></up-input>
			</view>
			
			<view class="btn-sign flex-center">Submit</view>
		</view>
	</view>
</template>

<script setup>
	import{ref,reactive,watch } from 'vue';
	const goBack = ()=>{
		uni.navigateBack(-1)
	}
	
	//银行信息（根据实际修改）
	const bankInfo = reactive({
		realname:'',
		bankName:'Please select a bank',
		bankIndex:0,
		bankAccount:'',
		ifsc:'',
		balance:99999
	})
	//银行卡
	const isPick = ref(false);//是否选择了银行
	const bankList= ref([
		{
			id:1,
			name:'bank1'
		},
		{
			id:2,
			name:'bank2'
		},
		{
			id:3,
			name:'bank3'
		},
	])
	const pickBank = (e)=>{
		bankInfo.bankName = bankList.value[e.detail.value].name;
		bankInfo.bankIndex = e.detail.value;
		isPick.value = true;
	}
	
	//表单（根据实际修改）
	const formData = reactive({
		total:'',
		pwd:''
	})
	 
	 
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
		margin: 30rpx auto 0;
		border-radius: 10rpx;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
	}
	.bg-fff{
		background: #FFFFFF;
	}
	.content {
		margin-top: 30rpx;
		.form-box{
			background: #FFFFFF;
			.u-border{
				border: none ;
			}
			.u-button--mini{
				height: 30px;
				.u-button__text{
					font-size: 14px !important;
				}
			}
			.form-item{
				display: flex;
				align-items: center;
				border-bottom: solid 1px #dadbde;
				.title{
					display: block;
					color: #646566;
					width: 190rpx;
				}
				.pick-bank{
					display: flex;
					width: 100%;
					padding-left: 14rpx;
					box-sizing: border-box;
					color: #c0c4cc;
				}
				.is-pick{
					color: #303233;
				}
			}
		}
		.btn-all{
			width: 80rpx;
			height: 50rpx;
			margin-left: 20rpx;
			font-size: 28rpx;
			background: linear-gradient(90deg, #4769FB, #5374F9);
			border-radius: 4px;
			color:#ffffff;
		}
		.btn-sign{
			width: 700rpx;
			margin: 60rpx auto 0;
			height: 80rpx;
			background: linear-gradient(90deg, #4769FB, #5374F9);
			border-radius: 18px;
			color:#ffffff;
		}
	}
</style>
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
						<up-text text="Bind bank account" color="var(--main-color)" size="30rpx" bold></up-text>
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="content">
			<view class="card-box form-box">
				<view class="form-item">
					<text class="title">Realname</text>
					<up-input clearable placeholder="Please enter your name" v-model="data.form.bank_name" />
				</view>
				<u-gap height="20"></u-gap>
				<!-- <view class="form-item" style="height: 34px;">
					<text class="title">Bank</text>
					<picker class="flex-1" @change="pickBank($event)" range-key="name" :range="bankList">
						<view class="pick-bank">
							<text :class="{'is-pick':isPick}">{{formData.bankName}}</text>
							<up-icon class="mla" name="arrow-right"></up-icon>
						</view>
					</picker>
				</view> -->
				<u-gap height="20"></u-gap>
				<view class="form-item">
					<text class="title">bankAccount</text>
					<up-input 
						clearable
						v-model="data.form.bank_user"
						placeholder="Please enter the bank account number" 
						type="number" />
				</view>
				<u-gap height="20"></u-gap>
				<view class="form-item">
					<text class="title">IFSC</text>
					<up-input v-model="data.form.bank_ifsc" clearable placeholder="Please enter the IFSC code" type="number" />
				</view>
				<u-gap height="20"></u-gap>
				<view class="form-item">
					<text class="title">Account</text>
					<up-input v-model="data.form.bank_number" clearable placeholder="Please enter Account" type="number" />
				</view>
				<u-gap height="20"></u-gap>
				<!-- <view class="form-item no-border">
					<text class="title">OTP</text>
					<up-input
						v-model="formData.otp"
						clearable
						type="number"
						placeholder="Please enter"
					>
						<template #suffix>
							<up-code
								ref="uCodeRef"
								@change="codeChange"
								@end="end()"
								@start="start()"
								seconds="5"
								start-text="Send code"
								changeText="Xs"
							></up-code>
							<up-button
								@tap="getCode"
								:text="tips"
								type="primary"
								size="mini"
							></up-button>
						</template>
					</up-input>
				</view> -->
			</view>
			<view class="btn-sign flex-center"  @click="submit()">Submit</view>
		</view>
	</view>
</template>

<script setup>
	import{ref,reactive,watch } from 'vue';
	import util from '@/utils/util.js';
	const data = reactive({
		form: {
			bank_ifsc: undefined,
			bank_name: undefined,
			bank_user: undefined,
			bank_number: undefined,
		}
	})
	const goBack = ()=>{
		uni.navigateBack(-1)
	}

	async function submit (){
		await util.request('/user/card',data.form,'POST').then((res)=>{
			uni.showToast({
			title: 'Success',
			icon: 'none',
			duration: 2000
		  });
			uni.navigateBack(-1)
		})
		console.log('submit')
	}
	
	const tips = ref('');
	const value = ref('');
	const uCodeRef = ref(null);
	const init_uCodeRef =()=>uCodeRef.canGetCode = true;
	init_uCodeRef();
	watch(value, (newValue, oldValue) => {
	  // console.log('v-model', newValue);
	});
	
	const codeChange = (text) => {
	  tips.value = text;
	};
	
	const getCode = () => {
	  if (uCodeRef.canGetCode) {
	    // 模拟向后端请求验证码
	    uni.showLoading({
	      title: 'Get code ...',
	    });
	    setTimeout(() => {
	      uni.hideLoading();
	      // 这里此提示会被start()方法中的提示覆盖
	     
	      // 通知验证码组件内部开始倒计时
	      uCodeRef.value.start();
	    }, 2000);
	  } else {
	    uni.$u.toast('waitting...');
	  }
	};
	
	const change = (e) => {
	  console.log('change', e);
	};
	const end = () => {
	  //uni.$u.toast('倒计时结束');
	  tips.value = 'Resend';
	  uCodeRef.canGetCode = true;
	};
	
	const start = () => {
		uni.$u.toast('code has been sent ');
		uCodeRef.canGetCode = false;
	};
	//表单数据（要根据实际修改）
	const formData = reactive({
		realname:'',
		bankName:'Please select a bank',
		bankIndex:0,
		bankAccount:'',
		ifsc:'',
		account:'',
		otp:''
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
		formData.bankName = bankList.value[e.detail.value].name;
		formData.bankIndex = e.detail.value;
		isPick.value = true;
	} 
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
			padding-bottom: 30rpx;
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
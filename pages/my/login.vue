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
						<up-text text="Sign in" color="var(--main-color)" size="30rpx" bold></up-text>
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="content">
			<view class="logo">
				<up-image src="../../static/icon/product.png" width="130rpx" height="130rpx"></up-image>
			</view>
			<view class="card-box bg-fff input-border">
				<up-input
					clearable
					prefixIcon="phone"
					type="number"
					placeholder="Please enter mobile number"
					prefixIconStyle="font-size: 22px;color: #909399"
					v-model="formData.phone"
				></up-input>
				<u-gap height="20"></u-gap>
				<up-input
					clearable
					prefixIcon="lock"
					type="password"
					placeholder="Please enter the login password"
					prefixIconStyle="font-size: 22px;color: #909399"
				></up-input>
				<u-gap height="20"></u-gap>
				<up-input
					clearable
					prefixIcon="email"
					type="number"
					placeholder="SMS verification code"
					prefixIconStyle="font-size: 22px;color: #909399"
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
				
			</view>
			<view class="btn-sign flex-center" @click="subForm">Sign in</view>
			<view class="reg-box">
				<text @click="toUrl('/pages/my/forgetPwd')">Forget password</text>
				<text @click="toUrl('/pages/my/register')">Register now</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import{ref,reactive,watch } from 'vue';
	import util from '@/utils/util.js';
	const goBack = ()=>{
		uni.navigateBack(-1)
	}
	function toUrl(url){
		uni.navigateTo({
			url:url
		})
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
	//表单数据
	const formData = reactive({
		phone:'',
	})
	const subForm = ()=>{
		if(formData.phone == ''){
			uni.$u.toast(`Please input a phone Num`);
			return;
		}
		//登录完成
		uni.showLoading({
			text:'loding...'
		})
		setTimeout(()=>{
			uni.hideLoading();
			uni.switchTab({
			    url: '/pages/index/index',
			    success: function () {
			        console.log('跳转成功');
			    },
			    fail: function () {
			        console.log('跳转失败');
			    }
			});
		},800)
		
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
		margin: 80rpx auto 0;
		border-radius: 10rpx;
		padding: 40rpx 26rpx;
		box-sizing: border-box;
	}
	.bg-fff{
		background: #FFFFFF;
	}
	.content {
		margin-top: 30rpx;
		.logo{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			margin:0 auto;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.btn-sign{
			width: 700rpx;
			margin: 60rpx auto 0;
			height: 80rpx;
			background: linear-gradient(90deg, #4769FB, #5374F9);
			border-radius: 18px;
			color:#ffffff;
		}
		.reg-box{
			width: 700rpx;
			margin: 40rpx auto 0;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			color: #666666;
		}
	}
</style>
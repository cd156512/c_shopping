//let baseUrl ='http://homework1.com/api/';
let baseUrl = 'https://api.cxyounger.com';



export default {
	// 公共请求方法
	async request(url, params, method,check_login) {
		checkNetwork();//检查网络-要等检查结果的话前面加 await
		
		let localToken = uni.getStorageSync('token');
		console.log(params)
		const reqParams = Object.assign(params)
		return new Promise((resole,reject)=>{
			uni.request({
				url: baseUrl + url,
				method: method || 'POST',
				data: reqParams || {},
				header: {
					'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTg5MjMwMzgsImlhdCI6MTcxNTkyMzAzOCwicGF5bG9hZCI6NTE1MzY2fQ.EWLz2ngFmCuuKn5-1Yo4JpYqh01NKOutbnGf6harP7c',
					'content-type': 'application/json'
				},
				success: function(res) {
					//请求成功
					if (res.data.code == '50014') {
						//登录过期
						//&& !check_login
						showLoginModal(res.data.message);
					} else if (res.data.code == '2000') {
						uni.hideLoading();
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						})
					}
					//正常
					resole(res.data);
				},
				fail: function(res) {
					uni.hideLoading();
					uni.showToast({
						title: 'Req fail',
						icon: 'none',
						duration: 2000
					})
				},
			})
			
		})
		
		
		
		// .then(res => {
			
		// }).catch(err => {
		// 	console.error(err)
		// 	return Promise.reject(new Error('请求失败'))
		// })
	},
	
	//处理pc端UEditor的富文本数据，让前端可以正常显
	uniHtmlDecode(str) {
		return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(
			/&#39;/g, "'");
	},
	isEmpty(val) {
		return !isNotEmpty(val);
	},
	/**
	 * title 提示的内容
	 * mask  是否显示透明蒙层，防止触摸穿透
	 * duration 提示的延迟时间
	 * icon  图标
	 * image
	 **/
	//显示信息
	showToast(title = "", duration = "2000", mask = true, icon = "none", image = "") {
		uni.showToast({
			title: title,
			icon: icon,
			mask: mask,
			duration: duration,
			image: image
		});
	},
	//显示信息
	show_msg(msg) {
		uni.showToast({
			title: msg,
			icon: 'none',
			mask: true,
			duration: 2000
		});
	},
	alert(json) {
		var title = isNotEmpty(json.title) ? json.title : '提示';
		var content = isNotEmpty(json.content) ? json.content : '';
		var success = isNotEmpty(json.success) ? json.success : null;
		var cancel = isNotEmpty(json.cancel) ? json.cancel : null;
		var showCancel = isNotEmpty(json.showCancel) ? json.showCancel : false;
		uni.showModal({
			title: title,
			content: content,
			showCancel: showCancel,
			success(res) {
				if (res.confirm) {
					(success && typeof(success) == "function") && success();
				} else if (res.cancel) {
					(cancel && typeof(cancel) == "function") && cancel();
				}
			}
		})
	},
	toNum(str) {
		if (typeof(str) != 'number') {
			str = parseFloat(str);
		}
		if (isNaN(str)) {
			str = 0;
		}


		return parseFloat(str.toFixed(2));

	},
	//上传截图
	uploadCropperImg(callback, tempFile) {
		uni.uploadFile({
			url: baseUrl + 'portal/user/uploadImg',
			filePath: tempFile,
			name: 'file',
			formData: {},
			success: function(res) {
				console.log(res);
				var data = JSON.parse(res.data);
				uni.hideLoading();
				if (data.status == '0') {
					uni.showToast({
						title: '上传失败',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else {
					callback && callback(data.data);
				}
			},
			fail: function(e) {
				console.log(e);
			},
		})

	},
	//上传图片
	uploadImgSingle(callback, tempFile, post_data) {
		//var post_data = {};
		console.log("post_data: ", post_data);
		console.log("tempFile: ", tempFile);
		uni.uploadFile({
			url: baseUrl + 'portal/tiku/paizhaoshoutiV3',
			filePath: tempFile,
			name: 'file',
			formData: post_data ? post_data : {},
			success: function(res) {
				console.log('success:', res);
				var data = JSON.parse(res.data);
				uni.hideLoading();
				if (data.status == '0') {
					uni.showToast({
						title: '上传失败',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else {
					if (data.code == 0) {
						uni.showToast({
							title: data.msg,
							icon: 'none',
							duration: 2000
						});
					} else {
						callback && callback(data.data);
					}
				}
			},
			fail: function(e) {
				// uni.showToast({
				// 	title: e,
				// 	icon: 'none',
				// 	duration: 2000
				// });
				console.log('fail:', e);
			},
		})

	},
	//上传图片
	upload_img(callback) {
		var count = arguments[1] ? arguments[1] : 1;
		uni.chooseImage({
			count: count,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				uni.showLoading({
					title: '加载中',
				});
				var tempFilePaths = res.tempFilePaths;
				var post_data = {};
				console.log('tempFilePaths', tempFilePaths);
				for (var i in tempFilePaths) {
					var file = tempFilePaths[i];
					uni.uploadFile({
						url: baseUrl + 'portal/user/uploadImg',
						filePath: file,
						name: 'file',
						formData: post_data,
						success: function(res) {
							console.log('uploadImgRes:', res);
							var data = JSON.parse(res.data);
							uni.hideLoading();
							if (data.status == '0') {
								uni.showToast({
									title: '上传失败',
									icon: 'none',
									duration: 2000
								});
								return false;
							} else {
								data.data.tempUrl = tempFilePaths; //获取图片信息的时候要用到
								callback && callback(data.data);
							}
						},
						fail: function(e) {
							console.log(e);
						},
					})
				}

			}
		})

	},
	//上传文件
	upload_file(callback) {
		var count = arguments[1] ? arguments[1] : 1;
		uni.chooseMessageFile({
			count: count,
			type: 'file',
			extension: ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsc', 'pdf', 'txt'],
			success(res) {
				uni.showLoading({
					title: '加载中',
				});
				console.log(res.tempFiles);
				var post_data = {
					token: uni.getStorageSync('token'),
					m: 'h',
					c: 'ajax',
					a: 'upload_images',
					type: 'file'
				};
				for (var i in res.tempFiles) {
					var tempFilePaths = res.tempFiles[i].path;
					uni.uploadFile({
						url: baseUrl + '/' + post_data.m + '/' + post_data.c + '/' + post_data.a +
							'&token=' + post_data.token,
						filePath: tempFilePaths,
						name: 'file',
						formData: post_data,
						success(res) {
							console.log(res);
							var data = JSON.parse(res.data);
							uni.hideLoading();
							if (data.status == '0') {
								uni.showToast({
									title: data.info,
									icon: 'none',
									duration: 2000
								});
								return false;
							} else {
								callback && callback(data.data);
							}

						}
					})

				}



			}
		})


	},
	//上传视频
	upload_video(callback) {
		var count = arguments[1] ? arguments[1] : 1;
		if (count > 9) {
			count = 9;
		}
		uni.chooseVideo({
			count: count,
			sourceType: ['album', 'camera'],
			success: function(res) {
				uni.showLoading({
					title: '上传中',
				});
				console.log("chooseVideoRes: ", res);
				var tempFilePaths = res.tempFilePath;
				var post_data = {};

				uni.uploadFile({
					url: baseUrl + 'portal/user/uploadvideo',
					filePath: tempFilePaths,
					name: 'file',
					formData: post_data,
					success: function(res) {
						console.log(res);
						var data = JSON.parse(res.data);
						uni.hideLoading();
						if (data.status == '0') {
							uni.showToast({
								title: '上传失败',
								icon: 'none',
								duration: 2000
							});
							return false;
						} else {
							callback && callback(data.data);
						}
					},
					fail: function(e) {
						console.log(e);
					},
				})

			}
		})

	},
	//单图预览
	previewImgOne(imgurl) {
		if (!imgurl) {
			return;
		}
		let imgsArray = [];
		imgsArray[0] = imgurl;
		uni.previewImage({
			current: 0,
			urls: imgsArray
		});
	},
	//显示文件
	show_file(file) {
		var index1 = file.lastIndexOf(".");
		var index2 = file.length;
		var type = file.substring(index1 + 1, index2);
		uni.downloadFile({
			url: file,
			success: function(res) {
				const filePath = res.tempFilePath
				uni.openDocument({
					filePath: filePath,
					fileType: type,
					success: function(res) {
						console.log('打开文档成功')
					},
					complete: function() {

					},
					fail: function(e) {
						console.log(e);
					},
				})
			}
		})

	},
	toIndex() {
		uni.switchTab({
			url: '/pages/index/index'
		})
	},
	toUrl(url){
		uni.navigateTo({
			url:url
		})
	}

}
//----------------------------------------------

//跳转到登陆页面
function to_login() {
	var current_url = get_current_url();
	uni.setStorageSync('to_url', current_url);
	uni.redirectTo({
		url: "/pages/my/login"
	});
	return false;
}
//获取当前url
function get_current_url() {
	var ep = getCurrentPages().pop();
	var ep9 = '/' + ep.route + '?';
	for (var k in ep.options) {
		ep9 = ep9 + k + '=' + ep.options[k] + '&';
	}
	return ep9.substr(0, ep9.length - 1);
}
//提醒登录弹窗
function showLoginModal(msg){
	uni.showModal({
		title: 'Tips',
		content: msg||'Please log in first',
		confirmText: 'Ok',  
		cancelText: 'Cancel', 
		success(res) {
			if (res.confirm) {
				to_login();
			} else if (res.cancel) {
				console.log('用户点击取消')
			}
		}
	})
}

//判断网络状态
function checkNetwork(){
	
	return new Promise((resolve, reject)=>{
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none') {
					//网络异常
					uni.showToast({
						title: 'Please check your network',
						icon: 'none',
					},2000)
					resolve()
				}
			}
		 });
		
	})
}

//是否存在
function isNotEmpty(val) {
	if (typeof(val) == 'undefined') {
		return false;
	}
	if (val != '' && val != null && val != undefined)
		return true;
	else
		return false;
}
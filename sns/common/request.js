import $C from '@/common/config.js';
import $store from '@/store/index.js';
export default {
	common:{
		method: 'GET',
		header:{
			"content-type":"application/json"
		},
		data:{}
	},
	request(options = {}){
		
		options.url = $C.webUrl + options.url
		options.method = options.method || this.common.method
		options.header = options.header || this.common.header
		
		// 验证权限token
		if(options.token){
			options.header.Authorization = "Bearer " + $store.state.token
			if(!options.noCheck && !$store.state.token && !options.notoast){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if(options.native){
						return res(result)
					}
					// 请求服务端失败
					if (result.statusCode !== 200 && !options.notoast) {
						uni.showToast({
							title:result.data.msg || '请求失败',
							icon: 'none'
						});
						return rej(result.data)
					}
					if (result.data.code == 200){
						// 成功
						return res(result.data.data)
					} else if(result.data.code == 203) {//token失效
						$store.commit('logout')
						uni.showToast({
							title: '登录过期，等重新登录',
							icon: 'none'
						});
						return rej(result.data)
					} else {
						uni.showToast({
							title: result.data.msg,
							icon: 'none'
						});
						return rej(result.data)
					}
				},
				fail:(error)=>{
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
					
					return rej()
				}
			});
		})
	},
	get(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	upload(url,options = {}, onProgress = false){
		options.url = $C.webUrl + url
		options.header = options.header || {}
		// 验证权限token
		if(options.token){
			options.header.Authorization = "Bearer " + $store.state.token
			if(!$store.state.token){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		
		return new Promise((res,rej)=>{
			const uploadTask = uni.uploadFile({
				...options,
				success: (uploadFileRes) => {
					if(uploadFileRes.statusCode !== 200){
						return uni.showToast({
							title: '上传图片失败',
							icon: 'none'
						});
					}
					let data = JSON.parse(uploadFileRes.data)
					if (data.code == 200){
						res(data)
					} else if(data.code == 203) {//token失效
						$store.commit('logout')
						return uni.showToast({
							title: '登录过期，等重新登录',
							icon: 'none'
						});
					} else {
						return uni.showToast({
							title: data.msg,
							icon: 'none'
						});
					}
				},
				fail:(err)=>{
					rej(err)
				}
			});
			uploadTask.onProgressUpdate((res) => {
				if (typeof onProgress === 'function') {
					onProgress(res.progress)
				}
			});
		})
		
	}
}
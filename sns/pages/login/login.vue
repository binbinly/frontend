<template>
	<view>
		<!-- #ifndef MP -->
		<uni-status-bar></uni-status-bar>
		<view>
			<view class="iconfont icon-guanbi flex align-center justify-center font-lg" style="width: 100rpx;height: 100rpx;"
			 hover-class="bg-light" @click="back"></view>
		</view>
		<!-- #endif -->

		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">{{titleName}}</view>

		<view class="px-2">
			<template v-if="status == 0">
				<view class="mb-2">
					<input type="text" v-model="username" placeholder="昵称/手机号" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="password" v-model="password" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">忘记密码？</view>
				</view>
			</template>

			<template v-else-if="status == 2">
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font-sm text-white" :class="codeTime > 0 ? 'bg-main-disabled' : 'bg-main'"
					 style="width: 180rpx;" @click="getCode">{{codeTime > 0 ? codeTime + ' s' : '获取验证码'}}</view>
				</view>
				<view class="mb-2">
					<input type="text" v-model="username" placeholder="请输入昵称" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="password" v-model="password" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="password" v-model="confirm_password" placeholder="确认密码" class="border-bottom p-2 flex-1" />
				</view>
			</template>

			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font-sm text-white" :class="codeTime > 0 ? 'bg-main-disabled' : 'bg-main'"
					 style="width: 180rpx;" @click="getCode">{{codeTime > 0 ? codeTime + ' s' : '获取验证码'}}</view>
				</view>
			</template>


		</view>

		<template v-if="status == 2">
			<view class="py-2 px-3">
				<button class="text-white" style="border-radius: 50rpx;border: 0;" type="primary" :disabled="registerDisabled" :class="registerDisabled ? 'bg-main-disabled':'bg-main'"
				 @click="register" :loading="loading">{{loading ? '注册中...' : '注册'}}</button>
			</view>
		</template>
		<template v-else>
			<view class="py-2 px-3">
				<button class="text-white" style="border-radius: 50rpx;border: 0;" type="primary" :disabled="disabled" :class="disabled ? 'bg-main-disabled':'bg-main'"
				 @click="submit" :loading="loading">{{loading ? '登录中...' : '登录'}}</button>
			</view>
		</template>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeStatus(0)">
				{{status == 0?'账号密码登录':'验证码登陆'}}
			</view>
			<text class="text-muted mx-2">|</text>
			<view class="text-primary font-sm" @click="changeStatus(2)">还没有账号</view>
		</view>

		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>

		<other-login back></other-login>

		<view class="flex align-center justify-center text-muted">
			注册即代表同意<text class="text-primary">《xxx社区协议》</text>
		</view>

	</view>
</template>

<script>
	const statusName = ['账号密码登录', '手机验证码登录', '新用户注册']
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import otherLogin from '@/components/common/other-login.vue';
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				status: 0,
				username: "",
				password: "",
				confirm_password: "",
				phone: "",
				code: "",
				codeTime: 0,
				loading: false
			}
		},
		onLoad() {

		},
		computed: {
			disabled() {
				if ((this.username === '' || this.password === '') && (this.phone === '' || this.code === '')) {
					return true
				}
				return false
			},
			registerDisabled(){
				if (this.username === '' || this.password === '' || this.confirm_password === '' || this.phone === '' || this.code === '') {
					return true
				}
				return false
			},
			titleName() {
				return statusName[this.status]
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 初始化表单
			initForm() {
				this.username = ''
				this.password = ''
				this.confirm_password = ''
				this.phone = ''
				this.code = ''
			},
			// 切换登录方式
			changeStatus(s) {
				// 初始化表单
				this.initForm()
				if (s == 0) {
					this.status = this.status == 0 ? 1 : 0
				} else {
					this.status = s
				}
			},
			// 获取验证码
			getCode() {
				// 防止重复获取
				if (this.codeTime > 0) {
					return;
				}
				// 验证手机号
				if (!this.validate()) return;
				// 请求数据
				this.$H.post('/sms_code', {
					phone: this.phone
				}, {
					native: true
				}).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
					// 倒计时
					this.codeTime = 60
					let timer = setInterval(() => {
						if (this.codeTime >= 1) {
							this.codeTime--
						} else {
							this.codeTime = 0
							clearInterval(timer)
						}
					}, 1000)
				})
			},
			// 表单验证
			validate() {
				//手机号正则
				if (this.status != 0) {
					var mPattern = /^1[34578]\d{9}$/;
					if (!mPattern.test(this.phone)) {
						uni.showToast({
							title: '手机号格式不正确',
							icon: 'none'
						});
						return false
					}
				}
				if (this.status == 2) {//注册验证
					if (this.password.length < 6 || this.password.length > 20) {
						this.$U.toast("密码长度6-20位")
						return false
					}
					if (this.confirm_password != this.password) {
						this.$U.toast("两次密码输入不一致哦")
						return false
					}
				}
				return true
			},
			register() {
				if (!this.validate()) return;
				let url = '/register'
				let data = {
					phone: this.phone,
					code: this.code,
					username: this.username,
					password: this.password,
					confirm_password: this.confirm_password,
				}
				// 提交后端
				this.loading = true
				this.$H.post(url, data).then(res => {
					this.loading = false
					this.status = 0
					// 初始化表单
					this.initForm()
					uni.showToast({
						title: '注册成功',
						icon: 'none'
					});
				}).catch(err => {
					this.loading = false
				})
			},
			// 提交
			submit() {
				// 表单验证
				let url = ""
				let data = ""
				if (this.status) {
					// 手机验证码登录
					if (!this.validate()) return;
					url = '/login_phone'
					data = {
						phone: this.phone,
						code: this.code
					}
				} else {
					// 账号密码登录
					url = '/login'
					data = {
						username: this.username,
						password: this.password
					}
				}
				// 提交后端
				this.loading = true
				this.$H.post(url, data).then(res => {
					this.loading = false
					// 修改vuex的state,持久化存储
					this.$store.commit('login', res)
					// 开启socket
					this.$store.dispatch('openSocket')
					// 提示和跳转
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
				}).catch(err => {
					// 登录失败
					this.loading = false
				})
			}
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<uni-list-item title="头像" @click="changeAvatar">
			<view class="flex align-center" slot="right">
				<image :src="avatar|formatAvatar"
				style="width: 100rpx;height: 100rpx;"
				class="rounded-circle"></image>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view class="flex align-center" slot="right">
				<input class="uni-input text-right" v-model="nickname" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="个性签名">
			<view class="flex align-center" slot="right">
				<input class="uni-input text-right" v-model="info.sign" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeGender">
			<view class="flex align-center" slot="right">
				<text>{{genderText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<picker mode="date" :value="info.birthday" @change="onDateChange">
			<uni-list-item title="生日">
				<view class="flex align-center" slot="right">
					<text>{{info.birthday}}</text>
					<text class="iconfont icon-bianji1 ml-2"></text>
				</view>
			</uni-list-item>
		</picker>
		<uni-list-item title="情感" @click="changeEmotion">
			<view class="flex align-center" slot="right">
				<text>{{emotionText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业" @click="changeJob">
			<view class="flex align-center" slot="right">
				<text>{{info.job}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="家乡" @click="showCityPicker">
			<view class="flex align-center" slot="right">
				<text>{{info.hometown}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="submit">完成</button>
		</view>
		
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
		
	</view>
</template>

<script>
	const genderArray = ['保密', '男', '女']
	const emotionArray = ['保密', '未婚', '已婚']
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue';
	
	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		filters: {
			formatAvatar(value) {
				if (value == "") {
					return value = "/static/default.jpg";
				} else {
					return value
				}
			},
		},
		data() {
			return {
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				
				avatar:'',
				nickname:'',
				info:{}
			}
		},
		// 监听返回
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		onLoad() {
			this.getUserProfile()
			this.avatar = this.$store.state.user.avatar
			this.nickname = this.$store.state.user.nickname
		},
		computed: {
			genderText() {
				return genderArray[this.info.gender]
			},
			emotionText(){
				return emotionArray[this.info.emotion]
			}
		},
		methods: {
			//获取用户详情
			getUserProfile() {
				this.$H.get('/user/profile', {}, {
					token:true
				}).then(res => {
					this.info = res
				})
			},
			showCityPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			// 三级联动提交事件
			onConfirm(e) {
				this.info.hometown = e.label
			},
			// 修改生日
			onDateChange(e){
				this.info.birthday = e.detail.value
			},
			// 修改头像
			changeAvatar(){
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				
				uni.chooseImage({
					count:1,
					sizeType:["compressed"],
					sourceType:["album","camera"],
					success: (res) => {
						this.$H.upload('/upload/avatar',{
							filePath: res.tempFilePaths[0],
							name: 'avatar',
							token:true
						}).then(result=>{
							this.avatar = result.data
							
							uni.showToast({
								title: '修改头像成功',
								icon: 'none'
							});
						}).catch(err=>{
							this.$U.toast("上传失败")
						})
					}
				})
			},
			// 修改性别
			changeGender(){
				uni.showActionSheet({
				    itemList: genderArray,
				    success:(res)=>{
				        this.info.gender = res.tapIndex
				    }
				});
			},
			// 修改情感
			changeEmotion(){
				uni.showActionSheet({
				    itemList: emotionArray,
				    success:(res)=>{
				        this.info.emotion = res.tapIndex
				    }
				});
			},
			// 修改职业
			changeJob(){
				let JobArray = ['保密', '程序猿鼓励师', '程序猿','教师','农民', '游戏陪练']
				uni.showActionSheet({
				    itemList: JobArray,
				    success:(res)=>{
				        this.info.job = JobArray[res.tapIndex]
				    }
				});
			},
			// 提交
			submit(){
				let obj = this.info
				obj.avatar = this.avatar
				obj.nickname = this.nickname
				this.$H.post('/user/profile_save',obj,{
					token:true
				}).then(res=>{
					this.$store.commit('editUserInfo',{
						key:"nickname",
						value:this.nickname
					})
					this.$store.commit('editUserInfo',{
						key:"avatar",
						value:this.avatar
					})
					this.$store.commit('editUserUserInfo',this.info)
					
					uni.showToast({
						title: '修改资料成功',
						icon: 'none'
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 800)
				})
			}
		}
	}
</script>

<style>

</style>

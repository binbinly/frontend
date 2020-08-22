<template>
	<view class="flex flex-wrap">
		<view v-for="(item,index) in imageList" :key="index" style="width: 230rpx;" class="flex align-center justify-center pt-2 position-relative">
			<view class="bg-light rounded">
			<image :src="item.thumb" style="width: 210rpx;height: 210rpx;" mode="aspectFill" @click="preview(index)"></image>
			<progress v-if="item.progress > 0 && item.progress < 100" :percent="item.progress" activeColor="green"/>
			</view>
			<view class="flex align-center justify-center rounded-circle" style="width: 60rpx;height: 60rpx;position: absolute;top: 10rpx;right: 0;background-color: rgba(0,0,0,0.5);"
			 @click="deleteImage(item)">
				<text class="iconfont text-white font-small">&#xe620;</text>
			</view>
		</view>
		<view v-if="imageList.length < 9" style="width: 230rpx;" class="flex align-center justify-center" @click="chooseImage">
			<view class="flex align-center justify-center bg-light rounded" style="width: 210rpx;height: 210rpx;">
				<text class="text-light-muted" style="font-size: 100rpx;">+</text>
			</view>
		</view>
	</view>
</template>

<script>
	import $H from '@/common/free-lib/request.js';
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				imageList: []
			}
		},
		mounted() {
			this.imageList = this.list
		},
		methods: {
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 9 - this.imageList.length,
					sizeType: ['compressed'],
					success: (res) => {
						console.log(res)
						res.tempFiles.forEach(file => {
							this.imageList.push({
								url:file.path,
								thumb:file.path,
								progress:0,
								type:file.type,
								finish:0
							})
						})
						// 上传
						this.imageList.forEach(file => {
							if(file.finish == 1) {
								return
							}
							$H.upload({
								filePath: file.url
							}, (progress) => {
								file.progress = progress
							}).then(res => {
								file.finish = 1;
								file.url = res.url;
								if (file.type == 'image/gif') {
									file.url = res.url;
								} else {
									file.thumn = res.url + '?width=200&height=200';
								}
								this.$emit('update', this.imageList)
							})
						})
					}
				})
			},
			// 预览图片
			preview(index) {
				let imgs = this.imageList.map(item => {
					return item.url
				})
				uni.previewImage({
					current: imgs[index],
					urls: imgs
				})
			},
			// 删除图片
			deleteImage(item) {
				uni.showModal({
					content: '是否要删除该图片？',
					success: (res) => {
						if (res.confirm) {
							let index = this.imageList.findIndex(url => url === item)
							if (index !== -1) {
								this.imageList.splice(index, 1)
								this.$emit('update', this.imageList)
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
</style>

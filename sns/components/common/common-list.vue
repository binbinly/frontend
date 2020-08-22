<template>
	<view class="p-2 animated fast fadeIn">
		<!-- 头像昵称 | 关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				<image class="rounded-circle mr-2" :src="item.avatar|formatAvatar" @click="openSpace(item.user_id)" style="width: 65rpx;height: 65rpx;"
				 lazy-load></image>
				<!-- 昵称发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">
						{{item.username}}
					</view>
					<text class="font-sm text-light-muted" style="line-height: 1.5;">
						{{item.created_at|formatTime}}
					</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view @click="follow" v-if="!item.state.follow && user.id !== item.user_id" class="flex align-center justify-center rounded bg-main text-white animated faster"
			 style="width: 90rpx;height: 50rpx;" hover-class="jello">
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">{{isdetail ? item.content : item.title}}</view>
		<!-- 帖子详情 -->

<view v-if="item.image.length" class="py-2 flex flex-wrap">
				<block v-for="(v,i) in item.image" :key="i">
					<!-- 单图 -->
					<free-image v-if="item.image.length === 1" :src="v.thumb" mode="aspectFill" imageClass="rounded bg-secondary" @click="_previewImage(item.image, i)"></free-image>
					<!-- 多图 -->
					<image v-else :src="v.thumb" mode="aspectFill" style="height: 220rpx;width: 220rpx;" class="bg-secondary mr-1 mb-1 rounded"
					 @click="_previewImage(item.image, i)"></image>
				</block>
			</view>
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<!-- 顶 -->
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="doSupport('support')"
			 :class="item.state.type === 1 ? 'support-active' : ''">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.like_count > 0 ? item.like_count : '顶'}}</text>
			</view>
			<!-- 踩 -->
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="doSupport('unsupport')"
			 :class="item.state.type === 2 ? 'support-active' : ''">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.unlike_count > 0 ? item.unlike_count : '踩'}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="doComment">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count > 0 ? item.comment_count : '评论'}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="doShare">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_count > 0 ? item.share_count : '分享'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import $T from '@/common/time.js';
	import {
		mapState
	} from 'vuex';
	import uniGrid from "@/components/uni-ui/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-ui/uni-grid-item/uni-grid-item.vue"
	import freeImage from '@/components/common/free-image.vue';
	export default {
		components: {
			uniGrid,
			uniGridItem,
			freeImage
		},
		props: {
			item: Object,
			isdetail: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			},
			formatAvatar(value) {
				if (value == "") {
					return value = "/static/default.jpg";
				} else {
					return value
				}
			},
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			// 打开个人空间
			openSpace(user_id) {
				uni.navigateTo({
					url: '/pages/user-space/user-space?user_id=' + user_id,
				});
			},
			// 关注
			follow() {
				this.checkAuth(() => {
					this.$H.post('/user/follow', {
						user_id: this.item.user_id
					}, {
						token: true
					}).then(res => {
						// 通知更新
						uni.$emit('updateFollowOrSupport', {
							type: "follow",
							data: {
								user_id: this.item.user_id
							}
						})
					})
				})
			},
			// 进入详情页
			openDetail() {
				// 处于详情中
				if (this.isdetail) return;
				uni.navigateTo({
					url: '../../pages/detail/detail?id=' + this.item.id,
				});
				// 加入历史记录
				let list = uni.getStorageSync('history')
				list = list ? JSON.parse(list) : []
				let index = list.findIndex(v => v.id === this.item.id)
				if (index === -1) {
					list.unshift(this.item)
					uni.setStorageSync('history', JSON.stringify(list))
				}
			},
			// 顶踩操作
			doSupport(type) {
				this.checkAuth(() => {
					this.$H.post('/user/like', {
						post_id: this.item.id,
						type: type === 'support' ? 1 : 2
					}, {
						token: true,
					}).then(res => {
						// 通知父组件
						uni.$emit('updateFollowOrSupport', {
							type: "support",
							data: {
								type: type,
								id: this.item.id
							}
						})
					})
				})
			},
			// 评论
			doComment() {
				this.checkAuth(() => {
					if (!this.isdetail) {
						return this.openDetail()
					}
					this.$emit('doComment')
				})
			},
			// 分享
			doShare() {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doShare')
			},
			//图片预览
			_previewImage(images, index) {
				let imgArr = images.map(item=>{
					return item.big
				})
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[index]
				});
			}
		},
	}
</script>

<style>
	.support-active {
		color: #FF4A6A;
	}
</style>

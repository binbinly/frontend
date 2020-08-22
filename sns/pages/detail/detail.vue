<template>
	<view>
		<!-- 帖子详情页详细信息 -->
		<common-list :item="info" isdetail @follow="follow" @doSupport="doSupport" @doComment="doComment" @doShare="doShare"></common-list>

		<divider></divider>
		<view class="p-2 font-md font-weight-bold">
			最新评论 {{info.comment_count}}
		</view>
		<view class="px-2">
			<view v-for="(item,index) in comments" :key="index">
				<view class="uni-comment-list flex w-100">
					<view class="uni-comment-face">
						<image class="w-100" mode="widthFix" :src="item.avatar|formatAvatar"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{item.username}}</text>
						</view>
						<view class="uni-comment-content" @click="reply(item.id, item.id)">{{item.content}}</view>
						<view class="uni-comment-date">
							<view>{{item.created_at|formatTime}}</view>
						</view>
					</view>
				</view>
				<template v-if="item.reply.length > 0">
					<view class="uni-comment-list" v-for="(item1,index1) in item.reply" :key="index1">
						<view style="width: 60rpx;"></view>
						<view class="flex w-100 bg-light rounded p-2">
							<view class="uni-comment-face">
								<image class="w-100" mode="widthFix" :src="item1.avatar|formatAvatar"></image>
							</view>
							<view class="uni-comment-body">
								<view class="uni-comment-top">
									<text>{{item1.username}}</text>
								</view>
								<view class="uni-comment-content" @click="reply(item.id, item1.id)">{{item1.content}}</view>
								<view class="uni-comment-date">
									<view>{{item1.created_at|formatTime}}</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>

		</view>

		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input :focus="focus" @blur="blur" @submit="submit"></bottom-input>

		<more-share ref="share"></more-share>

	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	import moreShare from '@/components/common/more-share.vue';
	import $T from '@/common/time.js';
	export default {
		components: {
			commonList,
			bottomInput,
			moreShare
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
		data() {
			return {
				// 当前帖子信息
				info: {
					image:[],
					state:{}
				},
				images: [],
				comments: [],
				focus: false,
				reply_id: 0,
				reply_root:0,
				post_id:0
			}
		},
		onLoad(e) {
			// 初始化
			if (e.id) {
				this.post_id = parseInt(e.id)
				this.__init(e.id)
			}
			// 监听关注和顶踩操作
			uni.$on('updateFollowOrSupport', (e) => {
				switch (e.type) {
					case 'follow': // 关注
						this.follow()
						break;
					case 'support': // 顶踩
						this.doSupport(e.data)
						break;
				}
			})
		},
		onUnload() {
			uni.$off('updateFollowOrSupport', (e) => {})
		},
		computed: {
			imagesList() {
				return this.images.map(item => item.url)
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.share.open({
				title: this.info.title,
				shareText: this.info.title,
				href: "http://www.dishaxy.com",
				image: this.info.titlepic
			})
		},
		onBackPress() {
			this.$refs.share.close()
		},
		// #ifndef APP-PLUS
		// 微信小程序分享
		onShareAppMessage(res) {
			return {
				title: this.info.title,
				path: '/pages/detail/detail?detail=' + JSON.stringify(this.info)
			}
		},
		// #endif
		methods: {
			__init(id) {
				// 请求api
				this.$H.get('/post_detail?id=' + id, {}, {
					token: true,
					noCheck: true
				}).then(res => {
					this.info = res
				})
				this.getComments()
			},
			// 点击评论
			doComment() {

			},
			// 点击分享
			doShare() {

			},
			// 关注
			follow() {
				this.info.state.follow = true
				this.$U.toast("关注成功")
			},
			// 顶踩操作
			doSupport(e) {
				if (e.type === 'support') {
					// 之前没有操作过
					if (this.info.state.type === 0) {
						this.info.like_count++
					} else if (this.info.state.type === 2) {
						this.info.like_count++;
						this.info.unlike_count--;
					} else {
						return this.$U.toast("已操作过哦")
					}
					this.info.state.type = 1
				} else {
					if (this.info.state.type === 0) {
						this.info.unlike_count++
					} else if (this.info.state.type === 1) {
						this.info.like_count--;
						this.info.unlike_count++;
					} else {
						return this.$U.toast("已操作过哦")
					}
					this.info.state.type = 2
				}
				let msg = e.type === 'support' ? '顶' : '踩'
				this.$U.toast(msg + "成功")
			},
			// 预览图片
			preview(index) {
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imagesList
				});
			},
			// 提交评论
			submit(data) {
				if (data === '') {
					return uni.showToast({
						title: '评论不能为空',
						icon: 'none'
					});
				}
				uni.showLoading({
					title: '评论中...',
					mask: false
				});
				this.$H.post('/post/comment', {
					reply_id: this.reply_id,
					reply_root: this.reply_root,
					content: data,
					post_id: this.post_id
				}, {
					token: true
				}).then(res => {
					uni.hideLoading()
					this.getComments()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			// 获取评论列表
			getComments() {
				this.$H.get('/comment_list?pid=' + this.post_id)
					.then(res => {
						this.comments = res
						uni.$emit('updateCommentsCount', {
							id: this.post_id
						})
					})
			},
			// 回复评论
			reply(r_id, id) {
				this.reply_id = id
				this.reply_root = r_id
				this.focus = true
			},
			// 输入框失去焦点
			blur() {
				this.reply_id = 0
				this.reply_root = 0
				this.focus = false
			}
		}
	}
</script>

<style>

</style>

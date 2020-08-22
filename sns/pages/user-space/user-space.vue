<template>
	<view>
		<!-- #ifdef MP -->
		<uni-nav-bar :shadow="false" :fixed="true" :border="false" right-text="菜单" @click-right="clickNavigationButton"></uni-nav-bar>
		<!-- #endif -->
		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom border-light-secondary">
			<image :src="userinfo.avatar|formatAvatar" style="width: 180rpx;height: 180rpx;" class="rounded-circle"></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center">
					<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in counts" :key="index">
						<text class="font-lg font-weight-bold">{{item.num|formatNum}}</text>
						<text class="font text-muted">{{item.name}}</text>
					</view>
				</view>
				<view class="flex justify-center align-center">

					<button v-if="user_id == user.user_id" type="default" size="mini" style="width: 400rpx;" @click="openUserInfo">
						编辑资料
					</button>

					<button v-else type="default" size="mini" :class="is_follow ? 'bg-light text-dark' : 'bg-main'" style="width: 400rpx;"
					 @click="doFollow">
						{{is_follow ? '已关注' : '关注'}}
					</button>

				</view>
			</view>
		</view>

		<!-- tab -->
		<view class="flex align-center" style="height: 100rpx;">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index" :class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md'"
			 @click="changeTab(index)">
				{{item.name}}</view>
		</view>

		<template v-if="tabIndex === 0">
			<view class="animated fast fadeIn">
				<view class="p-3 border-bottom">
					<view class="font-md">账号信息</view>
					<view class="font">账号id：{{user_id}}</view>
					<view class="font">昵称：{{userinfo.nickname}}</view>
					<view class="font">个性签名：{{userinfo.sign}}</view>
					<view class="font">性别：{{genderName}}</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">个人信息</view>
					<view class="font">生日：{{userinfo.birthday}}</view>
					<view class="font">职业：{{userinfo.job}}</view>
					<view class="font">故乡：{{userinfo.hometown}}</view>
					<view class="font">情感：{{emotionName}}</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
				<common-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
				<divider></divider>
				<load-more :loadmore="loadmore"></load-more>
			</view>
		</template>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="flex align-center justify-center font-md border-bottom py-2" hover-class="bg-light" @click="doBlack">
				<text class="iconfont icon-bianji mr-2"></text>
				{{is_black ? '移出黑名单' : '加入黑名单'}}
			</view>
			<view v-if="!is_black" class="flex align-center justify-center font-md py-2" hover-class="bg-light" @click="openChat">
				<text class="iconfont icon-keyboard mr-2"></text> 聊天
			</view>
		</uni-popup>


	</view>
</template>

<script>
	const emotionArray = ['保密', '未婚', '已婚']
	const loadNameArray = ['上拉加载更多', '加载中', '没有更多了']
	const jobArray = ['保密', '程序猿鼓励师', '程序猿', '教师', '农民', '游戏陪练']
	const genderArray = ['保密', '男', '女']
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import $T from '@/common/time.js';
	import {
		mapState
	} from 'vuex'
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	export default {
		components: {
			commonList,
			loadMore,
			uniPopup,
			uniNavBar
		},
		data() {
			return {
				user_id: 0,
				userinfo: {},
				is_follow: false,
				is_black:false,
				counts: [{
					name: "帖子",
					num: 0
				}, {
					name: "关注",
					num: 0
				}, {
					name: "粉丝",
					num: 0
				}],
				tabIndex: 0,
				tabBars: [{
					name: "主页",
				}, {
					name: "动态",
					list: [],
					loadmore: "上拉加载更多",
					page: 1
				}, {
					name: "帖子",
					list: [],
					loadmore: "上拉加载更多",
					page: 1
				}],
			}
		},
		onNavigationBarButtonTap() {
			this.clickNavigationButton()
		},
		computed: {
			...mapState({
				user: state => state.user
			}),
			list() {
				return this.tabBars[this.tabIndex].list
			},
			loadmore() {
				return this.tabBars[this.tabIndex].loadmore
			},
			emotionName() {
				return emotionArray[this.userinfo.emotion]
			},
			genderName() {
				return genderArray[this.userinfo.gender]
			}
		},
		filters: {
			formatNum(value) {
				return value > 99 ? '99+' : value;
			},
			formatAvatar(value) {
				if (value == "") {
					return value = "/static/default.jpg";
				} else {
					return value
				}
			},
		},
		onLoad(e) {
			if (!e.user_id) {
				return uni.showToast({
					title: '非法参数',
					icon: 'none'
				});
			}
			this.user_id = parseInt(e.user_id)
			// 加载用户个人信息
			this.getUserInfo()
			// 监听关注和顶踩操作
			uni.$on('updateFollowOrSupport', (e) => {
				switch (e.type) {
					case 'follow': // 关注
						this.follow(e.data.user_id)
						break;
					case 'support': // 顶踩
						this.doSupport(e.data)
						break;
				}
			})
		},
		// 触底事件
		onReachBottom() {
			if (this.tabIndex != 0) {
				this.loadmoredown(this.tabIndex)
			}
		},
		onUnload() {
			uni.$off('updateFollowOrSupport', (e) => {})
		},
		methods: {
			clickNavigationButton() {
				if (this.user_id == this.user.user_id) {
					return uni.navigateTo({
						url: '../user-set/user-set',
					});
				}
				this.$refs.popup.open()
			},
			// 获取用户个人信息
			getUserInfo() {
				this.$H.get('/user/space?uid=' + this.user_id, {}, {
					token: true,
					notoast: true
				}).then(res => {
					this.userinfo = res.info
					uni.setNavigationBarTitle({
						title: this.userinfo.username
					})
					this.counts[0].num = res.post_count
					this.counts[1].num = res.follow_count
					this.counts[2].num = res.Fens_count
					this.is_follow = res.is_follow
					this.is_black = res.is_black
				})
			},
			changeTab(index) {
				this.tabIndex = index
				this.getList()
			},
			// 关注
			follow(user_id) {
				// 找到当前作者的所有列表
				this.tabBars.forEach(tab => {
					if (tab.list) {
						tab.list.forEach((item) => {
							if (item.user_id === user_id) {
								item.state.follow = true
							}
						})
					}
				})
				uni.showToast({
					title: '关注成功'
				})
			},
			// 顶踩操作
			doSupport(e) {
				// 拿到当前的选项卡对应的list
				this.tabBars[this.tabIndex].list.forEach(item => {
					if (item.id === e.id) {
						if (e.type === 'support') {
							// 之前没有操作过
							if (item.state.type === 0) {
								item.like_count++
							} else if (item.state.type === 2) {
								item.like_count++;
								item.unlike_count--;
							} else {
								return this.$U.toast("已操作过哦")
							}
							item.state.type = 1
						} else {
							if (item.state.type === 0) {
								item.unlike_count++
							} else if (item.state.type === 1) {
								item.like_count--;
								item.unlike_count++;
							} else {
								return this.$U.toast("已操作过哦")
							}
							item.state.type = 2
						}
					}
				})
				let msg = e.type === 'support' ? '顶' : '踩'
				uni.showToast({
					title: msg + '成功'
				});
			},
			// 获取文章列表
			getList() {
				let index = this.tabIndex
				if (index === 0) return;
				let page = this.tabBars[index].page
				let isrefresh = page === 1
				this.$H.get('/post/my?uid=' + this.user_id + '&type=' + this.tabIndex + '&p=' + page)
					.then(res => {
						this.tabBars[index].list = isrefresh ? [...res] : [...this.tabBars[index].list, ...res]
						this.tabBars[index].loadmore = res.length < 10 ? '没有更多了' : '上拉加载更多'
					}).catch(err => {
						if (!isrefresh) {
							this.tabBars[index].page--
						}
					})
			},
			// 上拉加载更多
			loadmoredown(index) {
				// 拿到当前列表
				let item = this.tabBars[index]
				// 判断是否处于可加载状态（上拉加载更多）
				if (item.loadmore !== '上拉加载更多') return;
				// 修改当前列表加载状态
				item.loadmore = '加载中...'
				// 请求数据
				item.page++;
				this.getList()
			},
			// 关注/取消关注
			doFollow() {
				this.checkAuth(() => {
					let url = this.is_follow ? '/user/unfollow' : '/user/follow'
					let msg = this.is_follow ? '取消关注' : '关注'
					this.$H.post(url, {
						user_id: this.user_id
					}, {
						token: true
					}).then(res => {
						this.is_follow = !this.is_follow
						uni.showToast({
							title: msg + '成功',
							icon: 'none'
						});
						uni.$emit('updateIndex')
						this.getList()
					})
				})
			},
			// 进入编辑资料
			openUserInfo() {
				uni.navigateTo({
					url: '../user-userinfo/user-userinfo',
				});
			},
			// 加入/移出黑名单
			doBlack() {
				this.$refs.popup.close()
				this.checkAuth(() => {
					let url = this.is_black ? '/user/remove_black' : '/user/add_black'
					let msg = this.is_black ? '移出黑名单' : '加入黑名单'
					uni.showModal({
						content: '是否要' + msg,
						success: (res) => {
							if (res.confirm) {
								this.$H.post(url, {
									user_id: this.user_id
								}, {
									token: true
								}).then(res => {
									this.is_black = !this.is_black
									uni.showToast({
										title: msg + '成功',
										icon: 'none'
									});
								})
							}
						}
					});

				})
			},
			openChat() {
				let user = {
					id: this.user_id,
					username: this.userinfo.username,
					avatar: this.userinfo.avatar
				}
				this.navigateTo({
					url: "/pages/user-chat/user-chat?user=" + JSON.stringify(user)
				})
			}
		}
	}
</script>

<style>

</style>

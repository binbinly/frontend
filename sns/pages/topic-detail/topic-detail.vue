<template>
	<view>
		<topic-info :info="info"></topic-info>
		<divider></divider>

		<view class="p-2 flex align-center border-bottom" hover-class="bg-light" v-for="(item,index) in recommendList" :key="index" @click="openDetail(index)">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font text-dark text-ellipsis" style="height:30rpx;line-height: 30rpx;">
				{{item.title}}
			</text>
		</view>
		<divider></divider>

		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index" :class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md'"
			 @click="changeTab(index)">{{item.name}}</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<divider></divider>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 上拉加载 -->
		<load-more :loadmore="loadtext"></load-more>

	</view>
</template>

<script>
	import topicInfo from '@/components/topic-detail/topic-info.vue';
	import commonList from '@/components/common/common-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			topicInfo,
			commonList,
			noThing,
			loadMore
		},
		data() {
			return {
				info: {},
				recommendList: [],

				tabIndex: 0,
				tabBars: [{
					name: "最新"
				}, {
					name: "最热"
				}],
				// 默认
				list1: [],
				loadtext1: "上拉加载更多",
				page1: 1,
				firstLoad1: false,
				// 最新
				list2: [],
				loadtext2: "上拉加载更多",
				page2: 1,
				firstLoad2: false,
			}
		},
		computed: {
			// 当前列表数据
			listData() {
				if (this.tabIndex === 0) {
					return this.list1
				}
				return this.list2
			},
			// 当前上拉加载
			loadtext() {
				if (this.tabIndex === 0) {
					return this.loadtext1
				}
				return this.loadtext2
			}
		},
		onLoad(e) {
			if (e.id) {
				this.__init(e.id)
				// 加载数据
				this.getData(e.id)
			}
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
			this.loadmore()
		},
		onUnload() {
			uni.$off('updateFollowOrSupport', (e) => {})
		},
		methods: {
			__init(id) {
				this.$H.get('/topic/detail?id=' + id).then(res => {
					this.info = res
					this.recommendList = res.recommend
					// 修改标题
					uni.setNavigationBarTitle({
						title:res.title
					})
				})
			},
			// tab切换
			changeTab(index) {
				this.tabIndex = index
				if (!this['firstLoad' + (index + 1)]) {
					this.getData()
				}
			},
			// 加载数据
			getData(id) {
				if(!id) id = this.info.id
				let no = this.tabIndex + 1
				let page = this['page' + no]
				let isrefresh = page === 1
				this.$H.get('/topic/post_list?tid=' + id + '&order=' + no + '&p=' + page, {}, {
						token: true,
						noCheck: true
					})
					.then(res => {
						this['list' + no] = isrefresh ? [...res] : [...this['list' + no], ...res];
						this['loadtext' + no] = res.length < 10 ? '没有更多了' : '上拉加载更多';
						if (isrefresh) {
							this['firstLoad' + no] = true
						}
					}).catch(err => {
						if (!isrefresh) {
							this['page' + no]--;
						}
					})
			},
			openDetail(index){
				uni.navigateTo({
					url: '../../pages/detail/detail?id=' + this.recommendList[index].id,
				});
			},
			// 上拉加载更多
			loadmore() {
				// 拿到当前的列表
				let index = this.tabIndex
				// 判断是否处于可加载状态
				if (this.loadtext !== '上拉加载更多') return;
				// 设置上拉加载状态处于加载中...
				let no = index + 1
				this['loadtext' + no] = '加载中...'
				// 请求数据
				this['page' + no]++;
				this.getData()
			},
			// 关注
			follow(user_id) {
				// 找到当前作者的所有列表
				this.list1.forEach((item) => {
					if (item.user_id === user_id) {
						item.state.follow = true
					}
				})
				this.list2.forEach((item) => {
					if (item.user_id === user_id) {
						item.state.follow = true
					}
				})
				uni.showToast({
					title: '关注成功'
				})
			},
			// 顶踩操作
			doSupport(e) {
				// 拿到当前的选项卡对应的list
				let no = this.tabIndex + 1
				this['list' + no].forEach(item => {
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
				this.$U.toast(msg + '成功')
			},
		}
	}
</script>

<style>
	.filter {
		filter: blur(10px);
	}
</style>

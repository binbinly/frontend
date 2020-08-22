<template>
	<view>
		<!-- #ifdef MP -->
		<uni-nav-bar :shadow="false" :border="false" @click-left="clickLeft" @click-right="clickRight">
			<!-- 左边图标 -->
			<block slot="left">
				<view class="iconfont icon-qiandao ml-2 mr-2" style="font-size: 22px;color: #FF9619;"></view>
			</block>
			<!-- 中间搜索框 -->
			<view class="flex justify-center align-center rounded text-muted bg-light flex-1 mt-1" style="margin-left: -46upx;height: 60upx;"
			 @tap="openSearch">
				<view class="iconfont icon-sousuo mr-1"></view>搜索帖子
			</view>
			<!-- 右边图标 -->
			<block slot="right">
				<view class="icon iconfont icon-bianji1 text-dark" style="font-size: 22px;"></view>
			</block>
		</uni-nav-bar>
		<!-- #endif -->
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto" scroll-with-animation class="scroll-row border-bottom border-light-secondary"
		 style="height: 100rpx;">
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md" :id="'tab'+item.id"
			 :class="tabIndex === index?'text-main font-lg font-weight-bold':''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:'+scrollH+'px;'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore(index)">

					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<!-- 加载中 -->
					<template v-else-if="!item.firstLoad">
						<view class="text-light-muted flex align-center justify-center font-md" style="height: 200rpx;">加载中...</view>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	export default {
		components: {
			commonList,
			loadMore,
			uniNavBar
		},
		data() {
			return {
				// 列表高度
				scrollH: 600,
				// 顶部选项卡
				scrollInto: "",
				tabIndex: 0,
				tabBars: [],
				newsList: []
			}
		},
		// 监听点击导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=3',
			})
		},
		// 监听导航按钮点击事件
		onNavigationBarButtonTap() {
			this.navigateTo({
				url: '../add-input/add-input',
			})
		},
		onPullDownRefresh(){
			this.getList(true)
			uni.stopPullDownRefresh()
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
					// #ifdef MP
					this.scrollH -= 44
					// #endif
				}
			})
			// 监听刷新首页
			uni.$on('updateIndex', () => {
				this.getData(true)
			})
			// 根据选项生成列表
			this.getData()
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
		onUnload() {
			uni.$off('updateFollowOrSupport', (e) => {})
			uni.$off('updateIndex', (e) => {})
		},
		methods: {
			// #ifndef APP-PLUS
			clickLeft() {
				// console.log('左边事件')
			},
			clickRight() {
				// 打开发布页面
				this.navigateTo({
					url: '../add-input/add-input',
				})
			},
			openSearch() {
				uni.navigateTo({
					url: '../search/search?type=3',
				})
			},
			// #endif
			// 获取数据
			getData(refresh = false) {
				// 获取分类
				this.$H.get('/cat').then(res => {
					this.tabBars = [{
						id: 0,
						name: "全部"
					}, ...res]

					for (let i = 0; i < this.tabBars.length; i++) {
						// 生成列表模板
						this.newsList.push({
							// 1.上拉加载更多  2.加载中... 3.没有更多了
							loadmore: "上拉加载更多",
							list: [],
							page: 1,
							firstLoad: false
						})
					}
					// 获取第一个分类的数据
					if (this.tabBars.length) {
						this.getList(refresh)
					}
				})
			},
			// 获取指定分类下的列表
			getList(refresh = false) {
				let index = this.tabIndex
				let id = this.tabBars[index].id
				let page = refresh ? 1 : this.newsList[index].page
				let isrefresh = page === 1
				
				this.$H.get('/post_list?cid=' + id + '&p=' + page, {}, {
						token: true,
						noCheck: true
					})
					.then(res => {
						this.newsList[index].list = isrefresh ? res : [...this.newsList[index].list, ...res];

						this.newsList[index].loadmore = res.length < 10 ? '没有更多了' : '上拉加载更多';

						if (isrefresh) {
							this.newsList[index].firstLoad = true
						}
					}).catch(err => {
						if (!isrefresh) {
							this.newsList[index].page--;
						}
					})
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			// 切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index
				// 滚动到指定元素
				this.scrollInto = 'tab' + index
				// 获取当前分类下的列表数据
				if (!this.newsList[this.tabIndex].firstLoad) {
					this.getList()
				}
			},
			// 关注
			follow(user_id) {
				// 找到当前作者的所有列表
				this.newsList[this.tabIndex].list.forEach(item => {
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
				this.newsList[this.tabIndex].list.forEach(item => {
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
			// 上拉加载更多
			loadmore(index) {
				// 拿到当前列表
				let item = this.newsList[index]
				// 判断是否处于可加载状态（上拉加载更多）
				if (item.loadmore !== '上拉加载更多') return;
				// 修改当前列表加载状态
				item.loadmore = '加载中...'
				// 请求数据
				item.page++;
				this.getList()
			}
		}
	}
</script>

<style>

</style>

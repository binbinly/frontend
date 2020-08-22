<template>
	<view class="p-2 flex align-center border-bottom border-light-secondary" hover-class="bg-light" @click="open">
		<image :src="item.avatar ? item.avatar : '/static/default.jpg'" style="width: 100rpx;height: 100rpx;" class="rounded-circle mr-2"></image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">{{item.username}}</text>
			<text class="text-dark font-sm">{{item.hometown}} | {{item.birthday}}</text>
		</view>
		<view class="uni-icon"><text class="iconfont" :class="item.gender===1?'icon-nan-color icon-nan':'icon-nv-color icon-nv'"/></view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue';
	export default {
		components: {
			uniBadge
		},
		props: {
			item: Object,
			index: Number
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages/user-space/user-space?user_id=' + this.item.user_id,
				});
			}
		},
	}
</script>

<style>
</style>

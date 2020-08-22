<template>
	<view>
		<picker mode="selector" :range="range" @change="change">
			<uni-list-item title="分类">
				<view class="flex align-center" slot="right">
					<text>{{form.category}}</text>
					<text class="iconfont icon-bianji1 ml-2"></text>
				</view>
			</uni-list-item>
		</picker>
		<textarea v-model="form.content" placeholder="请填写意见内容..." class="bg-white m-1 col-11 font-md" />
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="submit">意见反馈</button>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniListItem,
		},
		data() {
			return {
				range:["分类一","分类二","分类三","分类四","分类五"],
				form:{
					category:"",
					content:""
				}
			}
		},
		methods: {
			change(e){
				this.form.category = this.range[e.detail.value]
			},
			// 提交
			submit(){
				if (this.form.category == "") {
					uni.showToast({
						title: '请选择分类',
						icon: 'none'
					});
					return
				}
				if (this.form.content == "") {
					uni.showToast({
						title: '请填写内容',
						icon: 'none'
					});
					return
				}
				this.$H.post('/user/feedback',this.form,{
					token:true
				}).then(res=>{
					uni.showToast({
						title: '提交成功',
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

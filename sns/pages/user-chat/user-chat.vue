<template>
	<view>
		
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" style="position: absolute;left: 0;top: 0;right: 0;bottom: 100rpx;background-color: #f1f1f1;" :scroll-into-view="scrollInto" scroll-with-animation>
			
			<block v-for="(item,index) in list" :key="index">
				<view :id="'chat'+index">
					<user-chat-list :item="item" :index="index" 
					:pretime="index > 0 ? list[index-1].create_time : 0"
					></user-chat-list>
				</view>
			</block>
			
		</scroll-view>
		
		<!-- 底部操作条 -->
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import userChatList from '@/components/user-chat/user-chat-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	export default {
		components: {
			userChatList,
			bottomInput
		},
		data() {
			return {
				scrollInto:"",
				list:[]
			}
		},
		// 页面加载前
		onLoad(e) {
			if(!e.user){
				uni.navigateBack({
					delta: 1
				});
				return uni.showToast({
					title: '聊天对象不存在',
					icon: 'none'
				});
			}
			let ToUser = JSON.parse(e.user)
			// 创建聊天对象
			this.$store.commit('createToUser',ToUser)
			// 获取当前聊天对象的聊天记录
			this.$store.dispatch('getChatDetailToUser').then(list=>{
				console.log('[user-chat]获取当前聊天对象的聊天记录',list);
				this.list = list
			})
			// 开启监听接收聊天信息
			uni.$on('UserChat',(res)=>{
				if(res.mime.id === ToUser.id){
					this.renderPage({
						data:res,
						send:false
					})
				}
			})
		},
		// 页面加载完成的时候
		onReady() {
			this.pageToBottom()
		},
		// 页面销毁前
		beforeDestroy() {
			// 关闭聊天对象
			this.$store.commit('closeToUser')
			// 移除监听聊天信息事件
			uni.$off('UserChat',()=>{})
		},
		methods: {
			// 渲染到页面
			renderPage(e){
				this.$store.dispatch('formatChatDetailObject',e).then(msg=>{
					this.list.push(msg)
					// 滚动到底部
					this.pageToBottom()
				})
			},
			// 发送
			async submit(data){
				// 组织发送数据格式
				let result = await this.$store.dispatch('sendChatMessage',{
					data,
					type:this.$C.msgCTypeText
				})
				this.renderPage({
					data:result,
					send:true
				})
			},
			// 滚动到底部
			pageToBottom(){
				setTimeout(()=>{
					let lastIndex = this.list.length - 1
					if (lastIndex < 0) return;
					this.scrollInto = 'chat'+lastIndex
				},300)
			}
		}
	}
</script>

<style>

</style>

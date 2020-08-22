export default {
	// api请求前缀
	webUrl:'http://127.0.0.1:9010/v1',
	// websocket地址
	websocketUrl:"ws://127.0.0.1:9015/ws?token=",
	
	// api请求前缀
	// webUrl:'http://sns.winbet888.net/v1',
	// // websocket地址
	// websocketUrl:"ws://sns.winbet888.net/ws?token=",
	
	//常量配置
	msgTypeSystem: 1,	//消息类型 - 系统消息
	msgTypeFriend: 2,	//消息类型 - 好友消息
	msgTypeGroup: 3,	//消息类型 - 群组消息
	
	msgCTypeText: 1,	//消息内容类型 - 文本
	msgCTypeImage: 2,	//消息内容类型- 图片
}
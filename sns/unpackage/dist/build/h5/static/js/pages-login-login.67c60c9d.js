(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"047b":function(t,e,i){"use strict";i.r(e);var n=i("e16a"),s=i("7a6d");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"3da0915a",null,!1,n["a"],o);e["default"]=c.exports},1775:function(t,e,i){"use strict";i("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{back:{type:Boolean,default:!1}},data:function(){return{providerList:[]}},mounted:function(){var t=this;uni.getProvider({service:"oauth",success:function(e){t.providerList=e.provider.map((function(t){var e="",i="",n="";switch(t){case"weixin":e="微信登录",i="icon-weixin",n="bg-success";break;case"qq":e="QQ登录",i="icon-QQ",n="bg-primary";break;case"sinaweibo":e="新浪微博登录",i="icon-xinlangweibo",n="bg-warning";break}return{name:e,id:t,icon:i,bgColor:n}})),console.log(t.providerList)},fail:function(t){console.log("获取登录通道失败",t)}})},methods:{login:function(t){var e=this;console.log(t),uni.login({provider:t.id,success:function(i){console.log(i),uni.getUserInfo({provider:t.id,success:function(i){var n={provider:t.id,openid:i.userInfo.openId,expires_in:0,nickName:i.userInfo.nickName,avatarUrl:i.userInfo.avatarUrl};e.loginEvent(n)}})},fail:function(){uni.showToast({title:"登录失败",icon:"none"})}})},loginEvent:function(t){var e=this;this.$H.post("/user/otherlogin",t).then((function(t){e.$store.commit("login",e.$U.formatUserinfo(t)),e.back&&uni.navigateBack({delta:1}),uni.showToast({title:"登录成功",icon:"none"})}))},MpLogin:function(t){var e=this;this.$H.post(t.url,{code:t.code,nickName:t.nickName,avatarUrl:t.avatarUrl}).then((function(t){e.$store.commit("login",e.$U.formatUserinfo(t)),e.back&&uni.navigateBack({delta:1}),uni.showToast({title:"登录成功",icon:"none"})}))}}};e.default=n},"1e9e":function(t,e,i){"use strict";i.r(e);var n=i("5d3f"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},"2a93":function(t,e,i){"use strict";var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(i("5bf6")),a=n(i("047b")),o=["账号密码登录","手机验证码登录","新用户注册"],r={components:{uniStatusBar:s.default,otherLogin:a.default},data:function(){return{status:0,username:"",password:"",confirm_password:"",phone:"",code:"",codeTime:0,loading:!1}},onLoad:function(){},computed:{disabled:function(){return!(""!==this.username&&""!==this.password||""!==this.phone&&""!==this.code)},registerDisabled:function(){return""===this.username||""===this.password||""===this.confirm_password||""===this.phone||""===this.code},titleName:function(){return o[this.status]}},methods:{back:function(){uni.navigateBack({delta:1})},initForm:function(){this.username="",this.password="",this.confirm_password="",this.phone="",this.code=""},changeStatus:function(t){this.initForm(),this.status=0==t?0==this.status?1:0:t},getCode:function(){var t=this;this.codeTime>0||this.validate()&&this.$H.post("/sms_code",{phone:this.phone},{native:!0}).then((function(e){uni.showToast({title:e.data.msg,icon:"none"}),t.codeTime=60;var i=setInterval((function(){t.codeTime>=1?t.codeTime--:(t.codeTime=0,clearInterval(i))}),1e3)}))},validate:function(){if(0!=this.status){var t=/^1[34578]\d{9}$/;if(!t.test(this.phone))return uni.showToast({title:"手机号格式不正确",icon:"none"}),!1}if(2==this.status){if(this.password.length<6||this.password.length>20)return this.$U.toast("密码长度6-20位"),!1;if(this.confirm_password!=this.password)return this.$U.toast("两次密码输入不一致哦"),!1}return!0},register:function(){var t=this;if(this.validate()){var e="/register",i={phone:this.phone,code:this.code,username:this.username,password:this.password,confirm_password:this.confirm_password};this.loading=!0,this.$H.post(e,i).then((function(e){t.loading=!1,t.status=0,t.initForm(),uni.showToast({title:"注册成功",icon:"none"})})).catch((function(e){t.loading=!1}))}},submit:function(){var t=this,e="",i="";if(this.status){if(!this.validate())return;e="/login_phone",i={phone:this.phone,code:this.code}}else e="/login",i={username:this.username,password:this.password};this.loading=!0,this.$H.post(e,i).then((function(e){t.loading=!1,t.$store.commit("login",e),t.$store.dispatch("openSocket"),uni.navigateBack({delta:1}),uni.showToast({title:"登录成功",icon:"none"})})).catch((function(e){t.loading=!1}))}}};e.default=r},4988:function(t,e,i){"use strict";var n=i("ca80"),s=i.n(n);s.a},"56e4":function(t,e,i){"use strict";var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-status-bar",style:{height:t.statusBarHeight}},[t._t("default")],2)},a=[];i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))},"5bf6":function(t,e,i){"use strict";i.r(e);var n=i("56e4"),s=i("1e9e");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("4988");var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"a9d4525a",null,!1,n["a"],o);e["default"]=c.exports},"5d3f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=uni.getSystemInfoSync().statusBarHeight+"px",s={name:"UniStatusBar",data:function(){return{statusBarHeight:n}}};e.default=s},"5dc4":function(t,e,i){"use strict";i.r(e);var n=i("2a93"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},"7a6d":function(t,e,i){"use strict";i.r(e);var n=i("1775"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},"9a0e":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".uni-status-bar[data-v-a9d4525a]{display:block;width:100%;height:20px;height:0}",""]),t.exports=e},a83a:function(t,e,i){"use strict";var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("uni-status-bar"),i("v-uni-view",[i("v-uni-view",{staticClass:"iconfont icon-guanbi flex align-center justify-center font-lg",staticStyle:{width:"100rpx",height:"100rpx"},attrs:{"hover-class":"bg-light"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"text-center",staticStyle:{"padding-top":"130rpx","padding-bottom":"70rpx","font-size":"55rpx"}},[t._v(t._s(t.titleName))]),i("v-uni-view",{staticClass:"px-2"},[0==t.status?[i("v-uni-view",{staticClass:"mb-2"},[i("v-uni-input",{staticClass:"border-bottom p-2",attrs:{type:"text",placeholder:"昵称/手机号"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("v-uni-view",{staticClass:"border-bottom flex align-center justify-center font text-muted",staticStyle:{width:"150rpx"}},[t._v("忘记密码？")])],1)]:2==t.status?[i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-view",{staticClass:"border-bottom flex align-center justify-center font px-2"},[t._v("+86")]),i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"text",placeholder:"手机号"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),i("v-uni-view",{staticClass:"border-bottom flex align-center justify-center font-sm text-white",class:t.codeTime>0?"bg-main-disabled":"bg-main",staticStyle:{width:"180rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v(t._s(t.codeTime>0?t.codeTime+" s":"获取验证码"))])],1),i("v-uni-view",{staticClass:"mb-2"},[i("v-uni-input",{staticClass:"border-bottom p-2",attrs:{type:"text",placeholder:"请输入昵称"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"password",placeholder:"确认密码"},model:{value:t.confirm_password,callback:function(e){t.confirm_password=e},expression:"confirm_password"}})],1)]:[i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-view",{staticClass:"border-bottom flex align-center justify-center font px-2"},[t._v("+86")]),i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"text",placeholder:"手机号"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),i("v-uni-view",{staticClass:"mb-2 flex align-stretch"},[i("v-uni-input",{staticClass:"border-bottom p-2 flex-1",attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),i("v-uni-view",{staticClass:"border-bottom flex align-center justify-center font-sm text-white",class:t.codeTime>0?"bg-main-disabled":"bg-main",staticStyle:{width:"180rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v(t._s(t.codeTime>0?t.codeTime+" s":"获取验证码"))])],1)]],2),2==t.status?[i("v-uni-view",{staticClass:"py-2 px-3"},[i("v-uni-button",{staticClass:"text-white",class:t.registerDisabled?"bg-main-disabled":"bg-main",staticStyle:{"border-radius":"50rpx",border:"0"},attrs:{type:"primary",disabled:t.registerDisabled,loading:t.loading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register.apply(void 0,arguments)}}},[t._v(t._s(t.loading?"注册中...":"注册"))])],1)]:[i("v-uni-view",{staticClass:"py-2 px-3"},[i("v-uni-button",{staticClass:"text-white",class:t.disabled?"bg-main-disabled":"bg-main",staticStyle:{"border-radius":"50rpx",border:"0"},attrs:{type:"primary",disabled:t.disabled,loading:t.loading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v(t._s(t.loading?"登录中...":"登录"))])],1)],i("v-uni-view",{staticClass:"flex align-center justify-center pt-2 pb-4"},[i("v-uni-view",{staticClass:"text-primary font-sm",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(0)}}},[t._v(t._s(0==t.status?"账号密码登录":"验证码登陆"))]),i("v-uni-text",{staticClass:"text-muted mx-2"},[t._v("|")]),i("v-uni-view",{staticClass:"text-primary font-sm",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(2)}}},[t._v("还没有账号")])],1),i("v-uni-view",{staticClass:"flex align-center justify-center"},[i("v-uni-view",{staticStyle:{height:"1rpx","background-color":"#dddddd",width:"100rpx"}}),i("v-uni-view",{staticClass:"mx-2 text-muted"},[t._v("社交账号登录")]),i("v-uni-view",{staticStyle:{height:"1rpx","background-color":"#dddddd",width:"100rpx"}})],1),i("other-login",{attrs:{back:!0}}),i("v-uni-view",{staticClass:"flex align-center justify-center text-muted"},[t._v("注册即代表同意"),i("v-uni-text",{staticClass:"text-primary"},[t._v("《xxx社区协议》")])],1)],2)},a=[];i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))},b781:function(t,e,i){"use strict";i.r(e);var n=i("a83a"),s=i("5dc4");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"6f3ebfe0",null,!1,n["a"],o);e["default"]=c.exports},ca80:function(t,e,i){var n=i("9a0e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("4f06").default;s("43b677c6",n,!0,{sourceMap:!1,shadowMode:!1})},e16a:function(t,e,i){"use strict";var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"flex align-center px-5 py-3"})},a=[];i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"02f3":function(t,e,n){"use strict";var a=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("5bf6")),r=a(n("86e5")),o={name:"UniNavBar",components:{uniStatusBar:i.default,uniIcons:r.default},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[String,Boolean],default:!0},border:{type:[String,Boolean],default:!0}},methods:{onClickLeft:function(){this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")}}};e.default=o},"0623":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-scroll-view",{staticClass:"scroll-row border-bottom border-light-secondary",staticStyle:{height:"100rpx"},attrs:{"scroll-x":!0,"scroll-into-view":t.scrollInto,"scroll-with-animation":!0}},t._l(t.tabBars,(function(e,a){return n("v-uni-view",{key:a,staticClass:"scroll-row-item px-3 py-2 font-md",class:t.tabIndex===a?"text-main font-lg font-weight-bold":"",attrs:{id:"tab"+e.id},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeTab(a)}}},[t._v(t._s(e.name))])})),1),n("v-uni-swiper",{style:"height:"+t.scrollH+"px;",attrs:{duration:150,current:t.tabIndex},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChangeTab.apply(void 0,arguments)}}},t._l(t.newsList,(function(e,a){return n("v-uni-swiper-item",{key:a},[n("v-uni-scroll-view",{style:"height:"+t.scrollH+"px;",attrs:{"scroll-y":"true"},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.loadmore(a)}}},[e.list.length>0?[t._l(e.list,(function(e,a){return[n("common-list",{key:a+"_0",attrs:{item:e,index:a},on:{follow:function(e){arguments[0]=e=t.$handleEvent(e),t.follow.apply(void 0,arguments)},doSupport:function(e){arguments[0]=e=t.$handleEvent(e),t.doSupport.apply(void 0,arguments)}}}),n("divider")]})),n("load-more",{attrs:{loadmore:e.loadmore}})]:e.firstLoad?[n("no-thing")]:[n("v-uni-view",{staticClass:"text-light-muted flex align-center justify-center font-md",staticStyle:{height:"200rpx"}},[t._v("加载中...")])]],2)],1)})),1)],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"19bd":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-navbar"},[n("v-uni-view",{staticClass:"uni-navbar__content",class:{"uni-navbar--fixed":t.fixed,"uni-navbar--shadow":t.border,"uni-navbar--border":t.border},style:{"background-color":t.backgroundColor}},[t.statusBar?n("uni-status-bar"):t._e(),n("v-uni-view",{staticClass:"uni-navbar__header uni-navbar__content_view",style:{color:t.color}},[n("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickLeft.apply(void 0,arguments)}}},[t.leftIcon.length?n("v-uni-view",{staticClass:"uni-navbar__content_view"},[n("uni-icons",{attrs:{type:t.leftIcon,color:t.color,size:"24"}})],1):t._e(),t.leftText.length?n("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view",class:{"uni-navbar-btn-icon-left":!t.leftIcon.length}},[t._v(t._s(t.leftText))]):t._e(),t._t("left")],2),n("v-uni-view",{staticClass:"uni-navbar__header-container uni-navbar__content_view"},[t.title.length?n("v-uni-view",{staticClass:"uni-navbar__header-container-inner uni-navbar__content_view"},[t._v(t._s(t.title))]):t._e(),t._t("default")],2),n("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view",class:t.title.length?"uni-navbar__header-btns-right":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickRight.apply(void 0,arguments)}}},[t.rightIcon.length?n("v-uni-view",{staticClass:"uni-navbar__content_view"},[n("uni-icons",{attrs:{type:t.rightIcon,color:t.color,size:"24"}})],1):t._e(),t.rightText.length&&!t.rightIcon.length?n("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view"},[t._v(t._s(t.rightText))]):t._e(),t._t("right")],2)],1)],1),t.fixed?n("v-uni-view",{staticClass:"uni-navbar__placeholder"},[t.statusBar?n("uni-status-bar"):t._e(),n("v-uni-view",{staticClass:"uni-navbar__placeholder-view"})],1):t._e()],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"1b0a":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'.uni-navbar__content[data-v-bf6ac1ae]{display:block;position:relative;width:100%;background-color:#fff;overflow:hidden}.uni-navbar__content .uni-navbar__content_view[data-v-bf6ac1ae]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-navbar__header[data-v-bf6ac1ae]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:100%;height:44px;line-height:44px;font-size:16px}.uni-navbar__header-btns[data-v-bf6ac1ae]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-flex-shrink:0;flex-shrink:0;width:%?120?%;padding:0 %?12?%}.uni-navbar__header-btns[data-v-bf6ac1ae]:first-child{padding-left:0}.uni-navbar__header-btns[data-v-bf6ac1ae]:last-child{width:%?60?%}.uni-navbar__header-btns-right[data-v-bf6ac1ae]:last-child{width:%?120?%;text-align:right;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.uni-navbar__header-container[data-v-bf6ac1ae]{width:100%;margin:0 %?10?%}.uni-navbar__header-container-inner[data-v-bf6ac1ae]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?30?%}.uni-navbar__placeholder-view[data-v-bf6ac1ae]{height:44px}.uni-navbar--fixed[data-v-bf6ac1ae]{position:fixed;z-index:998}.uni-navbar--shadow[data-v-bf6ac1ae]{box-shadow:0 1px 6px #ccc}.uni-navbar--border[data-v-bf6ac1ae]:after{position:absolute;z-index:3;bottom:0;left:0;right:0;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#e5e5e5}',""]),t.exports=e},"1e9e":function(t,e,n){"use strict";n.r(e);var a=n("5d3f"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"2dbe":function(t,e,n){"use strict";var a=n("ee27");n("99af"),n("4160"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("d0ff")),r=a(n("2f50")),o=a(n("6375")),s=a(n("37de")),u={components:{commonList:r.default,loadMore:o.default,uniNavBar:s.default},data:function(){return{scrollH:600,scrollInto:"",tabIndex:0,tabBars:[],newsList:[]}},onNavigationBarSearchInputClicked:function(){uni.navigateTo({url:"../search/search?type=3"})},onNavigationBarButtonTap:function(){this.navigateTo({url:"../add-input/add-input"})},onLoad:function(){var t=this;uni.getSystemInfo({success:function(e){t.scrollH=e.windowHeight-uni.upx2px(101)}}),uni.$on("updateIndex",(function(){t.getData()})),this.getData(),uni.$on("updateFollowOrSupport",(function(e){switch(e.type){case"follow":t.follow(e.data.user_id);break;case"support":t.doSupport(e.data);break}}))},onUnload:function(){uni.$off("updateFollowOrSupport",(function(t){})),uni.$off("updateIndex",(function(t){}))},methods:{clickLeft:function(){},clickRight:function(){this.navigateTo({url:"../add-input/add-input"})},openSearch:function(){uni.navigateTo({url:"../search/search?type=3"})},getData:function(){var t=this;this.$H.get("/cat").then((function(e){t.tabBars=[{id:0,name:"全部"}].concat((0,i.default)(e));for(var n=0;n<t.tabBars.length;n++)t.newsList.push({loadmore:"上拉加载更多",list:[],page:1,firstLoad:!1});t.tabBars.length&&t.getList()}))},getList:function(){var t=this,e=this.tabIndex,n=this.tabBars[e].id,a=this.newsList[e].page,r=1===a;this.$H.get("/post_list?cid="+n+"&p="+a,{},{token:!0,noCheck:!0}).then((function(n){t.newsList[e].list=r?n:[].concat((0,i.default)(t.newsList[e].list),(0,i.default)(n)),t.newsList[e].loadmore=n.length<10?"没有更多了":"上拉加载更多",r&&(t.newsList[e].firstLoad=!0)})).catch((function(n){r||t.newsList[e].page--}))},onChangeTab:function(t){this.changeTab(t.detail.current)},changeTab:function(t){this.tabIndex!==t&&(this.tabIndex=t,this.scrollInto="tab"+t,this.newsList[this.tabIndex].firstLoad||this.getList())},follow:function(t){this.newsList[this.tabIndex].list.forEach((function(e){e.user_id===t&&(e.state.follow=!0)})),uni.showToast({title:"关注成功"})},doSupport:function(t){var e=this;this.newsList[this.tabIndex].list.forEach((function(n){if(n.id===t.id)if("support"===t.type){if(0===n.state.type)n.like_count++;else{if(2!==n.state.type)return e.$U.toast("已操作过哦");n.like_count++,n.unlike_count--}n.state.type=1}else{if(0===n.state.type)n.unlike_count++;else{if(1!==n.state.type)return e.$U.toast("已操作过哦");n.like_count--,n.unlike_count++}n.state.type=2}}));var n="support"===t.type?"顶":"踩";this.$U.toast(n+"成功")},loadmore:function(t){var e=this.newsList[t];"上拉加载更多"===e.loadmore&&(e.loadmore="加载中...",e.page++,this.getList())}}};e.default=u},"37de":function(t,e,n){"use strict";n.r(e);var a=n("19bd"),i=n("8c35");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("3ee0");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"bf6ac1ae",null,!1,a["a"],o);e["default"]=u.exports},"3ee0":function(t,e,n){"use strict";var a=n("c4ea"),i=n.n(a);i.a},4988:function(t,e,n){"use strict";var a=n("ca80"),i=n.n(a);i.a},"56e4":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-status-bar",style:{height:t.statusBarHeight}},[t._t("default")],2)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"59b8":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:["loadmore"]};e.default=a},"5bf6":function(t,e,n){"use strict";n.r(e);var a=n("56e4"),i=n("1e9e");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("4988");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"a9d4525a",null,!1,a["a"],o);e["default"]=u.exports},"5d3f":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=uni.getSystemInfoSync().statusBarHeight+"px",i={name:"UniStatusBar",data:function(){return{statusBarHeight:a}}};e.default=i},6375:function(t,e,n){"use strict";n.r(e);var a=n("f226"),i=n("ffb8");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"715ba14a",null,!1,a["a"],o);e["default"]=u.exports},"8c35":function(t,e,n){"use strict";n.r(e);var a=n("02f3"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"991f":function(t,e,n){"use strict";n.r(e);var a=n("0623"),i=n("bc29");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"a379e6cc",null,!1,a["a"],o);e["default"]=u.exports},"9a0e":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".uni-status-bar[data-v-a9d4525a]{display:block;width:100%;height:20px;height:0}",""]),t.exports=e},bc29:function(t,e,n){"use strict";n.r(e);var a=n("2dbe"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},c4ea:function(t,e,n){var a=n("1b0a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("9548c412",a,!0,{sourceMap:!1,shadowMode:!1})},ca80:function(t,e,n){var a=n("9a0e");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("43b677c6",a,!0,{sourceMap:!1,shadowMode:!1})},d0ff:function(t,e,n){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function i(t){if(Array.isArray(t))return a(t)}n.r(e);n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function r(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("fb6a"),n("25f0");function o(t,e){if(t){if("string"===typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){return i(t)||r(t)||o(t)||s()}n.d(e,"default",(function(){return u}))},f226:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"flex align-center justify-center py-3"},[n("v-uni-text",{staticClass:"font text-light-muted"},[t._v(t._s(t.loadmore))])],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},ffb8:function(t,e,n){"use strict";n.r(e);var a=n("59b8"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a}}]);
let getStoragePromise=function(e){let t=wx.getStorageSync(e);return t||{}},setStoragePromise=function(e,t){wx.setStorageSync(e,t)};class Storage{constructor(){this.local={},this.Session={},this.localStatus=!1}setLocal(e,t){this.local[e]=t;let a=getStoragePromise("FZ_EA_STROAGE");this.local=Object.assign({},a,this.local),this.localStatus=!0,setStoragePromise("FZ_EA_STROAGE",this.local)}getLocal(e){if(!this.localStatus){let e=getStoragePromise("FZ_EA_STROAGE");this.local=Object.assign(e,this.local),this.localStatus=!0}return e?this.local[e]:this.local}getUatLocal(e){return getStoragePromise("FZ_STROAGE")[e]}removeLocal(e){if("undefind"!==this.local[e]){delete this.local[e];let t=this.local;setStoragePromise("FZ_EA_STROAGE",t)}}likeRemoveLocal(e){for(let t in this.local)t.indexOf(e)>-1&&t!==e&&this.removeLocal(t)}}var Storage$1=new Storage;let config=wx.AnalysysAgentModalConfig;function getToday(){var e=new Date;return e.setTime(e.getTime()),e.getFullYear().toString()+(e.getMonth()+1).toString()+e.getDate().toString()}function getsdkVersion(){return"2.0.7"}function getUrlDomain(e){return e.split("?")[0]}function nowDate(){return+new Date+(Storage$1.getUatLocal("ANSSERVERTIME")?Number(Storage$1.getUatLocal("ANSSERVERTIME")):0)}function nowDateFormat(){return+new Date}function toFormat(e,t){let a=Number(e);return"hour"===t?60*a*60*1e3:"day"===t?24*a*60*60*1e3:void 0}function getConsole(e,t){config.isTest&&("info"===t?console.log(e):"error"===t&&console.warn(e))}function GetRandomNum(e,t){return e+Math.round(Math.random()*(t-e))}let login=(e,t,a)=>{let i=wx.AnalysysAgentModalConfig,o={sdkVersion:getsdkVersion(),appKey:i.appKey,os:{platform:"miniProgram",mac:"qaew",packageName:"com.analysys.eaApp"}};wx.request({url:i.configURL+"push/sdk/login",data:o,method:"POST",success({data:i}){if(0===Number(i.code)){getConsole("EA -- 登录成功","info"),Storage$1.setLocal("EATOKEN"+getToday(),i.token);let a=i.rule&&i.rule.dayDialogMaxCount,l=0===a?-99999:a-(Storage$1.getLocal(e+"DAYPOP"+getToday())||0);Storage$1.setLocal(i.token+e+getToday(),l);var o=Storage$1.getLocal();for(var s in o)if(s.indexOf("updateTime")>-1){Storage$1.setLocal("EAUSER",e);break}let n=!1;Storage$1.getLocal("updateTime"+e)?(Storage$1.getLocal("updateTime"+e).toString(),n=!(Storage$1.getLocal("updateTime"+e).toString()===(i.rule&&i.rule.activityUpdateTime).toString())):n=!0,n&&(Storage$1.likeRemoveLocal("ISGETMODALDATA"+e),Storage$1.setLocal("updateTime"+e,i.rule&&i.rule.activityUpdateTime)),t&&t(i,n)}else a&&a(),getConsole("EA -- 登录失败","error")},fail:()=>{a&&a()}})};var judeExpression=(e,t)=>{var a=!1,i=t.function,o=null,s=t.dataType;for(var l in e)l===t.field&&(o=e[l]);if("EQ"===i)a=!(-1===t.value.indexOf(o));else if("NOT_EQ"===i)a=!(-1!==t.value.indexOf(o));else if("CONTAIN"===i)for(var n=0,r=0;r<t.value.length;r++)o&&-1!==o.indexOf(t.value[r])&&(a=!0);else if("NOT_CONTAIN"===i)for(n=0,r=0;r<t.value.length;r++)-1===o.indexOf(t.value[r])&&n++,n===t.value.length&&(a=!0);else if("NOT_NULL"===i)switch(s){case"string":a=!!o;break;case"array":case"array<string>":a=!!o.length;break;default:a=!(null===o)}else if("NULL"===i)switch(s){case"string":a=!o;break;case"array":a=!o.length;break;case"array<string>":a=!!o.length;break;default:a=!(null!==o)}else if("LT"===i)for(r=0;r<t.value.length;r++)o<Number(t.value[r])&&(a=!0);else if("LTE"===i)for(r=0;r<t.value.length;r++)o<=Number(t.value[r])&&(a=!0);else if("GT"===i)for(r=0;r<t.value.length;r++)o>Number(t.value[r])&&(a=!0);else if("GTE"===i)for(r=0;r<t.value.length;r++)o>=Number(t.value[r])&&(a=!0);else if("TRUE"===i)a=!(!0!==o);else if("FALSE"===i)a=!(!1!==o);else if(("RELATIVE_TIME_RANGE_CUURENT"===i||"ABSOLUTE_TIME"===i)&&2===t.value.length&&null!==o){let e=t.value[0].replace(/-/g,"/"),i=t.value[1].replace(/-/g,"/"),s=o.replace(/-/g,"/");new Date(e).getTime()<=new Date(s).getTime()<=new Date(i).getTime()&&(a=!0)}return a};class Event{constructor(){this._listeners={},this.pageKey=null}_setListeners(e,t,a=0){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e]&&"function"==typeof t&&this._listeners[e].push({fn:t,isOnce:a})}on(e,t){this._setListeners(e,t)}once(e,t){this._setListeners(e,t,1)}emit(e,...t){let a=this._listeners[e];return!!a&&(a.forEach((e,i)=>{"function"==typeof e.fn&&e.fn(...t),e.isOnce&&a.splice(i,1)}),!0)}off(e,t){if(!arguments.length)return this._listeners={};let a=this._listeners[e];if("function"==typeof t){for(let i=0,o=a.length;i<o;i++)if(a[i].fn===t){this._listeners[e].splice(i,1);break}}else delete this._listeners[e]}setPageKey(e){this.pageKey=e}}var Event$1=new Event;let config$1=wx.AnalysysAgentModalConfig;class AnsModal{constructor(){getConsole("EA -- ansModal 引入成功，请继续集成<ans-modal/>在您需要的页面中.","info"),this.userId=null,this.token=null,this.updateTime=null,this.countDown=0,this.failTimes=0,this.inappFailTimes=0,this.isFetchData=!1,this.isFetchSubscribeData=!1,this.isDealModalData=!1,this.queueData=[],this.queueSubscribeData=[],this.currentEvent=[],this.interval=null}static getInstance(){return this.ansModal||(this.ansModal=new AnsModal)}init(e){if(!e||0===e.length)return;let t=!1;for(let a=0;a<e.length;a++)"$startup"===e[a].xwhat&&(t=!0);if(this.inappFailTimes>0&&this.failTimes>this.inappFailTimes&&(this.failTimes=this.inappFailTimes),t&&(this.failTimes=0,this.countDown=0),this.failTimes>3||this.countDown>0)return;for(let t=0;t<e.length;t++)if("$profile_set"===e[t].xwhat){this.postUserInfo(e[t]);break}if(this.isFetchData){for(let t=0;t<e.length;t++)this.queueData.push(e[t]),this.queueSubscribeData.push(e[t]);return}let a=JSON.parse(JSON.stringify(e)),i=Storage$1.getLocal("EATOKEN"+getToday()),o=a&&a[0]&&a[0].xwho;o&&(t||!i||o!==this.userId?(this.isFetchData=!0,login(o,(e,t)=>{this.failTimes=0,this.userId=o,this.token=e.token,t?(this.fetchAnsModal(a),this.fetchSubscribeData(a)):(this.isFetchData=!1,this.getStorageModalData(a),this.getSubscribeData(a))},()=>{this.isFetchData=!1,this.dealServerError()})):(this.userId=o,this.token=i,this.getStorageModalData(a),this.getSubscribeData(a)))}dealServerError(){if(this.failTimes++,this.failTimes>=4)return;this.countDown=GetRandomNum(1,60*this.failTimes);let e=()=>{this.countDown<=0?clearInterval(this.interval):this.countDown--};this.interval=setInterval(()=>{e()},1e3),e()}getStorageModalData(e){this.updateTime=Storage$1.getLocal("updateTime"+this.userId);let t=[];Storage$1.getLocal("ISGETMODALDATA"+this.userId+this.updateTime)?(getConsole("EA -- 成功获取弹窗配置","info"),t=Storage$1.getLocal("POPMODALDATA"+this.userId),t&&t.length!==[]&&this.judeEvents(e,t)):(this.isFetchData=!0,this.fetchAnsModal(e))}fetchAnsModal(e){if(this.failTimes>3||this.countDown>0)return;let t={token:this.token,os:{platform:"miniProgram"},userId:this.userId,newUser:Storage$1.getLocal("EAUSER")?1:0},a=this;this.updateTime=Storage$1.getLocal("updateTime"+this.userId),wx.request({url:config$1.configURL+"push/sdk/in_app",data:t,method:"POST",success({data:t}){if(0!==Number(t.code))return getConsole("EA -- 拉取弹窗信息失败","error"),a.isFetchData=!1,a.dealServerError(),void a.inappFailTimes++;a.failTimes=0,getConsole("EA -- 成功拉取弹窗信息","info");let i=t.data,o=i.length;if(o>0){let t=[];for(let e=0;e<o;e++)t.push({$dialog_type:0,activityId:i[e].id});a.currentEvent=e,a.upLoadEvent("$pullDialog",t,!0)}a.isFetchData=!1,Storage$1.setLocal("ISGETMODALDATA"+a.userId+a.updateTime,!0),Storage$1.setLocal("POPMODALDATA"+a.userId,i),a.judeEvents(e,i),a.queueData.length>0&&(a.judeEvents(a.queueData,i),a.queueData=[])},fail:()=>{a.isFetchData=!1,a.dealServerError(),a.inappFailTimes++}})}judeEvents(e,t){let a=Storage$1.getLocal(this.token+this.userId+getToday());if(!(-99999!==a&&a<=0)){this.isDealModalData=!0;for(var i=0;i<t.length;i++){var o=t[i];if(o.dialogRule){if(o.dialogRule&&o.dialogRule.length>0){var s=Storage$1.getLocal("EAPOPEVENTTYPE"+o.id+this.userId),l=null;for(let e=0;e<o.dialogRule.length;e++)o.dialogRule[e].eventType===s&&(l=o.dialogRule[e]);if(l){if(1===l.type)continue;{if(2===l.type){let e=Storage$1.getLocal(o.id+"POPUPTIMES")||0;if(l.count-e<=0)continue}let e=toFormat(l.intervalValue,l.intervalType),t=Storage$1.getLocal("EAPOPNOWFORMAT"+o.id)||0,a=nowDateFormat();if(t&&a<t+e)continue}}}}else{if(0===(1===o.closeDialogType?Storage$1.getLocal("EAPOP"+o.id+getToday()):Storage$1.getLocal("EAPOP"+o.id)))continue;if(0!==o.count){let e=Storage$1.getLocal(o.id+"POPUPTIMES")||0;if(o.count-e<=0)continue}}let a=getCurrentPages(),d=a[a.length-1].route;for(var n=0;n<e.length;n++){var r=e[n],c=Storage$1.getLocal("PREEVENTINDEXS"+o.id)||0;if(!o.event||o.preEvent||o.preEvents||o.event.xwhat===r.xwhat&&this.judeTriggerProps(r,o.event,()=>{this.currentEvent=[r],Event$1.emit("setVisible"+d,o),this.isDealModalData=!1}),o.event&&o.preEvent){var g=null;for(var h in r.xcontext)"$session_id"===h&&(g=r.xcontext[h]);var u=Storage$1.getLocal("isTriggerPreEvent"+o.id+g);u&&o.event.xwhat===r.xwhat?this.judeTriggerProps(r,o.event,()=>{this.currentEvent=[r],Event$1.emit("setVisible"+d,o),this.isDealModalData=!1}):o.preEvent.xwhat!==r.xwhat||u||this.judeTriggerProps(r,o.preEvent,()=>{Storage$1.setLocal("isTriggerPreEvent"+o.id+g,!0),this.isDealModalData=!1})}o.preEvents&&o.preEvents.length>0&&o.event&&(o.event.xwhat===r.xwhat&&c===o.preEvents.length?this.judeTriggerProps(r,o.event,()=>{this.currentEvent=[r],Event$1.emit("setVisible"+d,o),Storage$1.setLocal("PREEVENTINDEXS"+o.id,0),this.isDealModalData=!1}):o.preEvents.length>c&&o.preEvents[c].xwhat===r.xwhat&&this.judeTriggerProps(r,o.preEvents[c],()=>{Storage$1.setLocal("PREEVENTINDEXS"+o.id,c+1)})),o.preEvents&&!o.event&&o.preEvents.length>c&&o.preEvents[c].xwhat===r.xwhat&&this.judeTriggerProps(r,o.preEvents[c],()=>{c+1===o.preEvents.length?(this.currentEvent=[r],Event$1.emit("setVisible"+d,o),Storage$1.setLocal("PREEVENTINDEXS"+o.id,0),this.isDealModalData=!1):Storage$1.setLocal("PREEVENTINDEXS"+o.id,c+1)}),!o.event&&o.preEvent&&o.preEvent.xwhat===r.xwhat&&this.judeTriggerProps(r,o.preEvent,()=>{this.currentEvent=[r],Event$1.emit("setVisible"+d,o),this.isDealModalData=!1})}}Storage$1.setLocal("POPMODALDATA"+this.userId,t)}}getSubscribeData(e){let t=[];Storage$1.getLocal("ISSUBSCRIBEDATA"+this.userId+this.updateTime)?(getConsole("EA -- 成功获取订阅配置","info"),t=Storage$1.getLocal("POPSUBSCRIBEDATA"+this.userId),t&&t.length&&this.upLoadTriggerEvent(e,t)):(this.isFetchSubscribeData=!0,this.fetchSubscribeData(e))}fetchSubscribeData(e){if(this.failTimes>3||this.countDown>0)return;let t={token:this.token,os:{platform:"miniProgram",brand:""},sdkVersion:this.sdkVersion,userId:this.userId,newUser:Storage$1.getLocal("EAUSER")?1:0},a=this;Storage$1.setLocal("EAUSER",this.userId),wx.request({url:config$1.configURL+"push/sdk/event/subscribe",data:t,method:"POST",success({data:t}){if(0!==Number(t.code))return getConsole("EA -- 拉取订阅信息失败","error"),a.isFetchSubscribeData=!1,a.dealServerError(),void a.inappFailTimes++;a.failTimes=0,getConsole("EA -- 成功订阅弹窗信息","info");let i=t.data,o=i.length;if(a.isFetchSubscribeData=!1,Storage$1.likeRemoveLocal("ISSUBSCRIBEDATA"+a.userId),Storage$1.setLocal("ISSUBSCRIBEDATA"+a.userId+a.updateTime,!0),Storage$1.setLocal("POPSUBSCRIBEDATA"+a.userId,i),o>0){let t=[...e];a.queueSubscribeData.length>0&&(t=[...a.queueSubscribeData,...t],a.queueSubscribeData=[]),a.upLoadTriggerEvent(t,i)}},fail:()=>{a.isFetchData=!1}})}upLoadTriggerEvent(e,t){let a=[];for(let i=0;i<t.length;i++){let o=t[i],s=o.endTime.replace(/-/g,"/");if(s=new Date(s).getTime(),!(s<nowDate()))for(let t=0;t<e.length;t++){let i=e[t];o.event.xwhat===i.xwhat&&this.judeTriggerProps(i,o.event,(function(){for(var e=!0,t=0;t<a.length;t++)a[t].xwhat===i.xwhat&&(e=!1);e&&a.push(i)}))}}if(a.length){var i={token:Storage$1.getLocal("EATOKEN"+getToday()),os:{platform:"miniProgram",brand:""},sdkVersion:getsdkVersion(),userId:this.userId,newUser:Storage$1.getLocal("EAUSER")?1:0,events:a};wx.request({url:config$1.configURL+"push/sdk/event/trigger",data:JSON.stringify(i),method:"POST",success(){getConsole("EA -- 上报成功","info")},error(){getConsole("EA -- 上报错误","error")}})}}upLoadEvent(e,t,a=!1){let i={xcontext:{}},o={},s=["$lib","$lib_version","$os","$os_version","$platform","$is_login","$brand","$model","$debug"];for(var l in this.currentEvent.length>0&&(i=this.currentEvent[0]),i.xcontext)-1!==s.indexOf(l)&&(o[l]=i.xcontext[l]),"$lib_version"===l&&(o[l]=getsdkVersion());var n={token:Storage$1.getLocal("EATOKEN"+getToday()),os:{platform:"miniProgram"},sdkVersion:getsdkVersion(),userId:this.userId,events:[{xwho:this.userId,xwhen:nowDate(),xwhat:e,xcontext:Object.assign(t,o)}]};if(a){n.events=[];for(let a=0;a<t.length;a++)n.events.push({xwho:this.userId,xwhen:nowDate(),xwhat:e,xcontext:Object.assign(t[a],o)})}wx.request({url:config$1.configURL+"push/sdk/in_app/callback",data:JSON.stringify(n),method:"POST",success(){getConsole("EA -- 上报成功","info")},error(){getConsole("EA -- 上报错误","error")}})}judeTriggerProps(e,t,a){let i=!1;if(t.rule&&0!==t.rule.length){let a=0,o=t.rule.length;for(let s=0;s<o;s++){judeExpression(e.xcontext,t.rule[s])&&a++,a===o&&(i=!0)}}else i=!0;if(("{}"===JSON.stringify(t.xcontext)||null===t.xcontext)&&i)return void(a&&a());let o=0;for(let e in t.xcontext)o++;for(let s in t.xcontext){let l=0,n="$url_domain"===s?getUrlDomain(t.xcontext[s]):t.xcontext[s];for(let t in e.xcontext){let r=!("$url"!==t||"$url_domain"!==s),c=r?getUrlDomain(e.xcontext[t]):e.xcontext[t];s!==t&&!r||n!==c||(l++,l===o&&i&&a&&a())}}}setUserId(e){this.userId=e}dealModalPopNum(e,t){let a=Storage$1.getLocal(this.userId+"DAYPOP"+getToday())||0;Storage$1.likeRemoveLocal(this.userId+"DAYPOP"),Storage$1.setLocal(this.userId+"DAYPOP"+getToday(),a+1);let i=Storage$1.getLocal(this.token+this.userId+getToday());-99999!==i&&(Storage$1.likeRemoveLocal(this.token+this.userId),Storage$1.setLocal(this.token+this.userId+getToday(),i-1));let o=Storage$1.getLocal(e.id+"POPUPTIMES")||0;if(Storage$1.setLocal(e.id+"POPUPTIMES",o+1),e.dialogRule){let a=null;for(let i=0;i<e.dialogRule.length;i++)if(e.dialogRule[i].eventType===t){a=e.dialogRule[i];break}if(a){Storage$1.setLocal("EAPOPEVENTTYPE"+e.id+this.userId,t);let a=nowDateFormat();Storage$1.setLocal("EAPOPNOWFORMAT"+e.id,a)}}else{var s=e.closeDialogType;1===Number(s)?(Storage$1.likeRemoveLocal("EAPOP"+e.id),Storage$1.setLocal("EAPOP"+e.id+getToday(),0)):Storage$1.setLocal("EAPOP"+e.id,0)}}postUserInfo(e){if(!e.xcontext.openid||!e.xcontext.unionid||!e.xcontext.wx_appid)return;let t=this,a=0,i=()=>{t.token?(()=>{let a={token:t.token,appId:e.xcontext.wx_appid,openId:e.xcontext.openid,unionId:e.xcontext.unionid,xwho:e.xwho,serviceType:3};wx.request({url:config$1.configURL+"push/wechat/user/profile",data:JSON.stringify(a),method:"POST",success(){getConsole("EA -- 用户信息上报成功","info")},error(){getConsole("EA -- 用户信息上报错误","error")}})})():(a++,setTimeout(()=>{a<60?i():getConsole("EA -- 用户数据上报接口异常","error")},100))};i()}}const ansModal=AnsModal.getInstance();wx.AnalysysModal=e=>{wx.AnalysysAgentModalConfig&&wx.AnalysysAgentModalConfig.appKey&&wx.AnalysysAgentModalConfig.configURL?ansModal.init(e,Event$1.pageKey):console.warn("EA -- 请设置弹窗配置appKey和configURL")},Component({data:{visible:!1,popupData:{},cacheData:[],imgHeight:0,imgWidth:0,currentPage:null,navigateParams:{target:"self",appId:"",path:""}},attached(){let e=getCurrentPages();this.currentPage=e[e.length-1].route,Event$1.on("setVisible"+this.currentPage,e=>{if(this.data.visible){let t=!1;for(let a=0;a<this.data.cacheData.length;a++)if(this.data.cacheData[a].id===e.id){t=!0;break}e.id===this.data.popupData.id&&(t=!0),t||this.data.cacheData.unshift(e)}else this.dealData(e)})},detached(){this.hideModal()},methods:{dealData(e){this.dealPicInfo(e.picInfo),this.setData({popupData:e,visible:!0}),ansModal.upLoadEvent("$impDialog",{activityId:e.id,$dialog_type:1})},dealPicInfo(e){if(e){let t,a,i=wx.getSystemInfoSync();.8*i.windowWidth<e.width?(t=(.8*i.windowWidth/e.width*e.height).toFixed(3),a=.8*i.windowWidth):(a=e.width,t=e.height),this.setData({imgHeight:t,imgWidth:a})}else{let e=wx.getSystemInfoSync().SDKVersion.replace(/\./g,"");Number(e)<210&&this.setData({imgHeight:400,imgWidth:400})}},hideModal(){this.setData({visible:!1});let e=Storage$1.getLocal(ansModal.token+ansModal.userId+getToday());if(-99999!==e&&e<=0)return;let t=this.data.cacheData.length;t>0&&(this.dealData(this.data.cacheData[t-1]),this.data.cacheData.pop())},handleClick(e,t,a){let i=this.data.popupData;i.id?(ansModal.upLoadEvent(t,{activityId:i.id.toString(),$dialog_type:a}),ansModal.dealModalPopNum(i,{$closeDialog:"close",$clickDialog:"click"}[t]),this.hideModal()):this.hideModal()},handleClose(){this.handleClick("","$closeDialog",3)},handleLeftClick(){this.handleClick(this.data.popupData&&this.data.popupData.buttonLeft.clickEvent,"$clickDialog",4)},handleRightClick(){this.handleClick(this.data.popupData&&this.data.popupData.buttonRight.clickEvent,"$clickDialog",5)},handleMiddleClick(){this.handleClick(this.data.popupData&&this.data.popupData.buttonMiddle.clickEvent,"$clickDialog",6)},onImageClick(e){if(0===e.currentTarget.dataset.type){let e=this.data.popupData&&this.data.popupData.clickEvent;this.handleClick(e,"$clickDialog",2)}else ansModal.upLoadEvent("$clickDialog",{activityId:this.data.popupData.id.toString(),$dialog_type:2})},onImageError(){this.hideModal()},onImageLoad(e){!this.data.popupData&&this.data.popupData.picInfo&&this.dealPicInfo(e.detail)},jumpToSelfPage(e){e.clickEvent&&wx.navigateTo({url:e.clickEvent,fail:function(){wx.switchTab({url:e.clickEvent})}})},jumpToOtherMiniPage(e){e.clickAppId&&e.clickEvent&&wx.navigateToMiniProgram({appId:e.clickAppId,path:e.clickEvent,success:function(e){console.log(e)}})},jumpToPublicArticle(e){e.clickEvent?wx.AnalysysAgentModalConfig.publicWebviewUrl?wx.navigateTo({url:`${wx.AnalysysAgentModalConfig.publicWebviewUrl}?url=${e.clickEvent}`,fail:function(){wx.switchTab({url:`${wx.AnalysysAgentModalConfig.publicWebviewUrl}?url=${e.clickEvent}`})}}):console.warn("请配置跳转公众号的容器页面地址publicWebviewUrl(eg. /pages/webView/webView"):console.log("跳转地址为空，如需跳转请配置地址")},handleCoverClick:function(e){const t=e.target.dataset.elm,a=this.data.popupData;if(!t)return;let i=a[t]?a[t]:{clickAppId:a.clickAppId,clickEvent:a.clickEvent,clickType:a.clickType};switch(1===i.clickType&&i.clickEvent&&"/"!==i.clickEvent.charAt(0)&&(i.clickEvent="/"+i.clickEvent),i.clickType){case 1:this.jumpToSelfPage(i);break;case 2:this.jumpToOtherMiniPage(i);break;case 3:this.jumpToPublicArticle(i);break;default:console.warn("please check type=",i.clickType)}}},bindSuccess(e){console.log(e)},bindFail(e){console.log(e)}});
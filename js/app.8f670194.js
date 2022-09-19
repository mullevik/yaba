(function(){"use strict";var e={2547:function(e,n,t){var o=t(9242),a=t(3396);function l(e,n,t,o,l,i){const s=(0,a.up)("NavigationComponent"),r=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(s),(0,a.Wm)(r)],64)}function i(e,n,t,o,l,i){const s=(0,a.up)("font-awesome-icon"),r=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("nav",null,[(0,a.Wm)(r,{to:{name:"home"}},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{icon:"fa-solid fa-table-list"})])),_:1}),(0,a._)("a",null,[(0,a.Wm)(s,{icon:"fa-solid fa-chart-bar"})]),(0,a._)("a",null,[(0,a.Wm)(s,{icon:"fa-solid fa-chart-line"})]),(0,a.Wm)(r,{to:{name:"settings"}},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{icon:"fa-solid fa-gear"})])),_:1})])}var s={name:"NavigationComponent"},r=t(89);const c=(0,r.Z)(s,[["render",i],["__scopeId","data-v-24927336"]]);var u=c,m={name:"App",components:{NavigationComponent:u}};const d=(0,r.Z)(m,[["render",l]]);var p=d,b=t(5431);(0,b.z)("/yaba/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var g=t(3494),f=t(7749),h=t(8539),v=t(2483),L=t(7139);const y=e=>((0,a.dD)("data-v-79624daf"),e=e(),(0,a.Cn)(),e),_={key:0,style:{position:"relative",top:"2em"}},S=(0,a.Uk)("No past submissions... "),w=["onClick"],E={class:"labels"},O={class:"date"},N={class:"amount"},D=y((()=>(0,a._)("div",{style:{height:"7.5em"}},null,-1))),C={class:"buttons"},k=(0,a.Uk)(" New expense ");function A(e,n,t,l,i,s){const r=(0,a.up)("LabelComponent"),c=(0,a.up)("PendingLogs"),u=(0,a.up)("font-awesome-icon"),m=(0,a.up)("SubmitBudgetLogComponent");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.wy)((0,a._)("div",null,[(0,a._)("section",null,[i.pastLogs.length<1?((0,a.wg)(),(0,a.iD)("span",_,[S,(0,a._)("i",null,[(0,a._)("a",{href:"#",onClick:n[0]||(n[0]=(...e)=>s.onNewSubmit&&s.onNewSubmit(...e))},"add new expense")])])):((0,a.wg)(!0),(0,a.iD)(a.HY,{key:1},(0,a.Ko)(i.pastLogs,((e,n)=>((0,a.wg)(),(0,a.iD)("div",{class:"budget-log-item",key:n,onClick:e=>s.selectPastLog(n)},[(0,a._)("div",E,[(0,a._)("span",O,(0,L.zw)(e.pending?"pending":new Date(1e3*e.unixTimestamp).toLocaleDateString()),1),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.labels,((e,n)=>((0,a.wg)(),(0,a.j4)(r,{name:e,color:s.getLabelColor(e),key:n,clickable:!0,miniature:!0},null,8,["name","color"])))),128))]),(0,a._)("span",N,(0,L.zw)(e.amount)+" "+(0,L.zw)(e.currency.toUpperCase()),1)],8,w)))),128)),D]),(0,a._)("section",C,[(0,a.Wm)(c),(0,a._)("button",{class:"primary",onClick:n[1]||(n[1]=(...e)=>s.onNewSubmit&&s.onNewSubmit(...e))},[(0,a.Wm)(u,{icon:"fa-solid fa-circle-plus"}),k])])],512),[[o.F8,!i.formOpen_]]),i.formOpen_?((0,a.wg)(),(0,a.j4)(m,{key:0,"past-log":i.selectedPastLog,onOnSubmitDone:s.onSubmitDone},null,8,["past-log","onOnSubmitDone"])):(0,a.kq)("",!0)],64)}const T={GREEN:"#78ca68ff",RED:"#ca6870ff",BLUE:"#6889caff",CYAN:"#68cac7ff",YELLOW:"#c6ca68ff",PINK:"#ca68b4ff",BROWN:"#ca9368ff",MAGENTA:"#9468caff",GRAY:"#cacacaff"},P=[{name:"groceries",color:T.MAGENTA},{name:"fuel",color:T.BROWN},{name:"rent",color:T.BLUE},{name:"restaurant",color:T.RED},{name:"food",color:T.YELLOW},{name:"alcohol",color:T.MAGENTA},{name:"entertainment",color:T.PINK},{name:"sport",color:T.GREEN},{name:"drugstore",color:T.BLUE},{name:"accommodation",color:T.BLUE},{name:"pharmacy",color:T.GREEN},{name:"public-transport",color:T.BROWN},{name:"subscription",color:T.CYAN},{name:"traveling",color:T.MAGENTA},{name:"clothes",color:T.PINK},{name:"music",color:T.PINK},{name:"home",color:T.BLUE},{name:"fast-food",color:T.RED},{name:"patisserie",color:T.PINK},{name:"video-games",color:T.MAGENTA},{name:"technology",color:T.CYAN},{name:"outdoor",color:T.BROWN},{name:"new",color:T.GREEN},{name:"barber",color:T.BROWN},{name:"optic",color:T.GREEN}];function I(e,n,t,o,l,i){return(0,a.wg)(),(0,a.iD)("span",{style:(0,L.j5)(i.cssVars)},[(0,a.Uk)((0,L.zw)(t.name)+" ",1),t.removable?((0,a.wg)(),(0,a.iD)("button",{key:0,onClick:n[0]||(n[0]=n=>e.$emit("onRemove"))},"X")):(0,a.kq)("",!0)],4)}const B=T.GRAY;var G={name:"LabelComponent",props:{name:{required:!0,type:String},color:{default:B,type:String},removable:{default:!1,type:Boolean},clickable:{type:Boolean,default:!0},miniature:{type:Boolean,default:!1}},emits:["onRemove"],computed:{cssVars(){return{"--bg":this.color?this.color:B,"--right-padding":this.removable?"0.3em":"0.8em","--cursor":this.clickable?"pointer":"default","--font-size":this.miniature?"0.7em":"1em"}}}};const U=(0,r.Z)(G,[["render",I],["__scopeId","data-v-5c7c7db2"]]);var x=U;const V=e=>((0,a.dD)("data-v-57be09aa"),e=e(),(0,a.Cn)(),e),W={class:"amount-section"},R=V((()=>(0,a._)("option",{value:"CZK",selected:""},"CZK",-1))),K=V((()=>(0,a._)("option",{value:"EUR"},"EUR",-1))),j=[R,K],Y=["disabled"],$={key:0},M={key:1},Z=(0,a.Uk)(" Submit");function F(e,n,t,l,i,s){const r=(0,a.up)("SelectedLabelsComponent"),c=(0,a.up)("AvailableLabelsComponent"),u=(0,a.up)("font-awesome-icon");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(r,{modelValue:i.selectedLabels,"onUpdate:modelValue":n[0]||(n[0]=e=>i.selectedLabels=e),class:"selected-labels-section",style:(0,L.j5)(s.cssVars)},null,8,["modelValue","style"]),(0,a.Wm)(c,{modelValue:i.availableLabels,"onUpdate:modelValue":n[1]||(n[1]=e=>i.availableLabels=e),onOnLabelSelected:this.selectLabel,class:"available-labels-section",style:(0,L.j5)(s.cssVars)},null,8,["modelValue","onOnLabelSelected","style"]),(0,a._)("div",W,[(0,a.wy)((0,a._)("input",{ref:"inputAmount",type:"number",name:"amount",id:"input-amount","onUpdate:modelValue":n[2]||(n[2]=e=>i.amount=e),placeholder:"0"},null,512),[[o.nr,i.amount]]),(0,a.wy)((0,a._)("select",{name:"currency",id:"input-currency",form:"main-form","onUpdate:modelValue":n[3]||(n[3]=e=>i.currency=e)},j,512),[[o.bM,i.currency]]),(0,a._)("button",{style:(0,L.j5)(s.cssVars),disabled:!i.ableToSubmit,onClick:n[4]||(n[4]=(...e)=>s.submitAmount&&s.submitAmount(...e)),class:"primary"},[i.pendingSubmit?((0,a.wg)(),(0,a.iD)("span",$,[(0,a.Wm)(u,{icon:"fa-solid fa-spinner",spin:""})])):((0,a.wg)(),(0,a.iD)("span",M,[(0,a.Wm)(u,{icon:"fa-solid fa-paper-plane"}),Z]))],12,Y)]),(0,a._)("div",{class:"under-amount-section-filler",style:(0,L.j5)(s.cssVars)},null,4)],64)}function z(e,n,t){return{unixTimestamp:Math.floor((new Date).getTime()/1e3),amount:e,currency:n,labels:t}}t(1703);var H=t(1373);const J=(0,H.Z)(),q={NEW_BUDGET_LOG_STORED:"NEW_BUDGET_LOG_STORED"};function X(){J.emit(q.NEW_BUDGET_LOG_STORED)}function Q(e){J.on(q.NEW_BUDGET_LOG_STORED,e)}var ee=t(4806),ne=t.n(ee);const te={API_KEY:"API_KEY",API_ENDPOINT:"ENDPOINT",BUDGET_LOGS:"BUDGET_LOGS",PAST_LABELS:"PAST_LABELS"},oe=20,ae=40;function le(e){console.log(`LOCAL_STORAGE_UTILS ${e}`)}function ie(){return localStorage.getItem(te.API_KEY)}function se(e){le(`Setting API KEY: ${e}`),localStorage.setItem(te.API_KEY,e)}function re(){return localStorage.getItem(te.API_ENDPOINT)}function ce(e){return le(`Setting API Endpoint: ${e}`),localStorage.setItem(te.API_ENDPOINT,e)}function ue(){const e=localStorage.getItem(te.BUDGET_LOGS);return null===e||""==e?[]:JSON.parse(e)}function me(){const e=localStorage.getItem(te.PAST_LABELS);return null==e||""==e?[]:JSON.parse(e)}function de(e){localStorage.setItem(te.PAST_LABELS,JSON.stringify([...e,...me()].slice(0,ae)))}function pe(){const e={};for(const[n,t]of me().entries())t in e?e[t]+=1/(n+1):e[t]=1/(n+1);return e}function be(e){const n=ue();n.unshift(e);const t=n.filter((e=>!e.pending));if(!e.pending&&t.length>=oe){let e=0;for(const[t,o]of n.entries)o.pending||(e=t);n.splice(e,1)}localStorage.setItem(te.BUDGET_LOGS,JSON.stringify(n)),de(e.labels),X()}function ge(e){const n=ue(),t=n.findIndex((n=>ne().isEqual(n,e)));return t<0?(le(`BudgetLog ${e} not found in pending budget logs and thus can not be removed.`),n):(n.splice(t,1),localStorage.setItem(te.BUDGET_LOGS,JSON.stringify(n)),X(),n)}function fe(e){console.log(`API ${e}`)}function he(e,n){return{api_key:n,unix_timestamp:e.unixTimestamp,amount:e.amount,currency:e.currency,labels:e.labels.join(", ")}}function ve(e){const n=re();null!==n&&""!=n||(fe("no endpoint"),Promise.reject(new Error("No API Endpoint set in client settings")));const t=ie();null!==t&&""!=t||(fe("no api key"),Promise.reject(new Error("No API_KEY set in client settings.")));const o=JSON.stringify(he(e,t));return fe(`sending ${o} to ${n}`),fetch(n,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},redirect:"follow",body:o}).then((e=>{if(fe(`received response with status ${e.status}`),!e.ok){const n=new Error("Received non-2xx response from API");throw n.response=e,n}return e.json()})).then((e=>{if(fe(`received response body ${JSON.stringify(e)}`),!("status"in e)||"ok"!=e["status"])throw new Error("status == ok not found in response body");return e}))}const Le=e=>((0,a.dD)("data-v-00a2ecdd"),e=e(),(0,a.Cn)(),e),ye=Le((()=>(0,a._)("div",null,[(0,a._)("h3",null,"Selected labels")],-1))),_e={class:"labels"};function Se(e,n,t,o,l,i){const s=(0,a.up)("LabelComponent"),r=(0,a.up)("FreeTextLabelComponent");return(0,a.wg)(),(0,a.iD)("section",null,[ye,(0,a._)("div",_e,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.modelValue,((e,n)=>((0,a.wg)(),(0,a.j4)(s,{key:n,name:e.name,color:e.color,removable:!0,onOnRemove:e=>this.removeLabel(n)},null,8,["name","color","onOnRemove"])))),128)),(0,a.Wm)(r,{placeholder:i.placeholder,onOnLabelSubmit:this.addLabel},null,8,["placeholder","onOnLabelSubmit"])])])}const we=["placeholder"];function Ee(e,n,t,l,i,s){return(0,a.wg)(),(0,a.iD)("span",null,[(0,a.wy)((0,a._)("input",{type:"text",placeholder:t.placeholder,"onUpdate:modelValue":n[0]||(n[0]=e=>i.text=e)},null,8,we),[[o.nr,i.text]])])}var Oe={name:"FreeTextLabelComponent",props:{placeholder:{default:"... or type a custom label",type:String}},emits:["onLabelSubmit"],data(){return{text:""}},watch:{text(e){e.trim().length>1&&e.endsWith(" ")&&(this.$emit("onLabelSubmit",e.trim()),this.text="")}}};const Ne=(0,r.Z)(Oe,[["render",Ee],["__scopeId","data-v-936d1222"]]);var De=Ne,Ce={name:"SelectedLabelsComponent",components:{LabelComponent:x,FreeTextLabelComponent:De},props:["modelValue"],emits:["update:modelValue"],computed:{placeholder(){return this.modelValue.length>0?"... or type a custom label":"choose labels or start typing"}},methods:{removeLabel(e){this.$emit("update:modelValue",this.modelValue.filter(((n,t)=>t!=e)))},addLabel(e,n=null){const t=this.modelValue.map((e=>e));t.push({name:e,color:n}),this.$emit("update:modelValue",t)}}};const ke=(0,r.Z)(Ce,[["render",Se],["__scopeId","data-v-00a2ecdd"]]);var Ae=ke;const Te=e=>((0,a.dD)("data-v-6b9ab060"),e=e(),(0,a.Cn)(),e),Pe=Te((()=>(0,a._)("h3",null,"Available labels",-1))),Ie=["value"],Be={class:"labels"};function Ge(e,n,t,o,l,i){const s=(0,a.up)("LabelComponent");return(0,a.wg)(),(0,a.iD)("section",null,[(0,a._)("div",null,[Pe,(0,a._)("input",{type:"text",placeholder:"search labels",value:l.searchText,onInput:n[0]||(n[0]=e=>l.searchText=e.target.value)},null,40,Ie)]),(0,a._)("div",Be,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.filteredLabels,((e,n)=>((0,a.wg)(),(0,a.j4)(s,{key:n,name:e.name,color:e.color,clickable:!0,onClick:n=>this.$emit("onLabelSelected",e.name)},null,8,["name","color","onClick"])))),128))])])}t(6699);var Ue={name:"AvailableLabels",components:{LabelComponent:x},props:["modelValue"],emits:["update:modelValue","onLabelSelected"],computed:{sortedLabels(){return[...this.modelValue].sort(((e,n)=>e.name.localeCompare(n.name))).sort(((e,n)=>{const t=e.name in this.labelScoreMap?this.labelScoreMap[e.name]:0,o=n.name in this.labelScoreMap?this.labelScoreMap[n.name]:0;return t<o?1:t>o?-1:0}))},filteredLabels(){return this.sortedLabels.filter((e=>e.name.toLowerCase().includes(this.searchText.toLocaleLowerCase())))}},data(){return{searchText:"",labelScoreMap:pe()}}};const xe=(0,r.Z)(Ue,[["render",Ge],["__scopeId","data-v-6b9ab060"]]);var Ve=xe;function We(){return P}var Re={name:"SubmitBudgetLogComponent",components:{SelectedLabelsComponent:Ae,AvailableLabelsComponent:Ve},props:{pastLog:{type:Object,default(){return{amount:null,currency:"czk",labels:[]}}}},emits:["onSubmitDone"],data(){return{amount:null,currency:"CZK",selectedLabels:[],availableLabels:We(),ableToSubmit:!1,pendingSubmit:!1}},mounted(){this.$refs.inputAmount.focus(),this.currency=this.pastLog.currency.toUpperCase();const e=[],n=this.availableLabels.map((e=>e.name));for(const t of this.pastLog.labels){const o=n.indexOf(t);o>=0?e.push({name:t,color:this.availableLabels[o].color}):e.push({name:t,color:null})}this.selectedLabels=e},computed:{cssVars(){return{"--selected-labels-section-height":"5em","--amount-section-height":"20em"}}},watch:{amount:function(e){this.ableToSubmit=null!==e&&0!==e&&""!==e}},methods:{clearData(){this.amount=null,this.selectedLabels=[]},selectLabel(e){const n=this.selectedLabels.map((e=>e)),t=this.availableLabels.filter((n=>n.name===e));1!==t.length&&console.warn(`Label with name ${e} not found in available labels.`),n.push(t[0]),this.selectedLabels=n},submitAmount(){this.ableToSubmit=!1,this.pendingSubmit=!0;const e=z(this.amount,this.currency,this.selectedLabels.map((e=>e.name)));ve(e).then((()=>{e.pending=!1})).catch((n=>{console.error("Budget log could not have been sent"),console.error(n),e.pending=!0,this.pendingSubmit=!1})).finally((()=>{this.clearData(),be(e),this.$emit("onSubmitDone",e),this.ableToSubmit=!0,this.pendingSubmit=!1}))}}};const Ke=(0,r.Z)(Re,[["render",F],["__scopeId","data-v-57be09aa"]]);var je=Ke;const Ye=["disabled"],$e={key:0},Me={key:1},Ze=(0,a.Uk)(),Fe={key:0};function ze(e,n,t,l,i,s){const r=(0,a.up)("font-awesome-icon");return(0,a.wy)(((0,a.wg)(),(0,a.iD)("button",{onClick:n[0]||(n[0]=e=>s.manualSync()),disabled:!s.hasPendingLogs},[i.syncing_?((0,a.wg)(),(0,a.iD)("span",$e,[(0,a.Wm)(r,{icon:"fa-solid fa-spinner",spin:""})])):((0,a.wg)(),(0,a.iD)("span",Me,[(0,a.Wm)(r,{icon:"fa-solid fa-repeat"}),Ze,i.pendingLogs.length>0?((0,a.wg)(),(0,a.iD)("span",Fe,(0,L.zw)(i.pendingLogs.length),1)):(0,a.kq)("",!0)]))],8,Ye)),[[o.F8,s.hasPendingLogs]])}t(2262),t(4506);var He={name:"PendingLogs",components:{},data(){return{pendingLogs:ue().filter((e=>e.pending)),syncing_:!1}},computed:{hasPendingLogs(){return this.pendingLogs.length>0&&!this.syncing_}},mounted(){Q((()=>{this.pendingLogs=ue().filter((e=>e.pending))}))},methods:{_recursiveSync(e,n){if(e>=n.length)return void(this.syncing_=!1);const t=n.at(e);ve(t).then((o=>{this.removePendingLog(t),this._recursiveSync(e+1,n)})).catch((e=>{console.error(`Can not sync pending log ${JSON.stringify(t)}`),console.error(`${e}`),this.syncing_=!1}))},manualSync(){const e=[...this.pendingLogs];e.length<1||(this.syncing_=!0,this._recursiveSync(0,e))},removePendingLog(e){ge(e)}}};const Je=(0,r.Z)(He,[["render",ze]]);var qe=Je;function Xe(){return P}const Qe={amount:null,currency:"czk",labels:[]};var en={name:"BudgetLogsComponent",components:{LabelComponent:x,SubmitBudgetLogComponent:je,PendingLogs:qe},data(){return{pastLogs:ue(),availableLabels:Xe(),formOpen_:!1,selectedPastLog:Qe,showSettings_:!1}},mounted(){Q((()=>{this.pastLogs=ue()}))},methods:{getLabelColor(e){const n=this.availableLabels.filter((n=>n.name===e));return n.length<1?null:n[0].color},selectPastLog(e){this.selectedPastLog=this.pastLogs[e],this.formOpen_=!0},onNewSubmit(){this.selectedPastLog=Qe,this.formOpen_=!0},onSubmitDone(){this.formOpen_=!1}}};const nn=(0,r.Z)(en,[["render",A],["__scopeId","data-v-79624daf"]]);var tn=nn;const on=(0,a._)("h2",null,"App settings",-1),an={class:"form"},ln={id:"settings-form"},sn=(0,a._)("label",{for:"api-endpoint"},"API Endpoint",-1),rn=(0,a._)("br",null,null,-1),cn=(0,a._)("br",null,null,-1),un=(0,a._)("label",{for:"api-key"},"API Key",-1),mn=(0,a._)("br",null,null,-1),dn=(0,a._)("br",null,null,-1);function pn(e,n,t,l,i,s){return(0,a.wg)(),(0,a.iD)(a.HY,null,[on,(0,a._)("div",an,[(0,a._)("form",ln,[sn,rn,(0,a.wy)((0,a._)("input",{type:"input",name:"api-endpoint",id:"api-endpoint","onUpdate:modelValue":n[0]||(n[0]=e=>i.apiEndpoint=e)},null,512),[[o.nr,i.apiEndpoint]]),cn,un,mn,(0,a.wy)((0,a._)("input",{type:"input",name:"api-key",id:"api-key","onUpdate:modelValue":n[1]||(n[1]=e=>i.apiKey=e)},null,512),[[o.nr,i.apiKey]]),dn])])],64)}var bn={name:"SettingsFormComponent",components:{},data(){return{apiEndpoint:re(),apiKey:ie()}},watch:{apiEndpoint:ne().debounce((function(e){ce(e)}),400),apiKey:ne().debounce((function(e){se(e)}),400)}};const gn=(0,r.Z)(bn,[["render",pn]]);var fn=gn;const hn={style:{position:"relative",top:"2em"}};function vn(e,n,t,o,l,i){return(0,a.wg)(),(0,a.iD)("span",hn,"So far, there is nothing here. Maybe there will be something in the future.")}var Ln={name:"NotFoundComponent"};const yn=(0,r.Z)(Ln,[["render",vn]]);var _n=yn;g.vI.add(h.gr5,h.EQ8,h.jHE,h.XCy,h.LM3,h.u7T,h.koM,h.Stf);const Sn=[{path:"/",component:tn,name:"home"},{path:"/settings",component:fn,name:"settings"},{path:"/:catchAll(.*)",component:_n,name:"404"}],wn=(0,v.p7)({history:(0,v.PO)("/yaba/"),routes:Sn});(0,o.ri)(p).use(wn).component("font-awesome-icon",f.GN).mount("#app")}},n={};function t(o){var a=n[o];if(void 0!==a)return a.exports;var l=n[o]={id:o,loaded:!1,exports:{}};return e[o].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}t.m=e,function(){var e=[];t.O=function(n,o,a,l){if(!o){var i=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],l=e[u][2];for(var s=!0,r=0;r<o.length;r++)(!1&l||i>=l)&&Object.keys(t.O).every((function(e){return t.O[e](o[r])}))?o.splice(r--,1):(s=!1,l<i&&(i=l));if(s){e.splice(u--,1);var c=a();void 0!==c&&(n=c)}}return n}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[o,a,l]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var a,l,i=o[0],s=o[1],r=o[2],c=0;if(i.some((function(n){return 0!==e[n]}))){for(a in s)t.o(s,a)&&(t.m[a]=s[a]);if(r)var u=r(t)}for(n&&n(o);c<i.length;c++)l=i[c],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(u)},o=self["webpackChunkyaba"]=self["webpackChunkyaba"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(2547)}));o=t.O(o)})();
//# sourceMappingURL=app.8f670194.js.map
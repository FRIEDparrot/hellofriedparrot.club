import{R as $,p as k,d as L,V as U,_ as j,r as d,c as B,o as I,b as o,a as l,t as c,w as b,f as h,F as E}from"./index-CqgRRlZL.js";import{m as R,a as C}from"./stdDataTableServer-DK0Vgekt.js";import{f as N,s as A}from"./showFloatingAlert-CI_PrnNs.js";import{c as F,s as K}from"./showConfirmDialog-BoNLUOt8.js";import{U as P}from"./time_zone-Du7Oi8MB.js";class _{static async acceptReviewTable({params:t,acceptReviewUrl:r,rejectReviewUrl:s}){const{accept:u,id_list:a,sendMsg:i,message:n}=t,f={idList:a,informUser:i,reason:n};return $(()=>k(u?r:s,f))}}function g(e){return`/manage/reviews${e}`}class p{static async getCommonReviewsTableData(t){const r=R(t);try{return(await k(g("/common-reviews/getlist"),r)).data}catch(s){return Promise.reject(s)}}static async acceptCommonReviews(t){return _.acceptReviewTable({params:t,acceptReviewUrl:g("/common-reviews/accept"),rejectReviewUrl:g("/common-reviews/reject")})}static async getRegisterTableData(t){const r=R(t);return $(()=>k(g("/registration/getlist"),r))}static async acceptRegister(t){return _.acceptReviewTable({params:t,acceptReviewUrl:g("/registration/accept"),rejectReviewUrl:g("/registration/reject")})}static async getAccountModsTableData(t){const r=R(t);return $(()=>k(g("/account-mods/getlist"),r))}static async acceptAccountMods(t){return _.acceptReviewTable({params:t,acceptReviewUrl:g("/account-mods/accept"),rejectReviewUrl:g("/account-mods/reject")})}}const q=L({name:"Reviews",components:{VDataTableServer:U,floatingAlert:N,confirmDialog:F},setup(){},data(){return{counterInit:[0,0,0],sendMessage:!0,typeSelector:{select:0,selectTabs:[{titleKey:"reviews.reviewRequests",value:0},{titleKey:"reviews.registrations",value:1},{titleKey:"reviews.accountMods",value:2}]},searchKeySelector:{select:0},tableSearchModel:{0:"",1:"",2:""},columnSelectModel:{0:0,1:0,2:0},ReviewTable:C([{titleKey:"common.dataTableServer.id",key:"id",align:"start"},{titleKey:"common.dataTableServer.actionType",key:"action_type"},{titleKey:"common.dataTableServer.actionByid",key:"action_by_id"},{titleKey:"common.dataTableServer.actionUserName",key:"action_by_name"},{titleKey:"common.dataTableServer.actionAt",key:"action_time",isTimeColumn:!0,sortable:!0},{titleKey:"common.dataTableServer.linkOfReview",title:"Link of Review",key:"reviewLink",sortable:!1,align:"center"},{titleKey:"common.dataTableServer.replyLanguage",title:"Reply Language",key:"language",sortable:!1,align:"center"}]),RegisterTable:C([{titleKey:"register.id",key:"id",align:"start",sortable:!0},{titleKey:"register.username",key:"name",sortable:!0},{titleKey:"register.email",key:"email",sortable:!0},{titleKey:"register.career",key:"career",sortable:!1},{titleKey:"register.country",key:"country",sortable:!0},{titleKey:"g.submitTime",key:"submitTime",isTimeColumn:!0,sortable:!0,searchable:!1},{titleKey:"register.reason",key:"reason",sortable:!1}]),AccountAlterTable:C([{titleKey:"common.dataTableServer.id",title:"id",key:"id",align:"start"},{titleKey:"common.dataTableServer.actionType",key:"actionType"},{titleKey:"common.dataTableServer.actionByid",key:"actionById"},{titleKey:"common.dataTableServer.actionUserName",key:"byName"},{titleKey:"register.email",key:"email"},{titleKey:"common.dataTableServer.actionDesc",key:"actionBrief"},{titleKey:"common.dataTableServer.actionAt",title:"Action At",key:"submitTime",isTimeColumn:!0,sortable:!1}]),fetchDataCallbackList:[p.getCommonReviewsTableData,p.getRegisterTableData,p.getAccountModsTableData],acceptReviewCallbackList:[p.acceptCommonReviews,p.acceptRegister,p.acceptAccountMods]}},computed:{currSelect(){return this.typeSelector.select},currTable(){return[this.ReviewTable,this.RegisterTable,this.AccountAlterTable][this.currSelect]},currAcceptReviewCallback(){return this.acceptReviewCallbackList[this.currSelect]},translatedTypeSelector(){return this.typeSelector.selectTabs.map(e=>({title:this.$t(e.titleKey),value:e.value}))},translatedSearchKeySelector(){return this.currTable.headers.filter(e=>e.sortable!==!1).map((e,t)=>({title:this.$t(e.titleKey??""),sortable:e.sortable??!0,key:e.key,value:t}))},translatedTableHeaders(){return this.currTable.headers.map(e=>({title:this.$t(e.titleKey??""),key:e.key}))}},methods:{async fetchCurrentTableData({page:e,itemsPerPage:t,sortBy:r}){const s=this.currTable,u=this.currSelect;s.loading=!0;let a=null,i=null;Array.isArray(r)&&r.length!==0&&(a=r[0].key??null,i=r[0].order??null);try{const n=this.fetchDataCallbackList[u],w=this.translatedSearchKeySelector[this.columnSelectModel[u]].key??null,S={pageNum:e,itemsPerPage:t,orderBy:a,order:i,searchKey:w,search:this.tableSearchModel[u]},v=await n(S);return s.page=e??1,s.itemsPerPage=t??10,s.itemsLength=(v==null?void 0:v.count)??0,s.sortBy=r??[],s.items=(v==null?void 0:v.tableData.map(y=>(s.headers.forEach(T=>{T.isTimeColumn&&y[T.key]&&(y[T.key]=P(y[T.key]))}),y)))??[],s.loading=!1,Promise.resolve(v)}catch(n){return this.showErrorAlert(n.message),s.loading=!1,Promise.reject(n)}},confirmReviewBtnPressed(e=!0){if(this.currTable.selected.length===0){this.showErrorAlert(this.$t("common.dataTableServer.noItemSelected"));return}e?K(this.$refs.acceptConfirmDialog):K(this.$refs.rejectConfirmDialog)},async confirmReviews(e=""){try{const t=await this.confirmCallback(!0,this.sendMessage,"",this.currAcceptReviewCallback,this.fetchCurrentTableData);return A(this.$refs.floatingAlert,!0,this.$t("common.dataTableServer.acceptSuccess")),Promise.resolve(t)}catch(t){return this.showErrorAlert(t.message),Promise.reject(t)}},async rejectReviews(e=""){try{const t=await this.confirmCallback(!1,this.sendMessage,e,this.currAcceptReviewCallback,this.fetchCurrentTableData);A(this.$refs.floatingAlert,!0,this.$t("common.dataTableServer.rejectSuccess"))}catch(t){this.showErrorAlert(t.message)}},cancelReviews(){},async confirmCallback(e=!0,t=!0,r=null,s,u){const a=this.currTable;a.loading=!0;const i=a.selected;if(i.length===0)return Promise.reject(new Error(this.$t("common.dataTableServer.noItemSelected")));try{const n=await s({accept:e,id_list:i,sendMsg:t,message:r});a.selected=[];const f=a.itemsLength-i.length,w=a.itemsPerPage*(a.page-1);f<=w&&(a.page=a.page===1?1:a.page-1);const S={page:a.page,itemsPerPage:a.itemsPerPage,sortBy:a.sortBy};return u(S),a.loading=!1,Promise.resolve(n)}catch(n){return a.loading=!1,Promise.reject(n)}},showErrorAlert(e){A(this.$refs.floatingAlert,!1,e)}},mounted(){const e=[{fetcher:p.getCommonReviewsTableData,table:this.ReviewTable,counterIndex:0},{fetcher:p.getRegisterTableData,table:this.RegisterTable,counterIndex:1},{fetcher:p.getAccountModsTableData,table:this.AccountAlterTable,counterIndex:2}];(async()=>{this.currTable.loading=!0;try{for(const{fetcher:t,table:r,counterIndex:s}of e){const u=await t({pageNum:1,itemsPerPage:10});this.counterInit[s]=u.count??0,r.itemsLength=u.count??0,r.items=u.tableData.map(a=>(r.headers.forEach(i=>{i.isTimeColumn&&a[i.key]&&(a[i.key]=P(a[i.key]))}),a))??[]}}catch(t){this.showErrorAlert(t.message)}this.currTable.loading=!1})()}}),H={class:"review-page console-content-page"},O={class:"review-header"},W={style:{margin:"10px"}},z={class:"review-brief-card-content"},G={class:"review-brief-card-items"},J={class:"review-table-container console-table-card"},Q={class:"review-table-panel"},X={class:"review-select-container"},Y={style:{width:"100%"}},Z={class:"review-search-bar-container"},x={class:"review-search-bar"},ee={class:"review-table-btn-container"};function te(e,t,r,s,u,a){const i=d("v-card-title"),n=d("v-card-subtitle"),f=d("v-card"),w=d("v-select"),S=d("v-text-field"),v=d("v-checkbox"),y=d("v-btn"),T=d("v-card-actions"),M=d("v-data-table-server"),D=d("confirmDialog"),V=d("floatingAlert");return I(),B(E,null,[o("div",H,[o("div",O,[o("h1",null,c(e.$t("reviews.title")),1)]),o("h4",W,c(e.$t("reviews.tip")),1),l(f,{class:"review-brief-card"},{default:b(()=>[o("div",z,[l(i,null,{default:b(()=>[h(c(e.$t("reviews.reviewCount")),1)]),_:1}),o("div",G,[l(n,{class:"review-brief-card-text"},{default:b(()=>[h(c(e.$t("reviews.newReviews"))+" "+c(e.counterInit[0]),1)]),_:1}),l(n,null,{default:b(()=>[h(c(e.$t("reviews.newRegistrations"))+" "+c(e.counterInit[1]),1)]),_:1}),l(n,null,{default:b(()=>[h(c(e.$t("reviews.newAccountMods"))+" "+c(e.counterInit[2]),1)]),_:1})])])]),_:1}),o("div",J,[l(f,{class:"review-table-card",variant:"text"},{default:b(()=>[o("div",Q,[o("div",X,[o("div",Y,[o("h3",null,c(e.$t("reviews.selectType")),1),l(w,{modelValue:e.typeSelector.select,"onUpdate:modelValue":t[0]||(t[0]=m=>e.typeSelector.select=m),items:e.translatedTypeSelector,class:"review-select"},null,8,["modelValue","items"])])]),o("div",Z,[o("div",null,[o("h3",null,c(e.$t("common.dataTableServer.searchByColumns")),1)]),o("div",x,[l(w,{class:"review-search-bars-item",modelValue:e.columnSelectModel[e.currSelect],"onUpdate:modelValue":t[1]||(t[1]=m=>e.columnSelectModel[e.currSelect]=m),items:e.translatedSearchKeySelector},null,8,["modelValue","items"]),l(S,{class:"review-search-bars-item",modelValue:e.tableSearchModel[e.currSelect],"onUpdate:modelValue":t[2]||(t[2]=m=>e.tableSearchModel[e.currSelect]=m),"append-inner-icon":"mdi-magnify",label:"Search"},null,8,["modelValue"])])])]),l(T,{class:"review-table-actions"},{default:b(()=>[o("div",null,[l(v,{density:"compact",modelValue:e.sendMessage,"onUpdate:modelValue":t[3]||(t[3]=m=>e.sendMessage=m),class:"review-table-email-tip-container",color:"primary",label:e.currSelect==1?e.$t("common.dataTableServer.sendEmail"):e.$t("common.dataTableServer.sendMessage")},null,8,["modelValue","label"])]),o("div",ee,[l(y,{class:"bg-error review-table-btn",onClick:t[4]||(t[4]=m=>e.confirmReviewBtnPressed(!1))},{default:b(()=>[h(c(e.$t("g.declineSelected")),1)]),_:1}),l(y,{class:"bg-info review-table-btn",onClick:t[5]||(t[5]=m=>e.confirmReviewBtnPressed(!0))},{default:b(()=>[h(c(e.$t("g.acceptSelected")),1)]),_:1})])]),_:1}),l(M,{modelValue:e.currTable.selected,"onUpdate:modelValue":t[6]||(t[6]=m=>e.currTable.selected=m),"items-per-page":e.currTable.itemsPerPage,headers:e.translatedTableHeaders,items:e.currTable.items,itemsLength:e.currTable.itemsLength,loading:e.currTable.loading,search:e.tableSearchModel[e.currSelect],sortBy:e.currTable.sortBy,"no-data-text":e.$t("common.dataTableServer.noDataText"),"items-per-page-text":e.$t("common.dataTableServer.itemsPerPageText"),page:e.currTable.page,"onUpdate:options":e.fetchCurrentTableData,"show-select":""},{"item.reviewLink":b(({item:m})=>[l(y,{color:"primary",variant:"outlined",to:m.reviewLink},{default:b(()=>[h(c(e.$t("common.dataTableServer.viewReviewLink")),1)]),_:2},1032,["to"])]),_:1},8,["modelValue","items-per-page","headers","items","itemsLength","loading","search","sortBy","no-data-text","items-per-page-text","page","onUpdate:options"])]),_:1})])]),l(D,{ref:"acceptConfirmDialog",title:e.$t("common.confirmDialog.confirmToAccept"),"confirm-btn-color":"info",onConfirm:e.confirmReviews,onCancel:e.cancelReviews},null,8,["title","onConfirm","onCancel"]),l(D,{ref:"rejectConfirmDialog",title:e.$t("common.confirmDialog.confirmToReject"),"show-reason-input":!0,"max-reason-length":200,"reason-required":!1,"confirm-btn-color":"error",onConfirm:e.rejectReviews,onCancel:e.cancelReviews},null,8,["title","onConfirm","onCancel"]),l(V,{ref:"floatingAlert"},null,512)],64)}const ie=j(q,[["render",te],["__scopeId","data-v-79f826ae"]]);export{ie as default};

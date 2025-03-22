import{n as Y}from"./navbar_simple-4sphbzQO.js";import{n as N}from"./navUserAvatarPrompt-REqavzeW.js";import{r as q}from"./compactFolderList-I424pcJ3.js";import{r as j}from"./rightSidebarProfile-CjJID-z7.js";import{f as z,s as W}from"./showFloatingAlert-CI_PrnNs.js";import{A as H}from"./accounts_api-DtaFqk4o.js";import{Y as G,p as J,$ as M,d as K,_ as O,r as l,c as D,o as _,a as i,b as a,w as r,f as d,t as n,e as f,F as Q,q as X,m as Z}from"./index-CqgRRlZL.js";import{U as x}from"./time_zone-Du7Oi8MB.js";import{c as ee,s as se}from"./showConfirmDialog-BoNLUOt8.js";import{m as te,E as ae}from"./css-vars-DankDkug.js";import"./translateBtn-BRuTLF4g.js";import"./homeBtn-BOzY3PSi.js";import"./userAvatar-BCIgy1mb.js";import"./index-CXIRte0K.js";function h(e){return`/site-messages${e}`}class y{static async getUserSiteMessages(){const s=h("/get");try{const t=await G(s);return Promise.resolve(t.data)}catch(t){return Promise.reject(t)}}static async sendSiteMessages(s){const t=h("/send");return J(t,s)}static async markSiteMessagesAsRead(s){const t=h("/mark-as-read");return M(t,{id_list:s})}static async markSiteMessagesAsUnread(s){const t=h("/mark-as-unread");return M(t,{id_list:s})}static async deleteSiteMessages(s){const t=h("/delete");return M(t,{id_list:s})}}const re={0:"system_information",1:"announcement",2:"notification",3:"user_message",4:"comment"};class ${static async convertToDisplayData(s){if(!s.length)return[];const t=[...new Set(s.map(m=>m.from_id))];try{const m=await H.getAccountBriefList(t),g=new Map(m.map(c=>[c.id,c]));return s.map(c=>{var u,v;return{id:c.id,msg_type:re[c.msg_type]||"unknown",title:c.title,content:c.content,sender_name:((u=g.get(c.from_id))==null?void 0:u.name)||"",sender_avatar:((v=g.get(c.from_id))==null?void 0:v.avatar)||"",send_time:c.send_time,is_read:c.is_read}})}catch(m){return Promise.reject(m)}}static async getSiteMessageDisplayListInfo(){try{const s=await y.getUserSiteMessages(),t=await $.convertToDisplayData(s);return Promise.resolve(t)}catch(s){return console.error("Failed to get message list:",s),Promise.reject(s)}}}const ie=K({name:"SiteMessages",components:{navbar_simple:Y,navUserAvatarPrompt:N,rightSidebarToggleBtn:q,rightSidebarProfile:j,floatingAlert:z,ElTag:ae,ElButton:te,confirmDialog:ee},props:{itemsPerPage:{type:Number,default:5}},data(){return{items:[],current_page:1,msg_card_max_width:700,readStateLoading:!1}},computed:{},methods:{showErrorMsg(e){W(this.$refs.floatingAlert,!1,e)},checkItemsEmpty(){return this.items.length===0?(this.showErrorMsg(this.$t("site_messages.no_messages")),!0):!1},async MarkasRead(e){if(!this.checkItemsEmpty()){this.readStateLoading=!0;try{const s=await y.markSiteMessagesAsRead(e);e.forEach(t=>{const m=this.items.find(g=>g.id===t);m&&(m.is_read=!0)})}catch(s){this.showErrorMsg(s.message)}finally{this.readStateLoading=!1}}},async MarkasUnread(e){if(!this.checkItemsEmpty()){this.readStateLoading=!0;try{const s=await y.markSiteMessagesAsUnread(e);e.forEach(t=>{const m=this.items.find(g=>g.id===t);m&&(m.is_read=!1)})}catch(s){this.showErrorMsg(s.message)}finally{this.readStateLoading=!1}}},async deleteMsg(e){if(!this.checkItemsEmpty()){this.readStateLoading=!0;try{const s=await y.deleteSiteMessages(e);this.items=this.items.filter(t=>!e.includes(t.id))}catch(s){this.showErrorMsg(s.message)}finally{this.readStateLoading=!1}}},showConfirmDeleteDialog(){this.checkItemsEmpty()||se(this.$refs.deleteAllConfirmDialog)},getFormattedMsgTime(e){return x(e,"YYYY-MM-DD HH:mm")},ToggleRightSidebar(){this.$refs.rightSidebarProfile.toggle()},async fetchUserSiteMessages(){try{const e=await $.getSiteMessageDisplayListInfo();this.items=e}catch(e){this.showErrorMsg(e.message)}}},mounted(){this.fetchUserSiteMessages()}}),oe={class:"page-site-messages"},ne={class:"sidebar-right-item"},le={class:"page-content"},de={class:"page-message-middle"},me={class:"page-message-middle-wrapper"},ce={class:"page-message-middle-title"},ge={class:"page-message-batch-operation-btns"},_e={class:"msg-header"},pe={class:"msg-title"},fe={class:"msg-status"},he={class:"msg-content"},ue={class:"msg-operation"},ve={class:"msg-footer"},ye={class:"msg-time"},we={class:"sender-info"},Se={class:"sender-tip"},ke=["src"],be={class:"sender-name"};function Me(e,s,t,m,g,c){const u=l("floatingAlert"),v=l("navUserAvatarPrompt"),E=l("rightSidebarToggleBtn"),T=l("navbar_simple"),L=l("rightSidebarProfile"),U=l("confirmDialog"),w=l("v-btn"),C=l("v-card-title"),S=l("el-tag"),k=l("el-button"),R=l("v-icon"),B=l("v-avatar"),I=l("v-card-text"),P=l("v-card"),V=l("v-pagination"),F=l("v-data-iterator");return _(),D("div",oe,[i(u,{ref:"floatingAlert"},null,512),i(T,{"reload-translations":!1,"show-support-btn":!1,style:{position:"fixed"}},{title:r(()=>[d(n(e.$t("site_messages.title")),1)]),"sidebar-right-items":r(()=>[a("div",ne,[i(v,{class:"sidebar-right-item-avatar"})])]),"right-sidebar-toogle":r(()=>[i(E,{onToggleRightSidebar:e.ToggleRightSidebar},null,8,["onToggleRightSidebar"])]),_:1}),i(L,{ref:"rightSidebarProfile"},null,512),i(U,{ref:"deleteAllConfirmDialog",onConfirm:s[0]||(s[0]=p=>e.deleteMsg(e.items.map(o=>o.id))),title:e.$t("site_messages.confirm_delete_all_title")},null,8,["title"]),a("div",le,[a("div",de,[a("div",me,[a("div",ce,[a("h2",null,n(e.$t("site_messages.myMessagesTitle")),1)]),a("div",ge,[a("div",null,[i(w,{class:"mr-2",color:"primary",onClick:s[1]||(s[1]=p=>e.MarkasRead(e.items.map(o=>o.id)))},{default:r(()=>[d(n(e.$t("site_messages.batch_mark_as_read")),1)]),_:1})]),a("div",null,[i(w,{class:"mr-2",color:"warning",onClick:s[2]||(s[2]=p=>e.MarkasUnread(e.items.map(o=>o.id)))},{default:r(()=>[d(n(e.$t("site_messages.batch_mark_as_unread")),1)]),_:1})]),a("div",null,[i(w,{class:"mr-2",color:"error",onClick:e.showConfirmDeleteDialog},{default:r(()=>[d(n(e.$t("site_messages.batch_delete")),1)]),_:1},8,["onClick"])])]),e.items.length>0?(_(),f(F,{key:0,page:e.current_page,items:e.items,"items-per-page":e.itemsPerPage,style:{width:"100%"}},{default:r(({items:p})=>[(_(!0),D(Q,null,X(p,(o,b)=>(_(),f(P,{class:"msg-card",variant:"outlined",width:"msg_card_max_width",key:b},{default:r(()=>[i(I,null,{default:r(()=>[a("div",_e,[a("div",pe,[i(C,null,{default:r(()=>[d(n(o.raw.title),1)]),_:2},1024),a("div",fe,[i(S,{type:"primary"},{default:r(()=>[d(n(e.$t("site_messages.type."+o.raw.msg_type)),1)]),_:2},1024),!e.readStateLoading&&o.raw.is_read?(_(),f(S,{key:0,type:"success"},{default:r(()=>[d(n(e.$t("site_messages.read")),1)]),_:1})):!e.readStateLoading&&!o.raw.is_read?(_(),f(S,{key:1,type:"warning"},{default:r(()=>[d(n(e.$t("site_messages.unread")),1)]),_:1})):Z("",!0)])])]),a("div",he,n(o.raw.content),1),a("div",ue,[i(k,{size:"small",type:"success",disabled:e.readStateLoading,class:"msg-operation-btn",onClick:A=>e.MarkasRead([o.raw.id])},{default:r(()=>[d(n(e.$t("site_messages.operation.mark_as_read")),1)]),_:2},1032,["disabled","onClick"]),i(k,{size:"small",type:"warning",disabled:e.readStateLoading,class:"msg-operation-btn",onClick:A=>e.MarkasUnread([o.raw.id])},{default:r(()=>[d(n(e.$t("site_messages.operation.mark_as_unread")),1)]),_:2},1032,["disabled","onClick"]),i(k,{size:"small",type:"danger",class:"msg-operation-btn",onClick:A=>e.deleteMsg([o.raw.id])},{default:r(()=>[d(n(e.$t("site_messages.operation.delete")),1)]),_:2},1032,["onClick"])]),a("div",ve,[a("div",ye,[i(R,{class:"mr-2"},{default:r(()=>s[4]||(s[4]=[d(n("mdi-clock"))])),_:1}),d(" "+n(e.getFormattedMsgTime(o.raw.send_time)),1)]),a("div",we,[a("div",Se,n(e.$t("site_messages.sender_tip")+" : "),1),i(B,{class:"msg-avatar"},{default:r(()=>[a("img",{src:o.raw.sender_avatar,alt:"avatar"},null,8,ke)]),_:2},1024),a("div",be,n(o.raw.sender_name),1)])])]),_:2},1024)]),_:2},1024))),128))]),footer:r(({page:p,pageCount:o})=>[i(V,{modelValue:e.current_page,"onUpdate:modelValue":s[3]||(s[3]=b=>e.current_page=b),length:Math.ceil(e.items.length/e.itemsPerPage)},null,8,["modelValue","length"])]),_:1},8,["page","items","items-per-page"])):(_(),f(P,{key:1,class:"msg-card no-msg-card",width:"msg_card_max_width",variant:"outlined"},{default:r(()=>[i(C,{class:"no-msg-title"},{default:r(()=>[d(n(e.$t("site_messages.no_messages")),1)]),_:1})]),_:1}))])])])])}const Ye=O(ie,[["render",Me],["__scopeId","data-v-9ccebf14"]]);export{Ye as default};

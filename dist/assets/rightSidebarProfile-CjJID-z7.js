import{d as _,s as p,as as w,_ as K,c as u,a as t,w as i,O as m,G as C,r,o as c,b as l,t as n,f as a,e as k}from"./index-CqgRRlZL.js";import{u as P}from"./userAvatar-BCIgy1mb.js";import{c as $,L as B}from"./compactFolderList-I424pcJ3.js";const S=_({name:"rightSidebarProfile",components:{userAvatar:P,compactFolderList:$},props:{absPos:{type:Boolean,default:!1},zIndex:{type:Number,default:2e3}},computed:{get_user_info(){return p.state.user}},data(){return{drawer:!1,user:{...p.state.user,borderColor:w[p.state.user.priority]},profilePanelItems:[{titleKey:"panels.profile.dashboard",icon:"mdi-view-dashboard",priority:4,open:!0,child:[{titleKey:"g.myHomePage",icon:"mdi-home-outline",url:"/home"},{titleKey:"g.myNotifications",icon:"mdi-bell-outline",badge:!0,badgeContent:p.state.user_personal_data.msg_count},{titleKey:"g.myStars",icon:"mdi-star-outline",url:"/notdeveloped"},{titleKey:"g.history",icon:"mdi-history",url:"/notdeveloped"}]},{titleKey:"panels.profile.creations",icon:"mdi-folder-multiple-outline",priority:4,open:!0,child:[{titleKey:"panels.profile.createNew",icon:"mdi-plus-circle-outline",open:!1,child:[{titleKey:"panels.profile.newBlog",icon:"mdi-pencil-outline",url:"/blogs/create",priority:4},{titleKey:"panels.profile.newColumn",icon:"mdi-note-plus-outline",url:"/notdeveloped",priority:4},{titleKey:"panels.profile.newResource",icon:"mdi-upload",url:"/notdeveloped",priority:3},{titleKey:"panels.profile.newProject",icon:"mdi-folder-plus-outline",url:"/notdeveloped",priority:3}]},{titleKey:"panels.profile.contentCenter",icon:"mdi-folder-multiple-image",url:"/notdeveloped"},{titleKey:"panels.profile.comments",icon:"mdi-comment-text-multiple-outline",url:"/notdeveloped"}]},{titleKey:"panels.profile.console",priority:1,icon:"mdi-console",open:!0,child:[{titleKey:"panels.profile.reviews",icon:"mdi-format-list-bulleted",url:"/console/reviews",priority:1},{titleKey:"panels.profile.userManagement",icon:"mdi-account-multiple-outline",url:"/console/user-management",priority:1},{titleKey:"panels.profile.serverManagement",icon:"mdi-database-cog",url:"/console/server-monitor",priority:1},{titleKey:"panels.profile.ipRestriction",icon:"mdi-lock-alert-outline",url:"/console/ip-restriction",priority:1},{titleKey:"panels.profile.violationActions",icon:"mdi-alert-outline",url:"/console/violation-actions",priority:1}]},{titleKey:"panels.profile.accountSettings",icon:"mdi-cog",priority:4,open:!1,child:[{titleKey:"panels.profile.editProfile",icon:"mdi-account-edit",url:"/notdeveloped"},{titleKey:"panels.profile.passwordSettings",icon:"mdi-lock",url:"/notdeveloped"}]}]}},methods:{open(){this.drawer=!0},toggle(){this.drawer=!this.drawer},close(){this.drawer=!1},logout(){B.logoutUser().then(e=>{}).catch(e=>{console.error(e)})},navigateTo(e,o){e.ctrlKey||e.metaKey?window.open(o,"_blank"):this.$router.push(o)}}}),I={class:"right-sidebar"},L={class:"right-sidebar-header-container"},N={class:"right-sidebar-header-avatar-container"},V={class:"right-sidebar-header-user-info-container"},z={class:"right-sidebar-user-name"},A={class:"right-sidebar-header-close-btn-container"},T={style:{"margin-top":"20px"}},U={class:"right-sidebar-log-operation-panel"},F={key:1,width:"100%"};function M(e,o,R,j,D,E){const g=r("userAvatar"),y=r("v-card-subtitle"),f=r("v-icon"),d=r("v-btn"),v=r("v-divider"),h=r("compactFolderList"),b=r("v-navigation-drawer");return c(),u("div",I,[t(b,{location:"right",modelValue:e.drawer,"onUpdate:modelValue":o[3]||(o[3]=s=>e.drawer=s),width:330,class:C(e.absPos?"absolute-drawer":""),style:m({zIndex:e.zIndex}),temporary:""},{default:i(()=>[l("div",L,[l("div",N,[t(g,{class:"right-sidebar-avatar",color:"var(--text-color-smooth)",style:m({borderColor:e.user.borderColor})},null,8,["style"])]),l("div",V,[l("div",z,n(e.user.name??e.$t("g.guestUser")),1),t(y,{class:"right-sidebar-user-email"},{default:i(()=>[a(n(e.user.email??""),1)]),_:1})]),l("div",A,[t(d,{icon:"",variant:"plain",class:"right-sidebar-close-btn",onClick:o[0]||(o[0]=s=>e.drawer=!1)},{default:i(()=>[t(f,{class:"right-sidebar-close-icon"},{default:i(()=>o[4]||(o[4]=[a(n("mdi-close"))])),_:1})]),_:1})])]),t(v),l("div",T,[t(h,{density:"compact",useUrlLink:!0,useTranslation:!0,items:e.profilePanelItems},null,8,["items"])]),l("div",U,[e.user.priority<=4?(c(),k(d,{key:0,class:"right-sidebar-operation-btn",color:"error",onClick:e.logout},{default:i(()=>[a(n(e.$t("g.logout")),1)]),_:1},8,["onClick"])):(c(),u("div",F,[t(d,{width:"100%",color:"primary",class:"right-sidebar-operation-btn",onClick:o[1]||(o[1]=s=>e.navigateTo(s,"/auth/login"))},{default:i(()=>[a(n(e.$t("g.login")),1)]),_:1}),t(d,{width:"100%",color:"secondary",class:"right-sidebar-operation-btn",onClick:o[2]||(o[2]=s=>e.navigateTo(s,"/auth/register"))},{default:i(()=>[a(n(e.$t("g.register")),1)]),_:1})]))])]),_:1},8,["modelValue","class","style"])])}const q=K(S,[["render",M],["__scopeId","data-v-2047c3ee"]]);export{q as r};

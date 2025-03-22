import{d as S,s as c,_ as T,e as a,w as n,O as x,r as s,o as r,m as d,H as L,c as m,b as o,G as M,a as i,t as g,F as $,q as K,K as C,f as R}from"./index-DhQyue9E.js";import{T as V,D as P}from"./translateBtn-C87KYO5l.js";import{r as U}from"./compactFolderList-CJ0MtlWe.js";import{d as j}from"./defaultAvatar-DOZV4EYv.js";import{n as W}from"./navUserAvatarPrompt-BRRxG_qO.js";import{p as D}from"./parrotLogoBtn-fE2VUJDE.js";const p=[{description:"blogs column",titleKey:"g.columns.blogs",index:0,url:"/blogs",child:[{description:"life Miscellany",titleKey:"g.columns.life",index:0,url:"/blogs?tag=life"},{description:"Technology Sharing",titleKey:"g.columns.tech",index:1,url:"/blogs?tag=tech"},{description:"Basic knowledges",titleKey:"g.tag.knowledges",index:2,url:"/blogs?tag=knowledges"},{description:"Other Blogs",titleKey:"g.columns.other",index:3,url:"/blogs?tag=other"}]},{description:"resources column",titleKey:"g.columns.resources",index:1,url:"/resources"},{description:"projects column",titleKey:"g.columns.projects",index:2,url:"/projects"},{description:"forums column",titleKey:"g.columns.forums",index:3,url:"/forums"},{description:"products column",titleKey:"g.columns.products",index:4,url:"/products"}];p.sort((e,t)=>e.index-t.index);const N=S({name:"navbar_welcome",components:{DarkModeToggleBtn:P,translateBtn:V,defaultAvatar:j,rightSidebarToggleBtn:U,navUserAvatarPrompt:W,parrotLogoBtn:D},setup(){},emits:["toggleLeftSidebar","toggleRightSidebar"],props:{showLeftSidebarToggle:{type:Boolean,default:!0},showRightSidebarToggle:{type:Boolean,default:!0},showLogo:{type:Boolean,default:!0},alwaysShowLogo:{type:Boolean,default:!1},scrollThreshold:{type:Number,default:0},scrollBehavior:{type:String,default:"hide"},staticPos:{type:Boolean,default:!0}},data(){return{user_info:{name:c.state.user.name??null,avatarUrl:c.state.user.avatarUrl??null},navbar_columns:p,langLoaded:!1,columns:p,avatar_size:"50px"}},methods:{navigateTo(e,t){e.ctrlKey||e.metaKey?window.open(t,"_blank"):this.$router.push(t)},toggleLeftSidebar(){this.$emit("toggleLeftSidebar")},toggleRightSidebar(){this.$emit("toggleRightSidebar")}},mounted(){}}),A="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21.97%2015V9C21.97%204%2019.97%202%2014.97%202H8.96997C3.96997%202%201.96997%204%201.96997%209V15C1.96997%2020%203.96997%2022%208.96997%2022H14.97C19.97%2022%2021.97%2020%2021.97%2015Z'%20stroke='%23ffffff'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.96997%202V22'%20stroke='%23ffffff'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.97%209.43994L12.41%2011.9999L14.97%2014.5599'%20stroke='%23ffffff'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",G={class:"nav-logo-img-container"},z={class:"elem-display-lessThanSuperWidth",id:"nav-title"},H={class:"elem-display-superMaxWidth",id:"nav-items-topbar"},F={class:"nav-user-panel"},O={class:"elem-display-middlewidth nav-user-welcome-message mx-2"};function q(e,t,E,I,Z,J){const u=s("v-btn"),f=s("parrotLogoBtn"),h=s("v-menu"),v=s("DarkModeToggleBtn"),b=s("translateBtn"),y=s("navUserAvatarPrompt"),w=s("rightSidebarToggleBtn"),_=s("v-app-bar");return r(),a(_,{height:60,class:"navbar","scroll-behavior":"scrollBehavior","scroll-threshold":"scrollThreshold",style:x(e.staticPos?{position:"static"}:{position:"fixed"})},{default:n(()=>[e.showLeftSidebarToggle?(r(),a(u,{key:0,icon:"",variant:"plain",onClick:t[0]||(t[0]=l=>e.toggleLeftSidebar()),"border-radius":"0px",class:"elem-display-lessThanSuperWidth sidebar-toggle-left"},{default:n(()=>t[2]||(t[2]=[o("img",{src:A,alt:"left-sidebar",height:"50px"},null,-1)])),_:1})):d("",!0),L(e.$slots,"navbarPrepend",{},void 0,!0),e.showLogo?(r(),m("div",{key:1,class:M(["nav-logo-container",{"force-display":e.alwaysShowLogo}])},[o("div",G,[i(f,{style:{height:"100%"}})])],2)):d("",!0),o("div",z,[o("span",null,g(e.$t("g.friedParrotClub")),1)]),t[3]||(t[3]=o("div",{class:"elem-display-superMaxWidth",id:"nav-padding-left"},null,-1)),o("div",H,[(r(!0),m($,null,K(e.columns,(l,k)=>(r(),a(h,{class:"nav-item elem-display-superMaxWidth"},{activator:n(({props:B})=>[(r(),a(u,C({class:"nav-items-btn",variant:"text",key:k,width:"20%",height:"100%",ref_for:!0},B,{to:l.url??"#"}),{default:n(()=>[R(g(e.$t(l.titleKey)),1)]),_:2},1040,["to"]))]),_:2},1024))),256))]),t[4]||(t[4]=o("div",{class:"elem-display-superMaxWidth",id:"nav-padding-right"},null,-1)),o("div",F,[i(v),i(b,{fullReload:!1}),o("div",O,[o("h3",null,[o("b",null,g(e.$t("welcome.nav-items.welcome-usr",{name:e.user_info.name??e.$t("g.guestUser")})),1)])]),i(y),e.showRightSidebarToggle?(r(),a(w,{key:0,class:"sidebar-toggle-right","border-radius":"0px",onToggleRightSidebar:t[1]||(t[1]=l=>e.toggleRightSidebar())})):d("",!0)])]),_:3},8,["style"])}const se=T(N,[["render",q],["__scopeId","data-v-92de6113"]]);export{p as M,se as n};

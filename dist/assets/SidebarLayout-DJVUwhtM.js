import{d as n,_ as d,c as t,o as a,m as s,b as r,H as o}from"./index-CqgRRlZL.js";parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--leftsidebarwidth"));parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rightsidebarwidth"));const i=n({name:"SidebarLayout",props:{openLeftSidebarAtStart:{type:Boolean,default:!1},openRightSidebarAtStart:{type:Boolean,default:!1},canOpenAtSameTime:{type:Boolean,default:!1}},data(){return{leftSidebarOpen:!1,rightSidebarOpen:!1,handleKeydown:null}},methods:{},mounted(){}}),l={class:"SidebarLayout"},c={key:0,class:"sidebar",id:"sidebar-left"},p={class:"sidebar",id:"sidebar-right"},m={key:1,class:"content"};function u(e,f,b,h,S,y){return a(),t("div",l,[e.$slots["sidebar-left-content"]?(a(),t("div",c,[o(e.$slots,"sidebar-left-content")])):s("",!0),r("div",p,[o(e.$slots,"sidebar-right-content")]),e.$slots["main-content"]?(a(),t("div",m,[o(e.$slots,"main-content")])):s("",!0)])}const g=d(i,[["render",u]]);export{g as S};

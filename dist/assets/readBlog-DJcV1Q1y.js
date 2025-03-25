import{n as V}from"./navbar_welcome-CW_6fFMT.js";import{M as z,L as U}from"./markdownOutline-BghMs_Vn.js";import{r as q}from"./rightSidebarProfile-BhqoP2Hm.js";import{d as B,_ as S,c as l,b as o,o as r,l as K,s as T,u as J,a,r as n,w as c,t as s,m as g,e as m,F as k,q as C,f as b}from"./index-FC0xG_oE.js";import{B as v,a as W}from"./blog_services-DfByhGtZ.js";import{f as G,s as w}from"./showFloatingAlert-CFs_V4W4.js";import{r as Q,g as X}from"./MarkdownUtils-DhwzVmGR.js";import{m as D}from"./md_code_folding-1UxNs8Fx.js";import{u as Y,H as Z}from"./history_api-CNlAHRLQ.js";import{U as x}from"./time_zone-DmdZQxU2.js";import{A as tt}from"./accounts_api-CqnzLi56.js";import{f as ot}from"./footerbar_common-DThPlI3C.js";import{c as A}from"./index-D7XKdhAi.js";import"./translateBtn-B1vGUFsV.js";import"./compactFolderList-DjTSu2oA.js";import"./defaultAvatar-CCVC8jCb.js";import"./navUserAvatarPrompt-C2fxYPgz.js";import"./parrotLogoBtn-rmbI3L2g.js";import"./index-Cap7atJD.js";import"./toString-CyGcNvj-.js";import"./isSymbol-C7jn4vLP.js";const et=B({name:"CommentIsso",mounted(){const t=document.createElement("script");t.dataset.isso="https://hellofriedparrot.club/comments",t.src="https://hellofriedparrot.club/comments/js/embed.min.js",document.body.appendChild(t)}}),st={id:"isso-thread"};function at(t,e,i,u,f,I){return r(),l("section",st,e[0]||(e[0]=[o("noscript",null,"Javascript needs to be activated to view comments.",-1)]))}const rt=S(et,[["render",at]]),nt=B({name:"ReadBog",setup(){return{uuid:J().params.uuid}},components:{navbar_welcome:V,leftSidebarBtnContent:U,rightSidebarProfile:q,markdownOutline:z,floatingAlert:G,userInfoCardBrief:Y,footerbar_common:ot,comment_isso:rt},props:{isReview:{type:Boolean,default:!1}},data(){return{user:T.state.user,authorProfile:{},authorInterestTags:[],authorInfo:{},blogData:{},blogContent:"",blogHeadings:[],copybtn:{disabled:!1,icon:"mdi-content-copy"},featurebtn:{disabled:!1}}},computed:{getTagTranslation(){const t=this.$i18n.locale;return e=>e[t]??e.en??""}},methods:{async copyLink(){try{await navigator.clipboard.writeText(window.location.href),this.copybtn.icon="mdi-check",this.copybtn.disabled=!0,setTimeout(()=>{this.copybtn.icon="mdi-content-copy",this.copybtn.disabled=!1},1500),w(this.$refs.floatingAlert,!0,this.$t("blog.copyLinkSuccess"))}catch{alert("Failed to copy link. Please try again.")}},async featureArticle(t){this.featurebtn.disabled=!0;try{await v.setBlogFeatured(this.blogData.uuid,t),this.blogData.featured=t,w(this.$refs.floatingAlert,!0,t?this.$t("blog.featureArticleSuccess"):this.$t("blog.unfeatureArticleSuccess"))}catch(e){this.showErrorAlert(e.message)}finally{this.featurebtn.disabled=!1}},getPreciseTimeStr(t){return x(t)},showErrorAlert(t){w(this.$refs.floatingAlert,!1,t)},async load_author_profile(t){try{if(t===void 0)throw new Error(this.$t("blog.error.noAuthorInfo"));const e=await tt.getAccountProfile(t);this.authorProfile=e;const i={name:e.name,avatar:e.avatar,bio:e.bio,follows:e.following_num,followers:e.followers_num,blogsNum:e.blogs_num};this.authorInfo=i;const u=e.interest_tags;await A.dispatch("updateInterestByKeys",u);const f=A.getters.getInterestTagByKeyList(u);return this.authorInterestTags=f,Promise.resolve(null)}catch(e){return Promise.reject(e)}},async load_blog_data(t){try{const e=this.isReview?await v.getBlogReviewContent(t):await v.getBlogContent(t),i=await W.getBlogContentDispData(e);return this.blogData=i,this.blogContent=Q(this.blogData.content),this.blogHeadings=X(this.blogContent),Promise.resolve(null)}catch(e){return Promise.reject(e)}},toggleLeftSidebar(){this.$refs.left_sidebar.toggle()},toggleRightSidebar(){this.$refs.right_sidebar.toggle()}},mounted(){(async()=>{try{try{await this.load_blog_data(this.uuid),K(()=>{D.addCodeFoldingHook()})}catch(i){throw new Error(this.$t("blog.error.loadBlogData")+" : "+i.message)}const t=this.blogData.authorId,e=this.blogData.uuid;try{await this.load_author_profile(t)}catch(i){throw new Error(this.$t("blog.error.loadAuthorProfile")+" : "+i.message)}if(T.state.authorized){const i={type:"blog",uuid:e,progress:0};try{await Z.addHistoryRecord(i)}catch(u){throw new Error(this.$t("blog.error.addHistoryRecord")+" : "+u.message)}}}catch(t){this.showErrorAlert(t.message)}})()},beforeUnmount(){D.removeCodeFoldingHook()}}),it={class:"page-read-blog"},lt={class:"blog-main-page-container bg-background_smooth"},ct={class:"blog-left-panel-container"},dt={class:"author-info-container"},gt={class:"author-interest-tag-container"},ut={class:"author-interest-tag-title"},bt={class:"author-interest-tag-wrapper"},ht={class:"operation-button-group"},mt={key:0,class:"feature-article-button-container"},ft={class:"blog-content"},_t={class:"blog-content-wrapper"},pt={class:"blog-title"},vt={class:"blog-title-text"},wt=["src"],yt={class:"blog-abstract-author"},$t={class:"blog-abstract-author-info"},Tt={class:"blog-abstract-author-info-avatar"},kt=["src"],Ct={class:"blog-abstract-author-intro"},Dt={class:"blog-abstract-author-info-name"},At={class:"blog-abstract-author-info-bio"},Bt={class:"blog-abstract-author-statistics"},St={class:"author-statistics-item blogsNum"},It={class:"author-statistics-item follows"},Pt={class:"author-statistics-item followers"},Lt={key:0,class:"blog-abstract-text"},Ht={class:"blog-tags-container"},Nt={class:"blog-tags-title"},Rt={class:"blog-tags"},Mt=["href"],Et={key:0},Ft={key:0},jt={class:"blog-publish-time-container"},Ot={class:"blog-publish-time-title"},Vt={key:0,class:"blog-last-modify-time-title"},zt={class:"blog-abstract-footer-container"},Ut={class:"blog-word-count-container"},qt={class:"blog-word-count-text"},Kt={class:"blog-statistics-container"},Jt={class:"blog-read-count-container"},Wt={class:"blog-read-count-number"},Gt={class:"blog-read-count-text"},Qt={class:"blog-star-count-container"},Xt={class:"blog-star-count-number"},Yt={class:"blog-star-count-text"},Zt={class:"blog-comment-count-container"},xt={class:"blog-comment-count-number"},to={class:"blog-comment-count-title"},oo={class:"blog-content-text-container"},eo={class:"blog-content-md markdown-body"},so=["innerHTML"],ao={key:0,class:"blog-comment-column-container"},ro={class:"blog-comment-column-title"},no={class:"blog-comment-container"},io={class:"blog-outline-container"};function lo(t,e,i,u,f,I){const P=n("floatingAlert"),L=n("navbar_welcome"),y=n("markdownOutline"),H=n("leftSidebarBtnContent"),N=n("rightSidebarProfile"),R=n("userInfoCardBrief"),M=n("v-chip"),E=n("v-chip-group"),_=n("v-btn"),$=n("v-card"),h=n("v-divider"),F=n("v-icon"),j=n("v-card-text"),O=n("comment_isso");return r(),l("div",it,[a(P,{ref:"floatingAlert",style:{position:"fixed"}},null,512),a(L,{onToggleLeftSidebar:t.toggleLeftSidebar,onToggleRightSidebar:t.toggleRightSidebar,"static-pos":!1},null,8,["onToggleLeftSidebar","onToggleRightSidebar"]),a(H,{ref:"left_sidebar",class:"elem-display-lessThanSuperWidth","use-whole-drawer":!0},{contentPanel:c(({selected:d})=>[a(y,{title:t.$t("blog.outline"),"scroll-offset":-35,headings:t.blogHeadings},null,8,["title","headings"])]),_:1},512),a(N,{ref:"right_sidebar",absPos:!0,"z-index":3e3},null,512),o("div",lt,[o("div",ct,[o("div",dt,[a(R,{"use-self-profile":!1,info:t.authorInfo,class:"author-info"},null,8,["info"])]),o("div",gt,[o("div",ut,s(t.$t("blog.authotInterestTagTitle")),1),o("div",bt,[a(E,{class:"author-interest-tag-chip-group",variant:"outlined",column:""},{default:c(()=>[(r(!0),l(k,null,C(t.authorInterestTags,(d,p)=>(r(),m(M,{key:p},{default:c(()=>[b(s(t.getTagTranslation(d)),1)]),_:2},1024))),128))]),_:1})]),o("div",ht,[a(_,{disabled:t.copybtn.disabled,"prepend-icon":t.copybtn.icon,outlined:"",color:"primary",onClick:t.copyLink,rounded:""},{default:c(()=>[b(s(t.$t("blog.copyLink")),1)]),_:1},8,["disabled","prepend-icon","onClick"]),t.user.priority<=1?(r(),l("div",mt,[t.blogData.featured?(r(),m(_,{key:1,disabled:t.featurebtn.disabled,class:"feature-article-button",color:"error",rounded:"",onClick:e[1]||(e[1]=d=>t.featureArticle(!1))},{default:c(()=>[b(s(t.$t("blog.unFeatureArticle")),1)]),_:1},8,["disabled"])):(r(),m(_,{key:0,disabled:t.featurebtn.disabled,class:"feature-article-button",color:"warning",rounded:"",onClick:e[0]||(e[0]=d=>t.featureArticle(!0))},{default:c(()=>[b(s(t.$t("blog.featureArticle")),1)]),_:1},8,["disabled"]))])):g("",!0)])])]),o("div",ft,[o("div",_t,[o("div",pt,[o("h1",vt,s(t.blogData.title),1)]),t.isReview&&t.blogData.bannerImage?(r(),m($,{key:0,class:"blog-banner-image-container mb-5"},{default:c(()=>[o("img",{src:t.blogData.bannerImage,alt:"banner"},null,8,wt)]),_:1})):g("",!0),a($,{variant:"text",class:"blog-abstract-container"},{default:c(()=>[a(j,{class:"blog-abstract-wrapper"},{default:c(()=>[o("div",yt,[o("div",$t,[o("div",Tt,[o("img",{src:t.authorProfile.avatar,alt:"avatar"},null,8,kt)]),o("div",Ct,[o("div",Dt,s(t.authorInfo.name),1),o("div",At,s(t.authorInfo.bio),1)])]),o("div",Bt,[o("div",St,s(t.authorInfo.blogsNum)+" "+s(t.$t("blog.blogsNum")),1),a(h,{class:"mx-2",vertical:""}),o("div",It,s(t.authorInfo.follows)+" "+s(t.$t("blog.followsNum")),1),a(h,{class:"mx-2",vertical:""}),o("div",Pt,s(t.authorInfo.followers)+" "+s(t.$t("blog.followersNum")),1)])]),t.blogData.abstract?(r(),l("div",Lt,s(t.blogData.abstract),1)):g("",!0),o("div",Ht,[o("span",Nt,s(t.$t("g.tags")+" : "),1),(r(!0),l(k,null,C(t.blogData.tags,(d,p)=>(r(),l("span",Rt,[o("a",{href:`/blogs?tag=${d.key}`},s(t.getTagTranslation(d)),9,Mt),p!==t.blogData.tags.length-1?(r(),l("span",Et,", ")):g("",!0)]))),256)),t.blogData.tags===void 0||t.blogData.tags.length===0?(r(),l("span",Ft,s(t.$t("blog.noTagLabel")),1)):g("",!0)]),o("div",jt,[o("div",Ot,s(t.$t("blog.publishTime")+" : "+t.getPreciseTimeStr(t.blogData.publishTime)),1),t.blogData.lastModifyTime?(r(),l("div",Vt,s(t.$t("blog.lastModifyTime")+" : "+t.getPreciseTimeStr(t.blogData.lastModifyTime)),1)):g("",!0)]),o("div",zt,[o("div",Ut,[o("div",null,[a(F,{class:"blog-word-count-icon",size:"medium"},{default:c(()=>e[2]||(e[2]=[b(s("mdi-file-word-box"))])),_:1})]),o("span",qt,s(t.blogData.wordCount),1)]),o("div",Kt,[o("div",Jt,[o("div",Wt,s(t.blogData.viewsNum),1),o("div",Gt,s(t.$t("blog.readCount")),1)]),o("div",Qt,[o("div",Xt,s(t.blogData.starsNum),1),o("div",Yt,s(t.$t("blog.starCount")),1)]),o("div",Zt,[o("div",xt,s(t.blogData.commentsNum),1),o("div",to,s(t.$t("blog.commentCount")),1)])])])]),_:1})]),_:1}),a(h),o("div",oo,[o("div",eo,[o("div",{class:"blog-content-text",innerHTML:t.blogContent},null,8,so)])])]),a(h,{class:"my-5"}),t.isReview?g("",!0):(r(),l("div",ao,[o("div",ro,s(t.$t("blog.commentsTitleTemp")),1),o("div",no,[a(O)])]))]),o("div",io,[a(y,{class:"blog-outline",title:t.$t("blog.outline"),"scroll-offset":-35,headings:t.blogHeadings},null,8,["title","headings"])])])])}const Po=S(nt,[["render",lo],["__scopeId","data-v-31c6a0fd"]]);export{Po as default};

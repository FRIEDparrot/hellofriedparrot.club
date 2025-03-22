import{a as q,r as D}from"./isSymbol-C7jn4vLP.js";import{t as P,b as K,n as Q,i as V,c as X,a as J,r as F,d as Y}from"./index-CXIRte0K.js";import{B as S,z as Z}from"./index-CqgRRlZL.js";var ee=/\s/;function te(e){for(var t=e.length;t--&&ee.test(e.charAt(t)););return t}var ne=/^\s+/;function re(e){return e&&e.slice(0,te(e)+1).replace(ne,"")}function w(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var W=NaN,ie=/^[-+]0x[0-9a-f]+$/i,ae=/^0b[01]+$/i,oe=/^0o[0-7]+$/i,se=parseInt;function j(e){if(typeof e=="number")return e;if(q(e))return W;if(w(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=w(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=re(e);var r=ae.test(e);return r||oe.test(e)?se(e.slice(2),r?2:8):ie.test(e)?W:+e}var h=function(){return D.Date.now()},ue="Expected a function",fe=Math.max,ce=Math.min;function Pe(e,t,r){var n,u,p,o,a,c,m=0,l=!1,d=!1,i=!0;if(typeof e!="function")throw new TypeError(ue);t=j(t)||0,w(r)&&(l=!!r.leading,d="maxWait"in r,p=d?fe(j(r.maxWait)||0,t):p,i="trailing"in r?!!r.trailing:i);function s(f){var v=n,b=u;return n=u=void 0,m=f,o=e.apply(b,v),o}function O(f){return m=f,a=setTimeout(_,t),l?s(f):o}function U(f){var v=f-c,b=f-m,A=t-v;return d?ce(A,p-b):A}function T(f){var v=f-c,b=f-m;return c===void 0||v>=t||v<0||d&&b>=p}function _(){var f=h();if(T(f))return x(f);a=setTimeout(_,U(f))}function x(f){return a=void 0,i&&n?s(f):(n=u=void 0,o)}function H(){a!==void 0&&clearTimeout(a),m=0,n=c=u=a=void 0}function G(){return a===void 0?o:x(h())}function g(){var f=h(),v=T(f);if(n=arguments,u=this,c=f,v){if(a===void 0)return O(c);if(d)return clearTimeout(a),a=setTimeout(_,t),s(c)}return a===void 0&&(a=setTimeout(_,t)),o}return g.cancel=H,g.flush=G,g}function y(e){var t;const r=F(e);return(t=r==null?void 0:r.$el)!=null?t:r}const I=V?window:void 0;function E(...e){let t,r,n,u;if(K(e[0])||Array.isArray(e[0])?([r,n,u]=e,t=I):[t,r,n,u]=e,!t)return Q;Array.isArray(r)||(r=[r]),Array.isArray(n)||(n=[n]);const p=[],o=()=>{p.forEach(l=>l()),p.length=0},a=(l,d,i,s)=>(l.addEventListener(d,i,s),()=>l.removeEventListener(d,i,s)),c=S(()=>[y(t),F(u)],([l,d])=>{o(),l&&p.push(...r.flatMap(i=>n.map(s=>a(l,i,s,d))))},{immediate:!0,flush:"post"}),m=()=>{c(),o()};return P(m),m}let C=!1;function Se(e,t,r={}){const{window:n=I,ignore:u=[],capture:p=!0,detectIframe:o=!1}=r;if(!n)return;J&&!C&&(C=!0,Array.from(n.document.body.children).forEach(i=>i.addEventListener("click",Q)));let a=!0;const c=i=>u.some(s=>{if(typeof s=="string")return Array.from(n.document.querySelectorAll(s)).some(O=>O===i.target||i.composedPath().includes(O));{const O=y(s);return O&&(i.target===O||i.composedPath().includes(O))}}),l=[E(n,"click",i=>{const s=y(e);if(!(!s||s===i.target||i.composedPath().includes(s))){if(i.detail===0&&(a=!c(i)),!a){a=!0;return}t(i)}},{passive:!0,capture:p}),E(n,"pointerdown",i=>{const s=y(e);s&&(a=!i.composedPath().includes(s)&&!c(i))},{passive:!0}),o&&E(n,"blur",i=>{var s;const O=y(e);((s=n.document.activeElement)==null?void 0:s.tagName)==="IFRAME"&&!(O!=null&&O.contains(n.document.activeElement))&&t(i)})].filter(Boolean);return()=>l.forEach(i=>i())}function z(e,t=!1){const r=Z(),n=()=>r.value=!!e();return n(),X(n,t),r}const N=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},$="__vueuse_ssr_handlers__";N[$]=N[$]||{};var k=Object.getOwnPropertySymbols,le=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable,pe=(e,t)=>{var r={};for(var n in e)le.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&k)for(var n of k(e))t.indexOf(n)<0&&de.call(e,n)&&(r[n]=e[n]);return r};function Te(e,t,r={}){const n=r,{window:u=I}=n,p=pe(n,["window"]);let o;const a=z(()=>u&&"ResizeObserver"in u),c=()=>{o&&(o.disconnect(),o=void 0)},m=S(()=>y(e),d=>{c(),a.value&&u&&d&&(o=new ResizeObserver(t),o.observe(d,p))},{immediate:!0,flush:"post"}),l=()=>{c(),m()};return P(l),{isSupported:a,stop:l}}var L=Object.getOwnPropertySymbols,me=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable,ve=(e,t)=>{var r={};for(var n in e)me.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&L)for(var n of L(e))t.indexOf(n)<0&&Oe.call(e,n)&&(r[n]=e[n]);return r};function xe(e,t,r={}){const n=r,{window:u=I}=n,p=ve(n,["window"]);let o;const a=z(()=>u&&"MutationObserver"in u),c=()=>{o&&(o.disconnect(),o=void 0)},m=S(()=>y(e),d=>{c(),a.value&&u&&d&&(o=new MutationObserver(t),o.observe(d,p))},{immediate:!0}),l=()=>{c(),m()};return P(l),{isSupported:a,stop:l}}var R;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(R||(R={}));var ye=Object.defineProperty,M=Object.getOwnPropertySymbols,be=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,B=(e,t,r)=>t in e?ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ie=(e,t)=>{for(var r in t||(t={}))be.call(t,r)&&B(e,r,t[r]);if(M)for(var r of M(t))_e.call(t,r)&&B(e,r,t[r]);return e};const ge={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Ie({linear:Y},ge);export{Te as a,y as b,xe as c,Pe as d,w as i,Se as o,E as u};

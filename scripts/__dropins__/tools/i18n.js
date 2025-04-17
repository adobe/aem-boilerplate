/*! Copyright 2025 Adobe
All Rights Reserved. */
import{_ as p,b as er,G as or,x as k,E as G}from"./chunks/icons/Add.js";function B(r,t,n,e,a){for(t=t.split?t.split("."):t,e=0;e<t.length;e++)r=r?r[t[e]]:a;return r===a?n:r}var R,ar={};function u(r,t,n){if(r.nodeType===3){var e="textContent"in r?r.textContent:r.nodeValue||"";if(u.options.trim!==!1){var a=t===0||t===n.length-1;if((!(e=e.match(/^[\s\n]+$/g)&&u.options.trim!=="all"?" ":e.replace(/(^[\s\n]+|[\s\n]+$)/g,u.options.trim==="all"||a?"":" "))||e===" ")&&n.length>1&&a)return null}return e}if(r.nodeType!==1)return null;var i=String(r.nodeName).toLowerCase();if(i==="script"&&!u.options.allowScripts)return null;var o,l,c=u.h(i,function(m){var j=m&&m.length;if(!j)return null;for(var M={},O=0;O<j;O++){var d=m[O],C=d.name,T=d.value;C.substring(0,2)==="on"&&u.options.allowEvents&&(T=new Function(T)),M[C]=T}return M}(r.attributes),(l=(o=r.childNodes)&&Array.prototype.map.call(o,u).filter(ir))&&l.length?l:null);return u.visitor&&u.visitor(c),c}var V,ir=function(r){return r},lr={};function N(r){var t=(r.type||"").toLowerCase(),n=N.map;n&&n.hasOwnProperty(t)?(r.type=n[t],r.props=Object.keys(r.props||{}).reduce(function(e,a){var i;return e[i=a,i.replace(/-(.)/g,function(o,l){return l.toUpperCase()})]=r.props[a],e},{})):r.type=t.replace(/[^a-z0-9-]/i,"")}const ur=function(r){function t(){r.apply(this,arguments)}return r&&(t.__proto__=r),(t.prototype=Object.create(r&&r.prototype)).constructor=t,t.setReviver=function(n){V=n},t.prototype.shouldComponentUpdate=function(n){var e=this.props;return n.wrap!==e.wrap||n.type!==e.type||n.markup!==e.markup},t.prototype.setComponents=function(n){if(this.map={},n){for(var e in n)if(n.hasOwnProperty(e)){var a=e.replace(/([A-Z]+)([A-Z][a-z0-9])|([a-z0-9]+)([A-Z])/g,"$1$3-$2$4").toLowerCase();this.map[a]=n[e]}}},t.prototype.render=function(n){var e=n.wrap;e===void 0&&(e=!0);var a,i=n.type,o=n.markup,l=n.components,c=n.reviver,m=n.onError,j=n["allow-scripts"],M=n["allow-events"],O=n.trim,d=function(h,U){var z={};for(var w in h)Object.prototype.hasOwnProperty.call(h,w)&&U.indexOf(w)===-1&&(z[w]=h[w]);return z}(n,["wrap","type","markup","components","reviver","onError","allow-scripts","allow-events","trim"]),C=c||this.reviver||this.constructor.prototype.reviver||V||p;this.setComponents(l);var T={allowScripts:j,allowEvents:M,trim:O};try{a=function(h,U,z,w,tr){var x=function(P,W){var v,A,I,F,nr=W==="html"?"text/html":"application/xml";W==="html"?(F="body",I=`<!DOCTYPE html>
<html><body>`+P+"</body></html>"):(F="xml",I=`<?xml version="1.0" encoding="UTF-8"?>
<xml>`+P+"</xml>");try{v=new DOMParser().parseFromString(I,nr)}catch(b){A=b}if(v||W!=="html"||((v=R||(R=function(){if(document.implementation&&document.implementation.createHTMLDocument)return document.implementation.createHTMLDocument("");var b=document.createElement("iframe");return b.style.cssText="position:absolute; left:0; top:-999em; width:1px; height:1px; overflow:hidden;",b.setAttribute("sandbox","allow-forms"),document.body.appendChild(b),b.contentWindow.document}())).open(),v.write(I),v.close()),v){var $=v.getElementsByTagName(F)[0],f=$.firstChild;return P&&!f&&($.error="Document parse failed."),f&&String(f.nodeName).toLowerCase()==="parsererror"&&(f.removeChild(f.firstChild),f.removeChild(f.lastChild),$.error=f.textContent||f.nodeValue||A||"Unknown error",$.removeChild(f)),$}}(h,U);if(x&&x.error)throw new Error(x.error);var Z=x&&x.body||x;N.map=w||lr;var H=Z&&function(P,W,v,A){return u.visitor=W,u.h=v,u.options=A||ar,u(P)}(Z,N,z,tr);return N.map=null,H&&H.props&&H.props.children||null}(o,i,C,this.map,T)}catch(h){m?m({error:h}):typeof console<"u"&&console.error&&console.error("preact-markup: "+h)}if(e===!1)return a||null;var D=d.hasOwnProperty("className")?"className":"class",g=d[D];return g?g.splice?g.splice(0,0,"markup"):typeof g=="string"?d[D]+=" markup":typeof g=="object"&&(g.markup=!0):d[D]="markup",C("div",d,a||null)},t}(er);var y=or({intl:{}});function Y(r){return r!=null}function E(r,t){for(var n in t)r[n]=t[n];return r}function q(r,t){var n=E({},r);for(var e in t)t.hasOwnProperty(e)&&(r[e]&&t[e]&&typeof r[e]=="object"&&typeof t[e]=="object"?n[e]=q(r[e],t[e]):n[e]=r[e]||t[e]);return n}function pr(r){if(r=r||{},typeof r=="string"&&(r=r.split(",")),"join"in r){for(var t={},n=0;n<r.length;n++){var e=r[n].trim();e&&(t[e.split(".").pop()]=e)}return t}return r}function cr(r,t){var n={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&t.indexOf(e)===-1&&(n[e]=r[e]);return n}var sr=/[?&#]intl=show/;function J(r){var t=r.scope,n=r.mark,e=r.definition,a=cr(r,["scope","mark","definition"]),i=a,o=k(y),l=o.intl,c=E({},l||{});return t&&(c.scope=t),e&&(c.dictionary=q(c.dictionary||{},e)),(n||typeof location<"u"&&String(location).match(sr))&&(c.mark=!0),p(y.Provider,{value:{intl:c}},i.children)}function s(r,t){if(arguments.length<2)return t=r,function(e){return s(e,t)};function n(e){return p(J,t||{},p(r,e))}return n.getWrappedComponent=r&&r.getWrappedComponent||function(){return r},n}var fr={};function K(r,t,n,e){return r&&r.replace(/\{\{([\w.-]+)\}\}/g,vr.bind(null,t||fr,n,e))}function vr(r,t,n,e,a){for(var i=a.split("."),o=r,l=0;l<i.length;l++){if(o=o[i[l]],o==null)return"";if(o&&o.type===_)return L(o.props.id,t,n,o.props.fields,o.props.plural,o.props.fallback)}return typeof o=="string"&&o.match(/\{\{/)&&(o=K(o,r)),o}function L(r,t,n,e,a,i){t&&(r=t+"."+r);var o=n&&B(n,r);return(a||a===0)&&o&&typeof o=="object"&&(o.splice?o=o[a]||o[0]:a===0&&Y(o.none||o.zero)?o=o.none||o.zero:a===1&&Y(o.one||o.singular)?o=o.one||o.singular:o=o.some||o.many||o.plural||o.other||o),o&&K(o,e,t,n)||i||null}function Q(r){var t=r.value,n=r.id,e=k(y),a=e.intl;if(a&&a.mark){var i="dictionary"+(a&&a.scope?"."+a.scope:"")+"."+n;return p("mark",{style:{background:t?B(a,i)?"rgba(119,231,117,.5)":"rgba(229,226,41,.5)":"rgba(228,147,51,.5)"},title:n},t)}return t}function _(r){var t=r.id,n=r.children,e=r.plural,a=r.fields,i=k(y),o=i.intl,l=L(t,o&&o.scope,o&&o.dictionary,a,e,n);return p(Q,{id:t,value:l})}function S(r,t,n){var e={};t=t||{},r=pr(r);for(var a in r)if(r.hasOwnProperty(a)&&r[a]){var i=r[a];!n&&typeof i=="string"?e[a]=L(i,t.scope,t.dictionary):i.type===_&&(i=E({fallback:i.props.children},i.props),e[a]=L(i.id,t.scope,t.dictionary,i.fields,i.plural,i.fallback))}return e}function X(r){var t=r.children,n=k(y),e=n.intl;return t&&t.length?t.map(function(a){return G(a,S(a.props,e,!0))}):t&&G(t,S(t.props,e,!0))}function rr(r,t){var n={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&t.indexOf(e)===-1&&(n[e]=r[e]);return n}function mr(r){var t=r.id,n=r.fields,e=r.plural,a=r.children,i=rr(r,["id","fields","plural","children"]),o=i;return p(X,null,p(dr,Object.assign({},{html:p(_,{id:t,fields:n,plural:e,children:a}),id:t},o)))}function dr(r){var t=r.html,n=r.id,e=rr(r,["html","id"]),a=e;return p(Q,{id:n,value:t&&(typeof t=="string"?p(ur,Object.assign({},{type:"html",trim:!1},a,{markup:t})):p("span",null,t))})}function hr(r){return function(n){function e(a,i){var o=k(y),l=o.intl,c=typeof r=="function"?r(a,{intl:l}):r,m=S(c,l);return p(n,E(E({},a),m))}return e.getWrappedComponent=n&&n.getWrappedComponent||function(){return n},e}}function yr(r){var t=k(y),n=t.intl;return S(typeof r=="function"?r({intl:n}):r,n)}s.intl=s;s.IntlContext=y;s.IntlProvider=J;s.Text=_;s.MarkupText=mr;s.Localizer=X;s.withText=hr;s.useText=yr;s.translate=L;export{y as IntlContext,J as IntlProvider,X as Localizer,mr as MarkupText,_ as Text,s as default,s as intl,L as translate,yr as useText,hr as withText};

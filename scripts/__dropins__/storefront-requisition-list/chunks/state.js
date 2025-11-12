/*! Copyright 2025 Adobe
All Rights Reserved. */
const n={authenticated:!1,requisitionLists:[],requisitionListsLoading:!1,requisitionListsVersion:0},s=new Proxy(n,{set(i,e,t){return Reflect.set(i,e,t)},get(i,e){return i[e]}}),o=i=>{s.requisitionLists=i,s.requisitionListsVersion++},u=i=>{s.requisitionLists.some(t=>t.uid===i.uid)?s.requisitionLists=s.requisitionLists.map(t=>t.uid===i.uid?i:t):s.requisitionLists=[...s.requisitionLists,i],s.requisitionListsVersion++},r=i=>{s.requisitionListsLoading=i};export{r as a,o as b,s,u};
//# sourceMappingURL=state.js.map

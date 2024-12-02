/*! Copyright 2024 Adobe
All Rights Reserved. */
import{signal as e,effect as i}from"@dropins/tools/signals.js";const n=e(!0),t=e({pending:!1,data:void 0});i(()=>{var a;(a=t.value.data)!=null&&a.isVirtual&&(n.value=!1)});const d=e({pending:!1,data:void 0}),l=e({pending:!1,data:void 0}),g=e(),c=e(void 0),N=e({data:void 0,pending:!1});var s=(a=>(a.EXCLUDING_TAX="EXCLUDING_TAX",a.INCLUDING_EXCLUDING_TAX="INCLUDING_AND_EXCLUDING_TAX",a.INCLUDING_TAX="INCLUDING_TAX",a))(s||{});export{s as T,N as a,g as b,t as c,d,l as e,n as i,c as s};

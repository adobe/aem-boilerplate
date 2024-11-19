/*! Copyright 2024 Adobe
All Rights Reserved. */
import{signal as i,effect as e}from"@dropins/tools/signals.js";const n=i(!0),s=i({pending:!1,data:void 0});e(()=>{var a;(a=s.value.data)!=null&&a.isVirtual&&(n.value=!1)});const d=i({pending:!1,data:void 0}),l=i({pending:!1,data:void 0}),g=i(void 0),N=i({data:void 0,pending:!1});var t=(a=>(a.EXCLUDING_TAX="EXCLUDING_TAX",a.INCLUDING_EXCLUDING_TAX="INCLUDING_AND_EXCLUDING_TAX",a.INCLUDING_TAX="INCLUDING_TAX",a))(t||{});export{t as T,N as a,d as b,s as c,l as e,n as i,g as s};

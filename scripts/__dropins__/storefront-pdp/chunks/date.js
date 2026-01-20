/*! Copyright 2026 Adobe
All Rights Reserved. */
import{toLanguageTag as n}from"@dropins/tools/lib.js";function a(t,d="en_US"){if(!o(t))throw Error("Invalid date string");return t.split(" ")[1]||(t=`${t} 00:00:00`),new Date(t).toLocaleDateString(n(d)).toString()}function o(t){if(![/^\d{4}-\d{2}-\d{2}$/,/^\d{1,2}\/\d{1,2}\/\d{4}$/,/^\d{2}\/\d{2}\/\d{4}$/,/^\d{4}\/\d{2}\/\d{2}$/,/^\d{1,2}\.\d{1,2}\.\d{4}$/,/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/].some(i=>i.test(t)))return!1;const e=new Date(t);return!isNaN(e.getTime())}export{o as i,a as t};
//# sourceMappingURL=date.js.map

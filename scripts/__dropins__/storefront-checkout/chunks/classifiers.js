/*! Copyright 2025 Adobe
All Rights Reserved. */
import{I as E,U as N}from"./fetch-graphql.js";var I=(R=>(R.INVALID_INPUT="INVALID_INPUT",R.SERVER_ERROR="SERVER_ERROR",R.UNAUTHENTICATED="UNAUTHENTICATED",R.UNKNOWN_ERROR="UNKNOWN_ERROR",R.QUOTE_DATA_ERROR="QUOTE_DATA_ERROR",R.QUOTE_PERMISSION_DENIED="QUOTE_PERMISSION_DENIED",R))(I||{});const t=["PlaceOrderError"],a=[{code:"INVALID_INPUT",matches:R=>R instanceof E},{code:"UNAUTHENTICATED",matches:R=>R instanceof N},{code:"SERVER_ERROR",matches:R=>!R||typeof R!="object"||!("name"in R)?!1:t.includes(R.name)}];export{I as E,a as c};
//# sourceMappingURL=classifiers.js.map

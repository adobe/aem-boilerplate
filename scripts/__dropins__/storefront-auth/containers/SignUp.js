import{jsx as r}from"@dropins/tools/preact-jsx-runtime.js";import{S}from"../chunks/SignUpForm.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import"../chunks/createCustomerAddress.js";import"../chunks/network-error.js";import"@dropins/tools/fetch-graphql.js";import"../chunks/setReCaptchaToken.js";import"../chunks/transform-attributes-form.js";import"../chunks/getStoreConfig.js";import"@dropins/tools/preact-hooks.js";import"../chunks/simplifyTransformAttributesForm.js";import"../chunks/usePasswordValidationMessage.js";import"@dropins/tools/i18n.js";import"../chunks/getCustomerToken.js";import"../chunks/initialize.js";import"../chunks/useInLineAlert.js";import"@dropins/tools/components.js";import"@dropins/tools/preact-compat.js";import"../chunks/SkeletonLoader.js";import"../chunks/EmailConfirmationForm.js";import"../chunks/resendConfirmationEmail.js";const L=({slots:i,formSize:o,apiVersion2:t,addressesData:m,isAutoSignInEnabled:p,inputsDefaultValueSet:s,displayNewsletterCheckbox:a,displayTermsOfUseCheckbox:n,fieldsConfigForApiVersion1:e,hideCloseBtnOnEmailConfirmation:u,routeRedirectOnEmailConfirmationClose:c,routeRedirectOnSignIn:d,onSuccessCallback:f,onErrorCallback:g,routeSignIn:l})=>r("div",{className:"auth-sign-up",children:r(S,{formSize:o,apiVersion2:t,addressesData:m,isAutoSignInEnabled:p,inputsDefaultValueSet:s,fieldsConfigForApiVersion1:e,displayNewsletterCheckbox:a,displayTermsOfUseCheckbox:n,hideCloseBtnOnEmailConfirmation:u,routeRedirectOnEmailConfirmationClose:c,routeRedirectOnSignIn:d,routeSignIn:l,slots:i,onErrorCallback:g,onSuccessCallback:f})});export{L as SignUp,L as default};
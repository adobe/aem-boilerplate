"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryParam = void 0;
const getQueryParam = (param) => {
    try {
        const currentUrl = new URL(window.location.href);
        const paramValue = currentUrl.searchParams.get(param);
        return paramValue;
    }
    catch (error) {
        return null;
    }
};
exports.getQueryParam = getQueryParam;

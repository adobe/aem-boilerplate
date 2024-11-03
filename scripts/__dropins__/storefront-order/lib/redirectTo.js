"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectTo = void 0;
const redirectTo = (getUrl, queryParams) => {
    if (typeof getUrl !== 'function')
        return;
    const url = getUrl();
    if (!queryParams || Object.keys(queryParams).length === 0) {
        window.location.href = url;
        return;
    }
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        searchParams.append(key, String(value));
    });
    const separator = url.includes('?') ? '&' : '?';
    window.location.href = `${url}${separator}${searchParams.toString()}`;
};
exports.redirectTo = redirectTo;

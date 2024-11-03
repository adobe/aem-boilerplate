"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCustomer = void 0;
const transformCustomer = (response) => {
    return {
        email: response?.data?.customer?.email || '',
        firstname: response?.data?.customer?.firstname || '',
        lastname: response?.data?.customer?.lastname || '',
    };
};
exports.transformCustomer = transformCustomer;

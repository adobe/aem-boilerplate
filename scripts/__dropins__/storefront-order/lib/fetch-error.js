"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFetchError = void 0;
/** Actions */
const handleFetchError = (errors) => {
    const errorMessage = errors.map((e) => e.message).join(' ');
    throw Error(errorMessage);
};
exports.handleFetchError = handleFetchError;

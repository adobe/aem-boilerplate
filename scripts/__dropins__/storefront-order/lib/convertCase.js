"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertKeysCase = exports.convertToSnakeCase = exports.convertToCamelCase = void 0;
const convertToCamelCase = (key) => {
    return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
exports.convertToCamelCase = convertToCamelCase;
const convertToSnakeCase = (key) => {
    return key.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
};
exports.convertToSnakeCase = convertToSnakeCase;
const convertKeysCase = (data, type, dictionary) => {
    const typeList = ['string', 'boolean', 'number'];
    const callback = type === 'camelCase' ? exports.convertToCamelCase : exports.convertToSnakeCase;
    if (Array.isArray(data)) {
        return data.map((element) => {
            if (typeList.includes(typeof element) || element === null)
                return element;
            if (typeof element === 'object') {
                return (0, exports.convertKeysCase)(element, type, dictionary);
            }
            return element;
        });
    }
    if (data !== null && typeof data === 'object') {
        return Object.entries(data).reduce((acc, [key, value]) => {
            const newKey = dictionary && dictionary[key] ? dictionary[key] : callback(key);
            acc[newKey] =
                typeList.includes(typeof value) || value === null
                    ? value
                    : (0, exports.convertKeysCase)(value, type, dictionary);
            return acc;
        }, {});
    }
    return data;
};
exports.convertKeysCase = convertKeysCase;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAttributesForm = exports.cloneArrayIfExists = void 0;
const convertCase_1 = require("@/order/lib/convertCase");
const cloneArrayIfExists = (fields) => {
    let multilineItems = [];
    for (const element of fields) {
        if (element.frontend_input !== 'MULTILINE' || element.multiline_count < 2) {
            continue;
        }
        for (let i = 2; i <= element.multiline_count; i++) {
            const newItem = {
                ...element,
                name: `${element.code}_${i}`,
                code: `${element.code}_${i}`,
                id: `${element.code}_${i}`,
            };
            multilineItems.push(newItem);
        }
    }
    return multilineItems;
};
exports.cloneArrayIfExists = cloneArrayIfExists;
const transformAttributesForm = (response) => {
    const items = response?.data?.attributesForm?.items || [];
    if (!items.length)
        return [];
    const fields = items
        .filter((el) => !el.frontend_input?.includes('HIDDEN'))
        ?.map(({ code, ...other }) => {
        const isDefaultCode = code !== 'country_id' ? code : 'country_code';
        return {
            ...other,
            name: isDefaultCode,
            id: isDefaultCode,
            code: isDefaultCode,
        };
    });
    const multilineItems = (0, exports.cloneArrayIfExists)(fields);
    const attributesConfig = fields
        .concat(multilineItems)
        .map((item) => {
        const customUpperCode = (0, convertCase_1.convertToCamelCase)(item.code);
        return (0, convertCase_1.convertKeysCase)({ ...item, customUpperCode }, 'camelCase', {
            frontend_input: 'fieldType',
            frontend_class: 'className',
            is_required: 'required',
            sort_order: 'orderNumber',
        });
    })
        .sort((a, b) => a.orderNumber - b.orderNumber);
    return attributesConfig;
};
exports.transformAttributesForm = transformAttributesForm;

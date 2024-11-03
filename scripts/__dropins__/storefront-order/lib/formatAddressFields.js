"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddressFields = void 0;
const formatAddressFields = (fields) => {
    fields.sort((a, b) => a.orderNumber - b.orderNumber);
    const formatted = [];
    let currentRow = [];
    const hasValidValue = (field) => {
        return (field.value !== undefined && field.value !== null && field.value !== '');
    };
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (!hasValidValue(field))
            continue;
        if (Array.isArray(field.value)) {
            const arrayRow = field.value.map((valueItem) => ({
                ...field,
                value: valueItem,
            }));
            formatted.push(arrayRow);
        }
        else if (formatted.length < 4) {
            currentRow.push(field);
            if (currentRow.length === 2) {
                formatted.push(currentRow);
                currentRow = [];
            }
        }
        else {
            formatted.push([field]);
        }
    }
    if (currentRow.length > 0 && formatted.length < 4) {
        formatted.push(currentRow);
    }
    return formatted;
};
exports.formatAddressFields = formatAddressFields;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnOrderProductList = void 0;
const ReturnOrderProductList_1 = require("@/order/components/ReturnOrderProductList");
/**
 * Use ReturnOrderProductLists to [replace this text with components purpose].
 */
const meta = {
    title: 'Components/ReturnOrderProductList',
    component: ReturnOrderProductList_1.ReturnOrderProductList,
    argTypes: {
        children: {
            description: 'Add text to the ReturnOrderProductList.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'ReturnOrderProductList defaultValue for children.' },
            },
        },
        onClick: {
            description: 'Add a click handler.',
            table: {
                type: { summary: 'function' },
            },
            action: 'onClick',
        },
    },
};
exports.default = meta;
/**
 * <ReturnOrderProductList>👋 Hello from your new ReturnOrderProductList story!</ReturnOrderProductList>
 */
exports.ReturnOrderProductList = {
    args: {
        children: "👋 Hello from your new ReturnOrderProductList story!",
    },
};

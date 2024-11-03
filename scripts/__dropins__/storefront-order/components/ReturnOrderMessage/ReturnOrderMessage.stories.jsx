"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnOrderMessage = void 0;
const ReturnOrderMessage_1 = require("@/order/components/ReturnOrderMessage");
/**
 * Use ReturnOrderMessages to [replace this text with components purpose].
 */
const meta = {
    title: 'Components/ReturnOrderMessage',
    component: ReturnOrderMessage_1.ReturnOrderMessage,
    argTypes: {
        children: {
            description: 'Add text to the ReturnOrderMessage.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'ReturnOrderMessage defaultValue for children.' },
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
 * <ReturnOrderMessage>👋 Hello from your new ReturnOrderMessage story!</ReturnOrderMessage>
 */
exports.ReturnOrderMessage = {
    args: {
        children: "👋 Hello from your new ReturnOrderMessage story!",
    },
};

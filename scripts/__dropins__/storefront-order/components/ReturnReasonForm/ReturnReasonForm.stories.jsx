"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnReasonForm = void 0;
const ReturnReasonForm_1 = require("@/order/components/ReturnReasonForm");
/**
 * Use ReturnReasonForms to [replace this text with components purpose].
 */
const meta = {
    title: 'Components/ReturnReasonForm',
    component: ReturnReasonForm_1.ReturnReasonForm,
    argTypes: {
        children: {
            description: 'Add text to the ReturnReasonForm.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'ReturnReasonForm defaultValue for children.' },
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
 * <ReturnReasonForm>👋 Hello from your new ReturnReasonForm story!</ReturnReasonForm>
 */
exports.ReturnReasonForm = {
    args: {
        children: "👋 Hello from your new ReturnReasonForm story!",
    },
};

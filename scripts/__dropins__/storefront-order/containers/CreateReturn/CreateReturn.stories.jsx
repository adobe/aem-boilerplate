"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReturn = void 0;
const CreateReturn_1 = require("@/order/containers/CreateReturn");
const meta = {
    title: 'Containers/CreateReturn',
    component: CreateReturn_1.CreateReturn,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
};
exports.default = meta;
/**
 * ```ts
 * import { CreateReturn } from '@/order/containers/CreateReturn';
 * ```
 */
exports.CreateReturn = {
    args: {
        children: "👋 Howdy, I'm Howdy!",
    },
};

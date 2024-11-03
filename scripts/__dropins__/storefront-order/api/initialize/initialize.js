"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.initialize = void 0;
const lib_1 = require("@adobe/elsie/lib");
const initializeOrderDetails_1 = require("../helpers/initializeOrderDetails");
exports.initialize = new lib_1.Initializer({
    init: async (config) => {
        const defaultConfig = {};
        exports.initialize.config.setConfig({ ...defaultConfig, ...config });
        (0, initializeOrderDetails_1.initializeOrderDetails)(config).catch(console.error);
    },
    listeners: () => [],
});
exports.config = exports.initialize.config;

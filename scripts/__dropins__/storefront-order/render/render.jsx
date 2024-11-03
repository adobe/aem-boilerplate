"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const lib_1 = require("@adobe/elsie/lib");
const Provider_1 = require("./Provider");
exports.render = new lib_1.Render(<Provider_1.Provider />);

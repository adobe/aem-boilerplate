"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTaxStatus = void 0;
const setTaxStatus = (displayPrice) => {
    let taxIncluded = false;
    let taxExcluded = false;
    switch (displayPrice) {
        case 1:
            taxExcluded = true;
            break;
        case 2:
            taxIncluded = true;
            break;
        case 3:
            taxIncluded = true;
            taxExcluded = true;
            break;
        default:
            taxIncluded = false;
            taxExcluded = false;
    }
    return { taxIncluded, taxExcluded };
};
exports.setTaxStatus = setTaxStatus;

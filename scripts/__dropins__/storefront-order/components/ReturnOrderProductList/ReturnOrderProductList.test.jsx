"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const ReturnOrderProductList_1 = require("@/order/components/ReturnOrderProductList");
describe('order/Components/ReturnOrderProductList', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<ReturnOrderProductList_1.ReturnOrderProductList />);
        expect(!!container).toEqual(true);
    });
});

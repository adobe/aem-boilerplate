"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const ReturnOrderMessage_1 = require("@/order/components/ReturnOrderMessage");
describe('order/Components/ReturnOrderMessage', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<ReturnOrderMessage_1.ReturnOrderMessage />);
        expect(!!container).toEqual(true);
    });
});

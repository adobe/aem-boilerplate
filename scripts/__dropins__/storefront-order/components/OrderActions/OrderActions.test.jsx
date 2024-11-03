"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderActions_1 = require("@/order/components/OrderActions");
describe('[Order-Components] - OrderActions', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderActions_1.OrderActions />);
        expect(!!container).toEqual(true);
    });
});

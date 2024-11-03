"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderSearch_1 = require("@/order/containers/OrderSearch");
describe('[Order-Containers] - OrderSearch', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderSearch_1.OrderSearch />);
        expect(!!container).toEqual(true);
    });
});

"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderLoaders_1 = require("./OrderLoaders");
describe('[Order-Component] - OrderLoaders', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderLoaders_1.CardLoader />);
        expect(!!container).toEqual(true);
    });
    test('renders OrderProductListSkeleton', () => {
        const { container } = (0, tests_1.render)(<OrderLoaders_1.OrderProductListSkeleton />);
        expect(!!container).toEqual(true);
    });
});

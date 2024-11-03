"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** https://preactjs.com/guide/v10/preact-testing-library/ */
// @ts-nocheck
const tests_1 = require("@adobe/elsie/lib/tests");
const EmptyList_1 = require("@/order/components/EmptyList");
describe('[Order-Component] - EmptyList', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<EmptyList_1.EmptyList isEmpty={true} typeList="address" minifiedView={true}/>);
        expect(!!container).toEqual(true);
    });
    test('renders icon orders', () => {
        const { container } = (0, tests_1.render)(<EmptyList_1.EmptyList isEmpty={true} typeList="orders" minifiedView={true}/>);
        expect(!!container).toEqual(true);
    });
    test('should return null when isEmpty is false', () => {
        const { container } = (0, tests_1.render)(<EmptyList_1.EmptyList isEmpty={false} typeList="address" minifiedView={true}/>);
        expect(container.firstChild?.className).toBe('dropin-design');
    });
    test('should return null when typeList is incorrect', () => {
        const { container } = (0, tests_1.render)(<EmptyList_1.EmptyList isEmpty={true} typeList="test" minifiedView={true}/>);
        expect(container.firstChild?.className).toBe('dropin-design');
    });
});

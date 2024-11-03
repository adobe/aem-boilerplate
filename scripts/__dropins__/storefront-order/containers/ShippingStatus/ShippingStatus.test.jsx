"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const ShippingStatus_1 = require("@/order/containers/ShippingStatus");
const mock_config_1 = require("@/order/configs/mock.config");
describe('order/Containers/ShippingStatus', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <ShippingStatus_1.ShippingStatus orderData={mock_config_1.transformMockOrderOutput}/>);
        expect(!!container).toEqual(true);
        const pendingMessages = tests_1.screen.getAllByTestId('dropin-header-container');
        expect(pendingMessages).toHaveLength(3);
        expect(pendingMessages[0]).toBeInTheDocument();
    });
    test('renders null', () => {
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <ShippingStatus_1.ShippingStatus orderData={null}/>);
        expect(!!container).toEqual(true);
    });
});

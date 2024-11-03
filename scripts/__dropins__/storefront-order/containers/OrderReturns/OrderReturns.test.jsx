"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const OrderReturns_1 = require("@/order/containers/OrderReturns");
const hooks_1 = require("@/order/hooks");
const useOrderReturns_1 = require("@/order/hooks/containers/useOrderReturns");
jest.mock('@/order/hooks/containers/useOrderReturns');
jest.mock('@/order/hooks/useIsMobile');
describe('order/Containers/OrderReturns', () => {
    const slots = {};
    const className = '';
    const orderData = undefined;
    const withHeader = true;
    const withThumbnails = true;
    const routeReturnDetails = () => { };
    const routeTracking = () => { };
    const minifiedViewKey = 'fullSizeView';
    const defaultProps = {
        slots,
        className,
        orderData,
        withHeader,
        withThumbnails,
        minifiedViewKey,
        routeReturnDetails,
        routeTracking,
    };
    test('renders', () => {
        useOrderReturns_1.useOrderReturns.mockReturnValue({
            orderReturns: [
                { token: '123456', orderNumber: '1234567890', tracking: [], items: [] },
            ],
            loading: false,
        });
        hooks_1.useIsMobile.mockReturnValue(false);
        const { container } = (0, tests_1.render)(<OrderReturns_1.OrderReturns {...defaultProps}/>);
        expect(!!container).toEqual(true);
    });
    test('renders loader', () => {
        useOrderReturns_1.useOrderReturns.mockReturnValue({
            orderReturns: [],
        });
        hooks_1.useIsMobile.mockReturnValue(false);
        const { container } = (0, tests_1.render)(<OrderReturns_1.OrderReturns {...defaultProps}/>);
        const divElement = container.querySelector('.order-order-returns');
        expect(divElement).toBeEmptyDOMElement();
    });
});

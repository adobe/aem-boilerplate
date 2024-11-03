"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderStatus_1 = require("@/order/containers/OrderStatus");
require("@testing-library/jest-dom");
const mock_config_1 = require("@/order/configs/mock.config");
const useGetStoreConfig_1 = require("@/order/hooks/api/useGetStoreConfig");
const useConfirmCancelOrder_1 = require("@/order/hooks/containers/useConfirmCancelOrder");
jest.mock('@/order/hooks/api/useGetStoreConfig', () => ({
    useGetStoreConfig: jest.fn(),
}));
jest.mock('@/order/hooks/containers/useConfirmCancelOrder', () => ({
    useConfirmCancelOrder: jest.fn(),
}));
describe('[Order-Containers] - OrderStatus', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders with order cancellation disabled', () => {
        useGetStoreConfig_1.useGetStoreConfig.mockReturnValue({
            orderCancellationEnabled: false,
        });
        useConfirmCancelOrder_1.useConfirmCancelOrder.mockReturnValue({
            confirmOrderCancellation: {},
        });
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <OrderStatus_1.OrderStatus orderData={mock_config_1.transformMockOrderOutput}/>);
        expect(container).toMatchSnapshot();
    });
    test('renders with order cancellation enabled, successfully cancels an order and alert is dismissed', () => {
        useGetStoreConfig_1.useGetStoreConfig.mockReturnValue({
            orderCancellationEnabled: true,
        });
        useConfirmCancelOrder_1.useConfirmCancelOrder.mockReturnValue({
            confirmOrderCancellation: {
                text: 'This order was cancelled by you. You should see a refund to your original payment method with 5-7 business days',
                status: 'success',
            },
        });
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <OrderStatus_1.OrderStatus orderData={mock_config_1.transformMockOrderOutput}/>);
        expect(container).toMatchSnapshot();
        expect(container.querySelector('.dropin-in-line-alert__dismiss-button')).toBeInTheDocument();
        const dismissButton = tests_1.screen.getByLabelText('Dismiss Alert');
        tests_1.fireEvent.click(dismissButton);
        expect(container.querySelector('.dropin-in-line-alert__dismiss-button')).not.toBeInTheDocument();
    });
    test('renders with order cancellation enabled but order was not cancelled', () => {
        useGetStoreConfig_1.useGetStoreConfig.mockReturnValue({
            orderCancellationEnabled: true,
        });
        useConfirmCancelOrder_1.useConfirmCancelOrder.mockReturnValue({
            confirmOrderCancellation: {
                text: '',
                status: undefined,
            },
        });
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <OrderStatus_1.OrderStatus orderData={mock_config_1.transformMockOrderOutput}/>);
        expect(container).toMatchSnapshot();
    });
    test('renders null', () => {
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <OrderStatus_1.OrderStatus orderData={null}/>);
        expect(container).toMatchSnapshot();
    });
});

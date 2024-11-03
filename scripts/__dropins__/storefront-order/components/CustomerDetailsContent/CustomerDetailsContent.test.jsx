"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** https://preactjs.com/guide/v10/preact-testing-library/ */
// @ts-nocheck
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const CustomerDetailsContent_1 = require("@/order/components/CustomerDetailsContent");
const mock_config_1 = require("@/order/configs/mock.config");
describe('order/Components/CustomerDetailsContent', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent order={mock_config_1.transformMockOrderOutput} normalizeAddress={mock_config_1.storyBookNormalizeAddress} loading={false}/>);
        expect(!!container).toEqual(true);
    });
    test('renders skeleton', () => {
        const { container } = (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent loading={true}/>);
        expect(!!container).toEqual(true);
        const element = tests_1.screen.getByTestId('order-details-skeleton');
        expect(element).toBeInTheDocument();
    });
    test('renders if hasToDisplayShippingMethod === true and hasToDisplayPaymentMethod === true', () => {
        const order = {
            shipping: {
                code: 'code',
                amount: 10,
                currency: 'USD',
            },
            payments: [
                {
                    code: 'checkmo',
                    name: 'Check / Money order',
                },
                { name: 'card', code: 'card' },
            ],
        };
        (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent order={order} normalizeAddress={{}} loading={false}/>);
        const shippingMethodsPrice = tests_1.screen.getByTestId('shipping_methods_price');
        const billingMethodsDescription = tests_1.screen.getByTestId('billing_methods_description');
        expect(shippingMethodsPrice).toBeInTheDocument();
        expect(billingMethodsDescription).toBeInTheDocument();
    });
    test('renders if hasToDisplayShippingMethod === false and hasToDisplayPaymentMethod === false', () => {
        const order = {
            shipping: null,
            payments: null,
        };
        (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent order={order} normalizeAddress={mock_config_1.storyBookNormalizeAddress} loading={false}/>);
        const shippingMethodsPrice = tests_1.screen.queryByTestId('shipping_methods_price');
        const billingMethodsDescription = tests_1.screen.queryByTestId('billing_methods_description');
        const paymentMethodIcon = tests_1.screen.queryByTestId('payment_method_icon');
        expect(shippingMethodsPrice).not.toBeInTheDocument();
        expect(billingMethodsDescription).not.toBeInTheDocument();
        expect(paymentMethodIcon).not.toBeInTheDocument();
    });
    test('render when shippingCost is placeholder', () => {
        const order = {
            shipping: { code: 'card', amount: 0, currency: 'USD' },
        };
        (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent order={order} normalizeAddress={{}} loading={false}/>);
        const shippingMethodsPlaceholder = tests_1.screen.getByTestId('shipping_methods_placeholder');
        expect(shippingMethodsPlaceholder).toBeInTheDocument();
    });
    test('renders Header when withHeader is true', () => {
        (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent order={mock_config_1.transformMockOrderOutput} normalizeAddress={{}} loading={false} withHeader={true}/>);
        const headerTitle = tests_1.screen.getByText('Customer information');
        expect(headerTitle).toBeInTheDocument();
    });
    test('does not render Header when withHeader is false', () => {
        (0, tests_1.render)(<CustomerDetailsContent_1.CustomerDetailsContent order={mock_config_1.transformMockOrderOutput} normalizeAddress={{}} loading={false} withHeader={false}/>);
        const headerTitle = tests_1.screen.queryByText('Customer information');
        expect(headerTitle).not.toBeInTheDocument();
    });
});

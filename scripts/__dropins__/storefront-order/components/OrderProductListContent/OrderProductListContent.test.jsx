"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** https://preactjs.com/guide/v10/preact-testing-library/ */
// @ts-nocheck
const OrderProductListContent_1 = require("@/order/components/OrderProductListContent/OrderProductListContent");
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const mock_config_1 = require("@/order/configs/mock.config");
const taxConfig = {
    taxIncluded: true,
    taxExcluded: true,
};
const loading = false;
describe('[ORDER-PRODUCT-LIST-CONTENT] - OrderProductListContent', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent taxConfig={{
                taxIncluded: false,
                taxExcluded: true,
            }} loading={false}/>);
        expect(!!container).toEqual(true);
    });
    test('renders loading skeleton when order is null', () => {
        (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={null} taxConfig={taxConfig} loading={loading}/>);
        expect(tests_1.screen.getByTestId('order-product-list-skeleton')).toBeInTheDocument();
    });
    test('renders the component with the header enabled', () => {
        const { container } = (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={{
                ...mock_config_1.transformMockOrderOutput,
                ...mock_config_1.orderMockOrderProductItemsList,
            }} withHeader={true} showConfigurableOptions={() => { }} taxConfig={taxConfig} loading={loading}/>);
        const elements = container.querySelectorAll('[data-testid="product-name"]');
        let divCount = 0;
        elements.forEach((element) => {
            if (element.tagName.toLowerCase() === 'div') {
                divCount += 1;
            }
        });
        expect(tests_1.screen.getByText('Your order (13)')).toBeInTheDocument();
        expect(tests_1.screen.getByText('Cancelled (1)')).toBeInTheDocument();
        expect(divCount).toBe(14);
    });
    test('renders the component with the header disabled', () => {
        (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={{
                ...mock_config_1.transformMockOrderOutput,
                ...mock_config_1.orderMockOrderProductItemsList,
            }} withHeader={false} showConfigurableOptions={() => { }} taxConfig={taxConfig} loading={loading}/>);
        expect(tests_1.screen.queryByText('Your order (5)')).not.toBeInTheDocument();
        expect(tests_1.screen.queryByText('Cancelled (2)')).not.toBeInTheDocument();
    });
    test('renders the component with a canceled in-stock product', () => {
        const { container } = (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={{
                ...mock_config_1.transformMockOrderOutput,
                ...mock_config_1.orderMockOrderProductItemsList,
            }} withHeader={false} showConfigurableOptions={() => { }} taxConfig={taxConfig} loading={loading}/>);
        const elements = container.querySelectorAll('.dropin-cart-item__alert');
        expect(elements.length).toBe(2);
    });
    test('renders the component with taxIncluded && taxExcluded', () => {
        const { container } = (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={{
                ...mock_config_1.transformMockOrderOutput,
                ...mock_config_1.orderMockOrderProductItemsList,
            }} withHeader={false} showConfigurableOptions={() => { }} taxConfig={taxConfig} loading={loading}/>);
        expect(container).toMatchSnapshot();
    });
    test('renders the component with !taxIncluded && taxExcluded', () => {
        const { container } = (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={{
                ...mock_config_1.transformMockOrderOutput,
                ...mock_config_1.orderMockOrderProductItemsList,
            }} withHeader={false} showConfigurableOptions={() => { }} taxConfig={{
                taxIncluded: false,
                taxExcluded: true,
            }} loading={loading}/>);
        expect(container).toMatchSnapshot();
    });
    test('renders the component with taxIncluded && !taxExcluded', () => {
        const { container } = (0, tests_1.render)(<OrderProductListContent_1.OrderProductListContent order={{
                ...mock_config_1.transformMockOrderOutput,
                ...mock_config_1.orderMockOrderProductItemsList,
            }} withHeader={false} showConfigurableOptions={() => { }} taxConfig={{
                taxIncluded: true,
                taxExcluded: false,
            }} loading={loading}/>);
        expect(container).toMatchSnapshot();
    });
});

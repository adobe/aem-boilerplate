"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderCostSummaryContent_1 = require("@/order/components/OrderCostSummaryContent");
const mock_config_1 = require("@/order/configs/mock.config");
describe('order/Components/OrderCostSummaryContent', () => {
    const storeConfig = {
        shoppingCartDisplayPrice: {
            taxIncluded: false,
            taxExcluded: false,
        },
        shoppingOrdersDisplayShipping: {
            taxIncluded: false,
            taxExcluded: false,
        },
        shoppingOrdersDisplaySubtotal: {
            taxIncluded: false,
            taxExcluded: false,
        },
        shoppingOrdersDisplayTaxGiftWrapping: '',
        shoppingOrdersDisplayFullSummary: false,
        shoppingOrdersDisplayGrandTotal: false,
        shoppingOrdersDisplayZeroTax: false,
    };
    const loading = false;
    const withHeader = true;
    const order = mock_config_1.orderCostSummaryMockup;
    const defaultProps = {
        translations: mock_config_1.translationsOrderCostSummaryMock,
        storeConfig,
        loading,
        withHeader,
        order,
    };
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} withHeader={undefined} order={{
                ...mock_config_1.orderCostSummaryMockup,
                // @ts-ignore
                totalGiftcard: null,
                // @ts-ignore
                subtotal: null,
                // @ts-ignore
                totalShipping: null,
            }}/>);
        expect(!!container).toEqual(true);
        const orderSummaryElement = tests_1.screen.getByText(/Order summary/i);
        expect(orderSummaryElement).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders empty', () => {
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} order={undefined}/>);
        expect(!!container).toEqual(true);
        const orderSummaryElement = tests_1.screen.queryByText((content) => {
            return content.startsWith('Order summary');
        });
        expect(orderSummaryElement).not.toBeInTheDocument();
    });
    test('renders with no header', () => {
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} withHeader={false}/>);
        expect(!!container).toEqual(true);
        const orderSummaryElement = tests_1.screen.queryByText((content) => {
            return content.startsWith('Order summary');
        });
        expect(orderSummaryElement).not.toBeInTheDocument();
    });
    test('renders with free shipping option', () => {
        const mockupWithoutTotalShippingOption = {
            ...mock_config_1.orderCostSummaryMockup,
            totalShipping: { value: 0, currency: 'USD' },
        };
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} order={mockupWithoutTotalShippingOption}/>);
        expect(!!container).toEqual(true);
        const orderSummaryElement = tests_1.screen.getByText(/Free Shipping/i);
        expect(orderSummaryElement).toBeInTheDocument();
    });
    test('renders with paid shipping option', () => {
        const totalShippingValue = mock_config_1.orderCostSummaryMockup.totalShipping.value.toFixed(2);
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps}/>);
        expect(!!container).toEqual(true);
        const orderSummaryShipping = tests_1.screen.getByText(/Shipping/i);
        expect(orderSummaryShipping).toBeInTheDocument();
        expect(totalShippingValue).toEqual('5.99');
    });
    test('renders tax section', () => {
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps}/>);
        expect(!!container).toEqual(true);
        const orderSummaryTaxElement = tests_1.screen.getByText('Tax');
        expect(orderSummaryTaxElement).toBeInTheDocument();
    });
    test('renders without discount and totalGiftCard', () => {
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} order={{
                ...mock_config_1.orderCostSummaryMockup,
                discounts: [],
                totalGiftcard: { value: 0 },
            }}/>);
        expect(!!container).toEqual(true);
        const orderSummaryDiscounts = tests_1.screen.queryByText((content) => {
            return content.startsWith('Discount');
        });
        expect(orderSummaryDiscounts).not.toBeInTheDocument();
    });
    test('renders with discounts and totalGiftCard', () => {
        const totalGiftCard = mock_config_1.orderCostSummaryMockup.totalGiftcard.value;
        const discountsMockup = [
            {
                amount: {
                    currency: 'USD',
                    value: 20,
                },
                label: 'Discount',
            },
        ];
        const firstDiscount = (discountsMockup[0].amount.value + totalGiftCard).toFixed(2);
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} order={{
                ...mock_config_1.orderCostSummaryMockup,
                discounts: discountsMockup,
            }}/>);
        expect(!!container).toEqual(true);
        const orderSummaryDiscounts = tests_1.screen.getByText('Discount');
        expect(orderSummaryDiscounts).toBeInTheDocument();
        expect(firstDiscount).toEqual('30.00');
    });
    test('renders with undefined discount and with totalGiftCard', () => {
        const totalGiftCard = mock_config_1.orderCostSummaryMockup.totalGiftcard.value.toFixed(2);
        const { container } = (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} order={{
                ...mock_config_1.orderCostSummaryMockup,
                discounts: [
                    {
                        amount: { value: undefined, currency: 'USD' },
                        label: 'Discount',
                    },
                ],
            }}/>);
        expect(!!container).toEqual(true);
        const orderSummaryDiscounts = tests_1.screen.getByText('Discount');
        expect(orderSummaryDiscounts).toBeInTheDocument();
        expect(totalGiftCard).toEqual('10.00');
    });
    test('renders total value', () => {
        const totalValue = mock_config_1.orderCostSummaryMockup.grandTotal.value.toFixed(2);
        (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps}/>);
        const orderSummaryTotal = tests_1.screen.getByText('Total');
        expect(orderSummaryTotal).toBeInTheDocument();
        expect(totalValue).toEqual('69.97');
    });
    test('render total accordion tax value', () => {
        (0, tests_1.render)(<OrderCostSummaryContent_1.OrderCostSummaryContent {...defaultProps} order={{
                ...mock_config_1.orderCostSummaryMockup,
                taxes: [
                    { title: '', rate: 1, amount: { value: 100 } },
                    { title: '', rate: 1, amount: { value: 100 } },
                    { title: '', rate: 1, amount: { value: 100 } },
                    { title: '', rate: 1, amount: { value: 5 } },
                ],
            }} storeConfig={{
                ...storeConfig,
                shoppingOrdersDisplayFullSummary: true,
            }}/>);
        const numberElement = tests_1.screen.getByText(/305/);
        expect(numberElement).toBeInTheDocument();
    });
});

"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
const tests_1 = require("@adobe/elsie/lib/tests");
const Blocks_1 = require("@/order/components/OrderCostSummaryContent/Blocks");
const mock_config_1 = require("@/order/configs/mock.config");
describe('order/Components/OrderCostSummaryContent/Blocks', () => {
    test('renders Subtotal taxIncluded === true', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Subtotal order={mock_config_1.orderCostSummaryMockup} translations={mock_config_1.translationsOrderCostSummaryMock} subTotalValue={1} shoppingOrdersDisplaySubtotal={{
                taxIncluded: true,
                taxExcluded: false,
            }}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Subtotal taxIncluded & taxExcluded', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Subtotal order={mock_config_1.orderCostSummaryMockup} translations={mock_config_1.translationsOrderCostSummaryMock} subTotalValue={1} shoppingOrdersDisplaySubtotal={{
                taxIncluded: true,
                taxExcluded: true,
            }}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Shipping', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Shipping order={mock_config_1.orderCostSummaryMockup} totalShipping={100} translations={mock_config_1.translationsOrderCostSummaryMock} subTotalValue={1} shoppingOrdersDisplayShipping={{
                taxIncluded: true,
                taxExcluded: false,
            }}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Shipping && taxExcluded', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Shipping order={mock_config_1.orderCostSummaryMockup} totalShipping={100} translations={mock_config_1.translationsOrderCostSummaryMock} subTotalValue={1} shoppingOrdersDisplayShipping={{
                taxIncluded: true,
                taxExcluded: true,
            }}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Discounts without discounts', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Discounts order={{ ...mock_config_1.orderCostSummaryMockup, discounts: [] }} translations={mock_config_1.translationsOrderCostSummaryMock} totalGiftcardValue={100} totalGiftcardCurrency={'USD'}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Discounts with discounts', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Discounts order={{
                ...mock_config_1.orderCostSummaryMockup,
                discounts: [
                    { label: 'Discount test', amount: { currency: 'USD', value: 1 } },
                ],
            }} translations={mock_config_1.translationsOrderCostSummaryMock} totalGiftcardValue={100} totalGiftcardCurrency={'USD'}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Coupons', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Coupons order={mock_config_1.orderCostSummaryMockup}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders Total', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.Total order={mock_config_1.orderCostSummaryMockup} translations={mock_config_1.translationsOrderCostSummaryMock} shoppingOrdersDisplaySubtotal={{
                taxIncluded: true,
                taxExcluded: false,
            }}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
    test('renders AccordionTax', () => {
        const { container } = (0, tests_1.render)(<Blocks_1.AccordionTax order={{
                ...mock_config_1.orderCostSummaryMockup,
                taxes: [
                    { title: 'Test', amount: { value: 1, currency: 'USD' }, rate: 1 },
                ],
            }} translations={mock_config_1.translationsOrderCostSummaryMock} totalAccordionTaxValue={1} renderTaxAccordion={true}/>);
        expect(!!container).toEqual(true);
        expect(container).toMatchSnapshot();
    });
});

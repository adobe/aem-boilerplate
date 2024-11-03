"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderCostSummary_1 = require("@/order/containers/OrderCostSummary");
const api_1 = require("@/order/api");
const setTaxStatus_1 = require("@/order/lib/setTaxStatus");
jest.mock('@/order/lib/setTaxStatus');
jest.mock('@/order/api/getStoreConfig');
describe('order/Containers/OrderCostSummary', () => {
    test('renders', () => {
        api_1.getStoreConfig.mockResolvedValue({
            shoppingCartDisplayPrice: 1,
        });
        setTaxStatus_1.setTaxStatus.mockReturnValue({
            taxIncluded: true,
            taxExcluded: true,
        });
        const { container } = (0, tests_1.render)(<OrderCostSummary_1.OrderCostSummary withHeader orderData={undefined}/>);
        expect(!!container).toEqual(true);
    });
});

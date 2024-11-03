"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** https://preactjs.com/guide/v10/preact-testing-library/ */
// @ts-nocheck
require("@testing-library/jest-dom");
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderStatusContent_1 = require("@/order/components/OrderStatusContent");
const mock_config_1 = require("@/order/configs/mock.config");
jest.mock('@/order/api/getStoreConfig', () => ({
    getStoreConfig: jest.fn().mockResolvedValue({}),
}));
describe('[Order-Components] - OrderStatusContent', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderStatusContent_1.OrderStatusContent title="Order recieved" status={1} slots={{
                OrderActions: () => { },
            }}/>);
        expect(!!container).toEqual(true);
        const orderStatusElement = tests_1.screen.getByText(/Order recieved/i);
        expect(orderStatusElement).toBeInTheDocument();
    });
    test('renders empty', () => {
        const { container } = (0, tests_1.render)(<OrderStatusContent_1.OrderStatusContent title="Order recieved" status={null} slots={{}}/>);
        expect(!!container).toEqual(true);
        const orderStatusElement = tests_1.screen.queryByText((content) => {
            return content.startsWith('Order received');
        });
        expect(orderStatusElement).not.toBeInTheDocument();
    });
    test('renders availableActionsList', () => {
        const { container } = (0, tests_1.render)(<OrderStatusContent_1.OrderStatusContent orderData={{
                ...mock_config_1.transformMockOrderOutput,
                orderStatusChangeDate: '2024-10-10',
                availableActions: ['CANCEL', 'RETURN', 'REORDER'],
            }} title="Order received" status={mock_config_1.transformMockOrderOutput.status}/>);
        expect(!!container).toEqual(true);
        const availableActionsList = tests_1.screen.getByTestId('availableActionsList');
        expect(availableActionsList).toBeInTheDocument();
    });
});

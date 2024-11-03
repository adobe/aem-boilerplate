"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const CustomerDetails_1 = require("@/order/containers/CustomerDetails");
const hooks_1 = require("@/order/hooks");
const mock_config_1 = require("@/order/configs/mock.config");
jest.mock('@/order/hooks/containers/useCustomerDetails');
describe('[Order-Containers] - CustomerDetails', () => {
    test('renders', () => {
        hooks_1.useCustomerDetails.mockReturnValue({
            order: mock_config_1.transformMockOrderOutput,
            normalizeAddress: mock_config_1.storyBookNormalizeAddress,
            loading: false,
        });
        const { container } = (0, tests_1.render)(<CustomerDetails_1.CustomerDetails />);
        expect(!!container).toEqual(true);
    });
});

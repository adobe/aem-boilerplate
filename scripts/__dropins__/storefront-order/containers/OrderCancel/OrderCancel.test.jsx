"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const OrderCancel_1 = require("@/order/containers/OrderCancel/OrderCancel");
require("@testing-library/jest-dom");
const api_1 = require("@/order/api");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const cancelOrderMutation_1 = require("@/order/api/cancelOrder/graphql/cancelOrderMutation");
const event_bus_1 = require("@adobe/event-bus");
jest.mock('@/order/api/getStoreConfig');
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
            })),
        })),
    };
});
describe('Order/Containers/OrderCancel', () => {
    Object.defineProperty(document, 'scrollingElement', {
        configurable: true,
        value: document.documentElement,
    });
    beforeEach(() => {
        api_1.getStoreConfig.mockResolvedValue({
            orderCancellationEnabled: true,
            orderCancellationReasons: [
                {
                    description: 'Too small',
                },
                {
                    description: "Didn't like",
                },
            ],
        });
    });
    test('cancel button', () => {
        const { container } = (0, tests_1.render)(<OrderCancel_1.OrderCancel orderRef={'1'}/>);
        expect(container.innerHTML).toMatchInlineSnapshot(`"<div class="dropin-design"><form class="order-form defaultForm"><div class="order-order-cancel-reasons-form__text">Select a reason for canceling the order</div><div class="dropin-picker dropin-picker__medium dropin-picker__floating dropin-picker__selected"><select id="cancellationReasons" name="cancellationReasons" aria-label="cancellationReasons" required="" data-testid="order-cancellation-reasons-selector" class="dropin-picker__select dropin-picker__select--primary dropin-picker__select--medium dropin-picker__select--floating"></select><undefined class="dropin-icon dropin-icon--shape-stroke-2 dropin-picker__chevronDown" width="24" height="24" viewbox="0 0 24 24"></undefined><label for="cancellationReasons" class="dropin-picker__floatingLabel">Reason for cancel</label></div><div class="order-order-cancel-reasons-form__button-container"><button role="button" data-testid="order-cancel-submit-button" class="dropin-button dropin-button--medium dropin-button--primary">Submit Cancellation</button></div></form></div>"`);
    });
    test('renders the picker when the modal is open', async () => {
        (0, tests_1.render)(<OrderCancel_1.OrderCancel orderRef={'1'}/>);
        const picker = tests_1.screen.getByTestId('order-cancellation-reasons-selector');
        expect(picker).toBeInTheDocument();
        await (0, tests_1.waitFor)(() => {
            expect(picker).toHaveValue('0');
        });
    });
    test('renders the picker options correctly', async () => {
        (0, tests_1.render)(<OrderCancel_1.OrderCancel orderRef={'1'}/>);
        await (0, tests_1.waitFor)(() => {
            const options = tests_1.screen.getAllByRole('option');
            expect(options[0]).toHaveTextContent('Too small');
            expect(options[1]).toHaveTextContent("Didn't like");
        });
    });
    test('updates selected reason', async () => {
        (0, tests_1.render)(<OrderCancel_1.OrderCancel orderRef={'1'}/>);
        const picker = tests_1.screen.getByTestId('order-cancellation-reasons-selector');
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText('Too small')).toBeInTheDocument();
            expect(picker).toHaveValue('0');
        });
        await user_event_1.default.selectOptions(picker, '1');
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText("Didn't like")).toBeInTheDocument();
            expect(picker).toHaveValue('1');
        });
    });
    test('confirm cancellation', async () => {
        api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
            data: {
                cancelOrder: {
                    error: null,
                    order: {
                        status: 'Canceled',
                    },
                },
            },
        })));
        event_bus_1.events.emit('authenticated', true);
        (0, tests_1.render)(<OrderCancel_1.OrderCancel orderRef={'1'}/>);
        const picker = tests_1.screen.getByTestId('order-cancellation-reasons-selector');
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText('Too small')).toBeInTheDocument();
            expect(picker).toHaveValue('0');
        });
        await user_event_1.default.selectOptions(picker, '1');
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText("Didn't like")).toBeInTheDocument();
            expect(picker).toHaveValue('1');
        });
        const submitButton = tests_1.screen.getByText('Submit Cancellation');
        tests_1.fireEvent.click(submitButton);
        expect(api_1.fetchGraphQl).toHaveBeenCalledTimes(1);
        expect(api_1.fetchGraphQl.mock.calls[0][0]).toBe(cancelOrderMutation_1.CANCEL_ORDER_MUTATION);
        expect(api_1.fetchGraphQl.mock.calls[0][1]).toMatchInlineSnapshot(`
{
  "variables": {
    "orderId": "1",
    "reason": "Didn't like",
  },
}
`);
    });
    test('confirm cancellation of an already cancelled order', async () => {
        api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
            data: {
                cancelOrder: {
                    error: 'Order already closed, complete, cancelled or on hold',
                    order: {
                        status: 'Canceled',
                    },
                },
            },
        })));
        (0, tests_1.render)(<OrderCancel_1.OrderCancel orderRef={'1'}/>);
        const picker = tests_1.screen.getByTestId('order-cancellation-reasons-selector');
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText('Too small')).toBeInTheDocument();
            expect(picker).toHaveValue('0');
        });
        await user_event_1.default.selectOptions(picker, '1');
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText("Didn't like")).toBeInTheDocument();
            expect(picker).toHaveValue('1');
        });
        const submitButton = tests_1.screen.getByText('Submit Cancellation');
        tests_1.fireEvent.click(submitButton);
        await (0, tests_1.waitFor)(() => {
            expect(tests_1.screen.getByText('There was an error processing your order cancellation.')).toBeInTheDocument();
        });
    });
});

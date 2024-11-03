"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const OrderSearchForm_1 = require("@/order/components/OrderSearchForm");
const types_1 = require("@/order/types");
describe('[Order-Components] - OrderSearchForm', () => {
    const loading = false;
    const handleSubmit = jest.fn();
    const inLineAlert = { text: '', type: 'success' };
    const fieldsConfig = [
        {
            entityType: 'CUSTOMER_ADDRESS',
            is_unique: false,
            label: '',
            options: [],
            defaultValue: 'test@mail.com',
            fieldType: types_1.FieldEnumList.TEXT,
            className: '',
            required: true,
            orderNumber: 1,
            name: 'email',
            id: 'email',
            code: 'email',
        },
        {
            entityType: 'CUSTOMER_ADDRESS',
            is_unique: false,
            label: '',
            options: [],
            defaultValue: '12345',
            fieldType: types_1.FieldEnumList.TEXT,
            className: '',
            required: false,
            orderNumber: 2,
            name: 'postcode',
            id: 'postcode',
            code: 'postcode',
        },
        {
            entityType: 'CUSTOMER_ADDRESS',
            is_unique: false,
            label: '',
            options: [],
            defaultValue: '000000009',
            fieldType: types_1.FieldEnumList.TEXT,
            className: '',
            required: false,
            orderNumber: 3,
            name: 'number',
            id: 'number',
            code: 'number',
        },
    ];
    const defaultProps = { loading, handleSubmit, inLineAlert, fieldsConfig };
    test('renders', () => {
        const { container } = (0, tests_1.render)(<OrderSearchForm_1.OrderSearchForm {...defaultProps}/>);
        expect(!!container).toEqual(true);
        const elem = container.querySelector('.order-order-search-form');
        expect(elem).toBeTruthy();
    });
    test('renders with InLineAlert', () => {
        (0, tests_1.render)(<OrderSearchForm_1.OrderSearchForm {...defaultProps} inLineAlert={{ text: 'Hello, World!', type: 'warning' }}/>);
        const element = tests_1.screen.getByTestId('orderAlert');
        expect(element).toHaveTextContent('Hello, World!');
    });
});

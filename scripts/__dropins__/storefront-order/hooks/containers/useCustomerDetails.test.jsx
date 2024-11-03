"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_hooks_1 = require("@testing-library/react-hooks");
const useCustomerDetails_1 = require("./useCustomerDetails");
const event_bus_1 = require("@adobe/event-bus");
const mock_config_1 = require("@/order/configs/mock.config");
const api_1 = require("@/order/api");
jest.mock('@/order/api/getAttributesForm');
const attributeFormMock = [
    {
        label: 'multipliSelect',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 1,
        name: 'multipliselect',
        id: 'multipliselect',
        code: 'multipliselect',
    },
    {
        label: 'First Name',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 20,
        name: 'firstname',
        id: 'firstname',
        code: 'firstname',
    },
    {
        label: 'Last Name',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 40,
        name: 'lastname',
        id: 'lastname',
        code: 'lastname',
    },
    {
        label: 'Company',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 60,
        name: 'company',
        id: 'company',
        code: 'company',
    },
    {
        label: 'Street Address',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 70,
        name: 'street',
        id: 'street',
        code: 'street',
    },
    {
        label: 'Country',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 80,
        name: 'country_code',
        id: 'country_code',
        code: 'country_code',
    },
    {
        label: 'State/Province',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 90,
        name: 'region',
        id: 'region',
        code: 'region',
    },
    {
        label: 'State/Province',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 90,
        name: 'region_id',
        id: 'region_id',
        code: 'region_id',
    },
    {
        label: 'Custom Field',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 99,
        name: 'filed_custom',
        id: 'filed_custom',
        code: 'filed_custom',
    },
    {
        label: 'City',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 100,
        name: 'city',
        id: 'city',
        code: 'city',
    },
    {
        label: 'Zip/Postal Code',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 110,
        name: 'postcode',
        id: 'postcode',
        code: 'postcode',
    },
    {
        label: 'Phone Number',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 120,
        name: 'telephone',
        id: 'telephone',
        code: 'telephone',
    },
    {
        label: 'VAT Number',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 140,
        name: 'vat_id',
        id: 'vat_id',
        code: 'vat_id',
    },
    {
        label: 'Multi Custom Line',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 3232,
        name: 'multicustomline',
        id: 'multicustomline',
        code: 'multicustomline',
    },
    {
        label: 'TestORDER',
        defaultValue: '',
        fieldType: '',
        className: '',
        required: false,
        orderNumber: 999999,
        name: 'test_order',
        id: 'test_order',
        code: 'test_order',
    },
];
describe('[ORDER-HOOKS] - useCustomerDetails', () => {
    test('should return order hook prop', () => {
        api_1.getAttributesForm.mockResolvedValue(attributeFormMock);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useCustomerDetails_1.useCustomerDetails)({ orderData: mock_config_1.transformMockOrderOutput }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
    test('should return order/data with events => emit', () => {
        api_1.getAttributesForm.mockResolvedValue(null);
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useCustomerDetails_1.useCustomerDetails)({ orderData: null }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
});

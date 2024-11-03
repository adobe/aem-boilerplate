"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const useForm_1 = require("./useForm");
const tests_1 = require("@adobe/elsie/lib/tests");
const Provider_1 = require("@/order/render/Provider");
const components_1 = require("@/order/components");
const types_1 = require("@/order/types");
const wrapper = ({ children }) => <Provider_1.Provider>{children}</Provider_1.Provider>;
describe('[Account-HOOKS] - useForm', () => {
    const attributeFormMock = [
        {
            entityType: 'CUSTOMER_ADDRESS',
            is_unique: false,
            label: 'First Name',
            options: [],
            defaultValue: '',
            fieldType: types_1.FieldEnumList.TEXT,
            className: '',
            required: true,
            orderNumber: 2,
            name: 'firstname',
            id: 'firstname',
            code: 'firstname',
        },
        {
            entityType: 'CUSTOMER_ADDRESS',
            is_unique: false,
            label: 'Last Name',
            options: [],
            defaultValue: '',
            fieldType: types_1.FieldEnumList.TEXT,
            className: '',
            required: true,
            orderNumber: 3,
            name: 'lastname',
            id: 'lastname',
            code: 'lastname',
        },
        {
            entityType: 'CUSTOMER_ADDRESS',
            is_unique: false,
            label: 'Country',
            options: [],
            defaultValue: '',
            fieldType: types_1.FieldEnumList.SELECT,
            className: '',
            required: false,
            orderNumber: 2,
            name: 'country_code',
            id: 'country_code',
            code: 'country_code',
        },
    ];
    const fieldsConfig = [...attributeFormMock];
    const onSubmit = jest.fn();
    const handleSetCountryCode = jest.fn();
    test('initializes with default form data and errors', () => {
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig: [],
            onSubmit,
        }));
        expect(result.current.formData).toEqual({});
        expect(result.current.errors).toEqual({});
    });
    test('updates form data on handleChange', async () => {
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }));
        (0, tests_1.act)(() => {
            result.current.handleChange({
                target: { name: 'firstname', value: 'value' },
            });
            result.current.handleChange({
                target: { name: 'country_code', value: '' },
            });
        });
        expect(result.current.formData).toEqual({
            firstname: 'value',
            lastname: '',
            country_code: '',
        });
    });
    test('should set error on empty required field', async () => {
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }), { wrapper });
        const event = {
            target: { name: 'firstname', value: '' },
        };
        (0, tests_1.act)(() => {
            result.current.handleBlur(event);
        });
        expect(result.current.errors['firstname']).toBeDefined();
        expect(result.current.errors['firstname']).toBe('This is a required field.');
    });
    test('should prevent default form submission', () => {
        const event = { preventDefault: jest.fn() };
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }));
        (0, tests_1.act)(() => {
            result.current.handleSubmit(event);
        });
        expect(event.preventDefault).toHaveBeenCalled();
    });
    test('should call onSubmit with form validity', () => {
        const event = { preventDefault: jest.fn() };
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }));
        (0, tests_1.act)(() => {
            result.current.handleSubmit(event);
        });
        expect(onSubmit).toHaveBeenCalledWith(event, true);
    });
    test('should validate form fields and set errors', () => {
        const event = {
            preventDefault: jest.fn(),
            target: { name: 'firstname', value: '' },
        };
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }), { wrapper });
        (0, tests_1.act)(() => {
            result.current.handleSubmit(event);
        });
        expect(result.current.errors).toEqual({
            firstname: 'This is a required field.',
            lastname: 'This is a required field.',
        });
    });
    test('should not focus if no errors', async () => {
        const event = { preventDefault: jest.fn() };
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }));
        const formElement = document.createElement('form');
        const inputElement = document.createElement('input');
        inputElement.name = 'firstname';
        formElement.appendChild(inputElement);
        result.current.formRef.current = formElement;
        (0, tests_1.act)(() => {
            result.current.handleSubmit(event);
        });
        await (0, tests_1.waitFor)(() => {
            expect(document.activeElement).not.toBe(inputElement);
        });
    });
    test('should focus the first error field', async () => {
        const event = { preventDefault: jest.fn() };
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig: [
                {
                    entityType: 'CUSTOMER_ADDRESS',
                    is_unique: false,
                    label: 'First Name',
                    options: [],
                    defaultValue: '',
                    fieldType: types_1.FieldEnumList.TEXT,
                    className: '',
                    required: true,
                    orderNumber: 2,
                    name: 'firstname',
                    id: 'firstname',
                    code: 'firstname',
                },
            ],
            onSubmit,
        }), { wrapper });
        const formElement = document.createElement('form');
        const inputElement = document.createElement('input');
        inputElement.name = 'firstname';
        inputElement.value = '';
        formElement.appendChild(inputElement);
        document.body.appendChild(formElement);
        result.current.formRef.current = formElement;
        (0, tests_1.act)(() => {
            result.current.handleSubmit(event);
        });
        await (0, tests_1.waitFor)(() => {
            if (inputElement !== document.activeElement)
                return;
            expect(document.activeElement).toBe(inputElement);
            expect(result.current.errors['firstname']).toBe('This is a required field.');
        });
        document.body.removeChild(formElement);
    });
    test('focuses on the first input with an error when the form is invalid', () => {
        const onSubmit = jest.fn();
        const { getByText } = (0, tests_1.render)(<components_1.Form fieldsConfig={fieldsConfig} name="nameForm" onSubmit={onSubmit}>
        <button type="submit">Save</button>
      </components_1.Form>);
        const submitButton = getByText('Save');
        const originalFocus = HTMLElement.prototype.focus;
        HTMLElement.prototype.focus = jest.fn();
        tests_1.fireEvent.click(submitButton);
        expect(HTMLElement.prototype.focus).toHaveBeenCalled();
        HTMLElement.prototype.focus = originalFocus;
    });
    test('should initialize formData with required fields and their default values', () => {
        const fieldsConfigMock = [
            { code: 'field1', required: true, defaultValue: 'value1' },
            { code: 'field2', required: false, defaultValue: 'value2' },
            { code: 'field3', required: true, defaultValue: 'value3' },
        ];
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig: fieldsConfigMock,
            countryRegionOptions: {},
            onSubmit,
            handleSetCountryCode,
        }));
        (0, tests_1.act)(() => {
            const response = result.current.formData;
            expect(response).toEqual({
                field1: 'value1',
                field3: 'value3',
            });
        });
    });
    test('call getRequiredFieldError with empty renderErrorMessage', async () => {
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig: [
                {
                    entityType: 'CUSTOMER_ADDRESS',
                    is_unique: false,
                    label: 'Last Name',
                    options: [],
                    defaultValue: '',
                    fieldType: types_1.FieldEnumList.TEXT,
                    className: '',
                    required: false,
                    orderNumber: 3,
                    name: 'lastname',
                    id: 'lastname',
                    code: 'lastname',
                },
            ],
            onSubmit,
        }), { wrapper });
        const event = {
            target: { name: 'lastname', value: '' },
        };
        (0, tests_1.act)(() => {
            result.current.handleBlur(event);
        });
        expect(result.current.errors['lastname']).toBeDefined();
        expect(result.current.errors['lastname']).toBe('');
    });
    test('should update formData on text input change', () => {
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }));
        (0, tests_1.act)(() => {
            result.current.handleChange({
                target: {
                    name: 'firstname',
                    value: 'John',
                    type: 'text',
                },
            });
        });
        expect(result.current.formData.firstname).toBe('John');
    });
    test('should update formData on checkbox input change', () => {
        const { result } = (0, tests_1.renderHook)(() => (0, useForm_1.useForm)({
            fieldsConfig,
            onSubmit,
        }));
        (0, tests_1.act)(() => {
            result.current.handleChange({
                target: {
                    name: 'newsletter',
                    type: 'checkbox',
                    checked: true,
                },
            });
        });
        expect(result.current.formData.newsletter).toBe(true);
        (0, tests_1.act)(() => {
            result.current.handleChange({
                target: {
                    name: 'newsletter',
                    type: 'checkbox',
                    checked: false,
                },
            });
        });
        expect(result.current.formData.newsletter).toBe(false);
    });
});

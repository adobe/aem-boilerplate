"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const useOrderSearch_1 = require("./useOrderSearch");
const getGuestOrder_1 = require("@/order/api/getGuestOrder");
const tests_1 = require("@adobe/elsie/lib/tests");
const transforms_1 = require("@/order/data/transforms");
const Provider_1 = require("@/order/render/Provider");
const mock_config_1 = require("@/order/configs/mock.config");
const api_1 = require("@/order/api");
const getQueryParam_1 = require("@/order/lib/getQueryParam");
const event_bus_1 = require("@adobe/event-bus");
const redirectTo_1 = require("@/order/lib/redirectTo");
const getFormValues_1 = require("@/order/lib/getFormValues");
const wrapper = ({ children }) => <Provider_1.Provider>{children}</Provider_1.Provider>;
const createElement = (config) => {
    const mockInputEmail = document.createElement('input');
    mockInputEmail.setAttribute('type', config.type);
    mockInputEmail.setAttribute('name', config.name);
    mockInputEmail.value = config.value;
    return mockInputEmail;
};
jest.mock('@/order/api/getGuestOrder');
jest.mock('@/order/api/getCustomer');
jest.mock('@/order/lib/redirectTo');
jest.mock('@/order/lib/getQueryParam');
jest.mock('@/order/lib/getFormValues');
const mockInputsList = [
    {
        type: 'text',
        name: 'email',
        value: 'test@mail.com',
    },
    {
        type: 'text',
        name: 'postcode',
        value: 'postcode',
    },
    {
        type: 'text',
        name: 'number',
        value: '1',
    },
];
describe('[ORDER-HOOKS] - useOrderSearch', () => {
    // @ts-ignore
    const transFormItems = (0, transforms_1.transformGuestOrder)(mock_config_1.mockOrder);
    const onError = jest.fn();
    const renderSignIn = jest.fn();
    const routeCustomerOrder = jest
        .fn()
        .mockReturnValue('/customer/order-details');
    const routeGuestOrder = jest.fn().mockReturnValue('/order-details');
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('called onSubmit', async () => {
        getQueryParam_1.getQueryParam.mockReturnValueOnce(null);
        event_bus_1.events.emit('order/data', {
            ...mock_config_1.transformMockOrderOutput,
            token: '123456789123456789000',
            isVirtual: false,
            // @ts-ignore
            shippingMethod: 1,
        });
        api_1.getCustomer.mockResolvedValue({ email: 'test@mail.com' });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }));
        getGuestOrder_1.getGuestOrder.mockResolvedValue(transFormItems);
        const mockForm = document.createElement('form');
        mockInputsList.forEach((element) => {
            mockForm.appendChild(createElement(element));
        });
        await (0, react_hooks_1.act)(async () => {
            await result.current.onSubmit({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
        });
        await (0, tests_1.waitFor)(() => {
            expect(getGuestOrder_1.getGuestOrder).toHaveBeenCalled();
        });
    });
    test('called onSubmit with guestOrder === null', async () => {
        // @ts-ignore
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        getQueryParam_1.getQueryParam.mockReturnValue('1234567891234567890000');
        api_1.getCustomer.mockResolvedValue({ email: 'test@mail.com' });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        getGuestOrder_1.getGuestOrder.mockResolvedValue(null);
        const mockForm = document.createElement('form');
        mockInputsList.forEach((element) => {
            mockForm.appendChild(createElement(element));
        });
        await (0, react_hooks_1.act)(async () => {
            await result.current.onSubmit({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
        });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.inLineAlert).toEqual({
                type: 'warning',
                text: 'No order found with these order details.',
            });
        });
    });
    test('called onSubmit with guestOrder Error if Auth true', async () => {
        // @ts-ignore
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        api_1.getCustomer.mockResolvedValue({ email: 'test@mail.com' });
        getQueryParam_1.getQueryParam.mockReturnValue('12345678910');
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: true,
            // @ts-ignore
            renderSignIn: undefined,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        getGuestOrder_1.getGuestOrder.mockRejectedValue('Error');
        const mockForm = document.createElement('form');
        mockInputsList.forEach((element) => {
            mockForm.appendChild(createElement(element));
        });
        await (0, react_hooks_1.act)(async () => {
            await result.current.onSubmit({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
        });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.inLineAlert).toEqual({
                type: 'success',
                text: '',
            });
            expect(onError).toHaveBeenCalled();
        });
    });
    test('called onSubmit with guestOrder Error if isAuth false', async () => {
        // @ts-ignore
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        api_1.getCustomer.mockResolvedValue({ email: '' });
        getQueryParam_1.getQueryParam.mockReturnValue('12345678910');
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            // @ts-ignore
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        getGuestOrder_1.getGuestOrder.mockRejectedValue('Error');
        const mockForm = document.createElement('form');
        mockInputsList.forEach((element) => {
            mockForm.appendChild(createElement(element));
        });
        await (0, react_hooks_1.act)(async () => {
            await result.current.onSubmit({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
        });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.inLineAlert).toEqual({
                type: 'success',
                text: '',
            });
            expect(onError).toHaveBeenCalled();
        });
    });
    test('called onSubmit with valid === null', async () => {
        // @ts-ignore
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        api_1.getCustomer.mockResolvedValue({ email: 'user@mail.com' });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        const mockForm = document.createElement('form');
        mockInputsList.forEach((element) => {
            mockForm.appendChild(createElement(element));
        });
        await (0, react_hooks_1.act)(async () => {
            await result.current.onSubmit({
                preventDefault: jest.fn(),
                target: mockForm,
            }, false);
        });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.loading).toBe(false);
        });
    });
    test('called redirectTo routeCustomerOrder', async () => {
        event_bus_1.events.emit('order/data', {
            ...mock_config_1.transformMockOrderOutput,
            token: '123456788901234567890',
            isVirtual: false,
            // @ts-ignore
            shippingMethod: null,
        });
        api_1.getCustomer.mockReturnValueOnce({ email: 'test@mail.com' });
        getQueryParam_1.getQueryParam.mockReturnValue('ORDER123');
        (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: true,
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        await (0, tests_1.waitFor)(() => {
            expect(getQueryParam_1.getQueryParam).toHaveBeenCalledWith('orderRef');
            expect(redirectTo_1.redirectTo).toHaveBeenCalledWith(routeCustomerOrder, {
                orderRef: 'ORDER123',
            });
        });
    });
    test('called redirectTo routeGuestOrder', async () => {
        event_bus_1.events.emit('order/data', {
            ...mock_config_1.transformMockOrderOutput,
            token: '123456788901234567890',
            isVirtual: false,
            // @ts-ignore
            shippingMethod: null,
        });
        api_1.getCustomer.mockReturnValueOnce({ email: 'test@mail.com' });
        getQueryParam_1.getQueryParam.mockReturnValue('123456788901234567890');
        (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        await (0, tests_1.waitFor)(() => {
            expect(getQueryParam_1.getQueryParam).toHaveBeenCalledWith('orderRef');
            expect(redirectTo_1.redirectTo).toHaveBeenCalledWith(routeGuestOrder, {
                orderRef: '123456788901234567890',
            });
        });
    });
    test('not be called if order null', async () => {
        // @ts-ignore
        event_bus_1.events.emit('order/data', null);
        getQueryParam_1.getQueryParam.mockReturnValue('');
        (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            renderSignIn,
            routeCustomerOrder,
            routeGuestOrder,
        }), {
            wrapper,
        });
        await (0, tests_1.waitFor)(() => {
            expect(getQueryParam_1.getQueryParam).toHaveBeenCalledWith('orderRef');
            expect(api_1.getCustomer).not.toHaveBeenCalled();
        });
    });
    test('called onSubmit and getGuestOrder return error and called inLineAlert', async () => {
        // @ts-ignore
        event_bus_1.events.emit('order/data', null);
        getGuestOrder_1.getGuestOrder.mockRejectedValueOnce(new Error('Error'));
        getQueryParam_1.getQueryParam.mockReturnValue('12345678910');
        getFormValues_1.getFormValues.mockReturnValue({ email: 'test@mail.com' });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderSearch_1.useOrderSearch)({
            onError,
            isAuth: false,
            // @ts-ignore
            renderSignIn: () => true,
        }), {
            wrapper,
        });
        getGuestOrder_1.getGuestOrder.mockRejectedValue('Error');
        const mockForm = document.createElement('form');
        mockInputsList.forEach((element) => {
            mockForm.appendChild(createElement(element));
        });
        await (0, react_hooks_1.act)(async () => {
            await result.current.onSubmit({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
        });
        expect(result.current.inLineAlert).toEqual({
            type: 'warning',
            text: 'Error',
        });
        expect(onError).toHaveBeenCalled();
    });
});

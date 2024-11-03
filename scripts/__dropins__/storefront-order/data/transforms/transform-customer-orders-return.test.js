"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_customer_orders_return_1 = require("./transform-customer-orders-return");
const transform_order_details_1 = require("./transform-order-details");
jest.mock('./transform-order-details');
describe('transformCustomerOrdersReturn', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should return null if response is null', () => {
        const result = (0, transform_customer_orders_return_1.transformCustomerOrdersReturn)(null);
        expect(result).toBeNull();
    });
    it('should return null if response does not have customer returns items', () => {
        const response = { data: { customer: { returns: { items: [] } } } };
        const result = (0, transform_customer_orders_return_1.transformCustomerOrdersReturn)(response);
        expect(result).toBeNull();
    });
    it('should correctly map data if response contains valid customer returns', () => {
        const mockOrderItem = { name: 'Item Name', sku: '12345' };
        transform_order_details_1.transformOrderItems.mockImplementation(() => [
            mockOrderItem,
        ]);
        const response = {
            data: {
                customer: {
                    returns: {
                        items: [
                            {
                                order: { token: '123abc', number: 'ORD-001' },
                                shipping: {
                                    tracking: [
                                        {
                                            status: 'delivered',
                                            carrier: 'DHL',
                                            tracking_number: 'TRACK123',
                                        },
                                    ],
                                },
                                items: [
                                    {
                                        quantity: 2,
                                        status: 'returned',
                                        request_quantity: 2,
                                        uid: 'UID001',
                                        order_item: { sku: '12345' },
                                    },
                                ],
                            },
                        ],
                        page_info: {
                            page_size: 10,
                            total_pages: 5,
                            current_page: 1,
                        },
                    },
                },
            },
        };
        const expectedOutput = {
            ordersReturn: [
                {
                    token: '123abc',
                    orderNumber: 'ORD-001',
                    items: [
                        {
                            uid: 'UID001',
                            quantity: 2,
                            status: 'returned',
                            requestQuantity: 2,
                            orderItem: mockOrderItem,
                        },
                    ],
                    tracking: [
                        {
                            status: 'delivered',
                            carrier: 'DHL',
                            trackingNumber: 'TRACK123',
                        },
                    ],
                },
            ],
            pageInfo: {
                pageSize: 10,
                totalPages: 5,
                currentPage: 1,
            },
        };
        const result = (0, transform_customer_orders_return_1.transformCustomerOrdersReturn)(response);
        expect(result).toEqual(expectedOutput);
        expect(transform_order_details_1.transformOrderItems).toHaveBeenCalledWith([{ sku: '12345' }]);
    });
    it('should handle empty tracking and items arrays gracefully', () => {
        const response = {
            data: {
                customer: {
                    returns: {
                        items: [
                            {
                                order: { token: '123abc', number: 'ORD-002' },
                                shipping: { tracking: [] },
                                items: [],
                            },
                        ],
                        page_info: {
                            page_size: 5,
                            total_pages: 1,
                            current_page: 1,
                        },
                    },
                },
            },
        };
        const expectedOutput = {
            ordersReturn: [
                {
                    token: '123abc',
                    orderNumber: 'ORD-002',
                    items: [],
                    tracking: [],
                },
            ],
            pageInfo: {
                pageSize: 5,
                totalPages: 1,
                currentPage: 1,
            },
        };
        const result = (0, transform_customer_orders_return_1.transformCustomerOrdersReturn)(response);
        expect(result).toEqual(expectedOutput);
    });
    it('should handle cases where order, shipping, or item details are missing', () => {
        const response = {
            data: {
                customer: {
                    returns: {
                        items: [
                            {
                                order: null,
                                shipping: { tracking: null },
                                items: [null],
                            },
                        ],
                        page_info: {
                            page_size: 3,
                            total_pages: 2,
                            current_page: 1,
                        },
                    },
                },
            },
        };
        const expectedOutput = {
            ordersReturn: [
                {
                    token: undefined,
                    orderNumber: undefined,
                    items: [
                        {
                            uid: undefined,
                            quantity: undefined,
                            status: undefined,
                            requestQuantity: undefined,
                            orderItem: {},
                        },
                    ],
                    tracking: [],
                },
            ],
            pageInfo: {
                pageSize: 3,
                totalPages: 2,
                currentPage: 1,
            },
        };
        const result = (0, transform_customer_orders_return_1.transformCustomerOrdersReturn)(response);
        expect(result).toEqual(expectedOutput);
    });
    it('called without pageInfo', () => {
        const mockOrderItem = { name: 'Item Name', sku: '12345' };
        transform_order_details_1.transformOrderItems.mockImplementation(() => [
            mockOrderItem,
        ]);
        const response = {
            data: {
                customer: {
                    returns: {
                        items: [
                            {
                                order: { token: '123abc', number: 'ORD-001' },
                                shipping: {
                                    tracking: [
                                        {
                                            status: 'delivered',
                                            carrier: 'DHL',
                                            tracking_number: 'TRACK123',
                                        },
                                    ],
                                },
                                items: [
                                    {
                                        quantity: 2,
                                        status: 'returned',
                                        request_quantity: 2,
                                        uid: 'UID001',
                                        order_item: { sku: '12345' },
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        };
        const expectedOutput = {
            ordersReturn: [
                {
                    token: '123abc',
                    orderNumber: 'ORD-001',
                    items: [
                        {
                            uid: 'UID001',
                            quantity: 2,
                            status: 'returned',
                            requestQuantity: 2,
                            orderItem: mockOrderItem,
                        },
                    ],
                    tracking: [
                        {
                            status: 'delivered',
                            carrier: 'DHL',
                            trackingNumber: 'TRACK123',
                        },
                    ],
                },
            ],
        };
        const result = (0, transform_customer_orders_return_1.transformCustomerOrdersReturn)(response);
        expect(result).toEqual(expectedOutput);
        expect(transform_order_details_1.transformOrderItems).toHaveBeenCalledWith([{ sku: '12345' }]);
    });
});

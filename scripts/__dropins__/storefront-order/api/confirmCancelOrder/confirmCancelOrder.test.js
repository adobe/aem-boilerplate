"use strict";
/********************************************************************
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const ConfirmCancelOrder_1 = require("./graphql/ConfirmCancelOrder");
const confirmCancelOrder_1 = require("@/order/api/confirmCancelOrder/confirmCancelOrder");
const event_bus_1 = require("@adobe/event-bus");
const api_1 = require("@/order/api");
const mockPayload = {
    grandTotal: {
        value: 55,
        currency: 'USD',
    },
    subtotal: {
        currency: 'USD',
        value: 50,
    },
    taxes: [],
    totalTax: {
        currency: 'USD',
        value: 0,
    },
    totalShipping: {
        currency: 'USD',
        value: 5,
    },
    discounts: [],
    email: 'example@example.com',
    id: 'MTU=',
    number: '000000015',
    orderDate: '2024-10-02 14:26:57',
    status: 'Canceled',
    token: '0:3:/Po1Hkioovg2eNKS+oDmVUPzRiyqQd+2QBM1wZfdRnPWJQUkf9z3onL/MiISs904r9V33YiSdVmTG0KsAJs=',
    carrier: 'Flat Rate',
    shippingMethod: 'Flat Rate - Fixed',
    printedCardIncluded: false,
    giftReceiptIncluded: false,
    availableActions: ['REORDER'],
    isVirtual: false,
    payments: [
        {
            code: 'checkmo',
            name: 'Check / Money order',
        },
    ],
    coupons: [],
    shipments: [],
    shippingAddress: {
        city: 'Barcelona',
        company: null,
        countryCode: 'ES',
        fax: null,
        firstName: 'Customer',
        lastName: 'Barcelona',
        middleName: null,
        postCode: '08005',
        prefix: null,
        region: 'Barcelona',
        regionId: '139',
        street: ['Dalt, 56'],
        suffix: null,
        telephone: '666666666',
        vatId: null,
    },
    billingAddress: {
        city: 'Barcelona',
        company: null,
        countryCode: 'ES',
        fax: null,
        firstName: 'Customer',
        lastName: 'Barcelona',
        middleName: null,
        postCode: '08005',
        prefix: null,
        region: 'Barcelona',
        regionId: '139',
        street: ['Dalt, 56'],
        suffix: null,
        telephone: '666666666',
        vatId: null,
    },
    items: [
        {
            type: 'OrderItem',
            productName: 'Gwen Drawstring Bike Short',
            quantityCanceled: 1,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'Mjc=',
            discounted: false,
            total: {
                value: 50,
                currency: 'USD',
            },
            totalInclTax: {
                value: 50,
                currency: 'USD',
            },
            price: {
                value: 50,
                currency: 'USD',
            },
            priceInclTax: {
                value: 50,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 50,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'MTk1Nw==',
                name: 'Gwen Drawstring Bike Short',
                sku: 'WSH03',
                image: '',
                productType: 'ConfigurableProduct',
                thumbnail: {
                    label: 'Gwen Drawstring Bike Short',
                    url: 'http://example.com/media/catalog/product/cache/ca43d57a78695eea1a3b352c8e6782f1/w/s/wsh03-gray_main_2.jpg',
                },
            },
            thumbnail: {
                label: 'Gwen Drawstring Bike Short',
                url: 'http://example.com/media/catalog/product/cache/ca43d57a78695eea1a3b352c8e6782f1/w/s/wsh03-gray_main_2.jpg',
            },
            configurableOptions: {
                Size: '30',
                Color: 'Orange',
            },
        },
    ],
    totalQuantity: 1,
    shipping: {
        amount: 0,
        currency: '',
        code: 'Flat Rate - Fixed',
    },
};
jest.mock('@/order/api', () => ({
    fetchGraphQl: jest.fn(),
}));
//mock transformOrderData
jest.mock('@/order/data/transforms', () => ({
    transformOrderData: jest.fn(() => mockPayload),
}));
const eventsSpy = jest.spyOn(event_bus_1.events, 'emit').mockImplementation();
describe('Order/api/confirmCancelOrder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('confirmCancelOrder', () => {
        const orderId = 'MTU=';
        const confirmationKey = 'dz8aLHxFfi8csjYTIlV5QjGkHz9jbubw';
        test('successfully confirm guest order cancellation using order id and confirmation key', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
                data: {
                    confirmCancelOrder: {
                        errorV2: null,
                        order: {
                            status: 'Canceled',
                        },
                    },
                },
            })));
            await (0, confirmCancelOrder_1.confirmCancelOrder)(orderId, confirmationKey);
            expect(api_1.fetchGraphQl).toHaveBeenCalledTimes(1);
            expect(api_1.fetchGraphQl.mock.calls[0][0]).toBe(ConfirmCancelOrder_1.CONFIRM_CANCEL_ORDER_MUTATION);
            expect(api_1.fetchGraphQl.mock.calls[0][1])
                .toMatchInlineSnapshot(`
{
  "variables": {
    "confirmationKey": "dz8aLHxFfi8csjYTIlV5QjGkHz9jbubw",
    "orderId": "MTU=",
  },
}
`);
            expect(eventsSpy).toHaveBeenCalledTimes(1);
            expect(eventsSpy).toHaveBeenCalledWith('order/data', mockPayload);
        });
        test('attempt to confirm cancellation of an order already cancelled', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
                data: {
                    confirmCancelOrder: {
                        errorV2: {
                            message: 'Order already closed, complete, cancelled or on hold',
                            code: 'INVALID_ORDER_STATUS',
                        },
                        order: {
                            mockPayload,
                        },
                    },
                },
            })));
            await expect((0, confirmCancelOrder_1.confirmCancelOrder)(orderId, confirmationKey)).rejects.toThrow('Order already closed, complete, cancelled or on hold');
        });
        test('attempt to confirm cancellation of an order with a wrong confirmation key', async () => {
            api_1.fetchGraphQl.mockResolvedValue(new Promise((resolve) => resolve({
                errors: [
                    {
                        message: 'The order cancellation could not be confirmed.',
                        locations: [
                            {
                                line: 2,
                                column: 3,
                            },
                        ],
                        path: ['confirmCancelOrder'],
                        extensions: {
                            category: 'graphql-input',
                        },
                    },
                ],
                data: {
                    confirmCancelOrder: null,
                },
            })));
            await expect((0, confirmCancelOrder_1.confirmCancelOrder)(orderId, 'confirmationKey')).rejects.toThrow('The order cancellation could not be confirmed.');
            expect(eventsSpy).toHaveBeenCalledTimes(0);
        });
    });
});

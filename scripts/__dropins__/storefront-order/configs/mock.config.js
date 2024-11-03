"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationsOrderCostSummaryMock = exports.returnOrderListMock = exports.returnOrderListMockResponse = exports.orderMockOrderProductItemsList = exports.orderCostSummaryMockup = exports.storyBookNormalizeAddress = exports.storyBookShortOrderData = exports.storyBookOrderData = exports.transformMockOrderOutput = exports.transformMockOrderInput = exports.mockOrderDetailsResponse = exports.mockOrder = void 0;
exports.mockOrder = {
    data: {
        guestOrder: {
            gift_receipt_included: false,
            carrier: 'Flat Rate',
            email: 'test@mail.com',
            id: 'OQ==',
            number: '000000009',
            order_date: '2024-06-05 12:51:15',
            printed_card_included: false,
            shipping_method: 'Flat Rate - Fixed',
            status: 'Pending',
            token: '0:3:kPZVWOzkcst91vUS9zluDf7AfzA96muMx5nrWQM0VHwCOM41CswXxyJvhu/esdJtXzFuqcDJ/TXz',
            payment_methods: [
                {
                    name: 'Check / Money order',
                    type: 'checkmo',
                },
            ],
            total: {
                subtotal: {
                    currency: 'USD',
                    value: 690,
                },
                total_tax: {
                    currency: 'USD',
                    value: 0,
                },
                total_shipping: {
                    currency: 'USD',
                    value: 50,
                },
                grand_total: {
                    currency: 'USD',
                    value: 602,
                },
            },
            billing_address: {
                firstname: 'test',
                middlename: null,
                lastname: 'test',
                street: ['test', 'test'],
                city: 'test',
                postcode: '12345',
                telephone: '12345',
                country_code: 'US',
                region: 'Alabama',
                region_id: '1',
                company: 'test',
            },
            shipping_address: {
                firstname: 'test',
                middlename: null,
                lastname: 'test',
                street: ['test', 'test'],
                city: 'test',
                postcode: '12345',
                telephone: '12345',
                country_code: 'US',
                region: 'Alabama',
                region_id: '1',
                company: 'test',
            },
            items: [
                {
                    __typename: 'OrderItem',
                    id: 'MjA=',
                    quantity_ordered: 10,
                    product_sale_price: {
                        value: 69,
                        currency: 'USD',
                    },
                    product: {
                        name: 'Neve Studio Dance Jacket',
                        sku: 'WJ11',
                        thumbnail: {
                            label: 'Neve Studio Dance Jacket',
                            url: 'https://hotel.atwix.dev:1133/media/catalog/product/cache/9b07ea6e86bdaf69d1f98ef7ec49fdbe/w/j/wj11-blue_main_1.jpg',
                        },
                        price_range: {
                            maximum_price: {
                                regular_price: {
                                    currency: 'USD',
                                    value: 69,
                                },
                            },
                        },
                    },
                    selected_options: [
                        {
                            label: 'Size',
                            value: 'XS',
                        },
                        {
                            label: 'Color',
                            value: 'Black',
                        },
                    ],
                },
            ],
        },
    },
};
exports.mockOrderDetailsResponse = {
    customer: {
        addresses: [
            {
                firstname: 'testaddress',
                lastname: 'testaddress',
                city: 'testaddress',
                company: 'testaddress',
                country_code: 'AL',
                region: {
                    region: 'Elbasan',
                    region_code: 'AL-03',
                    region_id: 515,
                },
                custom_attributesV2: [],
                telephone: '32323232',
                id: 85,
                vat_id: '3232',
                postcode: '3232',
                street: ['testaddress', 'testaddress'],
                default_shipping: false,
                default_billing: false,
            },
        ],
        orders: {
            page_info: {
                page_size: 20,
                total_pages: 1,
                current_page: 1,
            },
            total_count: 1,
            items: [
                {
                    shipping_method: 'Best Way - Table Rate',
                    payment_methods: [
                        {
                            name: 'Check / Money order',
                        },
                    ],
                    number: '000000003',
                    id: 'Mw==',
                    order_date: '2024-06-04 13:44:49',
                    carrier: 'Best Way',
                    items: [
                        {
                            status: 'Mixed',
                            product_name: 'Radiant Tee',
                            id: 'Mw==',
                        },
                        {
                            status: 'Mixed',
                            product_name: 'Hero Hoodie',
                            id: 'NQ==',
                        },
                        {
                            status: 'Mixed',
                            product_name: 'Meteor Workout Short',
                            id: 'Nw==',
                        },
                        {
                            status: 'Mixed',
                            product_name: 'Push It Messenger Bag',
                            id: 'OQ==',
                        },
                    ],
                    total: {
                        grand_total: {
                            value: 168.5,
                            currency: 'USD',
                        },
                        subtotal: {
                            currency: 'USD',
                            value: 153.5,
                        },
                        taxes: [],
                        total_tax: {
                            currency: 'USD',
                            value: 0,
                        },
                        total_shipping: {
                            currency: 'USD',
                            value: 15,
                        },
                        discounts: [],
                    },
                },
            ],
        },
    },
};
exports.transformMockOrderInput = {
    data: {
        customer: {
            orders: {
                items: [
                    {
                        available_actions: ['REORDER'],
                        status: 'Pending',
                        number: '000000597',
                        id: 'NTc2',
                        order_date: '2024-08-29 20:20:24',
                        carrier: 'Flat Rate',
                        shipping_method: null,
                        applied_coupons: [],
                        payment_methods: [{ test: null, prop: undefined }],
                        shipments: [
                            {
                                id: 'MDAwMDAwMDA5',
                                tracking: [
                                    {
                                        title: 'DHL',
                                        number: '234232323232',
                                    },
                                    {
                                        title: 'Federal Express',
                                        number: '121121212121',
                                    },
                                ],
                                comments: [],
                                items: [
                                    {
                                        id: 'NTE=',
                                        product_sku: 'WSH12-31-Green',
                                        product_name: 'Erika Running Short-31-Green',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            id: 'OTUx',
                                            product_name: 'Erika Running Short-31-Green',
                                            quantity_ordered: 1,
                                            quantity_shipped: 1,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 1,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [],
                                            product: {
                                                __typename: 'SimpleProduct',
                                                canonical_url: null,
                                                uid: 'NjExOA==',
                                                name: 'Erika Running Short-31-Green',
                                                sku: 'WSH12-31-Green',
                                                thumbnail: {
                                                    label: 'Erika Running Short-31-Green',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    {
                                        id: 'NTQ=',
                                        product_sku: 'WSH12-31-Purple',
                                        product_name: 'Erika Running Short-31-Purple',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            product_name: 'Erika Running Short-31-Purple',
                                            id: 'OTU0',
                                            quantity_ordered: 1,
                                            quantity_shipped: 1,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 1,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [],
                                            product: {
                                                __typename: 'SimpleProduct',
                                                canonical_url: null,
                                                uid: 'NjEyMQ==',
                                                name: 'Erika Running Short-31-Purple',
                                                sku: 'WSH12-31-Purple',
                                                thumbnail: {
                                                    label: 'Erika Running Short-31-Purple',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'MDAwMDAwMDEy',
                                tracking: [
                                    {
                                        title: 'United Parcel Service',
                                        number: '666666666',
                                    },
                                    {
                                        title: 'United States Postal Service',
                                        number: '1111111111',
                                    },
                                    {
                                        title: 'DHL',
                                        number: '21212121212',
                                    },
                                ],
                                comments: [],
                                items: [
                                    {
                                        id: 'NTc=',
                                        product_sku: 'WSH12-32-Purple',
                                        product_name: 'Erika Running Short-32-Purple',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            product_name: 'Erika Running Short-32-Purple',
                                            id: 'OTM5',
                                            quantity_ordered: 1,
                                            quantity_shipped: 1,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 1,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [],
                                            product: {
                                                __typename: 'SimpleProduct',
                                                canonical_url: null,
                                                uid: 'NjEzMA==',
                                                name: 'Erika Running Short-32-Purple',
                                                sku: 'WSH12-32-Purple',
                                                thumbnail: {
                                                    label: 'Erika Running Short-32-Purple',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    {
                                        id: 'NjA=',
                                        product_sku: 'WSH12-29-Green',
                                        product_name: 'Erika Running Short-29-Green',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            product_name: 'Erika Running Short-29-Green',
                                            id: 'OTQy',
                                            quantity_ordered: 1,
                                            quantity_shipped: 1,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 1,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [],
                                            product: {
                                                __typename: 'SimpleProduct',
                                                canonical_url: null,
                                                uid: 'NjEwMA==',
                                                name: 'Erika Running Short-29-Green',
                                                sku: 'WSH12-29-Green',
                                                thumbnail: {
                                                    label: 'Erika Running Short-29-Green',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    {
                                        id: 'NjM=',
                                        product_sku: 'WSH12-30-Purple',
                                        product_name: 'Erika Running Short-30-Purple',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            product_name: 'Erika Running Short-30-Purple',
                                            id: 'OTQ1',
                                            quantity_ordered: 1,
                                            quantity_shipped: 1,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 1,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [],
                                            product: {
                                                __typename: 'SimpleProduct',
                                                canonical_url: null,
                                                uid: 'NjExMg==',
                                                name: 'Erika Running Short-30-Purple',
                                                sku: 'WSH12-30-Purple',
                                                thumbnail: {
                                                    label: 'Erika Running Short-30-Purple',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    {
                                        id: 'NjY=',
                                        product_sku: 'WSH12-30-Red',
                                        product_name: 'Erika Running Short-30-Red',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            product_name: 'Erika Running Short-30-Red',
                                            id: 'OTQ4',
                                            quantity_ordered: 1,
                                            quantity_shipped: 1,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 1,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [],
                                            product: {
                                                __typename: 'SimpleProduct',
                                                canonical_url: null,
                                                uid: 'NjExNQ==',
                                                name: 'Erika Running Short-30-Red',
                                                sku: 'WSH12-30-Red',
                                                thumbnail: {
                                                    label: 'Erika Running Short-30-Red',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'MDAwMDAwMDE1',
                                tracking: [
                                    {
                                        title: 'DHL',
                                        number: '666666666',
                                    },
                                ],
                                comments: [],
                                items: [
                                    {
                                        id: 'Njk=',
                                        product_sku: 'WSH12-30-Purple',
                                        product_name: 'Erika Running Short',
                                        order_item: {
                                            __typename: 'OrderItem',
                                            status: 'Shipped',
                                            product_name: 'Erika Running Short',
                                            id: 'OTU3',
                                            quantity_ordered: 12,
                                            quantity_shipped: 12,
                                            quantity_canceled: 0,
                                            quantity_invoiced: 12,
                                            quantity_refunded: 0,
                                            quantity_returned: 0,
                                            product_sale_price: {
                                                value: 45,
                                                currency: 'USD',
                                            },
                                            selected_options: [
                                                {
                                                    label: 'Size',
                                                    value: '30',
                                                },
                                                {
                                                    label: 'Color',
                                                    value: 'Purple',
                                                },
                                            ],
                                            product: {
                                                __typename: 'ConfigurableProduct',
                                                canonical_url: null,
                                                uid: 'NjEzNg==',
                                                name: 'Erika Running Short',
                                                sku: 'WSH12',
                                                thumbnail: {
                                                    label: 'Erika Running Short',
                                                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                                },
                                                price_range: {
                                                    maximum_price: {
                                                        regular_price: {
                                                            currency: 'USD',
                                                            value: 45,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                        shipping_address: {
                            city: 'City',
                            company: null,
                            country_code: 'AS',
                            fax: null,
                            firstname: 'James LATEST',
                            lastname: 'Anderson',
                            middlename: null,
                            postcode: '123123',
                            prefix: null,
                            region: 'Test',
                            region_id: '0',
                            street: ['Test ', 'Street'],
                            suffix: null,
                            telephone: '123123123',
                            vat_id: null,
                        },
                        billing_address: {
                            city: 'City',
                            company: null,
                            country_code: 'AS',
                            fax: null,
                            firstname: 'James LATEST',
                            lastname: 'Anderson',
                            middlename: null,
                            postcode: '123123',
                            prefix: null,
                            region: 'Test',
                            region_id: '0',
                            street: ['Test ', 'Street'],
                            suffix: null,
                            telephone: '123123123',
                            vat_id: null,
                        },
                        items: [
                            {
                                __typename: 'GiftCardOrderItem',
                                gift_card: {
                                    sender_name: null,
                                    sender_email: null,
                                    recipient_email: null,
                                    recipient_name: null,
                                },
                            },
                            {
                                __typename: 'GiftCardOrderItem',
                                gift_card: {
                                    sender_name: 'sender_name',
                                    sender_email: 'sender_email',
                                    recipient_email: 'recipient_email',
                                    recipient_name: 'recipient_name',
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'OTM5',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-29-Green',
                                id: 'OTQy',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEwMA==',
                                    name: 'Erika Running Short-29-Green',
                                    sku: 'WSH12-29-Green',
                                    thumbnail: {
                                        label: 'Erika Running Short-29-Green',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-30-Purple',
                                id: 'OTQ1',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjExMg==',
                                    name: 'Erika Running Short-30-Purple',
                                    sku: 'WSH12-30-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-30-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-30-Red',
                                id: 'OTQ4',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjExNQ==',
                                    name: 'Erika Running Short-30-Red',
                                    sku: 'WSH12-30-Red',
                                    thumbnail: {
                                        label: 'Erika Running Short-30-Red',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-31-Green',
                                id: 'OTUx',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjExOA==',
                                    name: 'Erika Running Short-31-Green',
                                    sku: 'WSH12-31-Green',
                                    thumbnail: {
                                        label: 'Erika Running Short-31-Green',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-31-Purple',
                                id: 'OTU0',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEyMQ==',
                                    name: 'Erika Running Short-31-Purple',
                                    sku: 'WSH12-31-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-31-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short',
                                id: 'OTU3',
                                quantity_ordered: 12,
                                quantity_shipped: 12,
                                quantity_canceled: 0,
                                quantity_invoiced: 12,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [
                                    {
                                        label: 'Size',
                                        value: '30',
                                    },
                                    {
                                        label: 'Color',
                                        value: 'Purple',
                                    },
                                ],
                                product: {
                                    __typename: 'ConfigurableProduct',
                                    canonical_url: null,
                                    uid: 'NjEzNg==',
                                    name: 'Erika Running Short',
                                    sku: 'WSH12',
                                    thumbnail: {
                                        label: 'Erika Running Short',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                        total: {
                            grand_total: {
                                value: 738,
                                currency: 'USD',
                            },
                            subtotal: {
                                currency: 'USD',
                                value: 810,
                            },
                            taxes: [],
                            total_tax: {
                                currency: 'USD',
                                value: 0,
                            },
                            total_shipping: {
                                currency: 'USD',
                                value: 90,
                            },
                            discounts: [
                                {
                                    amount: {
                                        currency: 'USD',
                                        value: 162,
                                    },
                                    label: 'Discount',
                                },
                            ],
                        },
                    },
                ],
            },
        },
    },
};
exports.transformMockOrderOutput = {
    grandTotal: {
        value: 738,
        currency: 'USD',
    },
    subtotal: {
        currency: 'USD',
        value: 810,
    },
    taxes: [],
    totalTax: {
        currency: 'USD',
        value: 0,
    },
    totalShipping: {
        currency: 'USD',
        value: 90,
    },
    discounts: [
        {
            amount: {
                currency: 'USD',
                value: 162,
            },
            label: 'Discount',
        },
    ],
    availableActions: ['REORDER'],
    status: 'Pending',
    number: '000000597',
    id: 'NTc2',
    orderDate: '2024-08-29 20:20:24',
    carrier: 'Flat Rate',
    shippingMethod: null,
    coupons: [],
    shipments: [
        {
            id: 'MDAwMDAwMDA5',
            tracking: [
                {
                    title: 'DHL',
                    number: '234232323232',
                },
                {
                    title: 'Federal Express',
                    number: '121121212121',
                },
            ],
            comments: [],
            items: [
                {
                    id: 'NTE=',
                    productSku: 'WSH12-31-Green',
                    productName: 'Erika Running Short-31-Green',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short-31-Green',
                        id: 'OTUx',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjExOA==',
                            name: 'Erika Running Short-31-Green',
                            sku: 'WSH12-31-Green',
                            thumbnail: {
                                label: 'Erika Running Short-31-Green',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'NTQ=',
                    productSku: 'WSH12-31-Purple',
                    productName: 'Erika Running Short-31-Purple',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short-31-Purple',
                        id: 'OTU0',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjEyMQ==',
                            name: 'Erika Running Short-31-Purple',
                            sku: 'WSH12-31-Purple',
                            thumbnail: {
                                label: 'Erika Running Short-31-Purple',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            id: 'MDAwMDAwMDEy',
            tracking: [
                {
                    title: 'United Parcel Service',
                    number: '666666666',
                },
                {
                    title: 'United States Postal Service',
                    number: '1111111111',
                },
                {
                    title: 'DHL',
                    number: '21212121212',
                },
            ],
            comments: [],
            items: [
                {
                    id: 'NTc=',
                    productSku: 'WSH12-32-Purple',
                    productName: 'Erika Running Short-32-Purple',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short-32-Purple',
                        id: 'OTM5',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjEzMA==',
                            name: 'Erika Running Short-32-Purple',
                            sku: 'WSH12-32-Purple',
                            thumbnail: {
                                label: 'Erika Running Short-32-Purple',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'NjA=',
                    productSku: 'WSH12-29-Green',
                    productName: 'Erika Running Short-29-Green',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short-29-Green',
                        id: 'OTQy',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjEwMA==',
                            name: 'Erika Running Short-29-Green',
                            sku: 'WSH12-29-Green',
                            thumbnail: {
                                label: 'Erika Running Short-29-Green',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'NjM=',
                    productSku: 'WSH12-30-Purple',
                    productName: 'Erika Running Short-30-Purple',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short-30-Purple',
                        id: 'OTQ1',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjExMg==',
                            name: 'Erika Running Short-30-Purple',
                            sku: 'WSH12-30-Purple',
                            thumbnail: {
                                label: 'Erika Running Short-30-Purple',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'NjY=',
                    productSku: 'WSH12-30-Red',
                    productName: 'Erika Running Short-30-Red',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short-30-Red',
                        id: 'OTQ4',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjExNQ==',
                            name: 'Erika Running Short-30-Red',
                            sku: 'WSH12-30-Red',
                            thumbnail: {
                                label: 'Erika Running Short-30-Red',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            id: 'MDAwMDAwMDE1',
            tracking: [
                {
                    title: 'DHL',
                    number: '666666666',
                },
            ],
            comments: [],
            items: [
                {
                    id: 'Njk=',
                    productSku: 'WSH12-30-Purple',
                    productName: 'Erika Running Short',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Shipped',
                        productName: 'Erika Running Short',
                        id: 'OTU3',
                        quantityOrdered: 12,
                        quantityShipped: 12,
                        quantityCanceled: 0,
                        quantityInvoiced: 12,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [
                            {
                                label: 'Size',
                                value: '30',
                            },
                            {
                                label: 'Color',
                                value: 'Purple',
                            },
                        ],
                        product: {
                            __typename: 'ConfigurableProduct',
                            canonicalUrl: null,
                            uid: 'NjEzNg==',
                            name: 'Erika Running Short',
                            sku: 'WSH12',
                            thumbnail: {
                                label: 'Erika Running Short',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },
    ],
    shippingAddress: {
        city: 'City',
        company: null,
        countryCode: 'AS',
        fax: null,
        firstName: 'James LATEST',
        lastName: 'Anderson',
        middleName: null,
        postCode: '123123',
        prefix: null,
        region: 'Test',
        regionId: '0',
        street: ['Test ', 'Street'],
        suffix: null,
        telephone: '123123123',
        vatId: null,
    },
    billingAddress: {
        city: 'City',
        company: null,
        countryCode: 'AS',
        fax: null,
        firstName: 'James LATEST',
        lastName: 'Anderson',
        middleName: null,
        postCode: '123123',
        prefix: null,
        region: 'Test',
        regionId: '0',
        street: ['Test ', 'Street'],
        suffix: null,
        telephone: '123123123',
        vatId: null,
    },
    items: [
        {
            type: 'GiftCardOrderItem',
            configurableOptions: undefined,
            discounted: true,
            total: {
                currency: undefined,
                value: NaN,
            },
            totalInclTax: {
                currency: undefined,
                value: NaN,
            },
            price: { currency: undefined, value: undefined },
            priceInclTax: { currency: undefined, value: undefined },
            totalQuantity: 0,
            regularPrice: { currency: undefined, value: undefined },
            product: {
                canonicalUrl: '',
                id: '',
                name: '',
                sku: '',
                image: '',
                productType: '',
                thumbnail: {
                    label: '',
                    url: '',
                },
            },
            thumbnail: {
                label: '',
                url: '',
            },
            giftCard: {
                senderName: '',
                senderEmail: '',
                recipientEmail: '',
                recipientName: '',
            },
            id: undefined,
        },
        {
            type: 'GiftCardOrderItem',
            configurableOptions: undefined,
            discounted: true,
            total: {
                currency: undefined,
                value: NaN,
            },
            totalInclTax: {
                currency: undefined,
                value: NaN,
            },
            price: { currency: undefined, value: undefined },
            priceInclTax: { currency: undefined, value: undefined },
            totalQuantity: 0,
            regularPrice: { currency: undefined, value: undefined },
            product: {
                canonicalUrl: '',
                id: '',
                name: '',
                sku: '',
                image: '',
                productType: '',
                thumbnail: {
                    label: '',
                    url: '',
                },
            },
            thumbnail: {
                label: '',
                url: '',
            },
            giftCard: {
                senderName: 'sender_name',
                senderEmail: 'sender_email',
                recipientEmail: 'recipient_email',
                recipientName: 'recipient_name',
            },
            id: undefined,
        },
        {
            type: 'OrderItem',
            id: 'OTM5',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEzMA==',
                name: 'Erika Running Short-32-Purple',
                sku: 'WSH12-32-Purple',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-32-Purple',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-32-Purple',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            id: 'OTQy',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEwMA==',
                name: 'Erika Running Short-29-Green',
                sku: 'WSH12-29-Green',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-29-Green',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-29-Green',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            id: 'OTQ1',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjExMg==',
                name: 'Erika Running Short-30-Purple',
                sku: 'WSH12-30-Purple',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-30-Purple',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-30-Purple',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            id: 'OTQ4',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjExNQ==',
                name: 'Erika Running Short-30-Red',
                sku: 'WSH12-30-Red',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-30-Red',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-30-Red',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            id: 'OTUx',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjExOA==',
                name: 'Erika Running Short-31-Green',
                sku: 'WSH12-31-Green',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-31-Green',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-31-Green',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            id: 'OTU0',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEyMQ==',
                name: 'Erika Running Short-31-Purple',
                sku: 'WSH12-31-Purple',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-31-Purple',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-31-Purple',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            id: 'OTU3',
            giftCard: undefined,
            discounted: false,
            total: {
                value: 540,
                currency: 'USD',
            },
            totalInclTax: {
                value: 540,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 12,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEzNg==',
                name: 'Erika Running Short',
                sku: 'WSH12',
                image: '',
                productType: 'ConfigurableProduct',
                thumbnail: {
                    label: 'Erika Running Short',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Size: '30',
                Color: 'Purple',
            },
        },
    ],
    totalQuantity: 18,
    shipping: {
        amount: 0,
        currency: '',
        code: '',
    },
    payments: [
        {
            code: '',
            name: '',
        },
    ],
};
exports.storyBookOrderData = {
    grandTotal: {
        value: 738,
        currency: 'USD',
    },
    subtotal: {
        currency: 'USD',
        value: 810,
    },
    taxes: [],
    totalTax: {
        currency: 'USD',
        value: 0,
    },
    totalShipping: {
        currency: 'USD',
        value: 90,
    },
    discounts: [
        {
            amount: {
                currency: 'USD',
                value: 162,
            },
            label: 'Discount',
        },
    ],
    availableActions: ['CANCEL', 'REORDER'],
    status: 'Processing',
    number: '000000597-3',
    id: 'NjE4',
    orderDate: '2024-09-09 11:00:43',
    carrier: 'Flat Rate',
    shippingMethod: 'Flat Rate - Fixed',
    isVirtual: false,
    coupons: [],
    shipments: [
        {
            id: 'MDAwMDAwMDU3',
            number: '000000057',
            tracking: [
                {
                    title: 'Custom text',
                    number: '1111111111',
                    carrier: 'fedex',
                },
                {
                    title: 'User title',
                    number: '2222222222',
                    carrier: 'dhl',
                },
                {
                    title: 'Delivery fast service',
                    number: '3333333333',
                    carrier: 'usps',
                },
            ],
            comments: [],
            items: [
                {
                    id: 'MTUw',
                    productSku: 'WSH12-32-Purple',
                    productName: 'Erika Running Short-32-Purple',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Mixed',
                        productName: 'Erika Running Short-32-Purple',
                        id: 'MTA5OA==',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjEzMA==',
                            name: 'Erika Running Short-32-Purple',
                            sku: 'WSH12-32-Purple',
                            thumbnail: {
                                label: 'Erika Running Short-32-Purple',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'MTUz',
                    productSku: 'WSH12-29-Green',
                    productName: 'Erika Running Short-29-Green',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Mixed',
                        productName: 'Erika Running Short-29-Green',
                        id: 'MTEwMQ==',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjEwMA==',
                            name: 'Erika Running Short-29-Green',
                            sku: 'WSH12-29-Green',
                            thumbnail: {
                                label: 'Erika Running Short-29-Green',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'MTU2',
                    productSku: 'WSH12-30-Purple',
                    productName: 'Erika Running Short-30-Purple',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Mixed',
                        productName: 'Erika Running Short-30-Purple',
                        id: 'MTEwNA==',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjExMg==',
                            name: 'Erika Running Short-30-Purple',
                            sku: 'WSH12-30-Purple',
                            thumbnail: {
                                label: 'Erika Running Short-30-Purple',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'MTU5',
                    productSku: 'WSH12-30-Red',
                    productName: 'Erika Running Short-30-Red',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Mixed',
                        productName: 'Erika Running Short-30-Red',
                        id: 'MTEwNw==',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjExNQ==',
                            name: 'Erika Running Short-30-Red',
                            sku: 'WSH12-30-Red',
                            thumbnail: {
                                label: 'Erika Running Short-30-Red',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'MTYy',
                    productSku: 'WSH12-31-Green',
                    productName: 'Erika Running Short-31-Green',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Mixed',
                        productName: 'Erika Running Short-31-Green',
                        id: 'MTExMA==',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjExOA==',
                            name: 'Erika Running Short-31-Green',
                            sku: 'WSH12-31-Green',
                            thumbnail: {
                                label: 'Erika Running Short-31-Green',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    id: 'MTY1',
                    productSku: 'WSH12-31-Purple',
                    productName: 'Erika Running Short-31-Purple',
                    orderItem: {
                        __typename: 'OrderItem',
                        status: 'Mixed',
                        productName: 'Erika Running Short-31-Purple',
                        id: 'MTExMw==',
                        quantityOrdered: 1,
                        quantityShipped: 1,
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        productSalePrice: {
                            value: 45,
                            currency: 'USD',
                        },
                        selectedOptions: [],
                        product: {
                            __typename: 'SimpleProduct',
                            canonicalUrl: null,
                            uid: 'NjEyMQ==',
                            name: 'Erika Running Short-31-Purple',
                            sku: 'WSH12-31-Purple',
                            thumbnail: {
                                label: 'Erika Running Short-31-Purple',
                                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                            },
                            priceRange: {
                                maximumPrice: {
                                    regularPrice: {
                                        currency: 'USD',
                                        value: 45,
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },
    ],
    payments: [
        {
            code: 'checkmo',
            name: 'Check / Money order',
        },
    ],
    shippingAddress: {
        city: 'City',
        company: null,
        countryCode: 'AS',
        fax: null,
        firstName: 'James LATEST',
        lastName: 'Anderson',
        middleName: null,
        postCode: '123123',
        prefix: null,
        region: 'Test',
        regionId: '0',
        street: ['Test ', 'Street'],
        suffix: null,
        telephone: '123123123',
        vatId: null,
    },
    billingAddress: {
        city: 'City',
        company: null,
        countryCode: 'AS',
        fax: null,
        firstName: 'James LATEST',
        lastName: 'Anderson',
        middleName: null,
        postCode: '123123',
        prefix: null,
        region: 'Test',
        regionId: '0',
        street: ['Test ', 'Street'],
        suffix: null,
        telephone: '123123123',
        vatId: null,
    },
    items: [
        {
            type: 'OrderItem',
            productName: 'Erika Running Short-32-Purple',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MTA5OA==',
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEzMA==',
                name: 'Erika Running Short-32-Purple',
                sku: 'WSH12-32-Purple',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-32-Purple',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-32-Purple',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            productName: 'Erika Running Short-29-Green',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MTEwMQ==',
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEwMA==',
                name: 'Erika Running Short-29-Green',
                sku: 'WSH12-29-Green',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-29-Green',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-29-Green',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            productName: 'Erika Running Short-30-Purple',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MTEwNA==',
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjExMg==',
                name: 'Erika Running Short-30-Purple',
                sku: 'WSH12-30-Purple',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-30-Purple',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-30-Purple',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            productName: 'Erika Running Short-30-Red',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MTEwNw==',
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjExNQ==',
                name: 'Erika Running Short-30-Red',
                sku: 'WSH12-30-Red',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-30-Red',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-30-Red',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-red_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            productName: 'Erika Running Short-31-Green',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MTExMA==',
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjExOA==',
                name: 'Erika Running Short-31-Green',
                sku: 'WSH12-31-Green',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-31-Green',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-31-Green',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            productName: 'Erika Running Short-31-Purple',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MTExMw==',
            discounted: false,
            total: {
                value: 45,
                currency: 'USD',
            },
            totalInclTax: {
                value: 45,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEyMQ==',
                name: 'Erika Running Short-31-Purple',
                sku: 'WSH12-31-Purple',
                image: '',
                productType: 'SimpleProduct',
                thumbnail: {
                    label: 'Erika Running Short-31-Purple',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short-31-Purple',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
        },
        {
            type: 'OrderItem',
            productName: 'Erika Running Short',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 12,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MTExNg==',
            discounted: false,
            total: {
                value: 540,
                currency: 'USD',
            },
            totalInclTax: {
                value: 540,
                currency: 'USD',
            },
            price: {
                value: 45,
                currency: 'USD',
            },
            priceInclTax: {
                value: 45,
                currency: 'USD',
            },
            totalQuantity: 12,
            regularPrice: {
                value: 45,
                currency: 'USD',
            },
            product: {
                canonicalUrl: '',
                id: 'NjEzNg==',
                name: 'Erika Running Short',
                sku: 'WSH12',
                image: '',
                productType: 'ConfigurableProduct',
                thumbnail: {
                    label: 'Erika Running Short',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
            },
            thumbnail: {
                label: 'Erika Running Short',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Size: '30',
                Color: 'Purple',
            },
        },
    ],
    totalQuantity: 18,
    shipping: {
        amount: 0,
        currency: '',
        code: 'Flat Rate - Fixed',
    },
};
exports.storyBookShortOrderData = {
    email: 'testmyemail666@mail.com',
    status: 'Complete',
    number: '000000597-6',
    id: 'NjM5',
    orderDate: '2024-09-10 17:08:30',
    carrier: 'Flat Rate',
    shippingMethod: 'Flat Rate - Fixed',
    payments: [
        {
            code: 'checkmo',
            name: 'Check / Money order',
        },
    ],
    totalQuantity: 6,
    shipping: {
        amount: 100,
        currency: 'USD',
        code: 'DHL',
    },
};
exports.storyBookNormalizeAddress = {
    billingAddress: [
        [
            {
                name: 'firstname',
                orderNumber: 20,
                value: 'Alex',
                label: null,
            },
            {
                name: 'lastname',
                orderNumber: 40,
                value: 'Smith',
                label: null,
            },
        ],
        [
            {
                name: 'street',
                orderNumber: 70,
                value: ['Test street', 'Another street line'],
                label: null,
            },
        ],
        [
            {
                name: 'region',
                orderNumber: 90,
                value: 'Alabama',
                label: null,
            },
        ],
        [
            {
                name: 'city',
                orderNumber: 100,
                value: 'City',
                label: null,
            },
            {
                name: 'postcode',
                orderNumber: 110,
                value: '12345',
                label: null,
            },
        ],
        [
            {
                name: 'telephone',
                orderNumber: 120,
                value: '123456789',
                label: null,
            },
        ],
    ],
    shippingAddress: [
        [
            {
                name: 'firstname',
                orderNumber: 20,
                value: 'Alex',
                label: null,
            },
            {
                name: 'lastname',
                orderNumber: 40,
                value: 'Smith',
                label: null,
            },
        ],
        [
            {
                name: 'street',
                orderNumber: 70,
                value: ['Test street', 'Another street line'],
                label: null,
            },
        ],
        [
            {
                name: 'region',
                orderNumber: 90,
                value: 'Alabama',
                label: null,
            },
        ],
        [
            {
                name: 'city',
                orderNumber: 100,
                value: 'City',
                label: null,
            },
            {
                name: 'postcode',
                orderNumber: 110,
                value: '12345',
                label: null,
            },
        ],
        [
            {
                name: 'telephone',
                orderNumber: 120,
                value: '123456789',
                label: null,
            },
        ],
    ],
};
exports.orderCostSummaryMockup = {
    number: 'ORD123456',
    email: 'customer@example.com',
    token: 'abcdef123456',
    status: 'Shipped',
    isVirtual: false,
    totalQuantity: 3,
    shippingMethod: 'Standard Shipping',
    carrier: 'UPS',
    discounts: [{ amount: { value: 10, currency: 'USD' }, label: 'Spring Sale' }],
    coupons: [{ code: 'SPRING2024' }],
    payments: [{ code: 'CREDIT_CARD', name: 'Visa' }],
    shipping: { code: 'STANDARD', amount: 5.99, currency: 'USD' },
    shipments: [
        {
            id: 'SHIP001',
            number: 'SHIP123456',
            tracking: [
                { carrier: 'UPS', number: '1Z12345E0205271688', title: 'Package' },
            ],
            comments: [
                {
                    message: 'Your order has shipped!',
                    timestamp: '2024-10-10T12:00:00Z',
                },
            ],
            items: [
                {
                    id: 'PROD001',
                    productSku: 'SOME-SKU-FOR-PRODUCT',
                    productName: 'Product 01',
                    orderItem: {
                        id: 'PROD001',
                        type: 'simple',
                        discounted: false,
                        productName: 'PRODUCT 01',
                        totalQuantity: 1,
                        price: {
                            value: 29.99,
                            currency: 'USD',
                        },
                        totalInclTax: {},
                        priceInclTax: {},
                        regularPrice: { value: 30, currency: 'USD' },
                        total: { value: 30, currency: 'USD' },
                        configurableOptions: {},
                        product: {
                            id: 'PROD001',
                            name: 'Product 1',
                            productType: 'simple',
                            sku: 'SOME-SKU-FOR-PRODUCT',
                            thumbnail: {
                                url: 'https://example.com',
                                label: 'Image URL',
                            },
                        },
                        thumbnail: {
                            url: 'https://example.com',
                            label: 'Image URL',
                        },
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityOrdered: 1,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        quantityShipped: 1,
                    },
                },
                {
                    id: 'PROD002',
                    productSku: 'SOME-SKU-FOR-PRODUCT',
                    productName: 'Product 02',
                    orderItem: {
                        id: 'PROD002',
                        type: 'simple',
                        discounted: false,
                        productName: 'PRODUCT 02',
                        totalQuantity: 2,
                        price: {
                            value: 49.99,
                            currency: 'USD',
                        },
                        totalInclTax: {},
                        priceInclTax: {},
                        regularPrice: { value: 50, currency: 'USD' },
                        total: { value: 50, currency: 'USD' },
                        configurableOptions: {},
                        product: {
                            id: 'PROD002',
                            name: 'Product 2',
                            productType: 'simple',
                            sku: 'SOME-SKU-FOR-PRODUCT',
                            thumbnail: {
                                url: 'https://example.com',
                                label: 'Image URL',
                            },
                        },
                        thumbnail: {
                            url: 'https://example.com',
                            label: 'Image URL',
                        },
                        quantityCanceled: 0,
                        quantityInvoiced: 0,
                        quantityOrdered: 2,
                        quantityRefunded: 0,
                        quantityReturned: 0,
                        quantityShipped: 1,
                    },
                },
            ],
        },
    ],
    items: [
        {
            id: 'PROD001',
            type: 'simple',
            discounted: false,
            productName: 'PRODUCT 01',
            totalQuantity: 1,
            price: {
                value: 29.99,
                currency: 'USD',
            },
            totalInclTax: {},
            priceInclTax: {},
            regularPrice: { value: 30, currency: 'USD' },
            total: { value: 30, currency: 'USD' },
            configurableOptions: {},
            product: {
                id: 'PROD001',
                name: 'Product 1',
                productType: 'simple',
                sku: 'SOME-SKU-FOR-PRODUCT',
                thumbnail: {
                    url: 'https://example.com',
                    label: 'Image URL',
                },
            },
            thumbnail: {
                url: 'https://example.com',
                label: 'Image URL',
            },
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
        },
        {
            id: 'PROD002',
            type: 'simple',
            discounted: false,
            productName: 'PRODUCT 02',
            totalQuantity: 2,
            price: {
                value: 49.99,
                currency: 'USD',
            },
            totalInclTax: {},
            priceInclTax: {},
            regularPrice: { value: 50, currency: 'USD' },
            total: { value: 50, currency: 'USD' },
            configurableOptions: {},
            product: {
                id: 'PROD002',
                name: 'Product 2',
                productType: 'simple',
                sku: 'SOME-SKU-FOR-PRODUCT',
                thumbnail: {
                    url: 'https://example.com',
                    label: 'Image URL',
                },
            },
            thumbnail: {
                url: 'https://example.com',
                label: 'Image URL',
            },
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 2,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
        },
    ],
    totalGiftcard: { value: 10, currency: 'USD' },
    grandTotal: { value: 69.97, currency: 'USD' },
    totalShipping: { value: 5.99, currency: 'USD' },
    subtotal: { value: 64.98, currency: 'USD' },
    totalTax: { value: 0.0, currency: 'USD' },
    shippingAddress: {
        street: ['123 Main St'],
        city: 'Anytown',
        country: 'USA',
        company: 'Dummy Ax company',
        firstName: 'BoJack',
        middleName: '',
        lastName: 'Horseman',
        postCode: '60606',
        region: 'IL',
        regionId: '23',
        telephone: '11111',
        customAttributes: [],
    },
    billingAddress: {
        street: ['456 Elm St'],
        city: 'Othertown',
        company: 'Dummy Ax company',
        country: 'USA',
        firstName: 'BoJack',
        middleName: '',
        lastName: 'Horseman',
        postCode: '60606',
        region: 'IL',
        regionId: '23',
        telephone: '11111',
        customAttributes: [],
    },
    availableActions: [],
};
exports.orderMockOrderProductItemsList = {
    items: [
        {
            type: 'DownloadableOrderItem',
            productName: 'Yoga Adventure',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzI0OA==',
            discounted: false,
            total: {
                value: 22,
                currency: 'USD',
            },
            totalInclTax: {
                value: 22,
                currency: 'USD',
            },
            price: {
                value: 22,
                currency: 'USD',
            },
            priceInclTax: {
                value: 22,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 22,
                currency: 'USD',
            },
            product: {
                __typename: 'DownloadableProduct',
                canonicalUrl: '',
                uid: 'MTM5',
                name: 'Yoga Adventure',
                sku: '240-LV06',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Yoga Adventure',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/l/t/lt03.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 22,
                        },
                    },
                },
                id: 'MTM5',
                image: '',
                productType: 'DownloadableProduct',
            },
            thumbnail: {
                label: 'Yoga Adventure',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/l/t/lt03.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 23.82,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 22,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 23.815,
                    currency: 'USD',
                },
                price: {
                    value: 22,
                    currency: 'USD',
                },
            },
            downloadableLinks: {
                count: 1,
                result: 'Yoga Adventure',
            },
        },
        {
            type: 'OrderItem',
            productName: 'Mona Pullover Hoodlie',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE1OA==',
            discounted: false,
            total: {
                value: 57,
                currency: 'USD',
            },
            totalInclTax: {
                value: 57,
                currency: 'USD',
            },
            price: {
                value: 57,
                currency: 'USD',
            },
            priceInclTax: {
                value: 57,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 57,
                currency: 'USD',
            },
            product: {
                __typename: 'ConfigurableProduct',
                canonicalUrl: '',
                uid: 'MzE0OA==',
                name: 'Mona Pullover Hoodlie',
                sku: 'WH01',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Mona Pullover Hoodlie',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/h/wh01-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 57,
                        },
                    },
                },
                id: 'MzE0OA==',
                image: '',
                productType: 'ConfigurableProduct',
            },
            thumbnail: {
                label: 'Mona Pullover Hoodlie',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/h/wh01-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Color: 'Green',
                Size: 'XS',
            },
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 61.7,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 57,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 61.7025,
                    currency: 'USD',
                },
                price: {
                    value: 57,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 11.4,
                        },
                    },
                ],
            },
        },
        {
            type: 'OrderItem',
            productName: 'Virtual Product',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 2,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE2NA==',
            discounted: false,
            total: {
                value: 200,
                currency: 'USD',
            },
            totalInclTax: {
                value: 200,
                currency: 'USD',
            },
            price: {
                value: 100,
                currency: 'USD',
            },
            priceInclTax: {
                value: 100,
                currency: 'USD',
            },
            totalQuantity: 2,
            regularPrice: {
                value: 100,
                currency: 'USD',
            },
            product: {
                __typename: 'VirtualProduct',
                canonicalUrl: '',
                uid: 'NjE1OQ==',
                name: 'Virtual Product',
                sku: 'VR-1234',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Virtual Product',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/d/o/download_copy.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 100,
                        },
                    },
                },
                id: 'NjE1OQ==',
                image: '',
                productType: 'VirtualProduct',
            },
            thumbnail: {
                label: 'Virtual Product',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/d/o/download_copy.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 108.25,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 100,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 108.25,
                    currency: 'USD',
                },
                price: {
                    value: 100,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 40,
                        },
                    },
                ],
            },
        },
        {
            type: 'BundleOrderItem',
            productName: 'Sprite Yoga Companion Kit',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE2Nw==',
            discounted: true,
            total: {
                value: 68,
                currency: 'USD',
            },
            totalInclTax: {
                value: 68,
                currency: 'USD',
            },
            price: {
                value: 68,
                currency: 'USD',
            },
            priceInclTax: {
                value: 68,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 77,
                currency: 'USD',
            },
            product: {
                __typename: 'BundleProduct',
                canonicalUrl: '',
                uid: 'MTU0',
                name: 'Sprite Yoga Companion Kit',
                sku: '24-WG080',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Sprite Yoga Companion Kit',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/l/u/luma-yoga-kit-2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 77,
                        },
                    },
                },
                id: 'MTU0',
                image: '',
                productType: 'BundleProduct',
            },
            thumbnail: {
                label: 'Sprite Yoga Companion Kit',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/l/u/luma-yoga-kit-2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
            bundleOptions: {
                'Sprite Foam Yoga Brick': 'Sprite Foam Yoga Brick',
                'Sprite Foam Roller': 'Sprite Foam Roller',
                'Sprite Stasis Ball': 'Sprite Stasis Ball 65 cm',
                'Sprite Yoga Strap': 'Sprite Yoga Strap 8 foot',
            },
            itemPrices: {
                priceIncludingTax: {
                    value: 73.61,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 68,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 68,
                    currency: 'USD',
                },
                price: {
                    value: 68,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 0,
                        },
                    },
                ],
            },
        },
        {
            type: 'OrderItem',
            productName: 'Hera Pullover Hoodie',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE4Mg==',
            discounted: false,
            total: {
                value: 48,
                currency: 'USD',
            },
            totalInclTax: {
                value: 48,
                currency: 'USD',
            },
            price: {
                value: 48,
                currency: 'USD',
            },
            priceInclTax: {
                value: 48,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 48,
                currency: 'USD',
            },
            product: {
                __typename: 'ConfigurableProduct',
                canonicalUrl: '',
                uid: 'MzE5Ng==',
                name: 'Hera Pullover Hoodie',
                sku: 'WH02',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Hera Pullover Hoodie',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/h/wh02-blue_main_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 48,
                        },
                    },
                },
                id: 'MzE5Ng==',
                image: '',
                productType: 'ConfigurableProduct',
            },
            thumbnail: {
                label: 'Hera Pullover Hoodie',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/h/wh02-blue_main_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Size: 'S',
                Color: 'Green',
            },
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 51.96,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 48,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 51.96,
                    currency: 'USD',
                },
                price: {
                    value: 48,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 9.6,
                        },
                    },
                ],
            },
        },
        {
            type: 'OrderItem',
            productName: 'Hollister Backyard Sweatshirt',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE4OA==',
            discounted: false,
            total: {
                value: 52,
                currency: 'USD',
            },
            totalInclTax: {
                value: 52,
                currency: 'USD',
            },
            price: {
                value: 52,
                currency: 'USD',
            },
            priceInclTax: {
                value: 52,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 52,
                currency: 'USD',
            },
            product: {
                __typename: 'ConfigurableProduct',
                canonicalUrl: '',
                uid: 'Mzk0',
                name: 'Hollister Backyard Sweatshirt',
                sku: 'MH05',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Hollister Backyard Sweatshirt',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/m/h/mh05-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 52,
                        },
                    },
                },
                id: 'Mzk0',
                image: '',
                productType: 'ConfigurableProduct',
            },
            thumbnail: {
                label: 'Hollister Backyard Sweatshirt',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/m/h/mh05-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Color: 'Green',
                Size: 'XL',
            },
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 56.29,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 52,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 56.29,
                    currency: 'USD',
                },
                price: {
                    value: 52,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 10.4,
                        },
                    },
                ],
            },
        },
        {
            type: 'OrderItem',
            productName: 'Savvy Shoulder Tote',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE5NA==',
            discounted: true,
            total: {
                value: 24,
                currency: 'USD',
            },
            totalInclTax: {
                value: 24,
                currency: 'USD',
            },
            price: {
                value: 24,
                currency: 'USD',
            },
            priceInclTax: {
                value: 24,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 32,
                currency: 'USD',
            },
            product: {
                __typename: 'SimpleProduct',
                canonicalUrl: '',
                uid: 'Mjg=',
                name: 'Savvy Shoulder Tote',
                sku: '24-WB05',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Savvy Shoulder Tote',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/b/wb05-red-0.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 32,
                        },
                    },
                },
                id: 'Mjg=',
                image: '',
                productType: 'SimpleProduct',
            },
            thumbnail: {
                label: 'Savvy Shoulder Tote',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/b/wb05-red-0.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 25.98,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 32,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 34.64,
                    currency: 'USD',
                },
                price: {
                    value: 24,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 0,
                        },
                    },
                ],
            },
        },
        {
            type: 'OrderItem',
            productName: 'Crown Summit Backpack',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzE5Nw==',
            discounted: false,
            total: {
                value: 38,
                currency: 'USD',
            },
            totalInclTax: {
                value: 38,
                currency: 'USD',
            },
            price: {
                value: 38,
                currency: 'USD',
            },
            priceInclTax: {
                value: 38,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 38,
                currency: 'USD',
            },
            product: {
                __typename: 'SimpleProduct',
                canonicalUrl: '',
                uid: 'Nw==',
                name: 'Crown Summit Backpack',
                sku: '24-MB03',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Image',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/m/b/mb03-black-0.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 38,
                        },
                    },
                },
                id: 'Nw==',
                image: '',
                productType: 'SimpleProduct',
            },
            thumbnail: {
                label: 'Image',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/m/b/mb03-black-0.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 41.14,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 38,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 41.135,
                    currency: 'USD',
                },
                price: {
                    value: 38,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 7.6,
                        },
                    },
                ],
            },
        },
        {
            type: 'OrderItem',
            productName: 'Sahara Leggings',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzIwMA==',
            discounted: true,
            total: {
                value: 60,
                currency: 'USD',
            },
            totalInclTax: {
                value: 60,
                currency: 'USD',
            },
            price: {
                value: 60,
                currency: 'USD',
            },
            priceInclTax: {
                value: 60,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 75,
                currency: 'USD',
            },
            product: {
                __typename: 'ConfigurableProduct',
                canonicalUrl: '',
                uid: 'NTU1Nw==',
                name: 'Sahara Leggings',
                sku: 'WP05',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Sahara Leggings',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/p/wp05-gray_main_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 75,
                        },
                    },
                },
                id: 'NTU1Nw==',
                image: '',
                productType: 'ConfigurableProduct',
            },
            thumbnail: {
                label: 'Sahara Leggings',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/p/wp05-gray_main_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Size: '29',
                Color: 'Gray',
            },
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 64.95,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 75,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 81.1875,
                    currency: 'USD',
                },
                price: {
                    value: 60,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 12,
                        },
                    },
                ],
            },
        },
        {
            type: 'GiftCardOrderItem',
            productName: 'User Gift card comb',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzIwNg==',
            discounted: true,
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
                value: 0,
                currency: 'USD',
            },
            product: {
                __typename: 'GiftCardProduct',
                canonicalUrl: '',
                uid: 'NjE2OA==',
                name: 'User Gift card comb',
                sku: 'us-g-v-1-3',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'User Gift card comb',
                    url: 'https://mcstaging.aemshop.net/static/version1728903045/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/thumbnail.jpg',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 0,
                        },
                    },
                },
                id: 'NjE2OA==',
                image: '',
                productType: 'GiftCardProduct',
            },
            thumbnail: {
                label: 'User Gift card comb',
                url: 'https://mcstaging.aemshop.net/static/version1728903045/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/thumbnail.jpg',
            },
            giftCard: {
                senderName: 'Konstantin',
                senderEmail: '',
                recipientEmail: '',
                recipientName: 'Alex',
                message: 'Konstantin',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 50,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 50,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 50,
                    currency: 'USD',
                },
                price: {
                    value: 50,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 0,
                        },
                    },
                ],
            },
        },
        {
            type: 'GiftCardOrderItem',
            productName: 'User Gift card physical',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzIwOQ==',
            discounted: true,
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
                value: 0,
                currency: 'USD',
            },
            product: {
                __typename: 'GiftCardProduct',
                canonicalUrl: '',
                uid: 'NjE2NQ==',
                name: 'User Gift card physical',
                sku: 'us-g-v-1',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'User Gift card physical',
                    url: 'https://mcstaging.aemshop.net/static/version1728903045/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/thumbnail.jpg',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 0,
                        },
                    },
                },
                id: 'NjE2NQ==',
                image: '',
                productType: 'GiftCardProduct',
            },
            thumbnail: {
                label: 'User Gift card physical',
                url: 'https://mcstaging.aemshop.net/static/version1728903045/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/thumbnail.jpg',
            },
            giftCard: {
                senderName: 'Konstantin',
                senderEmail: '',
                recipientEmail: '',
                recipientName: 'Alex',
                message: 'Konstantin',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 50,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 50,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 50,
                    currency: 'USD',
                },
                price: {
                    value: 50,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 0,
                        },
                    },
                ],
            },
        },
        {
            type: 'GiftCardOrderItem',
            productName: 'Luma Virtual Gift Card',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzIxMg==',
            discounted: true,
            total: {
                value: 100,
                currency: 'USD',
            },
            totalInclTax: {
                value: 100,
                currency: 'USD',
            },
            price: {
                value: 100,
                currency: 'USD',
            },
            priceInclTax: {
                value: 100,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 0,
                currency: 'USD',
            },
            product: {
                __typename: 'GiftCardProduct',
                canonicalUrl: '',
                uid: 'NjE0Mg==',
                name: 'Luma Virtual Gift Card',
                sku: '243-MB09',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Image',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/g/i/gift-card-virtual-custom.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 0,
                        },
                    },
                },
                id: 'NjE0Mg==',
                image: '',
                productType: 'GiftCardProduct',
            },
            thumbnail: {
                label: 'Image',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/g/i/gift-card-virtual-custom.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            giftCard: {
                senderName: 'Alex',
                senderEmail: 'Alex@mail.com',
                recipientEmail: 'Alex@mail.com',
                recipientName: 'Konstantin',
                message: 'Hello my dear friend',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 100,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 100,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 100,
                    currency: 'USD',
                },
                price: {
                    value: 100,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 0,
                        },
                    },
                ],
            },
        },
        {
            type: 'GiftCardOrderItem',
            productName: 'Luma Mailed Gift Card',
            quantityCanceled: 0,
            quantityInvoiced: 0,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 0,
            id: 'MzIxNQ==',
            discounted: true,
            total: {
                value: 100,
                currency: 'USD',
            },
            totalInclTax: {
                value: 100,
                currency: 'USD',
            },
            price: {
                value: 100,
                currency: 'USD',
            },
            priceInclTax: {
                value: 100,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 0,
                currency: 'USD',
            },
            product: {
                __typename: 'GiftCardProduct',
                canonicalUrl: '',
                uid: 'NjEzOQ==',
                name: 'Luma Mailed Gift Card',
                sku: '243-MB04',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Luma Mailed Gift Card',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/g/i/gift-card-physical-custom.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 0,
                        },
                    },
                },
                id: 'NjEzOQ==',
                image: '',
                productType: 'GiftCardProduct',
            },
            thumbnail: {
                label: 'Luma Mailed Gift Card',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/g/i/gift-card-physical-custom.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            giftCard: {
                senderName: 'Smith',
                senderEmail: '',
                recipientEmail: '',
                recipientName: 'Alex',
                message: '',
            },
            configurableOptions: {},
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 100,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 100,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 100,
                    currency: 'USD',
                },
                price: {
                    value: 100,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 0,
                        },
                    },
                ],
            },
        },
        //
        {
            type: 'OrderItem',
            productName: 'Mona Pullover Hoodlie',
            quantityCanceled: 1,
            quantityInvoiced: 1,
            quantityOrdered: 1,
            quantityRefunded: 0,
            quantityReturned: 0,
            quantityShipped: 1,
            id: 'MzE1OA==',
            discounted: false,
            total: {
                value: 57,
                currency: 'USD',
            },
            totalInclTax: {
                value: 57,
                currency: 'USD',
            },
            price: {
                value: 57,
                currency: 'USD',
            },
            priceInclTax: {
                value: 57,
                currency: 'USD',
            },
            totalQuantity: 1,
            regularPrice: {
                value: 57,
                currency: 'USD',
            },
            product: {
                __typename: 'ConfigurableProduct',
                canonicalUrl: '',
                uid: 'MzOA==',
                name: 'Mona Pullover Hoodlie',
                sku: 'WH01',
                onlyXLeftInStock: null,
                stockStatus: 'IN_STOCK',
                thumbnail: {
                    label: 'Mona Pullover Hoodlie',
                    url: 'https://mcstaging.aemshop.net/media/catalog/product/w/h/wh01-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                },
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: 'USD',
                            value: 57,
                        },
                    },
                },
                id: 'MzOA==',
                image: '',
                productType: 'ConfigurableProduct',
            },
            thumbnail: {
                label: 'Mona Pullover Hoodlie',
                url: 'https://mcstaging.aemshop.net/media/catalog/product/w/h/wh01-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
            },
            configurableOptions: {
                Color: 'Green',
                Size: 'XS',
            },
            bundleOptions: null,
            itemPrices: {
                priceIncludingTax: {
                    value: 61.7,
                    currency: 'USD',
                },
                originalPrice: {
                    value: 57,
                    currency: 'USD',
                },
                originalPriceIncludingTax: {
                    value: 61.7025,
                    currency: 'USD',
                },
                price: {
                    value: 57,
                    currency: 'USD',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 11.4,
                        },
                    },
                ],
            },
        },
    ],
    totalQuantity: 13,
};
exports.returnOrderListMockResponse = {
    customer: {
        returns: {
            page_info: {
                page_size: 20,
                total_pages: 1,
                current_page: 1,
            },
            items: [
                {
                    number: '000000003',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000600',
                        token: '0:3:dd6xo3McQi4ThL7eVpH3piX5Sz7Z+5yynTeNiL3dvS708x01rXyO4/ZmDsLu5fYecbReYhCyxu+6NSLd4XzWAeR+1po=',
                    },
                    items: [
                        {
                            uid: 'Mw==',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'OTg3',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            uid: 'Ng==',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-29-Green',
                                id: 'OTkw',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEwMA==',
                                    name: 'Erika Running Short-29-Green',
                                    sku: 'WSH12-29-Green',
                                    thumbnail: {
                                        label: 'Erika Running Short-29-Green',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000005',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000597-8',
                        token: '0:3:AjrgQY5IOzKqDXFDOCngD8dcjyhSQKx/is8DyMWrLbPEAA6mcofOv+/gsUwaosqZE9rAEwtFKig1Bnul+jUeqOgDGRFeaQ==',
                    },
                    items: [
                        {
                            uid: 'OA==',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'MjE3Nw==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000008',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000597-8',
                        token: '0:3:Q7mTbMz38zORlH398h+aDt4wbQt7ukkCM8gTST4R2uTulmrTwGYbKk0vDXDDrNg8Tlil+Orn0Dh/6AQEmzv/PE7qxRsCmw==',
                    },
                    items: [
                        {
                            uid: 'MTE=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-29-Green',
                                id: 'MjE4MA==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEwMA==',
                                    name: 'Erika Running Short-29-Green',
                                    sku: 'WSH12-29-Green',
                                    thumbnail: {
                                        label: 'Erika Running Short-29-Green',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000011',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000597-8',
                        token: '0:3:g/ywYtjU4qaRlbS/ib+rZk1rxUS38NR/CZN25zdtsHuYwHaKDTlsliWR209qHetAiFpmFCquA6qjm1criX5QUVjKgN08qQ==',
                    },
                    items: [
                        {
                            uid: 'MTQ=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-30-Purple',
                                id: 'MjE4Mw==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjExMg==',
                                    name: 'Erika Running Short-30-Purple',
                                    sku: 'WSH12-30-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-30-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000014',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000597-8',
                        token: '0:3:vgxbzXkQD9BPlVQu3/8PfyBSlmlBvssfnx0vQlGOGK+fbU3Ol4cv/q2q5pzgn7rtfx9f7s9RvbiO0BMeD2luL2dQ9+zyrA==',
                    },
                    items: [
                        {
                            uid: 'MTc=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-30-Purple',
                                id: 'MjE4Mw==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjExMg==',
                                    name: 'Erika Running Short-30-Purple',
                                    sku: 'WSH12-30-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-30-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000017',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000597-8',
                        token: '0:3:a8MP/MrsvutF0l2MHEZRIjbO9qB1gnM6K3woV8UYVwbQSWGAVMns6R1BszsJ9StRTwvYC0k4eCujBJyHMznL1W8BqfHHJw==',
                    },
                    items: [
                        {
                            uid: 'MjA=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'MjE3Nw==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000020',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000597-8',
                        token: '0:3:3dzxS5Qc+eLD1+jILGts9KyCs+Jts7uVzSYINbCzJpcAcprpLfcEV2NC42J4yZVA/L+7U/yWoCmzNEdbuiBdBA2mJ9jBAw==',
                    },
                    items: [
                        {
                            uid: 'MjM=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'MjE3Nw==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000023',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000000684-6',
                        token: '0:3:EIAy/Ht64OZswQjXodzXHfTqpqNcAO23OyXP9kAddChQkBhKrOfon5TxMSnHu7yQKdnnYuo37s7WEcKCWPGufZsBnfUO2Q==',
                    },
                    items: [
                        {
                            uid: 'MjY=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Ana Running Short-29-White',
                                id: 'MjI5NA==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 1,
                                product_sale_price: {
                                    value: 40,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjA2NA==',
                                    name: 'Ana Running Short-29-White',
                                    sku: 'WSH10-29-White',
                                    thumbnail: {
                                        label: 'Ana Running Short-29-White',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 40,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000026',
                    shipping: {
                        tracking: [
                            {
                                status: null,
                                carrier: {
                                    uid: 'Y3VzdG9tLTE=',
                                    label: 'test',
                                },
                                tracking_number: '123456',
                            },
                            {
                                status: null,
                                carrier: {
                                    uid: 'Y3VzdG9tLTE=',
                                    label: 'USPS',
                                },
                                tracking_number: '9999999',
                            },
                        ],
                    },
                    order: {
                        number: '000000684-6',
                        token: '0:3:nldDecmVHZKy4tylhaP94+GdN2i8Fen2XyFrCtU3Bjcx4UXZpT0419FPaxYDF6O3EBHlR2WXssHr5r2keErsijRjSoYuaw==',
                    },
                    items: [
                        {
                            uid: 'Mjk=',
                            quantity: 1,
                            status: 'APPROVED',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Ana Running Short-29-White',
                                id: 'MjI5NA==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 1,
                                product_sale_price: {
                                    value: 40,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjA2NA==',
                                    name: 'Ana Running Short-29-White',
                                    sku: 'WSH10-29-White',
                                    thumbnail: {
                                        label: 'Ana Running Short-29-White',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 40,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000029',
                    shipping: {
                        tracking: [
                            {
                                status: null,
                                carrier: {
                                    uid: 'Y3VzdG9tLTE=',
                                    label: 'DHL',
                                },
                                tracking_number: '123456789',
                            },
                        ],
                    },
                    order: {
                        number: '000001250',
                        token: '0:3:VfDmOJkf1kRBVT6Du3WFlZUJQ+k5SeTR1GrHI2/iKF8WbH1xzDEs0xwt2lRn7VbmkRZcA/ecihAGnLonKBeAwZJeBcY=',
                    },
                    items: [
                        {
                            uid: 'MzI=',
                            quantity: 1,
                            status: 'AUTHORIZED',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'MjM0OA==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000032',
                    shipping: {
                        tracking: [
                            {
                                status: null,
                                carrier: {
                                    uid: 'Y3VzdG9tLTE=',
                                    label: 'Plimor',
                                },
                                tracking_number: 'Test',
                            },
                        ],
                    },
                    order: {
                        number: '000001250',
                        token: '0:3:H51GOuGHQ0phn3AlG/HUwYjvnLh/1ywykp8D5eU43iwq0kCT+X0U22TwDmJ3dx9sUBXHDW+9FmmEojIpMTeY1abcjbs=',
                    },
                    items: [
                        {
                            uid: 'MzU=',
                            quantity: 1,
                            status: 'RECEIVED',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-31-Green',
                                id: 'MjM2MA==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjExOA==',
                                    name: 'Erika Running Short-31-Green',
                                    sku: 'WSH12-31-Green',
                                    thumbnail: {
                                        label: 'Erika Running Short-31-Green',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            uid: 'Mzg=',
                            quantity: 1,
                            status: 'RECEIVED',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-31-Purple',
                                id: 'MjM2Mw==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEyMQ==',
                                    name: 'Erika Running Short-31-Purple',
                                    sku: 'WSH12-31-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-31-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    number: '000000035',
                    shipping: {
                        tracking: [],
                    },
                    order: {
                        number: '000001250',
                        token: '0:3:KHdOgypvYrjNX2URLB7O2+/AiBEDrYS1IcNtPtL8w2Zv0aowvFgEHgFsfKV86UpDhHVRjhPoGZlQmQlc6Lq1zCKIvm4=',
                    },
                    items: [
                        {
                            uid: 'NDE=',
                            quantity: 0,
                            status: 'PENDING',
                            request_quantity: 1,
                            order_item: {
                                __typename: 'OrderItem',
                                status: 'Shipped',
                                product_name: 'Erika Running Short-32-Purple',
                                id: 'MjM0OA==',
                                quantity_ordered: 1,
                                quantity_shipped: 1,
                                quantity_canceled: 0,
                                quantity_invoiced: 1,
                                quantity_refunded: 0,
                                quantity_returned: 0,
                                product_sale_price: {
                                    value: 45,
                                    currency: 'USD',
                                },
                                selected_options: [],
                                product: {
                                    __typename: 'SimpleProduct',
                                    canonical_url: null,
                                    uid: 'NjEzMA==',
                                    name: 'Erika Running Short-32-Purple',
                                    sku: 'WSH12-32-Purple',
                                    thumbnail: {
                                        label: 'Erika Running Short-32-Purple',
                                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                                    },
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: 'USD',
                                                value: 45,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        },
    },
};
exports.returnOrderListMock = [
    {
        token: '0:3:nZdopD+e8XHziaPPtP6bG8NVw9BLCWjQcLavQZr70G5nWAHS64E6x4X/0Vup4vU66JH7rsdV5C6n0GhCPrxrN7TWNTA=',
        orderNumber: '000000600',
        items: [
            {
                uid: 'Mw==',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-32-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'OTg3',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEzMA==',
                        name: 'Erika Running Short-32-Purple',
                        sku: 'WSH12-32-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-32-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-32-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
            {
                uid: 'Ng==',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-29-Green',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'OTkw',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEwMA==',
                        name: 'Erika Running Short-29-Green',
                        sku: 'WSH12-29-Green',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-29-Green',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-29-Green',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:ya5z1hwmuS3awFgFTHe9go4QMU3RjGPW+ViERjqPxCOH0Z8RB1LOSkrSLVL2IxlvxzQOs8xDie9Z5lH3Su7zLuDN1jJWQw==',
        orderNumber: '000000597-8',
        items: [
            {
                uid: 'OA==',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-32-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjE3Nw==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEzMA==',
                        name: 'Erika Running Short-32-Purple',
                        sku: 'WSH12-32-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-32-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-32-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:Yp6DP8ek8DrRSskR0Fm5cVDJELlYhe1MeUHySk8rVMLuoXV951j6dYXIFFIA63q3MRZ5+zvFxNiHrtMoPp3xNmun90lEVg==',
        orderNumber: '000000597-8',
        items: [
            {
                uid: 'MTE=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-29-Green',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjE4MA==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEwMA==',
                        name: 'Erika Running Short-29-Green',
                        sku: 'WSH12-29-Green',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-29-Green',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-29-Green',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:am6c2u7tjBo4dspiRg16OCyFOFHzJd7kp+8Jy+VcbM+svcdxbRR/xw6/1dOzuJNWM0OIygp92RdDz6NXJbIqPz08sBIb/w==',
        orderNumber: '000000597-8',
        items: [
            {
                uid: 'MTQ=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-30-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjE4Mw==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjExMg==',
                        name: 'Erika Running Short-30-Purple',
                        sku: 'WSH12-30-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-30-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-30-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:j7Fnun1IIWqD7oLXqIfEbNovHdCRH8X0q9QIE+GcRD6bwODKLiM/nLeHClZWR0BqtUC5OsCs/EaEv28CwXNbC1XE1vKYpw==',
        orderNumber: '000000597-8',
        items: [
            {
                uid: 'MTc=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-30-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjE4Mw==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjExMg==',
                        name: 'Erika Running Short-30-Purple',
                        sku: 'WSH12-30-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-30-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-30-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:fegblIzk8CGFv8KlX9BeEfPCgavjy9+8DKnTBbewXujg3tN//Hqc7BAnTy89RoUC4Qw0d9DX+uinVbdiiBy4gixbxmrW7A==',
        orderNumber: '000000597-8',
        items: [
            {
                uid: 'MjA=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-32-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjE3Nw==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEzMA==',
                        name: 'Erika Running Short-32-Purple',
                        sku: 'WSH12-32-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-32-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-32-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:gfs0sU7/f+bvinw7RwtypKfaihJD9l1Rrtj6Bo1oIov9rn5sGSb6Derj1LKILJOy6AKcVgP/amBuST844R2BY134VaeO0Q==',
        orderNumber: '000000597-8',
        items: [
            {
                uid: 'MjM=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-32-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjE3Nw==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEzMA==',
                        name: 'Erika Running Short-32-Purple',
                        sku: 'WSH12-32-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-32-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-32-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:2aSUxdt6+9WAtD+irQ4xk2C8DKSbhJDvm4VoRnAc0sSxTtb3I5s28HCv+BcJ5NLUqMx66Gc5FFFs4+0SppbBw6EvT/O6cw==',
        orderNumber: '000000684-6',
        items: [
            {
                uid: 'MjY=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Ana Running Short-29-White',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 1,
                    quantityShipped: 1,
                    id: 'MjI5NA==',
                    discounted: false,
                    total: {
                        value: 40,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 40,
                        currency: 'USD',
                    },
                    price: {
                        value: 40,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 40,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 40,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjA2NA==',
                        name: 'Ana Running Short-29-White',
                        sku: 'WSH10-29-White',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Ana Running Short-29-White',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Ana Running Short-29-White',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
    {
        token: '0:3:dNinxDWHXXJVC2H7MU/+9A8T/NYH7ON4znFXoOVhy7SHEEYakH2hwH6i8oZKZHgBVAhzdM/uNDyxiVw1XwrRCqWTaC4VEA==',
        orderNumber: '000000684-6',
        items: [
            {
                uid: 'Mjk=',
                quantity: 1,
                status: 'APPROVED',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Ana Running Short-29-White',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 1,
                    quantityShipped: 1,
                    id: 'MjI5NA==',
                    discounted: false,
                    total: {
                        value: 40,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 40,
                        currency: 'USD',
                    },
                    price: {
                        value: 40,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 40,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 40,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjA2NA==',
                        name: 'Ana Running Short-29-White',
                        sku: 'WSH10-29-White',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Ana Running Short-29-White',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Ana Running Short-29-White',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [
            {
                status: null,
                carrier: {
                    uid: 'Y3VzdG9tLTE=',
                    label: 'test',
                },
                trackingNumber: '123456',
            },
            {
                status: null,
                carrier: {
                    uid: 'Y3VzdG9tLTE=',
                    label: 'USPS',
                },
                trackingNumber: '9999999',
            },
        ],
    },
    {
        token: '0:3:g12frhLiNZwDQ3PCDImPIb8rKgjshGU+ggbz3OdOzZPrhjOGPneEcrQSlEAF0q6yrx7snhL0BziHPn0fePUy5YLAVeY=',
        orderNumber: '000001250',
        items: [
            {
                uid: 'MzI=',
                quantity: 1,
                status: 'AUTHORIZED',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-32-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjM0OA==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEzMA==',
                        name: 'Erika Running Short-32-Purple',
                        sku: 'WSH12-32-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-32-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-32-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [
            {
                status: null,
                carrier: {
                    uid: 'Y3VzdG9tLTE=',
                    label: 'DHL',
                },
                trackingNumber: '123456789',
            },
        ],
    },
    {
        token: '0:3:GKEPVymaX6O8dTd1V2v01DMyXGszb9hMuNvmnJSRBFwXbXKBDWNBB83qw218nMLTAlAKnlY87hRGMhue8ZiktnVTJfU=',
        orderNumber: '000001250',
        items: [
            {
                uid: 'MzU=',
                quantity: 1,
                status: 'RECEIVED',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-31-Green',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjM2MA==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjExOA==',
                        name: 'Erika Running Short-31-Green',
                        sku: 'WSH12-31-Green',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-31-Green',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-31-Green',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-green_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
            {
                uid: 'Mzg=',
                quantity: 1,
                status: 'RECEIVED',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-31-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjM2Mw==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEyMQ==',
                        name: 'Erika Running Short-31-Purple',
                        sku: 'WSH12-31-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-31-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-31-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [
            {
                status: null,
                carrier: {
                    uid: 'Y3VzdG9tLTE=',
                    label: 'Plimor',
                },
                trackingNumber: '1234567890',
            },
        ],
    },
    {
        token: '0:3:KcN7grZ1ANMxVf96CC3wu9FqJgSHwr3mI93/QyXEdZkc0iVWhNF9PWHzWcwmmw5mFg0Oa74+7yG2l16/9jjV1jXPcBk=',
        orderNumber: '000001250',
        items: [
            {
                uid: 'NDE=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 1,
                orderItem: {
                    type: 'OrderItem',
                    productName: 'Erika Running Short-32-Purple',
                    quantityCanceled: 0,
                    quantityInvoiced: 1,
                    quantityOrdered: 1,
                    quantityRefunded: 0,
                    quantityReturned: 0,
                    quantityShipped: 1,
                    id: 'MjM0OA==',
                    discounted: false,
                    total: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    price: {
                        value: 45,
                        currency: 'USD',
                    },
                    priceInclTax: {
                        value: 45,
                        currency: 'USD',
                    },
                    totalQuantity: 1,
                    regularPrice: {
                        value: 45,
                        currency: 'USD',
                    },
                    product: {
                        canonicalUrl: '',
                        id: 'NjEzMA==',
                        name: 'Erika Running Short-32-Purple',
                        sku: 'WSH12-32-Purple',
                        image: '',
                        productType: 'SimpleProduct',
                        thumbnail: {
                            label: 'Erika Running Short-32-Purple',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                    },
                    thumbnail: {
                        label: 'Erika Running Short-32-Purple',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh12-purple_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                },
            },
        ],
        tracking: [],
    },
];
exports.translationsOrderCostSummaryMock = {
    headerText: 'Order summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    freeShipping: 'Free shipping',
    tax: 'Tax',
    incl: 'Including taxes',
    excl: 'Excluding taxes',
    discount: 'Discount',
    discountSubtitle: 'discounted',
    total: 'Total',
};

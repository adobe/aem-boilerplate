"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinifiedViewEmpty = void 0;
const OrderReturns_1 = require("./OrderReturns");
const components_1 = require("@/order/components");
const orderReturns = [
    {
        token: '0:3:SXQXbH8PkA0fmPr5pjXxjfoX2QDaN5S73WZRzoncoFaB9thxqmcex8f9usxxFJ6PIbvf+4u9G/7ArzthyzVCSpHuT/aLqg==',
        orderNumber: '000000684-6',
        returnStatus: 'Completed',
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
                        __typename: 'SimpleProduct',
                        canonical_url: null,
                        uid: 'NjA2NA==',
                        name: 'Ana Running Short-29-White',
                        sku: 'WSH10-29-White',
                        only_x_left_in_stock: null,
                        stock_status: 'IN_STOCK',
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
                        canonicalUrl: '',
                        id: 'NjA2NA==',
                        image: '',
                        productType: 'SimpleProduct',
                    },
                    thumbnail: {
                        label: 'Ana Running Short-29-White',
                        url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                    },
                    configurableOptions: {},
                    bundleOptions: null,
                    itemPrices: {
                        price_including_tax: {
                            value: 40,
                            currency: 'USD',
                        },
                        original_price: {
                            value: 40,
                            currency: 'USD',
                        },
                        original_price_including_tax: {
                            value: 40,
                            currency: 'USD',
                        },
                        price: {
                            value: 40,
                            currency: 'USD',
                        },
                    },
                    downloadableLinks: null,
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
                trackingNumber: '12345678',
            },
            {
                status: null,
                carrier: {
                    uid: 'Y3VzdG9tLTE=',
                    label: 'UPS',
                },
                trackingNumber: '87654321',
            },
        ],
    },
];
exports.default = {
    title: 'Containers/OrderReturns',
    component: OrderReturns_1.OrderReturns,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {
        withHeader: true,
        withThumbnails: true,
        orderReturns,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items.',
        },
        withHeader: {
            control: 'boolean',
            description: 'Defines if the container header is visible.',
        },
        withThumbnails: {
            description: 'Show or hide product thumbnails.',
            control: { type: 'boolean' },
        },
        routeReturnDetails: {
            control: 'function',
            description: 'Controlling route where customer should be redirected on click at button on the right side of return block (number and token).',
        },
        routeTracking: {
            control: 'function',
            description: 'Controlling where customer should be redirected on click at tracking number link (tracking information for return)',
        },
        routeProductDetails: {
            description: 'Function that returns the link to the product details route',
        },
    },
};
exports.MinifiedViewEmpty = {
    render: (args) => (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <components_1.ReturnsListContent minifiedViewKey="fullSizeView" withOrderNumber={true} pageInfo={{
            pageSize: 1,
            totalPages: 1,
            currentPage: 1,
        }} slots={{}} isMobile={false} translations={{
            minifiedViewTitle: 'Returns',
            ariaLabelLink: 'Redirect to full order information',
            emptyOrdersListMessage: 'No returns',
            orderNumber: 'Order Number:',
            carrier: 'Carrier:',
        }} minifiedView={false} routeReturnDetails={(data) => {
            console.log('routeReturnDetails', data);
            return '';
        }} routeTracking={() => {
            console.log('routeTracking');
            return '';
        }} {...args}/>
    </div>),
};

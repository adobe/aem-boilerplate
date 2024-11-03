"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** https://preactjs.com/guide/v10/preact-testing-library/ */
// @ts-nocheck
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const ShippingStatusCard_1 = require("@/order/components/ShippingStatusCard");
const mock_config_1 = require("@/order/configs/mock.config");
describe('[Order-Components] - ShippingStatusCard', () => {
    const shipmentsMock = [
        {
            id: 'MDAwMDAwMDA5',
            tracking: [{ number: 1234567, carrier: 'DHL' }],
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
            ],
        },
    ];
    test('renders', () => {
        (0, tests_1.render)(<ShippingStatusCard_1.ShippingStatusCard slots={{
                DeliveryTrackActions: () => {
                    return <div>TestBlock</div>;
                },
                DeliveryTimeLine: () => { },
                routeProductDetails: () => { },
            }} orderData={{
                ...mock_config_1.transformMockOrderOutput,
                items: [
                    {
                        totalQuantity: 0,
                        quantityShipped: 0,
                        thumbnail: {
                            label: '',
                            url: '',
                        },
                    },
                ],
                shipments: shipmentsMock,
            }}/>);
        const orderStatusElement = tests_1.screen.getByTestId('dropinAccordion');
        expect(orderStatusElement).toBeInTheDocument();
        const deliverySlotActions = tests_1.screen.getByTestId('deliverySlotActions');
        expect(deliverySlotActions).toBeInTheDocument();
    });
    test('renders empty container', () => {
        const { container } = (0, tests_1.render)(<ShippingStatusCard_1.ShippingStatusCard orderData={null} slots={{}}/>);
        const element = container.querySelector('.dropin-design');
        expect(element).toBeInTheDocument();
        expect(element).toBeEmptyDOMElement();
    });
    test('renders empty shipments', () => {
        (0, tests_1.render)(<ShippingStatusCard_1.ShippingStatusCard orderData={{
                ...mock_config_1.transformMockOrderOutput,
                shipments: [],
            }}/>);
        const titleElement = tests_1.screen.getByText('Shipping info');
        expect(titleElement).toBeInTheDocument();
    });
    test('renders status is completed without accordion', () => {
        (0, tests_1.render)(<ShippingStatusCard_1.ShippingStatusCard orderData={{
                ...mock_config_1.transformMockOrderOutput,
                status: 'complete',
                shipments: shipmentsMock,
            }}/>);
        const orderStatusElement = tests_1.screen.queryByTestId('dropinAccordion');
        expect(orderStatusElement).not.toBeInTheDocument();
    });
    test('renders without NotYetShipped', () => {
        const { queryByTestId } = (0, tests_1.render)(<ShippingStatusCard_1.ShippingStatusCard slots={{
                DeliveryTrackActions: () => { },
                DeliveryTimeLine: () => { },
            }} orderData={{
                ...mock_config_1.transformMockOrderOutput,
                carrier: null,
                status: 'Pending',
                items: [],
                shipments: [],
            }}/>);
        const element = queryByTestId('dropinAccordionNotYetShipped2');
        expect(element).toBeNull();
    });
    test('renders with NotYetShipped', () => {
        const { queryByTestId } = (0, tests_1.render)(<ShippingStatusCard_1.ShippingStatusCard routeProductDetails={() => '/route-test'} slots={{ DeliveryTrackActions: () => { }, DeliveryTimeLine: () => { } }} orderData={{
                ...mock_config_1.transformMockOrderOutput,
                items: [
                    {
                        totalQuantity: 0,
                        quantityShipped: 0,
                        thumbnail: {
                            label: '',
                            url: '',
                        },
                    },
                ],
                shipments: shipmentsMock,
            }}/>);
        const linkElements = tests_1.screen.getAllByRole('link');
        linkElements.forEach((linkElement) => {
            expect(linkElement).toHaveAttribute('href', '/route-test');
        });
        const notShippedAccordion = queryByTestId('dropinAccordionNotYetShipped2');
        expect(notShippedAccordion).toBeInTheDocument();
    });
});

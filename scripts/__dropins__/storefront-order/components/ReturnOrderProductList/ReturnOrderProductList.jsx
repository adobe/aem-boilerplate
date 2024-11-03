"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnOrderProductList = void 0;
const components_1 = require("@adobe/elsie/components");
const OrderProductListContent_1 = require("../OrderProductListContent");
require("@/order/components/ReturnOrderProductList/ReturnOrderProductList.css");
const returnOrderList = [
    {
        token: '0:3:rKsKy5w/M4092QGpA9wA1KJQywQI4aZY4A1xRRE2jQ7WekeK0MkLrOIpBdj8MGoxXHms0xACFXlsE2lEQbramcytRb/ZYA==',
        orderNumber: '000000684-6',
        items: [
            {
                uid: 'MjY=',
                quantity: 0,
                status: 'PENDING',
                requestQuantity: 2,
                orderItem: {
                    type: 'OrderItem',
                    eligibleForReturn: true,
                    productName: 'Ana Running Short-29-White',
                    quantityCanceled: 0,
                    quantityInvoiced: 2,
                    quantityOrdered: 2,
                    quantityRefunded: 0,
                    quantityReturned: 2,
                    quantityShipped: 2,
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
                        canonicalUrl: '',
                        uid: 'NjA2NA==',
                        name: 'Ana Running Short-29-White',
                        sku: 'WSH10-29-White',
                        onlyXLeftInStock: null,
                        stockStatus: 'IN_STOCK',
                        thumbnail: {
                            label: 'Ana Running Short-29-White',
                            url: 'https://mcstaging.aemshop.net/media/catalog/product/w/s/wsh10-white_main_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=',
                        },
                        priceRange: {
                            maximumPrice: {
                                regularPrice: {
                                    currency: 'USD',
                                    value: 40,
                                },
                            },
                        },
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
                        priceIncludingTax: {
                            value: 40,
                            currency: 'USD',
                        },
                        originalPrice: {
                            value: 40,
                            currency: 'USD',
                        },
                        originalPriceIncludingTax: {
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
        tracking: [],
    },
];
const ReturnOrderProductList = ({ loading = false, taxConfig = {}, translations = {}, handleSelectedProductList, showConfigurableOptions, handleSetQuantity, handleChangeStep, }) => {
    return (<ul className={'order-return-order-product-list'}>
      {returnOrderList.map((returns) => {
            return returns.items.map((product, index) => {
                const key = `${index}_${product.uid}`;
                return (<li key={key} data-testid={key} className="order-return-order-product-list__item">
              <components_1.Checkbox name={key} onChange={() => {
                        handleSelectedProductList(product);
                    }}/>

              <OrderProductListContent_1.CartSummaryItem loading={loading} product={product.orderItem} itemType={''} taxConfig={{
                        taxIncluded: false,
                        taxExcluded: true,
                    }} translations={translations} showConfigurableOptions={undefined} onQuantity={handleSetQuantity}/>
            </li>);
            });
        })}
      <li className="order-return-order-product-list__item">
        <components_1.Button type="button" onClick={() => {
            handleChangeStep('attributes');
        }}>
          Continue
        </components_1.Button>
      </li>
    </ul>);
};
exports.ReturnOrderProductList = ReturnOrderProductList;

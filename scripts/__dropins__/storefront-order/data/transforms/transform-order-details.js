"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformOrderDetails = exports.transformOrderData = exports.transformOrderItems = exports.transformLinks = exports.transformBundleOptions = exports.transformConfigurableOptions = void 0;
const convertCase_1 = require("@/order/lib/convertCase");
const transform_customer_orders_returns_1 = require("./transform-customer-orders-returns");
const parseNumber = (value) => {
    return value || 0;
};
const transformProduct = (product) => {
    return {
        ...product,
        canonicalUrl: product?.canonical_url || '',
        urlKey: product?.url_key || '',
        id: product?.uid || '',
        name: product?.name || '',
        sku: product?.sku || '',
        image: product?.image?.url || '',
        productType: product?.__typename || '',
        thumbnail: {
            label: product?.thumbnail?.label || '',
            url: product?.thumbnail?.url || '',
        },
    };
};
const transformConfigurableOptions = (item) => {
    if (!item)
        return;
    if (!('selected_options' in item))
        return;
    const configurableOptions = {};
    for (const option of item.selected_options) {
        configurableOptions[option.label] = option.value;
    }
    return configurableOptions;
};
exports.transformConfigurableOptions = transformConfigurableOptions;
const transformBundleOptions = (data) => {
    const bundle = data?.map((option) => ({
        uid: option.uid,
        label: option.label,
        values: option.values.map((value) => value.product_name).join(', '),
    }));
    const bundleOptions = {};
    bundle?.forEach((option) => {
        bundleOptions[option.label] = option.values;
    });
    return Object.keys(bundleOptions).length > 0 ? bundleOptions : null;
};
exports.transformBundleOptions = transformBundleOptions;
const transformLinks = (links) => {
    return links?.length > 0
        ? {
            count: links.length,
            result: links.map((link) => link.title).join(', '),
        }
        : null;
};
exports.transformLinks = transformLinks;
const transformOrderItems = (items) => {
    return items
        ?.filter((el) => el.__typename)
        .map((orderItem) => ({
        type: orderItem?.__typename,
        productName: orderItem.product_name,
        productUrlKey: orderItem.product_url_key,
        quantityCanceled: orderItem?.quantity_canceled || 0,
        quantityInvoiced: orderItem?.quantity_invoiced || 0,
        quantityOrdered: orderItem?.quantity_ordered || 0,
        quantityRefunded: orderItem?.quantity_refunded || 0,
        quantityReturned: orderItem?.quantity_returned || 0,
        quantityShipped: orderItem?.quantity_shipped || 0,
        id: orderItem?.id,
        discounted: orderItem?.product?.price_range?.maximum_price?.regular_price?.value *
            orderItem?.quantity_ordered !==
            orderItem?.product_sale_price?.value * orderItem?.quantity_ordered,
        total: {
            value: orderItem?.product_sale_price?.value *
                orderItem?.quantity_ordered || 0,
            currency: orderItem?.product_sale_price?.currency || '',
        },
        totalInclTax: {
            value: orderItem?.product_sale_price?.value *
                orderItem?.quantity_ordered || 0,
            currency: orderItem?.product_sale_price?.currency,
        },
        price: {
            value: orderItem?.product_sale_price?.value || 0,
            currency: orderItem?.product_sale_price?.currency,
        },
        priceInclTax: {
            value: orderItem?.product_sale_price?.value || 0,
            currency: orderItem?.product_sale_price?.currency,
        },
        totalQuantity: parseNumber(orderItem?.quantity_ordered),
        regularPrice: {
            value: orderItem?.product?.price_range?.maximum_price?.regular_price?.value,
            currency: orderItem?.product?.price_range?.maximum_price?.regular_price
                ?.currency,
        },
        product: transformProduct(orderItem?.product),
        thumbnail: {
            label: orderItem?.product?.thumbnail?.label || '',
            url: orderItem?.product?.thumbnail?.url || '',
        },
        giftCard: orderItem?.__typename === 'GiftCardOrderItem'
            ? {
                senderName: orderItem.gift_card?.sender_name || '',
                senderEmail: orderItem.gift_card?.sender_email || '',
                recipientEmail: orderItem.gift_card?.recipient_email || '',
                recipientName: orderItem.gift_card?.recipient_name || '',
                message: orderItem.gift_card?.message || '',
            }
            : undefined,
        configurableOptions: (0, exports.transformConfigurableOptions)(orderItem),
        bundleOptions: orderItem.__typename === 'BundleOrderItem'
            ? (0, exports.transformBundleOptions)(orderItem.bundle_options)
            : null,
        itemPrices: orderItem.prices,
        downloadableLinks: orderItem.__typename === 'DownloadableOrderItem'
            ? (0, exports.transformLinks)(orderItem?.downloadable_links)
            : null,
    }));
};
exports.transformOrderItems = transformOrderItems;
const transformOrderData = (orderData) => {
    const items = (0, exports.transformOrderItems)(orderData.items);
    const returns = (0, transform_customer_orders_returns_1.transformCustomerOrdersReturns)(orderData?.returns)?.ordersReturn ?? [];
    const { total, ...props } = (0, convertCase_1.convertKeysCase)({ ...orderData, items, returns }, 'camelCase', {
        applied_coupons: 'coupons',
        __typename: '__typename',
        firstname: 'firstName',
        middlename: 'middleName',
        lastname: 'lastName',
        postcode: 'postCode',
        payment_methods: 'payments',
    });
    const selectedPaymentMethod = orderData?.payment_methods?.[0];
    const selectedPaymentMethodCode = selectedPaymentMethod?.type || '';
    const selectedPaymentMethodName = selectedPaymentMethod?.name || '';
    const totalQuantity = props?.items?.reduce((accum, item) => accum + item?.totalQuantity, 0);
    const result = {
        ...total,
        ...props,
        totalQuantity,
        shipping: {
            amount: props?.total?.totalShipping.value ?? 0,
            currency: props.total?.totalShipping?.currency || '',
            code: props.shippingMethod ?? '',
        },
        payments: [
            {
                code: selectedPaymentMethodCode,
                name: selectedPaymentMethodName,
            },
        ],
    };
    return result;
};
exports.transformOrderData = transformOrderData;
const transformOrderDetails = (queryType, response) => {
    if (response?.data?.customer?.orders?.items?.length &&
        queryType === 'orderData') {
        const item = response?.data?.customer?.orders?.items[0];
        return (0, exports.transformOrderData)(item);
    }
    return null;
};
exports.transformOrderDetails = transformOrderDetails;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductListContent = void 0;
const preact_1 = require("preact");
const components_1 = require("@adobe/elsie/components");
const hooks_1 = require("preact/hooks");
const components_2 = require("@/order/components");
const i18n_1 = require("@adobe/elsie/i18n");
require("@/order/components/OrderProductListContent/OrderProductListContent.css");
const OrderProductListContent = ({ loading, taxConfig, order = null, withHeader = true, showConfigurableOptions, routeProductDetails, }) => {
    const translations = (0, i18n_1.useText)({
        cancelled: 'Order.OrderProductListContent.cancelledTitle',
        allOrders: 'Order.OrderProductListContent.allOrdersTitle',
        sender: 'Order.OrderProductListContent.GiftCard.sender',
        recipient: 'Order.OrderProductListContent.GiftCard.recipient',
        message: 'Order.OrderProductListContent.GiftCard.message',
        outOfStock: 'Order.OrderProductListContent.stockStatus.outOfStock',
        downloadableCount: 'Order.OrderProductListContent.downloadableCount',
    });
    const itemsList = (0, hooks_1.useMemo)(() => {
        if (!order)
            return [];
        const { items } = order;
        return [
            {
                type: 'cancelled',
                list: items.filter((element) => element.quantityCanceled),
                title: translations.cancelled,
            },
            {
                type: '',
                list: items.filter((element) => !element.quantityCanceled),
                title: translations.allOrders,
            },
        ];
    }, [order, translations]);
    if (!order)
        return <components_2.OrderProductListSkeleton />;
    return (<components_1.Card variant="secondary" className={'order-order-product-list-content'}>
      {itemsList
            .filter((element) => element.list.length)
            .map((item, index) => {
            return (<preact_1.Fragment key={index}>
              {withHeader ? (<components_1.Header title={`${item.title} (${item.list.length})`}/>) : null}
              <ul className="order-order-product-list-content__items">
                {item.list?.map((product) => (<li data-testid="order-product-list-content-item" key={product.id}>
                    <components_2.CartSummaryItem loading={loading} product={product} itemType={item.type} taxConfig={taxConfig} translations={translations} showConfigurableOptions={showConfigurableOptions} routeProductDetails={routeProductDetails}/>
                  </li>))}
              </ul>
            </preact_1.Fragment>);
        })}
    </components_1.Card>);
};
exports.OrderProductListContent = OrderProductListContent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusContent = void 0;
const components_1 = require("@adobe/elsie/components");
const i18n_1 = require("@adobe/elsie/i18n");
require("@/order/components/OrderStatusContent/OrderStatusContent.css");
const components_2 = require("@/order/components");
const statusTransform = {
    pending: 'orderPending',
    shiping: 'orderShipped',
    complete: 'orderComplete',
    processing: 'orderProcessing',
    'on hold': 'orderOnHold',
    canceled: 'orderCanceled',
    'suspected fraud': 'orderSuspectedFraud',
    'payment Review': 'orderPaymentReview',
    'order received': 'orderReceived',
    'guest order cancellation requested': 'guestOrderCancellationRequested',
};
const OrderStatusContent = ({ slots, title, status, orderData, }) => {
    const orderStatus = String(status).toLocaleLowerCase();
    const translationsHeader = (0, i18n_1.useText)(`Order.OrderStatusContent.${statusTransform[orderStatus]}.title`);
    const translationsMessage = (0, i18n_1.useText)(`Order.OrderStatusContent.${statusTransform[orderStatus]}.message`);
    const translationsMessageWithoutDate = (0, i18n_1.useText)(`Order.OrderStatusContent.${statusTransform[orderStatus]}.messageWithoutDate`);
    if (!status)
        return <div />;
    const renderMessage = orderData?.orderStatusChangeDate
        ? translationsMessage?.message.replace('{DATE}', orderData?.orderStatusChangeDate)
        : translationsMessageWithoutDate.messageWithoutDate;
    return (<components_1.Card className="order-order-status-content" variant="secondary">
      <components_1.Header title={title ?? translationsHeader.title}/>
      <div className="order-order-status-content__wrapper">
        <div className="order-order-status-content__wrapper-description">
          <p>{renderMessage}</p>
        </div>
        <components_2.OrderActions orderData={orderData} slots={slots}/>
      </div>
    </components_1.Card>);
};
exports.OrderStatusContent = OrderStatusContent;

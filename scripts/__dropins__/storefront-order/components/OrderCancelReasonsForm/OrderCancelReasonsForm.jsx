"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelReasonsForm = void 0;
const components_1 = require("@adobe/elsie/components");
require("@/order/components/OrderCancelReasonsForm/OrderCancelReasonsForm.css");
const i18n_1 = require("@adobe/elsie/i18n");
const components_2 = require("@/order/components");
const hooks_1 = require("preact/hooks");
const event_bus_1 = require("@adobe/event-bus");
const OrderCancelReasonsForm = ({ pickerProps, submitButtonProps, cancelReasons, cancelOrder, orderRef, }) => {
    const translations = (0, i18n_1.useText)({
        ErrorHeading: 'Order.OrderCancellationReasonsForm.errorHeading',
        ErrorDescription: 'Order.OrderCancellationReasonsForm.errorDescription',
        orderCancellationLabel: 'Order.OrderCancellationReasonsForm.label',
    });
    const [selectedReason, setSelectedReason] = (0, hooks_1.useState)(0);
    const [isErrorVisible, setIsErrorVisible] = (0, hooks_1.useState)(false);
    const [isCustomerAuthenticated, setIsCustomerAuthenticated] = (0, hooks_1.useState)(false);
    event_bus_1.events.on('authenticated', (authenticated) => {
        if (authenticated) {
            setIsCustomerAuthenticated(true);
        }
    }, { eager: true } // fetch it on runtime using last state
    );
    const handleReasonSelect = (event) => {
        event.preventDefault();
        const value = Number(event.target.value);
        setSelectedReason(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        return cancelOrder(orderRef, cancelReasons[selectedReason].text, (data) => {
            if (!isCustomerAuthenticated) {
                data.status = 'guest order cancellation requested';
            }
            event_bus_1.events.emit('order/data', data);
        }, () => {
            setIsErrorVisible(true);
        });
    };
    return (<components_2.Form onSubmit={onSubmit} data-testid="order-order-cancel-reasons-form__text">
      {isErrorVisible && (<components_1.InLineAlert heading={translations.ErrorHeading} description={translations.ErrorDescription}/>)}
      <div className="order-order-cancel-reasons-form__text">
        <i18n_1.Text id={'Order.OrderCancellationReasonsForm.description'}/>
      </div>
      <components_1.Picker name="cancellationReasons" floatingLabel={translations.orderCancellationLabel} defaultOption={cancelReasons[0]} variant="primary" options={cancelReasons} value={String(selectedReason)} handleSelect={handleReasonSelect} required={true} data-testid="order-cancellation-reasons-selector" {...pickerProps}/>
      <div className="order-order-cancel-reasons-form__button-container">
        <components_1.Button variant="primary" data-testid="order-cancel-submit-button" {...submitButtonProps}>
          <i18n_1.Text id={'Order.OrderCancellationReasonsForm.button'}/>
        </components_1.Button>
      </div>
    </components_2.Form>);
};
exports.OrderCancelReasonsForm = OrderCancelReasonsForm;

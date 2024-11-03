"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderActions = void 0;
const compat_1 = require("preact/compat");
const lib_1 = require("@adobe/elsie/lib");
require("@/order/components/OrderActions/OrderActions.css");
const types_1 = require("@/order/types");
const i18n_1 = require("@adobe/elsie/i18n");
const components_1 = require("@adobe/elsie/components");
const OrderActions = ({ className, children, orderData, slots, ...props }) => {
    const translationActions = (0, i18n_1.useText)({
        cancel: 'Order.OrderStatusContent.actions.cancel',
        return: 'Order.OrderStatusContent.actions.return',
        reorder: 'Order.OrderStatusContent.actions.reorder',
    });
    const renderAvailableActions = (0, compat_1.useMemo)(() => {
        const availableActionsList = orderData?.availableActions;
        const isEmpty = !!availableActionsList?.length;
        return (<>
        {slots?.OrderActions ? (<lib_1.Slot data-testid="OrderActionsSlot" name="OrderCanceledActions" slot={slots?.OrderActions} context={orderData}/>) : (<div data-testid="availableActionsList" className={(0, lib_1.classes)([
                    'order-order-actions__wrapper',
                    ['order-order-actions__wrapper--empty', !isEmpty],
                ])}>
            {availableActionsList?.map((action) => {
                    switch (action) {
                        case types_1.AvailableActionsProps.CANCEL:
                            return (<components_1.Button variant="secondary">
                        {translationActions.cancel}
                      </components_1.Button>);
                        case types_1.AvailableActionsProps.RETURN:
                            return (<components_1.Button variant="secondary">
                        {translationActions.return}
                      </components_1.Button>);
                        case types_1.AvailableActionsProps.REORDER:
                            return (<components_1.Button variant="secondary">
                        {translationActions.reorder}
                      </components_1.Button>);
                    }
                })}
          </div>)}
      </>);
    }, [orderData, slots?.OrderActions, translationActions]);
    return (<div {...props} className={(0, lib_1.classes)(['order-order-actions', className])}>
      {renderAvailableActions}
    </div>);
};
exports.OrderActions = OrderActions;

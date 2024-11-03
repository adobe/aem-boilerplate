"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrderSearch = void 0;
const hooks_1 = require("preact/hooks");
const types_1 = require("@/order/types");
const getFormValues_1 = require("@/order/lib/getFormValues");
const api_1 = require("@/order/api");
const i18n_1 = require("@adobe/elsie/i18n");
const event_bus_1 = require("@adobe/event-bus");
const redirectTo_1 = require("@/order/lib/redirectTo");
const getQueryParam_1 = require("@/order/lib/getQueryParam");
const useOrderSearch = ({ onError, isAuth, renderSignIn, routeCustomerOrder, routeGuestOrder, }) => {
    const [inLineAlert, setInLineAlert] = (0, hooks_1.useState)({
        text: '',
        type: 'success',
    });
    const [loading, setLoading] = (0, hooks_1.useState)(false);
    const translations = (0, i18n_1.useText)({
        invalidSearch: 'Order.Errors.invalidSearch',
        email: 'Order.OrderSearchForm.email',
        postcode: 'Order.OrderSearchForm.postcode',
        number: 'Order.OrderSearchForm.orderNumber',
    });
    const orderSearchRedirect = (0, hooks_1.useCallback)(async (order) => {
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        const isToken = orderRef && orderRef.length > 20;
        const dataIsEmpty = (!order && !orderRef) || (!order?.number && !order?.token && !orderRef);
        if (dataIsEmpty)
            return null;
        if (isAuth) {
            const customer = await (0, api_1.getCustomer)();
            if (customer?.email === order.email) {
                (0, redirectTo_1.redirectTo)(routeCustomerOrder, {
                    orderRef: order?.number,
                });
            }
            else if (!isToken) {
                (0, redirectTo_1.redirectTo)(routeGuestOrder, { orderRef: order.token });
            }
        }
        else if (!isToken) {
            (0, redirectTo_1.redirectTo)(routeGuestOrder, { orderRef: order?.token });
        }
    }, [isAuth, routeCustomerOrder, routeGuestOrder]);
    (0, hooks_1.useEffect)(() => {
        const event = event_bus_1.events.on('order/data', (order) => {
            orderSearchRedirect(order);
        }, { eager: true });
        return () => {
            event?.off();
        };
    }, [orderSearchRedirect]);
    (0, hooks_1.useEffect)(() => {
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        const isToken = orderRef && orderRef.length > 20 ? orderRef : null;
        if (!orderRef)
            return;
        if (isToken) {
            (0, redirectTo_1.redirectTo)(routeGuestOrder, { orderRef });
        }
        else if (isAuth) {
            (0, redirectTo_1.redirectTo)(routeCustomerOrder, { orderRef });
        }
        else {
            renderSignIn?.({ render: true, formValues: { number: orderRef } });
        }
    }, [isAuth, routeCustomerOrder, routeGuestOrder, renderSignIn]);
    const normalizeFieldsConfig = (0, hooks_1.useMemo)(() => {
        return [
            {
                entityType: 'CUSTOMER_ADDRESS',
                is_unique: false,
                label: translations.email,
                options: [],
                defaultValue: '',
                fieldType: types_1.FieldEnumList.TEXT,
                className: '',
                required: true,
                orderNumber: 1,
                name: 'email',
                id: 'email',
                code: 'email',
            },
            {
                entityType: 'CUSTOMER_ADDRESS',
                is_unique: false,
                label: translations.postcode,
                options: [],
                defaultValue: '',
                fieldType: types_1.FieldEnumList.TEXT,
                className: '',
                required: true,
                orderNumber: 2,
                name: 'postcode',
                id: 'postcode',
                code: 'postcode',
            },
            {
                entityType: 'CUSTOMER_ADDRESS',
                is_unique: false,
                label: translations.number,
                options: [],
                defaultValue: '',
                fieldType: types_1.FieldEnumList.TEXT,
                className: '',
                required: true,
                orderNumber: 3,
                name: 'number',
                id: 'number',
                code: 'number',
            },
        ];
    }, [translations]);
    const onSubmit = (0, hooks_1.useCallback)(async (event, valid) => {
        if (!valid)
            return null;
        setLoading(true);
        const formValues = (0, getFormValues_1.getFormValues)(event.target);
        await (0, api_1.getGuestOrder)(formValues)
            .then((guestOrder) => {
            if (!guestOrder) {
                setInLineAlert({
                    text: translations.invalidSearch,
                    type: 'warning',
                });
            }
            event_bus_1.events.emit('order/data', guestOrder);
        })
            .catch(async (error) => {
            let showErrorMessage = true;
            onError?.({
                error: error.message,
            });
            const customer = isAuth ? await (0, api_1.getCustomer)() : { email: '' };
            const isOrderBelongsToCustomer = customer?.email === formValues?.email;
            if (isOrderBelongsToCustomer) {
                (0, redirectTo_1.redirectTo)(routeCustomerOrder, { orderRef: formValues.number });
            }
            else {
                showErrorMessage = renderSignIn?.({
                    render: customer === null ||
                        error?.message?.includes('Please login to view the order.'),
                    formValues,
                });
            }
            if (showErrorMessage) {
                setInLineAlert({
                    text: error.message,
                    type: 'warning',
                });
            }
        })
            .finally(() => {
            setLoading(false);
        });
    }, [
        isAuth,
        onError,
        renderSignIn,
        routeCustomerOrder,
        translations.invalidSearch,
    ]);
    return { onSubmit, inLineAlert, loading, normalizeFieldsConfig };
};
exports.useOrderSearch = useOrderSearch;

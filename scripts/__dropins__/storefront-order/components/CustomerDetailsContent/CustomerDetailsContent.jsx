"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDetailsContent = void 0;
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@adobe/elsie/components");
const i18n_1 = require("@adobe/elsie/i18n");
const components_2 = require("@/order/components");
const icons_1 = require("@adobe/elsie/icons");
require("@/order/components/CustomerDetailsContent/CustomerDetailsContent.css");
const hooks_1 = require("preact/hooks");
const CustomerDetailsContent = ({ loading, order, withHeader = true, title, paymentIconsMap = {}, normalizeAddress, }) => {
    const translations = (0, i18n_1.useText)({
        emailTitle: 'Order.CustomerDetails.email.title',
        shippingAddressTitle: 'Order.CustomerDetails.shippingAddress.title',
        shippingMethodsTitle: 'Order.CustomerDetails.shippingMethods.title',
        billingAddressTitle: 'Order.CustomerDetails.billingAddress.title',
        billingMethodsTitle: 'Order.CustomerDetails.billingMethods.title',
        headerText: 'Order.CustomerDetails.headerText',
        freeShipping: 'Order.CustomerDetails.freeShipping',
    });
    const iconsList = (0, hooks_1.useMemo)(() => ({
        checkmo: icons_1.Wallet,
        card: icons_1.Card,
        ...paymentIconsMap,
    }), [paymentIconsMap]);
    const renderAddressData = (0, hooks_1.useCallback)((type) => {
        return normalizeAddress[type]?.map((field, fieldIndex) => {
            return (<p key={fieldIndex}>
            {!field.label
                    ? Array.isArray(field.value)
                        ? field.value.join(' ')
                        : field?.value
                    : `${field.label}: ${Array.isArray(field.value)
                        ? field.value.join(' ')
                        : field?.value}`}
          </p>);
        });
    }, [normalizeAddress]);
    if (!order || loading)
        return <components_2.DetailsSkeleton />;
    const contactDetails = order?.email ?? '';
    const shippingMethod = order?.shipping?.code;
    const shippingCost = order?.shipping?.amount;
    const shippingCurrency = order?.shipping?.currency;
    const paymentMethods = order?.payments;
    const hasPaymentMethod = paymentMethods && paymentMethods.length > 0;
    const selectedPaymentMethod = hasPaymentMethod ? paymentMethods[0]?.name : '';
    const selectedPaymentMethodCode = hasPaymentMethod
        ? paymentMethods[0]?.code
        : '';
    const hasToDisplayPaymentMethod = hasPaymentMethod && selectedPaymentMethod !== '';
    return (<components_1.Card data-testid="order-details" variant={'secondary'} className={(0, lib_1.classes)(['order-customer-details-content'])}>
      {withHeader ? <components_1.Header title={title ?? translations.headerText}/> : null}

      <div className="order-customer-details-content__container">
        <div className="order-customer-details-content__container-email">
          <div className={'order-customer-details-content__container-title'}>
            {translations.emailTitle}
          </div>
          <p>{contactDetails}</p>
        </div>

        <div className="order-customer-details-content__container-shipping_address">
          <div className={'order-customer-details-content__container-title'}>
            {translations.shippingAddressTitle}
          </div>
          <div className="order-customer-details-content__container-description">
            {renderAddressData('shippingAddress')}
          </div>
        </div>

        <div className="order-customer-details-content__container-billing_address">
          <div className={'order-customer-details-content__container-title'}>
            {translations.billingAddressTitle}
          </div>
          <div className="order-customer-details-content__container-description">
            {renderAddressData('billingAddress')}
          </div>
        </div>

        <div className="order-customer-details-content__container-shipping_methods">
          <div className={'order-customer-details-content__container-title'}>
            {translations.shippingMethodsTitle}
          </div>
          {shippingMethod ? (<>
              {shippingCost ? (<p data-testid="shipping_methods_price">
                  <components_1.Price amount={shippingCost} currency={shippingCurrency}/>{' '}
                  {shippingMethod}
                </p>) : (<p data-testid="shipping_methods_placeholder">
                  {translations.freeShipping}
                </p>)}
            </>) : null}
        </div>

        <div className="order-customer-details-content__container-payment_methods">
          <div className={'order-customer-details-content__container-title'}>
            {translations.billingMethodsTitle}
          </div>

          {hasToDisplayPaymentMethod && (<p data-testid="billing_methods_description" className={(0, lib_1.classes)([
                [
                    'order-customer-details-content__container-payment_methods--icon',
                    !!iconsList[selectedPaymentMethodCode],
                ],
            ])}>
              <components_1.Icon source={iconsList[selectedPaymentMethodCode]}/>
              {selectedPaymentMethod}
            </p>)}
        </div>
      </div>
    </components_1.Card>);
};
exports.CustomerDetailsContent = CustomerDetailsContent;

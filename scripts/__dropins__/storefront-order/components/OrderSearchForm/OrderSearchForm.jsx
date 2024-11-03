"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSearchForm = void 0;
const components_1 = require("@adobe/elsie/components");
const i18n_1 = require("@adobe/elsie/i18n");
const icons_1 = require("@adobe/elsie/icons");
const components_2 = require("@/order/components");
require("@/order/components/OrderSearchForm/OrderSearchForm.css");
const OrderSearchForm = ({ onSubmit, loading, inLineAlert, fieldsConfig, }) => {
    return (<components_1.Card variant={'secondary'} className={'order-order-search-form'}>
      <h2 className={'order-order-search-form__title'}>
        <i18n_1.Text id={'Order.OrderSearchForm.title'}/>
      </h2>

      <p>
        <i18n_1.Text id={'Order.OrderSearchForm.description'}/>
      </p>
      {inLineAlert.text ? (<components_1.InLineAlert data-testid="orderAlert" className={'order-order-search-form__alert'} type={inLineAlert.type} variant="secondary" heading={inLineAlert.text} icon={<components_1.Icon source={icons_1.WarningFilled}/>}/>) : null}

      <components_2.Form className={'order-order-search-form__wrapper'} name="orderSearchForm" loading={loading} fieldsConfig={fieldsConfig} onSubmit={onSubmit}>
        <div className="order-order-search-form__button-container">
          <components_1.Button className={'order-order-search-form__button'} size={'medium'} variant={'primary'} key={'logIn'} type={'submit'} disabled={loading}>
            <i18n_1.Text id={'Order.OrderSearchForm.button'}/>
          </components_1.Button>
        </div>
      </components_2.Form>
    </components_1.Card>);
};
exports.OrderSearchForm = OrderSearchForm;

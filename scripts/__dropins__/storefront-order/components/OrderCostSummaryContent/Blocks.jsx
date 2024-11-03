"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Total = exports.AccordionTax = exports.Coupons = exports.Discounts = exports.Shipping = exports.Subtotal = void 0;
const components_1 = require("@adobe/elsie/components");
const icons_1 = require("@adobe/elsie/icons");
const hooks_1 = require("preact/hooks");
const Subtotal = ({ translations, order, subTotalValue, shoppingOrdersDisplaySubtotal, }) => {
    return (<div className="order-cost-summary-content__description order-cost-summary-content__description--subtotal">
      <div className="order-cost-summary-content__description--header">
        <span>{translations.subtotal}</span>
        <components_1.Price className="order-cost-summary-content__description--normal-price" weight="normal" currency={order?.subtotal?.currency} amount={subTotalValue}/>
      </div>
      <div className="order-cost-summary-content__description--subheader">
        {!shoppingOrdersDisplaySubtotal.taxExcluded &&
            shoppingOrdersDisplaySubtotal.taxIncluded ? (<span>{translations.incl}</span>) : null}
        {shoppingOrdersDisplaySubtotal.taxExcluded &&
            shoppingOrdersDisplaySubtotal.taxIncluded ? (<>
            <components_1.Price currency={order?.subtotal?.currency} amount={subTotalValue} size="small"/>{' '}
            <span>{translations.excl}</span>
          </>) : null}
      </div>
    </div>);
};
exports.Subtotal = Subtotal;
const Shipping = ({ translations, shoppingOrdersDisplayShipping, order, totalShipping, }) => {
    return (<div className="order-cost-summary-content__description order-cost-summary-content__description--shipping">
      <div className="order-cost-summary-content__description--header">
        <span>{translations.shipping}</span>
        {order?.totalShipping?.value ? (<components_1.Price weight="normal" currency={order?.totalShipping?.currency} amount={totalShipping}/>) : (<span>{translations.freeShipping}</span>)}
      </div>
      <div className="order-cost-summary-content__description--subheader">
        {shoppingOrdersDisplayShipping.taxIncluded &&
            shoppingOrdersDisplayShipping.taxExcluded ? (<>
            <components_1.Price weight="normal" currency={order?.totalShipping?.currency} amount={order?.totalShipping?.value} size="small"/>
            <span> {translations.excl}</span>
          </>) : null}
        {shoppingOrdersDisplayShipping.taxIncluded &&
            !shoppingOrdersDisplayShipping.taxExcluded ? (<span>{translations.incl}</span>) : null}
      </div>
    </div>);
};
exports.Shipping = Shipping;
const Discounts = ({ translations, order, totalGiftcardValue, totalGiftcardCurrency, }) => {
    if (!order?.discounts?.length && !totalGiftcardValue)
        return null;
    return (<div className="order-cost-summary-content__description order-cost-summary-content__description--discount">
      <div className="order-cost-summary-content__description--header">
        <span>{translations.discount}</span>
        <span>
          {order?.discounts?.length
            ? order?.discounts?.map(({ amount }, index) => {
                const couponValue = amount?.value ?? 0;
                return (<components_1.Price key={index} weight="normal" sale currency={amount?.currency} amount={-(couponValue + totalGiftcardValue)}/>);
            })
            : null}
        </span>
      </div>
      {!order?.discounts.length && totalGiftcardValue ? (<div className="order-cost-summary-content__description--subheader">
          <span>
            <components_1.Icon source={icons_1.Coupon} size="16"/>
            <span>{translations.discountSubtitle.toLocaleUpperCase()}</span>
          </span>

          <components_1.Price weight="normal" sale currency={totalGiftcardCurrency} amount={-totalGiftcardValue}/>
        </div>) : null}
    </div>);
};
exports.Discounts = Discounts;
const Coupons = ({ order }) => {
    return (<div className="order-cost-summary-content__description order-cost-summary-content__description--coupon">
      {order?.coupons?.map((coupon, index) => (<div className="order-cost-summary-content__description--header" key={index}>
          <span>{coupon.code}</span>
          <span>TBD</span>
        </div>))}
    </div>);
};
exports.Coupons = Coupons;
const AccordionTax = ({ translations, renderTaxAccordion, totalAccordionTaxValue, order, }) => {
    const [changeAccordion, setChangeAccordion] = (0, hooks_1.useState)(false);
    if (!renderTaxAccordion)
        return (<div className="order-cost-summary-content__description order-cost-summary-content__description--tax">
        <div className="order-cost-summary-content__description--header">
          <span>{translations.tax}</span>
          <components_1.Price currency={order?.totalTax?.currency} amount={order?.totalTax.value} weight="normal" size="small"/>
        </div>
      </div>);
    return (<components_1.Accordion data-testid="tax-accordionTaxes" className="order-cost-summary-content__accordion" iconOpen={icons_1.ChevronDown} iconClose={icons_1.ChevronUp}>
      <components_1.AccordionSection onStateChange={setChangeAccordion} title={translations.accordionTitle} secondaryText={<>
            {!changeAccordion ? (<components_1.Price weight="normal" amount={totalAccordionTaxValue} currency={order?.totalTax?.currency}/>) : null}
          </>} renderContentWhenClosed={false}>
        {order?.taxes?.map((el, index) => (<div key={index} className={'order-cost-summary-content__accordion-row'}>
            <p>{el?.title}</p>
            <p>
              <components_1.Price weight="normal" amount={el?.amount?.value} currency={el?.amount?.currency}/>
            </p>
          </div>))}
        <div className={'order-cost-summary-content__accordion-row order-cost-summary-content__accordion-total'}>
          <p>{translations.accordionTotalTax}</p>
          <p>
            <components_1.Price weight="normal" amount={totalAccordionTaxValue} currency={order.totalTax.currency} size="medium"/>
          </p>
        </div>
      </components_1.AccordionSection>
    </components_1.Accordion>);
};
exports.AccordionTax = AccordionTax;
const Total = ({ translations, shoppingOrdersDisplaySubtotal, order, }) => {
    return (<div className="order-cost-summary-content__description order-cost-summary-content__description--total">
      <div className="order-cost-summary-content__description--header">
        <span>{translations.total}</span>
        <components_1.Price currency={order?.grandTotal?.currency} amount={order?.grandTotal?.value} weight="bold" size="medium"/>
      </div>
      {shoppingOrdersDisplaySubtotal.taxExcluded &&
            shoppingOrdersDisplaySubtotal.taxIncluded ? (<div className="order-cost-summary-content__description--subheader">
          <span>{translations.totalExcludingTaxes}</span>
          <components_1.Price currency={order?.grandTotal?.currency} amount={order?.grandTotal?.value - order?.totalTax.value} weight="normal" size="small"/>
        </div>) : null}
    </div>);
};
exports.Total = Total;

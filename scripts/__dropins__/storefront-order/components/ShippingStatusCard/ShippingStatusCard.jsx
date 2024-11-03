"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingStatusCard = void 0;
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@adobe/elsie/components");
const i18n_1 = require("@adobe/elsie/i18n");
const types_1 = require("@/order/types");
require("@/order/components/ShippingStatusCard/ShippingStatusCard.css");
const ShippingStatusCard = ({ slots, orderData, collapseThreshold = 10, routeProductDetails, }) => {
    const translations = (0, i18n_1.useText)({
        carrier: 'Order.ShippingStatusCard.carrier',
        prepositionOf: 'Order.ShippingStatusCard.prepositionOf',
        shippingCardTitle: 'Order.ShippingStatusCard.shippingCardTitle',
        shippingInfoTitle: 'Order.ShippingStatusCard.shippingInfoTitle',
        notYetShippedTitle: 'Order.ShippingStatusCard.notYetShippedTitle',
        notYetShippedImagesTitle: 'Order.ShippingStatusCard.notYetShippedImagesTitle',
        noInfoTitle: 'Order.OrderStatusContent.noInfoTitle',
    });
    const ImageTag = routeProductDetails ? 'a' : 'span';
    const orderStatus = orderData?.status?.toLocaleLowerCase();
    const isSingleShipment = orderData?.shipments?.length === 1;
    const isCompleted = isSingleShipment && orderStatus?.includes(types_1.StatusEnumProps.COMPLETE);
    const renderNotYetShippedProduct = orderData?.items?.filter((el) => el?.quantityShipped === 0);
    if (!orderData || orderStatus?.includes(types_1.StatusEnumProps.CANCELED)) {
        return null;
    }
    if (!orderData?.shipments?.length) {
        return (<components_1.Card variant="secondary" className="order-shipping-status-card">
        <components_1.Header title={translations.shippingInfoTitle}/>
        <div className={'order-shipping-status-card__header'}>
          <div className={'order-shipping-status-card__header--content'}>
            {orderData?.carrier ? <p>{orderData?.carrier}</p> : null}
            <p>{translations.noInfoTitle}</p>
          </div>
        </div>
      </components_1.Card>);
    }
    const notYetShippedProductLabel = (<i18n_1.Text id="Order.ShippingStatusCard.notYetShippedItem" plural={renderNotYetShippedProduct?.length}/>);
    return (<>
      {orderData?.shipments?.map(({ tracking, items, id }, index) => {
            const accordionSectionItemLabel = (<i18n_1.Text id="Order.ShippingStatusCard.notYetShippedItem" plural={items?.length}/>);
            return (<components_1.Card key={id} variant="secondary" className="order-shipping-status-card">
            <components_1.Header title={translations.shippingCardTitle}/>
            {tracking?.map((track) => {
                    return (<div className={'order-shipping-status-card__header'} key={track.number} role={'status'}>
                  <div className={'order-shipping-status-card__header--content'}>
                    <p>
                      {translations.carrier}{' '}
                      {track?.carrier?.toLocaleUpperCase()} | {track?.number}
                    </p>
                    <p>{track?.title}</p>
                  </div>
                  {slots?.DeliveryTrackActions ? (<lib_1.Slot data-testid="deliverySlotActions" name="DeliveryTrackActions" slot={slots?.DeliveryTrackActions} context={{ trackInformation: track }}/>) : null}
                </div>);
                })}

            {!isCompleted ? (<components_1.Accordion actionIconPosition="right" data-testid="dropinAccordion">
                <components_1.AccordionSection data-position={index + 1} defaultOpen={collapseThreshold >= items?.length} title={`${translations.notYetShippedImagesTitle} (${items?.length}) ${accordionSectionItemLabel}`}>
                  <components_1.ContentGrid maxColumns={6} emptyGridContent={<></>} className={'order-shipping-status-card__images'}>
                    {items?.map((item) => {
                        const label = item?.orderItem?.product?.thumbnail?.label;
                        const url = item?.orderItem?.product?.thumbnail?.url;
                        return (<ImageTag key={item.id} href={routeProductDetails?.(item) ?? '#'}>
                          <components_1.Image alt={label} src={url || ''} width={85} height={114}/>
                        </ImageTag>);
                    })}
                  </components_1.ContentGrid>
                </components_1.AccordionSection>
              </components_1.Accordion>) : null}

            {slots?.DeliveryTimeLine ? (<lib_1.Slot data-testid="deliverySlotTimeLine" name="DeliveryTimeLine" slot={slots?.DeliveryTimeLine} context={{}}/>) : null}
          </components_1.Card>);
        })}
      {renderNotYetShippedProduct?.length ? (<components_1.Card variant="secondary" className="order-shipping-status-card" data-testid="dropinAccordionNotYetShipped2">
          <components_1.Header title={translations.notYetShippedTitle}/>

          <components_1.Accordion actionIconPosition="right">
            <components_1.AccordionSection defaultOpen={collapseThreshold >= renderNotYetShippedProduct?.length} title={`${translations.notYetShippedImagesTitle} (${renderNotYetShippedProduct?.length} ${notYetShippedProductLabel})`}>
              <div className="order-shipping-status-card__images">
                {renderNotYetShippedProduct?.map((item) => (<ImageTag key={item.id} href={routeProductDetails?.(item) ?? '#'}>
                    <components_1.Image alt={item.thumbnail?.label} src={item.thumbnail?.url || ''} width={85} height={114}/>
                  </ImageTag>))}
              </div>
            </components_1.AccordionSection>
          </components_1.Accordion>
        </components_1.Card>) : null}
    </>);
};
exports.ShippingStatusCard = ShippingStatusCard;

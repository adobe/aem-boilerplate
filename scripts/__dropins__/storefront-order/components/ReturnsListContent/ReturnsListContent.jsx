"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsListContent = void 0;
const hooks_1 = require("preact/hooks");
const icons_1 = require("@adobe/elsie/icons");
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@adobe/elsie/components");
const EmptyList_1 = __importDefault(require("../EmptyList"));
require("@/order/components/ReturnsListContent/ReturnsListContent.css");
const returnOrdersHelper_1 = require("@/order/lib/returnOrdersHelper");
const i18n_1 = require("@adobe/elsie/i18n");
const components_2 = require("@/order/components");
const iconConfig = { size: '32', stroke: '2' };
const ReturnsListContent = ({ minifiedViewKey, withReturnNumber = false, withOrderNumber = false, slots, pageInfo, withReturnsListButton = true, isMobile = false, returnsInMinifiedView = 1, translations = {}, orderReturns = [], minifiedView = false, withHeader = true, withThumbnails = true, selectedPage = 1, handleSetSelectPage, routeReturnDetails, routeOrderDetails, routeTracking, routeReturnsList, routeProductDetails, loading, }) => {
    const lastElementNumber = minifiedView
        ? returnsInMinifiedView
        : orderReturns.length;
    const ImageTag = routeProductDetails?.() ? 'a' : 'span';
    const renderReturnOrders = (0, hooks_1.useMemo)(() => {
        return orderReturns.slice(0, lastElementNumber).map((element, i) => (<components_1.Card key={i} variant="secondary" className="order-returns-list-content__cards-list">
        <div className="order-returns-list-content__cards-grid">
          <div className="order-returns-list-content__descriptions">
            <p className="order-returns-list-content__return-status">
              <i18n_1.Text id={`Order.Returns.${minifiedViewKey}.returnsList.resturnStatus.${(0, returnOrdersHelper_1.formatReturnStatus)(element.returnStatus)}`}/>
            </p>
            {withReturnNumber ? (<p>
                {translations.returnNumber}{' '}
                <a href={routeReturnDetails?.({
                    returnNumber: element.returnNumber,
                    orderNumber: element.orderNumber,
                    token: element.token,
                }) ?? '#'} rel="noreferrer">
                  {element.returnNumber}
                </a>
              </p>) : null}
            {withOrderNumber ? (<p>
                {translations.orderNumber}{' '}
                <a href={routeOrderDetails?.({
                    orderNumber: element.orderNumber,
                    token: element.token,
                }) ?? '#'} rel="noreferrer">
                  {element.orderNumber}
                </a>
              </p>) : null}
            {element?.tracking?.map((track, index) => (<p key={`${track.trackingNumber}_${index}`}>
                {`${translations.carrier} ${track?.carrier?.label?.toLocaleUpperCase()}: `}
                <a href={`${routeTracking?.(track) || '#'}`} target="_blank" rel="noreferrer">
                  {track.trackingNumber}
                </a>
              </p>))}

            {slots?.ReturnItemsDetails ? (<lib_1.Slot data-testid="returnItemsDetails" name="ReturnItemsDetails" slot={slots?.ReturnItemsDetails} context={{ items: element.items }}/>) : element.items.length ? (<p>
                {element.items.length}{' '}
                <i18n_1.Text id={`Order.Returns.${minifiedViewKey}.returnsList.itemText`} plural={element.items.length} fields={{ count: element.items.length }}/>
              </p>) : null}
          </div>

          {withThumbnails ? (<components_1.ContentGrid maxColumns={isMobile ? 3 : 9} emptyGridContent={<></>} className={(0, lib_1.classes)([
                    'order-returns-list-content__images',
                    ['order-returns-list-content__images-3', isMobile],
                ])}>
              {element?.items?.map((item, index) => {
                    const orderItem = item.orderItem;
                    const label = orderItem.thumbnail?.label;
                    const url = orderItem.thumbnail?.url;
                    return (<ImageTag key={index + item.uid} href={routeProductDetails?.(item.orderItem) ?? '#'}>
                    <components_1.Image alt={label} src={url} width={85} height={114}/>
                  </ImageTag>);
                })}
            </components_1.ContentGrid>) : null}
          {slots?.DetailsActionParams ? (<lib_1.Slot className="order-returns-list-content__actions" data-testid="detailsActionParams" name="DetailsActionParams" slot={slots?.DetailsActionParams} context={{ returnOrderItem: element }}/>) : (<a href={routeReturnDetails?.({
                    returnNumber: element.returnNumber,
                    token: element.token,
                    orderNumber: element.orderNumber,
                }) ?? '#'} className="order-returns-list-content__actions">
              <components_1.Icon source={icons_1.ChevronRight} {...iconConfig}/>
            </a>)}
        </div>
      </components_1.Card>));
    }, [
        orderReturns,
        lastElementNumber,
        translations,
        slots,
        withThumbnails,
        isMobile,
        routeOrderDetails,
        routeReturnDetails,
        routeTracking,
        routeProductDetails,
        ImageTag,
        withOrderNumber,
        minifiedViewKey,
        withReturnNumber,
    ]);
    const renderMinifiedView = (0, hooks_1.useMemo)(() => (<>
        {withHeader ? (<components_1.Header title={translations.minifiedViewTitle} divider={false} className={'order-returns__header--minified'}/>) : null}
        {loading ? (<components_2.CardLoader withCard={false}/>) : (<>
            {renderReturnOrders}
            <EmptyList_1.default minifiedView={minifiedView} typeList="orders" isEmpty={!orderReturns.length} message={translations.emptyOrdersListMessage}/>
            {withReturnsListButton ? (<a className="order-returns-list-content__actions" href={routeReturnsList?.() ?? '#'}>
                <components_1.Card variant="secondary" className="order-returns-list-content__card">
                  <div className={'order-returns-list-content__card-wrapper'}>
                    <p>{translations.viewAllOrdersButton}</p>
                    <components_1.Icon source={icons_1.ChevronRight} {...iconConfig}/>
                  </div>
                </components_1.Card>
              </a>) : null}
          </>)}
      </>), [
        routeReturnsList,
        withReturnsListButton,
        withHeader,
        translations,
        renderReturnOrders,
        minifiedView,
        orderReturns.length,
        loading,
    ]);
    const renderFullSizeView = (0, hooks_1.useMemo)(() => (<>
        {withHeader ? (<components_1.Header title={translations.minifiedViewTitle} divider={true} className={'order-returns__header--full-size'}/>) : null}
        {loading ? (<components_2.CardLoader withCard={false}/>) : (<>
            <EmptyList_1.default minifiedView={minifiedView} typeList="orders" isEmpty={!orderReturns.length} message={translations.emptyOrdersListMessage}/>
            {renderReturnOrders}
            {pageInfo?.totalPages > 1 ? (<components_1.Pagination totalPages={pageInfo?.totalPages} currentPage={selectedPage} onChange={handleSetSelectPage}/>) : null}
          </>)}
      </>), [
        renderReturnOrders,
        minifiedView,
        orderReturns,
        translations,
        pageInfo,
        selectedPage,
        handleSetSelectPage,
        loading,
        withHeader,
    ]);
    return (<div className="order-returns-list-content">
      {minifiedView ? renderMinifiedView : renderFullSizeView}
    </div>);
};
exports.ReturnsListContent = ReturnsListContent;

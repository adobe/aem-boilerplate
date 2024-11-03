"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReturn = void 0;
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@/order/components");
const useCreateReturn_1 = require("@/order/hooks/containers/useCreateReturn");
const i18n_1 = require("@adobe/elsie/i18n");
const components_2 = require("@adobe/elsie/components");
const CreateReturn = ({ showConfigurableOptions, className, onSuccess, onError, routeReturnSuccess, }) => {
    const { attributesList, steps, loading, selectedProductList, handleSelectedProductList, handleSetQuantity, handleChangeStep, onSubmit, } = (0, useCreateReturn_1.useCreateReturn)();
    const translations = (0, i18n_1.useText)({
        headerText: 'Order.CreateReturn.headerText',
        successTitle: 'Order.CreateReturn.success.title',
        successMessage: 'Order.CreateReturn.success.message',
        sender: 'Order.CreateReturn.giftCard.sender',
        recipient: 'Order.CreateReturn.giftCard.recipient',
        message: 'Order.CreateReturn.giftCard.message',
        outOfStock: 'Order.CreateReturn.stockStatus.outOfStock',
        nextStep: 'Order.CreateReturn.buttons.nextStep',
        backStep: 'Order.CreateReturn.buttons.backStep',
        submit: 'Order.CreateReturn.buttons.submit',
        backStore: 'Order.CreateReturn.buttons.backStore',
    });
    const renderList = {
        products: (<components_1.ReturnOrderProductList translations={translations} loading={loading} handleSelectedProductList={handleSelectedProductList} showConfigurableOptions={showConfigurableOptions} handleSetQuantity={handleSetQuantity} handleChangeStep={handleChangeStep}/>),
        attributes: (<components_1.ReturnReasonForm loading={loading} fieldsConfig={attributesList} handleChangeStep={handleChangeStep} translations={translations} onSubmit={onSubmit}/>),
        success: <components_1.ReturnOrderMessage translations={translations}/>,
    };
    return (<div className={(0, lib_1.classes)(['order-customer-details', className])}>
      <components_2.Header title={translations.headerText}/>
      {renderList[steps]}
    </div>);
};
exports.CreateReturn = CreateReturn;

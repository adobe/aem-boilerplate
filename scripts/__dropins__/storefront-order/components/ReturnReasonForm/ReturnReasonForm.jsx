"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnReasonForm = void 0;
require("@/order/components/ReturnReasonForm/ReturnReasonForm.css");
const components_1 = require("@adobe/elsie/components");
const Form_1 = __importDefault(require("../Form"));
const ReturnReasonForm = ({ loading, fieldsConfig, translations, handleChangeStep, onSubmit, }) => {
    return (<Form_1.default fieldsConfig={fieldsConfig} onSubmit={onSubmit} loading={loading} name="returnReasonForm" className="order-return-reason-form">
      <div className="order-return-reason-form__item">
        <components_1.Button variant="secondary" type="button" onClick={() => {
            handleChangeStep('products');
        }}>
          {translations.backStep}
        </components_1.Button>
        <components_1.Button>{translations.submit}</components_1.Button>
      </div>
    </Form_1.default>);
};
exports.ReturnReasonForm = ReturnReasonForm;

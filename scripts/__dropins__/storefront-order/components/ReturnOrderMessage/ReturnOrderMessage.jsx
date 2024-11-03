"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnOrderMessage = void 0;
require("@/order/components/ReturnOrderMessage/ReturnOrderMessage.css");
const components_1 = require("@adobe/elsie/components");
const ReturnOrderMessage = ({ translations, }) => {
    return (<div className={'order-return-order-message'}>
      <p>{translations.title}</p>
      <p>{translations.message}</p>
      <components_1.Button>{translations.backStore}</components_1.Button>
    </div>);
};
exports.ReturnOrderMessage = ReturnOrderMessage;

import { BillingAddressInput as BillingAddressInputModel, PaymentMethodInput as PaymentMethodInputModel, ShippingAddressInput as ShippingAddressInputModel, ShippingMethodInput as ShippingMethodInputModel } from '../models/api';
import { BillingAddressInput, NegotiableQuoteBillingAddressInput, NegotiableQuotePaymentMethodInput, NegotiableQuoteShippingAddressInput, PaymentMethodInput, ShippingAddressInput, ShippingMethodInput } from '../../__generated__/types';

export declare function transformPaymentMethodInputModelToCartInput({ code, ...additionalData }: PaymentMethodInputModel): PaymentMethodInput;
export declare function transformPaymentMethodInputModelToQuoteInput({ code, ...additionalData }: PaymentMethodInputModel): NegotiableQuotePaymentMethodInput;
export declare const transformShippingMethodInput: (input: ShippingMethodInputModel | ShippingMethodInput) => ShippingMethodInput;
export declare function transformShippingMethodsInputModel(input: Array<ShippingMethodInputModel | ShippingMethodInput>): Array<ShippingMethodInput>;
export declare function transformShippingAddressInputModelToCartInput(input: ShippingAddressInputModel): ShippingAddressInput;
export declare function transformShippingAddressInputModelToQuoteInput(input: ShippingAddressInputModel): NegotiableQuoteShippingAddressInput;
export declare function transformBillingAddressInputModelToCartInput(input: BillingAddressInputModel): BillingAddressInput;
export declare function transformBillingAddressInputModelToQuoteInput(input: BillingAddressInputModel): NegotiableQuoteBillingAddressInput;
//# sourceMappingURL=transform-api.d.ts.map
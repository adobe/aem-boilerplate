import { CheckoutAgreement as CheckoutAgreementModel } from '../models';
import { Get_Checkout_AgreementsQuery } from '../../__generated__/types';

type CheckoutAgreements = Get_Checkout_AgreementsQuery['checkoutAgreements'];
export declare const transformCheckoutAgreements: (data: CheckoutAgreements) => CheckoutAgreementModel[];
export {};
//# sourceMappingURL=transform-checkout-agreements.d.ts.map
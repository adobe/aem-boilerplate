import { PaymentMethod } from '../models/payment-method';
import { GetCartQuery } from '../../__generated__/types';

type SelectedPaymentMethod = NonNullable<GetCartQuery['cart']>['selected_payment_method'];
type AvailablePaymentMethods = NonNullable<GetCartQuery['cart']>['available_payment_methods'];
declare const transformSelectedPaymentMethod: (data: SelectedPaymentMethod) => PaymentMethod | undefined;
declare const transformAvailablePaymentMethods: (data: AvailablePaymentMethods) => PaymentMethod[] | undefined;
export { transformAvailablePaymentMethods, transformSelectedPaymentMethod };
//# sourceMappingURL=transform-payment-methods.d.ts.map
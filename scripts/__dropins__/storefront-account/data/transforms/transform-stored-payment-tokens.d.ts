import { CustomerPaymentTokenItem } from '../../types';
import { StoredPaymentMethodDisplay } from '../models/stored-payment-method';

/** End of calendar month for MM/YYYY (e.g. 09/2022). */
export declare function isExpirationDatePast(expirationDate: string | undefined): boolean;
export declare function transformStoredPaymentTokens(items: CustomerPaymentTokenItem[], filterPaymentMethodCodes?: string[]): StoredPaymentMethodDisplay[];
//# sourceMappingURL=transform-stored-payment-tokens.d.ts.map
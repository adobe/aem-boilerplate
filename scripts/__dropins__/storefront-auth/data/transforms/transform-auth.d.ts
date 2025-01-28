import { AccountModel, CustomerModel } from '../models';

/**
 * References:
 * https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-collector/src/handlers/account/signInAEP.ts
 * https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-collector/src/handlers/account/createAccountAEP.ts
 */
export declare const transformAccount: (data: CustomerModel) => AccountModel;
//# sourceMappingURL=transform-auth.d.ts.map
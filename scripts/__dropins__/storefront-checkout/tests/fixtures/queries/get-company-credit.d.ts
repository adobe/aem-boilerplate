import { GetCompanyCreditQuery } from '../../../__generated__/types';

/**
 * Standard company credit fixture with $1000 available credit
 * Use this for normal scenarios where credit limit is not exceeded
 */
export declare const getCompanyCreditFixture: GetCompanyCreditQuery;
/**
 * Company credit fixture with $500 available credit
 * Use this for scenarios where credit limit is exceeded (when cart amount > $500)
 * The MSW handler will use this fixture when sessionStorage has 'useExceedLimitFixture' set to 'true'
 */
export declare const getCompanyCreditExceedLimitFixture: GetCompanyCreditQuery;
//# sourceMappingURL=get-company-credit.d.ts.map
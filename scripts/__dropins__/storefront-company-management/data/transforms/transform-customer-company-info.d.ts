import { CustomerCompanyInfo } from '../models/customer-company-info';
import { GetCustomerCompanyInfoResponse } from '../../types/api/getCustomerCompanyInfo.types';

/**
 * Transforms GraphQL response to CustomerCompanyInfo model
 * @param response - GraphQL response containing customer and company data
 * @returns Transformed customer company info or null if data is incomplete
 */
export declare const transformCustomerCompanyInfo: (response: GetCustomerCompanyInfoResponse) => CustomerCompanyInfo | null;
//# sourceMappingURL=transform-customer-company-info.d.ts.map
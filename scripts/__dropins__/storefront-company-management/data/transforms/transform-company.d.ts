import { getCompanyResponse } from '../../types/api/getCompany.types';
import { updateCompanyResponse } from '../../types/api/updateCompany.types';
import { CompanyModel, CompanyRegistrationModel } from '../models/company';

export declare const transformCompany: (response: getCompanyResponse | updateCompanyResponse) => CompanyModel;
/**
 * Transform createCompany GraphQL response to Company model
 */
export declare const transformCreateCompanyResponse: (response: any) => CompanyRegistrationModel;
//# sourceMappingURL=transform-company.d.ts.map
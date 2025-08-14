import { getCompanyResponse } from '../../types/api/getCompany.types';
import { updateCompanyResponse } from '../../types/api/updateCompany.types';
import { CompanyModel } from '../models/company';

export declare const transformCompany: (response: getCompanyResponse | updateCompanyResponse) => CompanyModel;
//# sourceMappingURL=transform-company.d.ts.map
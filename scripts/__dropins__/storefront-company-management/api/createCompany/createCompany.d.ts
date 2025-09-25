import { CompanyRegistrationModel } from '../../data/models/company';

export interface CompanyCreateInput {
    company_name: string;
    company_email: string;
    legal_name?: string;
    vat_tax_id?: string;
    reseller_id?: string;
    legal_address: {
        street: string[];
        city: string;
        region: {
            region_code: string;
            region?: string;
            region_id?: number;
        };
        postcode: string;
        country_id: string;
        telephone?: string;
    };
    company_admin: {
        email: string;
        firstname: string;
        lastname: string;
        job_title?: string;
        telephone?: string;
        gender?: number;
        custom_attributes?: Array<{
            attribute_code: string;
            value: string;
        }>;
    };
}
export declare const createCompany: (formData: any) => Promise<{
    success: boolean;
    company?: CompanyRegistrationModel;
    errors?: string[];
}>;
//# sourceMappingURL=createCompany.d.ts.map
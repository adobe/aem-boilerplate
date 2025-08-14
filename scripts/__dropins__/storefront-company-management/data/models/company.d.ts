import { CompanyLegalAddressModel } from './company-address';

export interface CompanyRole {
    id: string;
    name: string;
    permissions?: {
        id: string;
        text: string;
    }[];
}
export interface CompanyContact {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    job_title?: string;
}
export interface CompanySalesRepresentative {
    firstname: string;
    lastname: string;
    email: string;
}
export interface Company {
    id: string;
    name: string;
    email: string;
    legal_name?: string;
    vat_tax_id?: string;
    reseller_id?: string;
    legal_address?: CompanyLegalAddressModel;
    company_admin?: CompanyContact;
    sales_representative?: CompanySalesRepresentative;
    payment_methods?: string[];
    available_payment_methods?: {
        code: string;
        title: string;
    }[];
}
export interface CompanyModel extends Company {
    canEdit?: boolean;
    customerRole?: CompanyRole;
    customerStatus?: string;
}
//# sourceMappingURL=company.d.ts.map
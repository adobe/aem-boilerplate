import { CompanyLegalAddressModel } from './company-address';

export interface CompanyRole {
    id: string;
    name: string;
    permissions?: {
        id: string;
        text: string;
        children?: {
            id: string;
            text: string;
            children?: {
                id: string;
                text: string;
            }[];
        }[];
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
    available_payment_methods?: {
        code: string;
        title: string;
    }[];
    available_shipping_methods?: {
        code: string;
        title: string;
    }[];
}
export interface CompanyModel extends Company {
    canEdit?: boolean;
    customerRole?: CompanyRole;
    customerStatus?: string;
    permissionsFlags?: {
        canViewAccount: boolean;
        canEditAccount: boolean;
        canViewAddress: boolean;
        canEditAddress: boolean;
        canViewContacts: boolean;
        canViewPaymentInformation: boolean;
        canViewShippingInformation: boolean;
    };
}
//# sourceMappingURL=company.d.ts.map
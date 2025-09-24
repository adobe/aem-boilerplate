import { CompanyLegalAddressModel } from './company-address';
import { CompanyRole } from './company-role';

export interface CompanyContact {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    jobTitle?: string;
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
    legalName?: string;
    vatTaxId?: string;
    resellerId?: string;
    legalAddress?: CompanyLegalAddressModel;
    companyAdmin?: CompanyContact;
    salesRepresentative?: CompanySalesRepresentative;
    availablePaymentMethods?: {
        code: string;
        title: string;
    }[];
    availableShippingMethods?: {
        code: string;
        title: string;
    }[];
}
export interface CompanyModel extends Company {
    canEditAccount: boolean;
    canEditAddress: boolean;
    customerRole?: CompanyRole;
    customerStatus?: string;
    permissionsFlags: {
        canViewAccount: boolean;
        canEditAccount: boolean;
        canViewAddress: boolean;
        canEditAddress: boolean;
        canViewContacts: boolean;
        canViewPaymentInformation: boolean;
        canViewShippingInformation: boolean;
        canViewUsers: boolean;
        canEditUsers: boolean;
    };
}
//# sourceMappingURL=company.d.ts.map
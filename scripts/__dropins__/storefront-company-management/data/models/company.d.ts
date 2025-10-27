import { CompanyLegalAddressModel } from './company-address';
import { CompanyRoleModel } from './company-role';

export interface CompanyContact {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    jobTitle?: string;
    telephone?: string;
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
    customerRole?: CompanyRoleModel;
    customerStatus?: string;
    permissionsFlags: {
        canViewAccount: boolean;
        canEditAccount: boolean;
        canViewAddress: boolean;
        canEditAddress: boolean;
        canViewContacts: boolean;
        canViewPaymentInformation: boolean;
        canViewShippingInformation: boolean;
        canViewRoles: boolean;
        canManageRoles: boolean;
    };
}
export interface CompanyRegistrationModel {
    id: string;
    name: string;
    email: string;
    legalName?: string;
    vatTaxId?: string;
    resellerId?: string;
    legalAddress: {
        street: string[];
        city: string;
        region: {
            regionCode: string;
            region?: string;
            regionId?: number;
        };
        postcode: string;
        countryCode: string;
        telephone?: string;
    };
    companyAdmin: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        jobTitle?: string;
        telephone?: string;
    };
}
export interface CompanyFormData {
    companyName?: string;
    legalName?: string;
    companyEmail?: string;
    vatTaxId?: string;
    resellerId?: string;
    street?: string[] | string;
    streetLine2?: string;
    city?: string;
    region?: string;
    regionCode?: string;
    regionId?: number;
    countryCode?: string;
    postcode?: string;
    addressTelephone?: string;
    adminFirstname?: string;
    adminLastname?: string;
    adminEmail?: string;
    adminJobTitle?: string;
    adminWorkTelephone?: string;
    adminGender?: number;
    [key: string]: any;
}
//# sourceMappingURL=company.d.ts.map
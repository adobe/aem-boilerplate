/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface NegotiableQuoteAddressInput {
    city: string;
    company?: string;
    countryCode: string;
    fax?: string;
    firstname: string;
    lastname: string;
    middlename?: string;
    postcode?: string;
    prefix?: string;
    region?: string;
    regionId?: number;
    saveInAddressBook?: boolean;
    street: string[];
    suffix?: string;
    telephone?: string;
    vatId?: string;
}
export interface NegotiableQuoteTemplateShippingAddressInput {
    address?: NegotiableQuoteAddressInput;
    customerAddressUid?: string;
    customerNotes?: string;
}
export interface AddQuoteTemplateShippingAddressParams {
    templateId: string;
    shippingAddress: NegotiableQuoteTemplateShippingAddressInput;
}
export declare const addQuoteTemplateShippingAddress: (params: AddQuoteTemplateShippingAddressParams) => Promise<import('../../data/models/negotiable-quote-template-model').NegotiableQuoteTemplateModel>;
//# sourceMappingURL=addQuoteTemplateShippingAddress.d.ts.map
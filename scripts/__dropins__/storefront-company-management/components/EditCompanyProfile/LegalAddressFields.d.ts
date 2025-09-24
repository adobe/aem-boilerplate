import { FunctionComponent } from 'preact';

interface LegalAddressFieldsProps {
    loading?: boolean;
    loadingCountries: boolean;
    value: {
        street: string;
        street2: string;
        city: string;
        region: string;
        regionCode: string;
        countryCode: string;
        postcode: string;
        telephone: string;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    onChange: (field: string) => (value: string) => void;
    onBlur: (field: string, value?: string) => void;
    countryOptions: {
        text: string;
        value: string;
    }[];
    regionOptions: {
        text: string;
        value: string;
    }[];
    isRegionRequired: boolean;
    hasRegionOptions: boolean;
    /**
     * Optional input name prefix for DOM names (defaults to 'legal_address')
     */
    namePrefix?: string;
    /**
     * Optional field path prefix used for change/blur handlers (defaults to 'legal_address')
     */
    fieldPathPrefix?: string;
    /**
     * Optional per-field required overrides for non-edit flows
     */
    requiredConfig?: Partial<{
        street: boolean;
        city: boolean;
        postcode: boolean;
        telephone: boolean;
    }>;
}
export declare const LegalAddressFields: FunctionComponent<LegalAddressFieldsProps>;
export default LegalAddressFields;
//# sourceMappingURL=LegalAddressFields.d.ts.map
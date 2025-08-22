import { FunctionComponent } from 'preact';

interface CompanyAccountFieldsProps {
    loading?: boolean;
    value: {
        name: string;
        email: string;
        legal_name: string;
        vat_tax_id: string;
        reseller_id: string;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    onChange: (field: string) => (value: string) => void;
    onBlur: (field: string) => void;
    /** Optional input name prefix for DOM names (defaults to none) */
    namePrefix?: string;
    /** Optional field path prefix used for change/blur handlers (defaults to none) */
    fieldPathPrefix?: string;
}
export declare const CompanyAccountFields: FunctionComponent<CompanyAccountFieldsProps>;
export default CompanyAccountFields;
//# sourceMappingURL=CompanyAccountFields.d.ts.map
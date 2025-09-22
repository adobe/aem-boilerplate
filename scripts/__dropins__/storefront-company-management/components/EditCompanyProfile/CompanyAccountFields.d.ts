import { FunctionComponent } from 'preact';

interface CompanyAccountFieldsProps {
    loading?: boolean;
    value: {
        name: string;
        email: string;
        legalName: string;
        vatTaxId: string;
        resellerId: string;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    onBlur: (field: string, value?: string) => void;
    /** Optional input name prefix for DOM names (defaults to none) */
    namePrefix?: string;
    /** Optional field path prefix used for change/blur handlers (defaults to none) */
    fieldPathPrefix?: string;
}
export declare const CompanyAccountFields: FunctionComponent<CompanyAccountFieldsProps>;
export default CompanyAccountFields;
//# sourceMappingURL=CompanyAccountFields.d.ts.map
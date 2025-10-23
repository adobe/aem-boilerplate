import { FieldsProps } from '../../../types/form.types';
import { CompanyFormData } from '../../../data/models/company';

export interface CompanyFieldsConfigOptions {
    formData?: Partial<CompanyFormData>;
    isRequiredRegion?: boolean;
    isRequiredPostCode?: boolean;
    hasRegions?: boolean;
    disableField?: boolean;
    translations: Record<string, string>;
}
export declare const getCompanyFieldsConfig: (options: CompanyFieldsConfigOptions) => FieldsProps[];
//# sourceMappingURL=getCompanyFieldsConfig.d.ts.map
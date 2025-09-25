import { Country } from '../data/models/country';
import { CompanyFormData } from '../data/models/company';

interface UseCountryAndRegionFieldsOptions {
    defaultCountry?: string;
    formName?: string;
}
export declare const useCountryAndRegionFields: (options?: UseCountryAndRegionFieldsOptions) => {
    countryOptions: Country[];
    regionOptions: any[];
    isRequiredRegion: boolean;
    isRequiredPostCode: boolean;
    disableField: boolean;
    loadingCountries: boolean;
    hasRegions: boolean;
    handleInputChange: (field: keyof CompanyFormData, value: string | string[]) => void;
    inputChange: Partial<CompanyFormData>;
};
export {};
//# sourceMappingURL=useCountryAndRegionFields.d.ts.map
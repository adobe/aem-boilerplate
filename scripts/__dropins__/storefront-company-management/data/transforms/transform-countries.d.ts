import { CountriesFormResponse } from '../../types/api/getCountries.types';
import { Country } from '../models/country';

export declare const transformCountries: (response: CountriesFormResponse) => {
    availableCountries: Country[] | [
    ];
    countriesWithRequiredRegion: string[];
    optionalZipCountries: string[];
};
//# sourceMappingURL=transform-countries.d.ts.map
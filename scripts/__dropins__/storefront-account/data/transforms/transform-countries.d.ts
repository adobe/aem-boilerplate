import { CountriesFormResponse } from '../../types';
import { Country } from '../models';

export declare const transformCountries: (response: CountriesFormResponse) => {
    availableCountries: Country[] | [
    ];
    countriesWithRequiredRegion: string[];
    optionalZipCountries: string[];
};
//# sourceMappingURL=transform-countries.d.ts.map
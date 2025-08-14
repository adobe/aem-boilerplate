import { Country } from '../../data/models/country';

export declare const getCountries: () => Promise<{
    availableCountries: Country[] | [
    ];
    countriesWithRequiredRegion: string[];
    optionalZipCountries: string[];
}>;
//# sourceMappingURL=getCountries.d.ts.map
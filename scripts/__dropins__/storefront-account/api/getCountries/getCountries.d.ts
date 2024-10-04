import { Country } from '../../data/models';

export declare const getCountries: () => Promise<{
    availableCountries: Country[] | [
    ];
    countriesWithRequiredRegion: string[];
    optionalZipCountries: string[];
}>;
//# sourceMappingURL=getCountries.d.ts.map
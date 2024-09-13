import { CountryData } from './graphql/countriesAndRegionsQueries';

export interface EstimateAddressInput {
    countryCode: string;
    postcode?: string;
    region?: {
        region?: string;
        code?: string;
        id?: number;
    };
}
export declare const getEstimateShipping: (address: EstimateAddressInput) => Promise<any | null>;
export declare const getCountries: () => Promise<[CountryData]>;
export declare const getRegions: (countryId: string) => Promise<Array<{
    code: string;
    name: string;
}>>;
//# sourceMappingURL=getEstimateShipping.d.ts.map
import { CartAddressCountry, NegotiableQuoteAddressCountry } from '../../__generated__/types';
import { Country as CountryModel } from '../models';

type AddressCountry = CartAddressCountry | NegotiableQuoteAddressCountry;
type OptionalAddressCountry = AddressCountry | undefined | null;
export declare const transformAddressCountry: (data: OptionalAddressCountry) => CountryModel;
export {};
//# sourceMappingURL=transform-country.d.ts.map
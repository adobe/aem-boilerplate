import { Region as RegionModel } from '../models';
import { CartAddressRegion, NegotiableQuoteAddressRegion } from '../../__generated__/types';

type AddressRegion = CartAddressRegion | NegotiableQuoteAddressRegion;
type OptionalAddressRegion = AddressRegion | undefined | null;
export declare const transformAddressRegion: (data: OptionalAddressRegion) => RegionModel | undefined;
export {};
//# sourceMappingURL=transform-region.d.ts.map
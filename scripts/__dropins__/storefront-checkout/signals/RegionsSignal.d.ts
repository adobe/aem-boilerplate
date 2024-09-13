import { AddressFormType } from '../data/models';
import { Region as RegionModel } from '../data/models/region';

export declare const regionsSignal: import('@preact/signals-core').Signal<{
    addressType?: AddressFormType | undefined;
    country?: string | undefined;
    selectedRegion?: string | undefined;
    selectedRegionId?: string | undefined;
    pending: boolean;
    data?: RegionModel[] | undefined;
}>;
//# sourceMappingURL=RegionsSignal.d.ts.map
import { Country, RegionTransform } from '../data/models';

type Field = {
    customUpperCode: string;
    defaultValue?: string | boolean | number;
    options?: any[];
    required?: boolean;
    disabled?: boolean;
};
interface ProcessFieldsProps {
    fields: Field[];
    countryOptions: Country[];
    regionOptions: RegionTransform[];
    isRequiredRegion: boolean;
    isRequiredPostCode: boolean;
    disableField: boolean;
    addressId?: string | number;
}
declare const _default: ({ fields, addressId, countryOptions, disableField, regionOptions, isRequiredRegion, isRequiredPostCode, }: ProcessFieldsProps) => Field[];
export default _default;
//# sourceMappingURL=prepareNormalizedData.d.ts.map
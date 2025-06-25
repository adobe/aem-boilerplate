import { SortOrder } from '../../../data/models/api';

declare const getDefaultSort: (translations: any, categoryPath?: string) => any;
declare const setSortOptions: (sortOptions: any, translations: any, categoryPath?: string) => any;
declare const getSortSearchVariables: (sortValue: string) => SortOrder[];
declare const getSortValue: (sort: SortOrder[]) => string;
declare const getPickerOption: (options: any, value: string) => any;
export { getDefaultSort, getSortSearchVariables, setSortOptions, getPickerOption, getSortValue };
//# sourceMappingURL=sortUtils.d.ts.map
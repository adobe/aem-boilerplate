/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
declare const getValueFromUrl: (param: string) => string;
declare const updateUrlPagination: (pageNumber: number) => void;
declare const updateUrlSort: (sortOption: string) => void;
declare const updateUrlSearchPhrase: (searchPhrase: string) => void;
declare const getFiltersFromUrl: (filterableAttributes: string[]) => any[];
declare const addUrlFilters: (filters: any[]) => void;
export { addUrlFilters, getFiltersFromUrl, getValueFromUrl, updateUrlPagination, updateUrlSort, updateUrlSearchPhrase };
//# sourceMappingURL=urlUtils.d.ts.map
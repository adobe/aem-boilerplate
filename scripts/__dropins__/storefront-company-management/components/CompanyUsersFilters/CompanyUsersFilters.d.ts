/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export type FilterType = 'all' | 'active' | 'inactive';
export interface CompanyUsersFiltersProps {
    filterType: FilterType;
    onFilterChange: (filter: FilterType) => void;
    translations: {
        showAllUsers: string;
        showActiveUsers: string;
        showInactiveUsers: string;
        ariaFilterOptions: string;
    };
}
export declare const CompanyUsersFilters: ({ filterType, onFilterChange, translations }: CompanyUsersFiltersProps) => import("preact").JSX.Element;
//# sourceMappingURL=CompanyUsersFilters.d.ts.map
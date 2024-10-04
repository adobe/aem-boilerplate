export interface FilterDateProps {
    from: string;
    to: string;
}
export declare const getDateRange: (key: 'sixMonthsAgo' | 'oneYearAgo' | '', numberRange?: number) => FilterDateProps | '';
export declare const addYearsToList: (startYear: number) => {
    value: string;
    text: string;
}[];
//# sourceMappingURL=getDateRange.d.ts.map
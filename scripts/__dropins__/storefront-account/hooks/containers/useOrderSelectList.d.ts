export declare const useOrderSelectList: () => {
    selectableDateList: {
        value: string;
        text: string;
    }[];
    selectedDate: string;
    selectedPage: number;
    handleSelectDate: (event: Event) => void;
    setSelectedPage: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<number>>;
    handleSetFirstOrderDate: (date: string) => void;
};
//# sourceMappingURL=useOrderSelectList.d.ts.map
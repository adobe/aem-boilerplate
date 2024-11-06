import { OrdersReturnPropsModel } from '../../data/models';

export declare const useReturnsList: () => {
    pageInfo: {
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    selectedPage: number;
    loading: boolean;
    orderReturns: [] | OrdersReturnPropsModel[];
    handleSetSelectPage: (value: number) => void;
};
//# sourceMappingURL=useReturnsList.d.ts.map
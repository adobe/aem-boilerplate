import { OrdersReturnPropsModel } from '../../data/models';
import { UseReturnsListProps } from '../../types';

export declare const useReturnsList: ({ returnPageSize }: UseReturnsListProps) => {
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
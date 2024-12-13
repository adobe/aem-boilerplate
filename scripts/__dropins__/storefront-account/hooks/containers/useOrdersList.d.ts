import { OrderDetails } from '../../data/models';
import { UseOrdersListProps } from '../../types';

export declare const useOrdersList: ({ ordersInMinifiedView, minifiedView, pageSize, selectedDate, selectedPage, handleSetFirstOrderDate, }: UseOrdersListProps) => {
    loading: boolean;
    orderHistoryListItems: OrderDetails[];
    pageInfo: {
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    placeholderImage: string;
};
//# sourceMappingURL=useOrdersList.d.ts.map
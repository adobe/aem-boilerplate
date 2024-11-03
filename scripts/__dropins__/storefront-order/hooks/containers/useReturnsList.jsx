"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReturnsList = void 0;
const api_1 = require("@/order/api");
const hooks_1 = require("preact/hooks");
const DEFAULT_PAGE_INFO = { totalPages: 1, currentPage: 1, pageSize: 1 };
const useReturnsList = () => {
    const [loading, setLoading] = (0, hooks_1.useState)(true);
    const [orderReturns, setOrderReturns] = (0, hooks_1.useState)([]);
    const [pageInfo, setPageInfo] = (0, hooks_1.useState)(DEFAULT_PAGE_INFO);
    const [selectedPage, setSelectedPage] = (0, hooks_1.useState)(1);
    (0, hooks_1.useEffect)(() => {
        (0, api_1.getCustomerOrdersReturn)()
            .then((response) => {
            setOrderReturns(response?.ordersReturn ?? []);
            setPageInfo(response?.pageInfo ?? DEFAULT_PAGE_INFO);
        })
            .finally(() => {
            setLoading(false);
        });
    }, []);
    const handleSetSelectPage = (0, hooks_1.useCallback)((value) => {
        setSelectedPage(value);
    }, []);
    return {
        pageInfo,
        selectedPage,
        loading,
        orderReturns,
        handleSetSelectPage,
    };
};
exports.useReturnsList = useReturnsList;

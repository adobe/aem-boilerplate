"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** https://preactjs.com/guide/v10/preact-testing-library/ */
// @ts-nocheck
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const ReturnsListContent_1 = require("@/order/components/ReturnsListContent");
const mock_config_1 = require("@/order/configs/mock.config");
describe('order/Components/ReturnsListContent', () => {
    const withOrderNumber = true;
    const minifiedViewKey = 'minifiedView';
    const withReturnNumber = true;
    const pageInfo = {
        pageSize: 20,
        totalPages: 2,
        currentPage: 1,
    };
    const orderReturns = mock_config_1.returnOrderListMock;
    const slots = {};
    const selectedPage = 1;
    const handleSetSelectPage = jest.fn();
    const withReturnsListButton = true;
    const isMobile = true;
    const translations = {
        orderNumber: 'Order number:',
        viewAllOrdersButton: 'View all orders',
    };
    const withHeader = true;
    const returnsInMinifiedView = 2;
    const minifiedView = true;
    const withThumbnails = true;
    const routeReturnDetails = jest.fn();
    const routeOrderDetails = jest.fn();
    const routeTracking = jest.fn();
    const routeReturnsList = jest.fn();
    const routeProductDetails = jest.fn();
    const defaultProps = {
        minifiedViewKey,
        withOrderNumber,
        withReturnNumber,
        pageInfo,
        orderReturns,
        slots,
        selectedPage,
        handleSetSelectPage,
        withReturnsListButton,
        isMobile,
        translations,
        withHeader,
        returnsInMinifiedView,
        minifiedView,
        withThumbnails,
        routeReturnDetails,
        routeOrderDetails,
        routeTracking,
        routeReturnsList,
        routeProductDetails,
    };
    test('renders minifiedView === true', () => {
        const { container } = (0, tests_1.render)(<ReturnsListContent_1.ReturnsListContent {...defaultProps} routeTracking={undefined}/>);
        expect(!!container).toEqual(true);
        expect(tests_1.screen.getByText(/View all orders/i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders minifiedView === false', () => {
        const { container } = (0, tests_1.render)(<ReturnsListContent_1.ReturnsListContent {...defaultProps} minifiedView={false} withOrderNumber={true} slots={{
                ReturnItemsDetails: () => { },
                DetailsActionParams: () => {
                    <a>Text button</a>;
                },
            }}/>);
        const orderNumbers = tests_1.screen.getAllByText(/Order number:/i);
        expect(!!container).toEqual(true);
        expect(orderNumbers).toHaveLength(12);
    });
    test('renders without params', () => {
        const { container } = (0, tests_1.render)(<ReturnsListContent_1.ReturnsListContent withReturnsListButton={false} withHeader={false} withThumbnails={false} orderReturns={orderReturns.map((el) => ({ ...el, items: null }))} translations={translations} minifiedView={minifiedView} slots={{ ReturnItemsDetails: () => { } }} routeProductDetails={undefined} withOrderNumber={true}/>);
        const orderNumbers = tests_1.screen.getAllByText(/Order number:/i);
        expect(!!container).toEqual(true);
        expect(orderNumbers).toHaveLength(1);
    });
    test('renders without default props', () => {
        const { container } = (0, tests_1.render)(<ReturnsListContent_1.ReturnsListContent orderReturns={undefined} translations={undefined} minifiedView={undefined} withThumbnails={undefined} withHeader={undefined} returnsInMinifiedView={undefined} isMobile={undefined} withReturnsListButton={undefined} selectedPage={undefined} slots={{ ReturnItemsDetails: () => { } }}/>);
        expect(!!container).toEqual(true);
    });
});

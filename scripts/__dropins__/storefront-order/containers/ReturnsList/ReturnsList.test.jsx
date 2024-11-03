"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
const ReturnsList_1 = __importDefault(require("@/order/containers/ReturnsList"));
const hooks_1 = require("@/order/hooks");
jest.mock('@/order/hooks/containers/useReturnsList');
jest.mock('@/order/hooks/useIsMobile');
describe('[Order-Containers] - ReturnsList', () => {
    test('renders minifiedView true', () => {
        hooks_1.useReturnsList.mockReturnValue({
            orderReturns: [],
            loading: false,
        });
        hooks_1.useIsMobile.mockReturnValue(false);
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <ReturnsList_1.default minifiedView={true}/>);
        expect(!!container).toEqual(true);
    });
    test('renders minifiedView false', () => {
        hooks_1.useReturnsList.mockReturnValue({
            orderReturns: [],
            loading: false,
        });
        hooks_1.useIsMobile.mockReturnValue(false);
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <ReturnsList_1.default minifiedView={false}/>);
        expect(!!container).toEqual(true);
    });
    test('renders loading', () => {
        hooks_1.useReturnsList.mockReturnValue({
            orderReturns: [],
            loading: true,
        });
        hooks_1.useIsMobile.mockReturnValue(false);
        const { container } = (0, tests_1.render)(
        // @ts-ignore
        <ReturnsList_1.default />);
        expect(!!container).toEqual(true);
    });
});

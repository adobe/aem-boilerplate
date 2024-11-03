"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const useIsMobile_1 = require("./useIsMobile");
jest.mock('@adobe/elsie/lib/debounce', () => ({
    debounce: (fn, delay) => {
        let timeout;
        return (...args) => {
            if (timeout)
                clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    },
}));
const resizeWindow = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
};
describe('[ACCOUNT-hooks] - useIsMobile', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it('Should return true if the screen width is less than 768px', () => {
        resizeWindow(500);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIsMobile_1.useIsMobile)());
        expect(result.current).toBe(true);
    });
    it('Should return false if the screen width is greater than or equal to 768px.', () => {
        resizeWindow(1024);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIsMobile_1.useIsMobile)());
        expect(result.current).toBe(false);
    });
    it('Should update on window resize.', async () => {
        window.innerWidth = 1024;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useIsMobile_1.useIsMobile)());
        expect(result.current).toBe(false);
        (0, react_hooks_1.act)(() => {
            resizeWindow(500);
            jest.runAllTimers();
        });
        expect(result.current).toBe(true);
    });
});

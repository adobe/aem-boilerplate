"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMobile = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
const lib_1 = require("@adobe/elsie/lib");
const hooks_1 = require("preact/hooks");
const useIsMobile = () => {
    const [isMobile, setIsMobile] = (0, hooks_1.useState)(window.innerWidth < 768);
    const handleResize = (0, hooks_1.useCallback)((0, lib_1.debounce)(() => {
        setIsMobile(window.innerWidth < 768);
    }, 1000), []);
    (0, hooks_1.useEffect)(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    return isMobile;
};
exports.useIsMobile = useIsMobile;

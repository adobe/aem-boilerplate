"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetStoreConfig = void 0;
const api_1 = require("@/order/api");
const hooks_1 = require("preact/hooks");
const useGetStoreConfig = () => {
    const [config, setConfig] = (0, hooks_1.useState)(null);
    (0, hooks_1.useEffect)(() => {
        const storeConfigString = sessionStorage.getItem('orderStoreConfig');
        const cachedStoreConfig = storeConfigString
            ? JSON.parse(storeConfigString)
            : null;
        if (cachedStoreConfig) {
            setConfig(cachedStoreConfig);
        }
        else {
            (0, api_1.getStoreConfig)().then((response) => {
                if (response) {
                    sessionStorage.setItem('orderStoreConfig', JSON.stringify(response));
                    setConfig(response);
                }
            });
        }
    }, []);
    return config;
};
exports.useGetStoreConfig = useGetStoreConfig;

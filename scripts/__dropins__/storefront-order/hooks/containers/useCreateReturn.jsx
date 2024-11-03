"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateReturn = void 0;
const api_1 = require("@/order/api");
const hooks_1 = require("preact/hooks");
const useCreateReturn = () => {
    const [steps, setSteps] = (0, hooks_1.useState)('products');
    const [loading, setLoading] = (0, hooks_1.useState)(false);
    const [selectedProductList, setSelectedProductList] = (0, hooks_1.useState)([]);
    const [attributesList, setAttributesList] = (0, hooks_1.useState)([]);
    (0, hooks_1.useEffect)(() => {
        (0, api_1.getAttributesList)('RMA_ITEM').then((response) => {
            if (response.length) {
                setAttributesList(response);
            }
        });
    }, []);
    const handleSelectedProductList = (0, hooks_1.useCallback)((product) => {
        setSelectedProductList((currentList) => {
            const existingProduct = currentList.some((item) => item.uid === product.uid);
            return existingProduct
                ? currentList.filter((item) => item.uid !== product.uid)
                : [...currentList, product];
        });
    }, []);
    const handleChangeStep = (0, hooks_1.useCallback)((value) => {
        if (value === 'attributes') {
            sessionStorage.setItem('returnOrderStep', JSON.stringify(selectedProductList));
        }
        setSteps(value);
    }, [selectedProductList]);
    const handleSetQuantity = (0, hooks_1.useCallback)((value) => {
        console.log('value', value);
    }, []);
    const onSubmit = (0, hooks_1.useCallback)(async (event, isValid) => {
        if (!isValid)
            return null;
        setLoading(true);
        console.log('event', event);
        console.log('1', 1);
        handleChangeStep('success');
        setLoading(false);
    }, [handleChangeStep]);
    return {
        attributesList,
        steps,
        loading,
        selectedProductList,
        handleSelectedProductList,
        handleSetQuantity,
        handleChangeStep,
        onSubmit,
    };
};
exports.useCreateReturn = useCreateReturn;

/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export declare const useEstimatedTotals: () => {
    handleEstimateTotals: (formValues: {
        shippingCountry: string;
        shippingState?: string;
        shippingStateId?: number;
        shippingZip?: string;
    }, shippingMethods?: {
        carrier_code: string;
        method_code: string;
    }) => void;
    estimatedTotals: any;
    setEstimatedTotals: import('preact/hooks').Dispatch<any>;
    loading: boolean;
};
//# sourceMappingURL=useEstimatedTotals.d.ts.map
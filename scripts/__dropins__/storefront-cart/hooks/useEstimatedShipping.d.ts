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
export declare const useEstimatedShipping: () => {
    loading: boolean;
    regionsLoading: boolean;
    estimatedDestinationText: string;
    countries: {
        text: string;
        value: string;
    }[];
    selectedCountry: string;
    selectedRegion: string;
    selectedZip: string;
    regions: {
        text: string;
        value: string;
    }[];
    estimatedShippingPrice: any;
    estimatedShippingMethod: any;
    shippingEstimated: boolean;
    handleEstimateShipping: (formValues: {
        shippingCountry: string;
        shippingState?: string;
        shippingZip?: string;
    }) => Promise<any>;
    handleCountrySelected: (event: Event) => void;
    resetValues: () => void;
    setPriceSummaryLoading: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
};
//# sourceMappingURL=useEstimatedShipping.d.ts.map
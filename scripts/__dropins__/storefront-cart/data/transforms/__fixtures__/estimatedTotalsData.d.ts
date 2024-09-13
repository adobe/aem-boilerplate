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
declare const mockEstimatedTotalsData: {
    estimatedAppliedTaxes: {
        taxes: {
            amount: {
                currency: string;
                value: number;
            };
            label: string;
        }[];
    };
    estimatedGrandTotalPrice: {
        currency: string;
        value: number;
    };
    estimatedItems: {
        price: {
            currency: string;
            value: number;
        };
        rowTotal: {
            currency: string;
            value: number;
        };
        rowTotalIncludingTax: {
            currency: string;
            value: number;
        };
        taxedPrice: {
            currency: string;
            value: number;
        };
        uid: string;
    }[];
    estimatedSubtotal: {
        excludingTax: {
            currency: string;
            value: number;
        };
        includingDiscountOnly: {
            currency: string;
            value: number;
        };
        includingTax: {
            currency: string;
            value: number;
        };
    };
    appliedTaxes: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    estimatedTaxTotal: {
        currency: string;
        value: number;
    };
};
export { mockEstimatedTotalsData };
//# sourceMappingURL=estimatedTotalsData.d.ts.map
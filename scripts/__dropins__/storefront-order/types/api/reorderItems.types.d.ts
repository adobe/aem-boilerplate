/********************************************************************
 * ADOBE CONFIDENTIAL
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
export interface UserInputErrorProps {
    code: string;
    message: string;
    path: [string];
}
export interface ReorderItemsResponse {
    data: {
        reorderItems: {
            cart: {
                itemsV2: {
                    items: {
                        uid: string;
                    }[];
                };
            };
            userInputErrors: UserInputErrorProps[];
        };
    };
    errors?: {
        message: string;
    }[];
}
export interface ReorderItemsProps {
    success: boolean;
    userInputErrors: UserInputErrorProps[];
}
//# sourceMappingURL=reorderItems.types.d.ts.map
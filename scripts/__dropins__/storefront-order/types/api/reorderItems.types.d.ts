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
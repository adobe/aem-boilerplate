export interface RequestReturnProps {
    orderUid: string;
    contactEmail: string;
    items: {
        orderItemUid: string;
        quantityToReturn: number;
        selectedCustomAttributes?: {
            attribute_code: string;
            value: string;
        }[];
        enteredCustomAttributes?: {
            attribute_code: string;
            value: string;
        }[];
    }[];
}
export interface ReturnProps {
    uid: string;
    number: string;
    status: string;
    created_at: string;
}
export interface RequestReturnResponse {
    data: {
        requestReturn: {
            return: ReturnProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=requestReturn.types.d.ts.map
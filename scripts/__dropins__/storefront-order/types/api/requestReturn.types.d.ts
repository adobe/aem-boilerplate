export interface RequestReturnProps {
    orderUid?: string;
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
export interface RequestGuestReturnProps extends RequestReturnProps {
    token: string;
    commentText: string;
}
export interface ReturnProps {
    uid: string;
    number: string;
    status: string;
    created_at: string;
}
interface ErrorsProps {
    message: string;
}
export interface RequestReturnResponse {
    data: {
        requestReturn: {
            return: ReturnProps;
        };
    };
    errors?: ErrorsProps[];
}
export interface RequestGuestReturnResponse {
    data: {
        requestGuestReturn: {
            return: ReturnProps;
        };
    };
    errors?: ErrorsProps[];
}
export {};
//# sourceMappingURL=requestReturn.types.d.ts.map
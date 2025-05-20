import { CartModel } from '../../data/models';

type UpdateProductsFromCart = Array<{
    uid: string;
    quantity: number;
    sku?: string;
    parentSku?: string;
    optionsUIDs?: string[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    giftOptions?: {
        gift_wrapping_id?: string | null;
        gift_message: {
            to: string;
            from: string;
            message: string;
        };
    };
}>;
export declare const updateProductsFromCart: (items: UpdateProductsFromCart) => Promise<CartModel | null>;
export {};
//# sourceMappingURL=updateProductsFromCart.d.ts.map
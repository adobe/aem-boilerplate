export declare const itemsFixture: ({
    __typename: "OrderItem";
} & import('../../../__generated__/types').OrderItemInterface & {
    __typename?: "OrderItem" | undefined;
    discounts?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').Maybe<import('../../../__generated__/types').Discount>[]> | undefined;
    eligible_for_return?: import('../../../__generated__/types').Maybe<boolean> | undefined;
    entered_options?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').Maybe<import('../../../__generated__/types').OrderItemOption>[]> | undefined;
    gift_message?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').GiftMessage> | undefined;
    gift_wrapping?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').GiftWrapping> | undefined;
    id: string;
    prices?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').OrderItemPrices> | undefined;
    product?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').ProductInterface> | undefined;
    product_name?: import('../../../__generated__/types').Maybe<string> | undefined;
    product_sale_price: import('../../../__generated__/types').Money;
    product_sku: string;
    product_type?: import('../../../__generated__/types').Maybe<string> | undefined;
    product_url_key?: import('../../../__generated__/types').Maybe<string> | undefined;
    quantity_canceled?: import('../../../__generated__/types').Maybe<number> | undefined;
    quantity_invoiced?: import('../../../__generated__/types').Maybe<number> | undefined;
    quantity_ordered?: import('../../../__generated__/types').Maybe<number> | undefined;
    quantity_refunded?: import('../../../__generated__/types').Maybe<number> | undefined;
    quantity_returned?: import('../../../__generated__/types').Maybe<number> | undefined;
    quantity_shipped?: import('../../../__generated__/types').Maybe<number> | undefined;
    selected_options?: import('../../../__generated__/types').Maybe<import('../../../__generated__/types').Maybe<import('../../../__generated__/types').OrderItemOption>[]> | undefined;
    status?: import('../../../__generated__/types').Maybe<string> | undefined;
})[];
//# sourceMappingURL=cartItems.d.ts.map
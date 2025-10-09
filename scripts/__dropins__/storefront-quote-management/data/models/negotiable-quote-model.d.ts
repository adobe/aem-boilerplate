export interface NegotiableQuoteModel {
    uid: string;
    name: string;
    createdAt: string;
    status: "SUBMITTED" | "PENDING" | "UPDATED" | "OPEN" | "ORDERED" | "CLOSED" | "DECLINED" | "EXPIRED" | "DRAFT";
    salesRepName: string;
    expirationDate: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: {
        uid: string;
        createdAt: string;
        author: {
            firstname: string;
            lastname: string;
        };
    }[];
    items: {
        product: {
            uid: string;
            sku: string;
            name: string;
        };
        catalogDiscount: {
            amountOff: number;
            percentOff: number;
        };
        discounts: {
            label: string;
            value: string;
            amount: Currency;
        }[];
        stockStatus: string;
        quantity: number;
        prices: {
            originalItemPrice: Currency;
            rowTotal: Currency;
        };
    }[];
    prices: {
        grandTotal: Currency;
        subtotalExcludingTax: Currency;
        appliedTaxes: {
            amount: Currency;
            label: string;
        }[];
    };
    canCheckout: boolean;
    canSendForReview: boolean;
}
export interface Currency {
    value: number;
    currency: string;
}
//# sourceMappingURL=negotiable-quote-model.d.ts.map
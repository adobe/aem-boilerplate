import { CardType } from '@adobe-commerce/payment-services-sdk/payment';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CreditCardFormProps extends HTMLAttributes<HTMLDivElement> {
    cardContainerId: string;
    cardNumberContainerId: string;
    expirationDateContainerId: string;
    securityCodeContainerId: string;
    eligibleCardTypes: CardType[];
    selectedCardType: CardType | null;
    validationErrors: {
        [key: string]: string;
    };
    isLoading?: boolean;
}
export declare const CreditCardForm: FunctionComponent<CreditCardFormProps>;
//# sourceMappingURL=CreditCardForm.d.ts.map
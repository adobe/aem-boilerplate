import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface ManageNegotiableQuoteProps extends HTMLAttributes<HTMLDivElement> {
    onActionsDropdownChange?: (event: Event) => void;
    onActionsButtonClick?: (action: string) => void;
    onSendForReview?: (params: {
        quoteData: NegotiableQuoteModel;
        comment?: string;
    }) => void;
    slots?: {
        QuoteName?: SlotProps<{
            quoteName?: string;
            quoteData?: NegotiableQuoteModel;
        }>;
        QuoteStatus?: SlotProps<{
            quoteStatus?: string;
            quoteData?: NegotiableQuoteModel;
        }>;
        Banner?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        Details?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        ActionBar?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
            actionsBarDropdownValue?: string;
        }>;
        QuoteContent?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        ItemsQuotedTab?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        CommentsTab?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        HistoryLogTab?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        ShippingInformationTitle?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        ShippingInformation?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
            loading?: boolean;
            setLoading?: (loading: boolean) => void;
        }>;
        QuoteCommentsTitle?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        QuoteComments?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
        }>;
        Footer?: SlotProps<{
            quoteData?: NegotiableQuoteModel;
            comment?: string;
            isSubmitting?: boolean;
        }>;
    };
}
export declare const ManageNegotiableQuote: Container<ManageNegotiableQuoteProps>;
//# sourceMappingURL=ManageNegotiableQuote.d.ts.map
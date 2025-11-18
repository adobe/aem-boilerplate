import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { requestNegotiableQuote } from '../../api';
import { AttachedFile } from '../../components';

export type RequestNegotiableQuoteHandlers = {
    onAttachFiles?: (files: File[]) => Promise<void>;
    onRequestNegotiableQuote?: typeof requestNegotiableQuote;
    onSaveNegotiableQuote?: typeof requestNegotiableQuote;
    onSubmitErrors?: (errors: Record<string, string>) => void;
    onError?: (props: {
        error: string;
        isFormDisabled: boolean;
        setIsFormDisabled: (isFormDisabled: boolean) => void;
    }) => void;
};
export interface RequestNegotiableQuoteFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onError'>, RequestNegotiableQuoteHandlers {
    cartId: string;
    maxFiles?: number;
    maxFileSize?: number;
    acceptedFileTypes?: string[];
    slots?: {
        ErrorBanner?: SlotProps<{
            message: string;
        }>;
        SuccessBanner?: SlotProps<{
            message: string;
        }>;
        Title?: SlotProps<{
            text: string;
        }>;
        CommentField?: SlotProps<{
            formErrors: Record<string, string>;
            isFormDisabled: boolean;
            setFormErrors: (errors: Record<string, string>) => void;
        }>;
        QuoteNameField?: SlotProps<{
            formErrors: Record<string, string>;
            isFormDisabled: boolean;
            setFormErrors: (errors: Record<string, string>) => void;
        }>;
        AttachFileField?: SlotProps<{
            onChange: (files: File[]) => void;
            formErrors: Record<string, string>;
            isFormDisabled: boolean;
            attachedFiles: AttachedFile[];
        }>;
        AttachedFilesList?: SlotProps<{
            files: AttachedFile[];
            onRemove: (key: string) => void;
            disabled?: boolean;
        }>;
        RequestButton?: SlotProps<{
            requestNegotiableQuote: typeof requestNegotiableQuote;
            formErrors: Record<string, string>;
            isFormDisabled: boolean;
            setIsFormDisabled: (isFormDisabled: boolean) => void;
        }>;
        SaveDraftButton?: SlotProps<{
            requestNegotiableQuote: typeof requestNegotiableQuote;
            formErrors: Record<string, string>;
            isFormDisabled: boolean;
            setIsFormDisabled: (isFormDisabled: boolean) => void;
        }>;
    };
}
export declare const RequestNegotiableQuoteForm: Container<RequestNegotiableQuoteFormProps>;
//# sourceMappingURL=RequestNegotiableQuoteForm.d.ts.map
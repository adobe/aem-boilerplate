import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';

export interface ManageNegotiableQuoteTemplateProps extends HTMLAttributes<HTMLDivElement> {
    slots?: {
        TemplateName?: SlotProps<{
            templateName?: string;
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        TemplateId?: SlotProps<{
            templateId?: string;
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Banner?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Details?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ReferenceDocumentsTitle?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ReferenceDocuments?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ItemsTable?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ItemsQuotedTab?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        CommentsTab?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        HistoryLogTab?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        CommentsTitle?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Comments?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        HistoryLogTitle?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        HistoryLog?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
    };
}
export declare const ManageNegotiableQuoteTemplate: Container<ManageNegotiableQuoteTemplateProps>;
//# sourceMappingURL=ManageNegotiableQuoteTemplate.d.ts.map
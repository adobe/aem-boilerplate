import { AgreementMode } from '../../data/models';
import { Container, SlotMethod, SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface TermsAndConditionsProps {
    slots?: {
        Agreements?: SlotProps<{
            appendAgreement: SlotMethod<{
                name: string;
                mode: AgreementMode;
                translationId?: string;
                text?: string;
            }>;
        }>;
    };
}
export declare const TermsAndConditions: Container<TermsAndConditionsProps>;
//# sourceMappingURL=TermsAndConditions.d.ts.map